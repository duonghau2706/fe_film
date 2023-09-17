// import { useMutation, useQueryClient } from 'react-query'
import React, { memo } from 'react'
import { Table } from 'antd'
import style from '@/common.module.scss'
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
}

const TableErrorSendMail = ({ dataSource }: IProps) => {
  const columns = [
    {
      title: 'No.',
      key: 'id',
      align: 'center',
      width: '100px',
      ellipsis: true,
      render: (__: any, _: any, index: number) => <div>{index + 1}</div>,
    },
    {
      title: 'Tên KH (JP)',
      dataIndex: 'customerName',
      align: 'center',
      width: '200px',
      ellipsis: true,
    },
    {
      title: 'Nguyên nhân',
      dataIndex: 'reasonSendMail',
      align: 'center',
      width: '150px',
      render: (text: any) => {
        return text != '' ? (
          <span className="font-semibold text-red-300">{text}</span>
        ) : (
          <span className="font-semibold text-green-primary">
            Email đã thêm vào hàng đợi và trong trạng thái đang gửi
          </span>
        )
      },
    },
  ]

  return (
    <Table
      className={style.disableRrowTableCheckbox}
      columns={columns as any}
      bordered
      dataSource={dataSource}
      scroll={{ y: 350 }}
      pagination={false}
      rowKey={'id'}
    />
  )
}

export default memo(TableErrorSendMail)
