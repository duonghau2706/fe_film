import { URL } from '@/utils/constants'
import { Button, Space, Table } from 'antd'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import style from '@/common.module.scss'
import IconEdit from '@/assets/image/icon_edit.svg'
import IconView from '@/assets/image/icon_view.svg'
import IconClock from '@/assets/image/u296.svg'
import moment from 'moment'
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
  rowSelection: any
  perPage: number
  currentPage: number
  loading: boolean
}

const TableCustomer = ({
  dataSource,
  rowSelection,
  perPage,
  currentPage,
  loading,
}: IProps) => {
  const navigate = useNavigate()

  const handleView = (id: any) =>
    navigate(`${URL.FORM_CUSTOMER}/${id}`, {
      state: { action: 'view' },
    })

  const handleViewDetailHistory = (customerId: any) =>
    navigate(`${URL.VIEW_HISTORY}/${customerId}`)

  const handleEdit = (id: any) => {
    navigate(`${URL.FORM_CUSTOMER}/${id}`, {
      state: { action: 'edit' },
    })
  }

  const columns = [
    {
      title: 'STT',
      key: 'id',
      align: 'center',
      width: 100,
      fixed: true,
      render: (_: any, record: any, row: any) => {
        return (
          <div>
            {(perPage * (currentPage - 1) + (row + 1))?.toLocaleString()}
          </div>
        )
      },
    },
    {
      title: 'Nguồn khách hàng',
      dataIndex: 'customerResource',
      align: 'center',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Tên KH',
      dataIndex: 'name',
      align: 'center',
      width: '240px',
      ellipsis: true,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      align: 'center',
      width: '240px',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      width: '240px',
      ellipsis: true,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      align: 'center',
      width: '150px',
      render: (text: string) => {
        switch (text) {
          case '1':
            text = 'IT'
            break
          case '0':
            text = 'Non-IT'
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
      width: '240px',
      ellipsis: true,
    },

    {
      title: 'Trụ sở',
      dataIndex: 'address',
      align: 'center',
      width: '240px',
      ellipsis: true,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      align: 'center',
      width: '150px',
      ellipsis: true,
      render: (text: any) => {
        return text ? numeral(text).format('0,0') : ''
      },
    },
    {
      title: 'Vốn đầu tư',
      dataIndex: 'investment',
      align: 'center',
      width: '150px',
      ellipsis: true,
      render: (text: any) => {
        return text ? numeral(text).format('0,0') : ''
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
      title: 'Lý do blacklist',
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
      title: 'Người phụ trách',
      dataIndex: 'userName',
      align: 'center',
      width: '200px',
      ellipsis: true,
    },

    {
      title: 'Tần suất gửi',
      dataIndex: 'frequencyOfEmail',
      align: 'center',
      width: '160px',
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
      title: 'Ngày gửi gần nhất',
      dataIndex: 'sendDate',
      width: '160px',
      ellipsis: true,
      render: (text: string) => (
        <div>{text ? moment(text).format('DD/MM/YYYY') : ''}</div>
      ),

      align: 'center',
    },
    {
      title: 'Trạng thái gửi',
      dataIndex: 'statusSend',
      align: 'center',
      width: '160px',
      ellipsis: true,
      render: (text: string) => {
        return text === 'Chưa gửi' ? (
          <span className="font-semibold text-yellow-500">{text}</span>
        ) : text === 'Gửi lỗi' ? (
          <span className="font-semibold text-red-300">{text}</span>
        ) : (
          <span className="font-semibold text-green-primary">{text}</span>
        )
      },
    },

    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 160,
      fixed: 'right',
      render: (_: any, record: any) => (
        <Space className="flex justify-center items-center">
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconClock} width={25} height={20} />}
            onClick={() => handleViewDetailHistory(record.id)}
          ></Button>
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconView} width={30} height={17} />}
            onClick={() => handleView(record.id)}
          ></Button>
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconEdit} width={22} height={20} />}
            onClick={() => handleEdit(record.id)}
          ></Button>
        </Space>
      ),
    },
  ]

  return (
    <div className={style.removeRowSelected}>
      <Table
        rowSelection={rowSelection}
        columns={columns as any}
        dataSource={dataSource}
        scroll={{ x: 1200 }}
        pagination={false}
        bordered
        rowClassName={style.removeRowSelected}
        rowKey="id"
        loading={loading}
      />
    </div>
  )
}

export default memo(TableCustomer)
