import { Button, Space, Table } from 'antd'
import { memo, useState } from 'react'

import { CustomerResourceApi } from '@/adapter'
import IconDelete from '@/assets/image/icon_delete.svg'
import IconEdit from '@/assets/image/icon_edit.svg'
import IconDate from '@/assets/image/iconDate.svg'
import useToken from '@/hook/token'
import { MESSAGE, URL } from '@/utils/constants'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { ModalAddSourceCustomer, ModalBase } from '../modal'
import { useNavigate } from 'react-router-dom'

type EditableTableProps = Parameters<typeof Table>[0]

interface IProps {
  dataTable?: any
  handleReload?: any
  pageSize?: any
  current?: any
  loading?: boolean
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const TableListSourceCustomer = ({
  dataTable,
  pageSize,
  current,
  handleReload,
  loading,
}: IProps) => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const navigate = useNavigate()

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)

  const [dataDelete, setDataDelete] = useState<string>()
  const [dataEdit, setDataEdit] = useState<any>()

  const mutationDelete = useMutation({
    mutationFn: (params: any) => {
      return CustomerResourceApi.deleteCustomerResource({ id: params })
    },
    onSuccess: () => {
      toast.success(MESSAGE.SUCESS.CUSTOMER_RESOURCE.DELETE)
      setOpenModalDelete(false)
      handleReload()
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)
    },
  })

  const handleDelete = (record: any) => {
    setOpenModalDelete(true)
    setDataDelete(record)
  }

  const onDelete = () => {
    mutationDelete.mutate(dataDelete)
  }

  const mutationEdit = useMutation({
    mutationFn: (params: any) => {
      return CustomerResourceApi.updateCustomerResource(params)
    },
    onSuccess: () => {
      toast.success(MESSAGE.SUCESS.CUSTOMER_RESOURCE.UPDATE)
      setOpenModalEdit(false)
      handleReload()
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)
    },
  })

  const handleEditCustomerResource = (values: any) => {
    const newValue = {
      ...values,
      updatedBy: decode?.username,
    }
    mutationEdit.mutate(newValue)
  }

  const handleEdit = (record: any) => {
    setOpenModalEdit(true)
    setDataEdit(record)
  }

  const handleViewCustomer = (record: any) => {
    navigate(URL.CUSTOMER_OF_RESOURCE.concat(`/${record?.id}`), {
      state: { data: { record } },
    })
  }

  const handleViewImportHistories = (record: any) => {
    navigate(URL.VIEW_HISTORIES_IMPORT_CUSTOMER.concat(`/${record?.id}`), {
      state: { data: { record } },
    })
  }

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      ellipsis: true,
      width: 60,
      render: (_: any, record: any, row: any) => {
        return <div>{pageSize * (current - 1) + (row + 1)}</div>
      },
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      width: 90,
      ellipsis: true,
    },
    {
      title: 'Nguồn KH',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Lĩnh vực',
      dataIndex: 'fieldName',
      key: 'fieldName',
      align: 'center',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      ellipsis: true,
      width: 240,
      render: (text: any) => <span style={{ textAlign: 'left' }}>{text}</span>,
    },
    {
      title: 'Số lượng KH',
      dataIndex: 'numberOfCustomer',
      key: 'numberOfCustomer',
      align: 'center',
      ellipsis: true,
      width: 80,
      render: (_: any, record: any) => {
        return (
          <a className="underline" onClick={() => handleViewCustomer(record)}>
            {record?.numCustomers
              ? Number(record?.numCustomers)?.toLocaleString()
              : ''}
          </a>
        )
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      ellipsis: true,
      width: 100,
      fixed: 'right',
      render: (record: any) => (
        <Space className="flex justify-center items-center">
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconDate} width={19} height={20} />}
            onClick={() => handleViewImportHistories(record)}
          ></Button>
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconEdit} width={22} height={20} />}
            onClick={() => handleEdit(record)}
          ></Button>

          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconDelete} width={18} height={20} />}
            onClick={() => handleDelete(record?.id)}
          ></Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="flex gap-2 flex-col">
      <Table
        rowKey="id"
        bordered
        dataSource={dataTable}
        columns={columns as ColumnTypes}
        pagination={false}
        loading={loading}
      />

      <ModalBase
        isOpen={openModalDelete}
        setIsOpen={setOpenModalDelete}
        onSave={onDelete}
        header="Xác nhận"
        content="Bạn có chắc chắn muốn xóa Nguồn khách hàng này?"
        footer={true}
      />

      <ModalAddSourceCustomer
        isOpen={openModalEdit}
        setIsOpen={setOpenModalEdit}
        onSave={handleEditCustomerResource}
        action="edit"
        header="Cập nhật thông tin nguồn"
        dataEdit={dataEdit}
      />
    </div>
  )
}

export default memo(TableListSourceCustomer)
