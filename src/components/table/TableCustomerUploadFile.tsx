// import { useMutation, useQueryClient } from 'react-query'
import React, { memo } from 'react'
import { Table } from 'antd'
import style from '@/common.module.scss'
import numeral from 'numeral'
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
  loading: boolean
}

const TableCustomerUploadFile = ({ dataSource, loading }: IProps) => {
  const columns = [
    {
      title: 'STT',
      key: 'no',
      dataIndex: 'no',
      align: 'center',
      width: 80,
      fixed: true,
      ellipsis: true,
      render: (text: number) => {
        return <span>{text}</span>
      },
    },
    {
      title: 'Tên nguồn',
      dataIndex: 'customerResourceName',
      align: 'center',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Tên KH (JP)',
      dataIndex: 'name',
      align: 'center',
      width: '200px',
      ellipsis: true,
    },
    {
      title: 'Tên KH (Romanji)',
      dataIndex: 'romajiName',
      align: 'center',
      width: '200px',
      ellipsis: true,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      align: 'center',
      width: '200px',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      width: '200px',
      ellipsis: true,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      align: 'center',
      width: '150px',
      ellipsis: true,
      render: (text: string) => {
        switch (text) {
          case '0':
            text = 'Non-IT'
            break
          case '1':
            text = 'IT'
            break
          default:
            break
        }
        return <span>{text}</span>
      },
    },
    {
      title: 'Size công ty',
      dataIndex: 'size',
      align: 'center',
      width: '150px',
      ellipsis: true,
      render: (text: string) => {
        switch (text) {
          case '0':
            text = 'Nhỏ'
            break
          case '1':
            text = 'Trung bình '
            break
          case '2':
            text = 'To'
            break
          default:
            break
        }
        return <span>{text}</span>
      },
    },
    {
      title: 'Lĩnh vực',
      dataIndex: 'fieldName',
      align: 'center',
      width: '150px',
      ellipsis: true,
    },
    {
      title: 'Trụ sở',
      dataIndex: 'address',
      align: 'center',
      width: '250px',
      ellipsis: true,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      align: 'center',
      width: '150px',
      ellipsis: true,
      render: (text: any) => {
        return typeof text === 'number' ? numeral(text).format('0,0') : text
      },
    },
    {
      title: 'Vốn đầu tư',
      dataIndex: 'investment',
      align: 'center',
      width: '150px',
      ellipsis: true,
      render: (text: any) => {
        return typeof text === 'number' ? numeral(text).format('0,0') : text
      },
    },

    {
      title: 'Phân loại khách hàng',
      dataIndex: 'typeOfCustomer',
      align: 'center',
      width: '200px',
      ellipsis: true,
      render: (text: string) => {
        switch (text) {
          case '1':
            text = 'Normal'
            break
          case '2':
            text = 'Black list'
            break
          case '3':
            text = 'Special'
            break
          default:
            break
        }
        return <span>{text}</span>
      },
    },
    {
      title: 'Lý do Blacklist',
      dataIndex: 'reason',
      align: 'center',
      width: '200px',
      ellipsis: true,
      render: (text: string) => {
        switch (text) {
          case '1':
            text = 'Lỗi (HP,địa chỉ email)'
            break
          case '2':
            text = 'Kotowari (từ chối nhận liên lạc)'
            break
          case '3':
            text = 'Có thể khai thác lại'
            break
          case '4':
            text = 'Công ty đối thủ'
            break
          case '5':
            text =
              'Không thuộc đối tượng (size quá nhỏ, công ty trung gian,.v..v)'
            break
          case '6':
            text = 'Others'
            break
          default:
            break
        }
        return <span>{text}</span>
      },
    },
    {
      title: 'Tần suất gửi',
      dataIndex: 'frequencyOfEmail',
      align: 'center',
      width: '200px',
      ellipsis: true,
      render: (text: string) => {
        switch (text) {
          case '1':
            text = 'Hàng tuần'
            break
          case '2':
            text = 'Hàng tháng'
            break
          case '3':
            text = '2 tháng/lần'
            break
          case '4':
            text = '3 tháng/lần'
            break
          case '5':
            text = '6 tháng/lần'
            break

          default:
            break
        }
        return <span>{text}</span>
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      align: 'center',
      width: '200px',
      ellipsis: true,
    },
    {
      title: 'Nguyên nhân',
      dataIndex: 'errMsg',
      align: 'center',
      width: '150px',
      fixed: 'right',

      render: (text: any) => {
        return <span className="font-semibold text-gray-700">{text}</span>
      },
    },

    {
      title: 'Trạng thái Import',
      dataIndex: 'errMsg',
      align: 'center',
      width: '150px',
      fixed: 'right',
      ellipsis: true,
      render: (text: any, record: any) => {
        return record?.oldId ? (
          record.errMsg ? (
            <span className="text-red-300">Thất bại</span>
          ) : (
            <span className="text-green-primary">Thành công</span>
          )
        ) : (
          <span className="text-green-primary"></span>
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
      scroll={{ x: 1200, y: 350 }}
      pagination={{ defaultPageSize: 200 }}
      rowKey={'id'}
      loading={loading}
    />
  )
}

export default memo(TableCustomerUploadFile)
