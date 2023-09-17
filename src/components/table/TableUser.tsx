import React, { memo, useState } from 'react'
import { Button, Space, Table } from 'antd'
import style from '@/common.module.scss'
import moment from 'moment'
import IconEdit from '@/assets/image/icon_edit.svg'
import IconDelete from '@/assets/image/icon_delete.svg'
import IconDate from '@/assets/image/iconDate.svg'
import {
  ModalBase,
  ModalEditUser,
  ModalRecordEffortMember,
} from '@/components/modal'
import { useMutation, useQueryClient } from 'react-query'
import { userApi } from '@/adapter'
import { MESSAGE, QUERY_KEY } from '@/utils/constants'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface DataTypePaymentRequisition {
  id: string
  payment_request_code?: string
  requested_date?: string
  requested_by?: string
  department_name?: string
  approver?: string
  approvedDate?: string
  reason?: string
  canApprove: number
  status: string
}

interface IProps {
  dataSource: DataTypePaymentRequisition[]
  perPage: number
  loading: boolean
}

const renderRole = (role: number) => {
  const getLabel = () => {
    switch (role) {
      case 0:
        return 'Quản trị viên'
      case 1:
        return 'Nhân viên kinh doanh'
      case 2:
        return 'Cộng tác viên'
    }
  }
  return <span>{getLabel()}</span>
}

const TableUser = ({ dataSource, perPage, loading }: IProps) => {
  const client = useQueryClient()
  const { currentPage } = useParams()
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<any>()
  const [dataDelete, setDataDelete] = useState<string>()
  const [openModalUpdateRecord, setOpenModalUpdateRecord] =
    useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<any>({})

  const handleEdit = (value: any) => {
    setIsOpenEditModal(true)
    setDataModal(value)
  }

  const handleDelete = (value: any) => {
    setOpenDeleteModal(true)
    setDataDelete(value)
  }
  const showModal = (value: boolean) => {
    setIsOpenEditModal(value)
  }

  const handleRecordUpdate = (value: any) => {
    setOpenModalUpdateRecord(true)
    setInitialValues({
      ...value,
      workDate: moment(new Date()).format('DD/MM/YYYY'),
    })
  }

  const onUpdateRecord = (value: any) => {
    mutationRecordWorkingTime.mutate({
      ...value,
      userId: initialValues?.id,
      name: initialValues?.name,
      workDate: initialValues?.workDate,
    })
  }

  const mutationDelete = useMutation({
    mutationFn: (params: any) => {
      return userApi.deletebyId({ id: params })
    },
    onSuccess: () => {
      toast.success(MESSAGE.SUCESS.USER.DELETE)
      setOpenDeleteModal(false)

      client.invalidateQueries([QUERY_KEY.GET_ALL_USER])
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)

      setOpenDeleteModal(false)
    },
  })

  const mutationRecordWorkingTime = useMutation({
    mutationFn: (params: any) => {
      return userApi.recordWorkingTime(params)
    },
    onSuccess: () => {
      toast.success('Ghi nhận thời gian làm việc thành công')
      setInitialValues({
        numberWorkHours: '',
        note: '',
      })
      setOpenModalUpdateRecord(false)
      // client.invalidateQueries([QUERY_KEY.GET_ALL_USER])
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)
      setInitialValues({
        numberWorkHours: '',
        note: '',
      })
      setOpenModalUpdateRecord(false)
    },
  })

  const onDelete = () => {
    mutationDelete.mutate(dataDelete)
  }

  const mutationUpdate = useMutation({
    mutationFn: (params: any) => userApi.update(params),
    onSuccess: () => {
      toast.success('Cập nhật thành công')
      setIsOpenEditModal(false)
      client.invalidateQueries([QUERY_KEY.GET_ALL_USER])
    },
    onError: () => {
      toast.error('Cập nhật thất bại')
    },
  })

  const onUpdateUser = (values: any, id: string) => {
    mutationUpdate.mutate({ role: values.role, id })
  }

  const columns = [
    {
      title: 'STT',
      align: 'center',
      width: 60,
      fixed: true,
      render: (__: any, _: any, index: number) => (
        <div>
          {!+(currentPage as string) || +(currentPage as string) === 1
            ? index + 1
            : +(currentPage as string) * perPage - perPage + 1 + index}
        </div>
      ),
    },
    {
      title: 'Tên user',
      dataIndex: 'name',
      align: 'center',
      width: '160px',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      width: '200px',
    },

    {
      title: 'Vai trò',
      dataIndex: 'role',
      align: 'center',
      width: '150px',
      render: (text: number) => {
        return renderRole(text)
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: '150px',
      render: (text: string) => (
        <div>{text ? moment(text).format('DD/MM/YYYY') : ''}</div>
      ),
      align: 'center',
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'updatedAt',
      width: '150px',
      align: 'center',
      render: (text: string) => (
        <div>{text ? moment(text).format('DD/MM/YYYY') : ''}</div>
      ),
    },
    {
      title: 'Hành động',
      fixed: 'right',
      key: 'action',
      align: 'center',
      width: 100,
      render: (_: any, record: any) => (
        <Space className="flex justify-center items-center">
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconDate} width={19} height={20} />}
            onClick={() => handleRecordUpdate(record)}
          ></Button>
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconEdit} width={22} height={20} />}
            onClick={() => handleEdit(record)}
          ></Button>
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconDelete} width={19} height={20} />}
            onClick={() => handleDelete(record?.id)}
          ></Button>
        </Space>
      ),
    },
  ]

  return (
    <div className={style.disableRrowTableCheckbox}>
      <Table
        className={style.disableRrowTableCheckbox}
        columns={columns as any}
        dataSource={dataSource}
        scroll={{ x: 1200 }}
        pagination={false}
        rowKey="id"
        loading={loading}
      />
      <ModalEditUser
        isModalOpen={isOpenEditModal}
        showModal={showModal}
        data={dataModal}
        onFinish={onUpdateUser}
      />

      <ModalBase
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
        onSave={onDelete}
        header="Xác nhận"
        content="Bạn có chắc chắn muốn xóa người dùng này?"
        footer={true}
      />
      <ModalRecordEffortMember
        isOpen={openModalUpdateRecord}
        setIsOpen={setOpenModalUpdateRecord}
        initialValues={initialValues}
        onFinish={onUpdateRecord}
      />
    </div>
  )
}

export default memo(TableUser)
