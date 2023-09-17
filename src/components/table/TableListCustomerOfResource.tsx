import { URL } from '@/utils/constants'
import { Table } from 'antd'
import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalHistorySendMail } from '../modal'
import moment from 'moment'

type EditableTableProps = Parameters<typeof Table>[0]

interface IProps {
  dataTable?: any
  pagination?: any
  idCustomerResource: string
  dataSearch: any
  loading: boolean
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const TableListCustomerOfResource = ({
  dataTable,
  pagination,
  idCustomerResource,
  dataSearch,
  loading,
}: IProps) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [dataView, setDataView] = useState<any>()

  const handleOpenModal = (record: any) => {
    setOpenModal(true)
    setDataView(record)
  }

  const handleViewCustomer = (record: any) => {
    navigate(`${URL.FORM_CUSTOMER}/${record?.customerId}`, {
      state: { action: 'view' },
    })
  }

  const renderFrequencyOfEmail = (text: string) => {
    switch (text) {
      case '1':
        return 'Hàng tuần'
      case '2':
        return 'Hàng tháng'
      case '3':
        return '2 tháng/lần'
      case '4':
        return '3 tháng/lần'
      case '5':
        return '6 tháng/lần'
    }
  }

  const renderStatusSend = (record: any) => {
    switch (record) {
      case 'Đã gửi':
        return <div className="text-green-primary">{record}</div>
      case 'Chưa gửi':
        return <div>{record}</div>
      case 'Gửi lỗi':
        return <div className="text-red-primary">{record}</div>
      default:
        return ''
    }
  }

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: 100,
      render: (_: any, record: any, row: any) => {
        return (
          <div>
            {(
              pagination?.perPage * (pagination?.currentPage - 1) +
              (row + 1)
            ).toLocaleString()}
          </div>
        )
      },
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 200,
      render: (_: any, record: any) => {
        if (record?.deleted) return <div>{record?.name}</div>
        return (
          <a className="underline" onClick={() => handleViewCustomer(record)}>
            {record?.name}
          </a>
        )
      },
    },
    {
      title: 'Tên khách hàng (Romanji)',
      dataIndex: 'romajiName',
      key: 'romajiName',
      align: 'center',
      width: 200,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      width: 200,
    },
    {
      title: 'Tần suất gửi',
      dataIndex: 'frequencyOfEmail',
      key: 'frequencyOfEmail',
      align: 'center',
      width: 150,
      render: (text: string) => {
        return renderFrequencyOfEmail(text)
      },
    },
    {
      title: 'Số lần gửi',
      dataIndex: 'sentCount',
      key: 'sentCount',
      align: 'center',
      width: 120,
      render: (text: string, record: any) => {
        return (
          <a className="underline" onClick={() => handleOpenModal(record)}>
            {text ? Number(text)?.toLocaleString() : 0}
          </a>
        )
      },
    },
    {
      title: 'Số lần phản hồi',
      dataIndex: 'feedbackCount',
      key: 'feedbackCount',
      align: 'center',
      width: 150,
      render: (text: string, record: any) => {
        return (
          <a className="underline" onClick={() => handleOpenModal(record)}>
            {text ? Number(text)?.toLocaleString() : 0}
          </a>
        )
      },
    },
    {
      title: 'Ngày gửi gần nhất',
      dataIndex: 'sendDate',
      key: 'sendDate',
      align: 'center',
      width: 180,
      render: (text: string) => {
        return text ? moment(text).format('DD/MM/YYYY') : ''
      },
    },
    {
      title: 'Trạng thái gửi',
      dataIndex: 'statusSend',
      key: 'statusSend',
      align: 'center',
      width: 140,
      render: (text: string) => {
        return renderStatusSend(text)
      },
    },
    {
      title: 'Người phụ trách',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
      width: 180,
    },
  ]

  return (
    <div className="flex gap-2 flex-col">
      <Table
        scroll={{ x: 1200 }}
        rowKey="id"
        bordered
        dataSource={dataTable}
        columns={columns as ColumnTypes}
        pagination={false}
        loading={loading}
      />

      <ModalHistorySendMail
        isOpen={openModal}
        setIsOpen={setOpenModal}
        header="Lịch sử gửi"
        dataView={dataView}
        startDate={dataSearch?.startDate}
        endDate={dataSearch?.endDate}
        idCustomerResource={idCustomerResource}
      />
    </div>
  )
}

export default memo(TableListCustomerOfResource)
