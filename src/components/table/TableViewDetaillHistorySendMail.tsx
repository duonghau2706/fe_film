// import { useMutation, useQueryClient } from 'react-query'
import React, { memo, useState } from 'react'
import { Button, Space, Table } from 'antd'
import style from '@/common.module.scss'
import moment from 'moment'
import IconEdit from '@/assets/image/icon_edit.svg'
import { ModalUpdateStatusResponse } from '../modal'
import dayjs from 'dayjs'
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
  currentPage: any
  perPage: any
  loading: boolean
}

const TableViewDetaillHistorySendMail = ({
  dataSource,
  currentPage,
  perPage,
  loading,
}: IProps) => {
  const columns = [
    {
      title: 'STT',
      key: 'id',
      align: 'center',
      width: 60,
      fixed: true,
      ellipsis: true,
      render: (_: any, record: any, row: any) => {
        return <div>{perPage * (currentPage - 1) + (row + 1)}</div>
      },
    },
    {
      title: 'Người gửi',
      dataIndex: 'personInCharge',
      align: 'center',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Thời gian gửi',
      dataIndex: 'sendDate',
      align: 'center',
      width: 150,
      ellipsis: true,
      render: (text: string) => (
        <div>{text ? moment(text).format('DD/MM/YYYY') : ''}</div>
      ),
    },
    {
      title: 'Cách thức gửi',
      dataIndex: 'pregnancyStatusSending',
      align: 'center',
      width: 150,
      ellipsis: true,
      render: (text: number) => {
        let statusSending
        switch (text) {
          case 1:
            statusSending = 'Gửi mail'
            break
          case 2:
            statusSending = 'Gửi inquiry'
            break
          default:
            statusSending = ''
            break
        }
        return <span>{statusSending}</span>
      },
    },
    {
      title: 'Template được gửi',
      dataIndex: 'templateName',
      align: 'center',
      width: 200,
      ellipsis: true,
    },

    {
      title: 'Trạng thái gửi',
      dataIndex: 'status',
      align: 'center',
      width: 150,

      render: (text: string, record: any) => {
        let color
        switch (record?.status) {
          case 0:
            text = 'Đã gửi'
            color = 'text-green-primary'
            break
          case 2:
            text = 'Gửi lỗi'
            color = 'text-red-500'
            break
          case 1:
            text = 'Chưa gửi'
            color = 'text-yellow-500'
            break
          default:
            text = 'Gửi lỗi'
            color = 'text-red-500'
            break
        }
        return <span className={color}>{text}</span>
      },
    },

    {
      title: 'Lý do gửi lỗi',
      dataIndex: 'reasonSendMail',
      align: 'center',
      width: 180,
      ellipsis: true,
    },
    {
      title: 'Trạng thái phản hồi',
      dataIndex: 'statusFeedback',
      align: 'center',
      width: 200,
      render: (text: string) => {
        switch (text) {
          case '0':
            text = 'Không phản hồi'
            break
          case '1':
            text = 'Đã phản hồi '
            break
          default:
            text = ''
            break
        }
        return <span>{text}</span>
      },
    },
    {
      title: 'Ngày phản hồi',
      dataIndex: 'feedbackDate',
      align: 'center',
      width: 150,
      ellipsis: true,
      render: (text: string) => (
        <div>{text ? moment(text).format('DD/MM/YYYY') : ''}</div>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Space className="flex justify-center items-center">
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconEdit} width={22} height={20} />}
            onClick={() => handleEdit(record)}
          ></Button>
        </Space>
      ),
    },
  ]
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)

  const [initialValues, setInitialValues] = useState<any>({})

  const handleEdit = (record: any) => {
    setOpenModalEdit(true)
    const feedbackDate = record.feedbackDate
      ? dayjs(record?.feedbackDate, 'DD/MM/YYYY')
      : ''
    const data = { ...record, feedbackDate: feedbackDate }
    setInitialValues(data)
  }
  const handleOpenModalAdd = (value: boolean) => {
    setOpenModalEdit(value)
  }

  return (
    <div>
      <Table
        className={style.disableRrowTableCheckbox}
        columns={columns as any}
        bordered
        dataSource={dataSource}
        scroll={{ x: 1200 }}
        pagination={false}
        rowKey={'id'}
        loading={loading}
      />
      <ModalUpdateStatusResponse
        isOpen={openModalEdit}
        closeModal={handleOpenModalAdd}
        initialValues={initialValues}
      />
    </div>
  )
}

export default memo(TableViewDetaillHistorySendMail)
