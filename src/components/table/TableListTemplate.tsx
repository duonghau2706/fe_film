import { Button, Space, Table } from 'antd'
import { memo, useState } from 'react'

import { ContentApi } from '@/adapter'
import IconDelete from '@/assets/image/icon_delete.svg'
import IconEdit from '@/assets/image/icon_edit.svg'
import IconActive from '@/assets/image/icon_active.svg'
import IconInActive from '@/assets/image/icon_inActive.svg'
import { DATE_DMY, MESSAGE, URL } from '@/utils/constants'
import moment from 'moment'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ModalBase } from '../modal'

type EditableTableProps = Parameters<typeof Table>[0]

interface IProps {
  dataTable?: any
  handleReload?: any
  pageSize?: any
  current?: any
  loading: boolean
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const TableListTemplate = ({
  dataTable,
  pageSize,
  current,
  handleReload,
  loading,
}: IProps) => {
  const navigate = useNavigate()

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openModalChangeStatus, setOpenModalChangeStatus] =
    useState<boolean>(false)

  const [header, setHeader] = useState<string>()

  const [content, setContent] = useState<string>()
  const [dataDelete, setDataDelete] = useState<string>()
  const [dataEdit, setDataEdit] = useState<any>()

  const mutationDelete = useMutation({
    mutationFn: (params: any) => {
      return ContentApi.deleteContent({ id: params })
    },
    onSuccess: () => {
      toast.success(MESSAGE.SUCESS.CONTENT.DELETE)
      setOpenModalDelete(false)
      handleReload()
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)
    },
  })

  const mutationChangeStatus = useMutation({
    mutationFn: (params: any) => {
      return ContentApi.changeStatus(params)
    },
    onSuccess: () => {
      toast.success(MESSAGE.SUCESS.CONTENT.CHANGE_STATUS)
      setOpenModalChangeStatus(false)
      handleReload()
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)
    },
  })

  const handleDelete = (record: any) => {
    setOpenModalDelete(true)
    setHeader('Xóa template')
    setContent('Bạn có chắc chắn muốn xóa template này?')
    setDataDelete(record)
  }

  const onDelete = () => {
    mutationDelete.mutate(dataDelete)
  }
  const onChangeStatus = () => {
    const newData = { id: dataEdit?.id, status: !dataEdit?.status }
    mutationChangeStatus.mutate(newData)
  }

  const handleEdit = (value: string) => {
    navigate(URL.TEMPLATE.concat(`/${value}`), {
      state: { data: { id: value }, action: 'edit' },
    })
  }

  const handleChangeStatus = (value: any) => {
    setOpenModalChangeStatus(true)
    setDataEdit(value)
    setHeader('Thay đổi trạng thái')
    if (value?.status) {
      setContent('Bạn có chắc chắn muốn Inactive template này?')
      return
    }
    setContent('Bạn có chắc chắn muốn active template này?')
  }

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: 60,
      render: (_: any, record: any, row: any) => {
        return <div>{pageSize * (current - 1) + (row + 1)}</div>
      },
    },
    {
      title: 'Tên template',
      dataIndex: 'templateName',
      key: 'templateName',
      align: 'center',
      width: 250,
    },
    {
      title: 'Số ký tự',
      dataIndex: 'numberOfCharacters',
      key: 'numberOfCharacters',
      align: 'center',
      width: 120,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: 300,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 150,
      render: (text: string) => {
        return (
          <span className="age-span">
            {text ? moment(text).local().format(DATE_DMY) : ''}
          </span>
        )
      },
    },
    {
      title: 'Ngày cập nhật gần nhất',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      width: 230,
      render: (text: string) => {
        return (
          <span className="age-span">
            {text ? moment(text).local().format(DATE_DMY) : ''}
          </span>
        )
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 150,
      render: (text: string) => {
        return (
          <span className="age-span">
            {text ? (
              <div className="text-green-primary">Active</div>
            ) : (
              <div className="text-red-primary">Inactive</div>
            )}
          </span>
        )
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (record: any) => (
        <Space className="flex justify-center items-center">
          {record?.status ? (
            <Button
              className="flex items-center justify-center border-none"
              icon={<img src={IconInActive} width={23} height={22} />}
              onClick={() => handleChangeStatus(record)}
            ></Button>
          ) : (
            <Button
              className="flex items-center justify-center border-none"
              icon={<img src={IconActive} width={23} height={22} />}
              onClick={() => handleChangeStatus(record)}
            ></Button>
          )}
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconEdit} width={22} height={20} />}
            onClick={() => handleEdit(record?.id)}
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
        scroll={{ x: 1200, y: 800 }}
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
        header={header}
        content={content}
        footer={true}
      />
      <ModalBase
        isOpen={openModalChangeStatus}
        setIsOpen={setOpenModalChangeStatus}
        onSave={onChangeStatus}
        header={header}
        content={content}
        footer={true}
      />
    </div>
  )
}

export default memo(TableListTemplate)
