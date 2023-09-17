import { Table } from 'antd'
import moment from 'moment'
import { memo } from 'react'

type EditableTableProps = Parameters<typeof Table>[0]

interface IProps {
  dataTable?: any
  pageSize?: any
  current?: any
  loading?: boolean
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const TableHistorySendMail = ({
  dataTable,
  pageSize,
  current,
  loading,
}: IProps) => {
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
      title: 'Người gửi',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
      width: 200,
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'sendDate',
      key: 'sendDate',
      align: 'center',
      width: 200,
      render: (_: any, record: any) => {
        return record?.sendDate
          ? moment(record?.sendDate).format('DD/MM/YYYY')
          : ''
      },
    },
    {
      title: 'Cách thức gửi',
      dataIndex: 'pregnancyStatusSending',
      key: 'pregnancyStatusSending',
      align: 'center',
      width: 200,
      render: (_: any, record: any) => {
        return record?.pregnancyStatusSending === 1
          ? 'Gửi mail'
          : record?.pregnancyStatusSending === 2
          ? 'Gửi inquiry'
          : ''
      },
    },
    {
      title: 'Template',
      dataIndex: 'templateName',
      key: 'templateName',
      align: 'center',
      width: 200,
    },
    {
      title: 'Trạng thái gửi',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 200,
      render: (_: any, record: any) => {
        return <div>{renderStatusSend(record)}</div>
      },
    },
    {
      title: 'Trạng thái phản hồi',
      dataIndex: 'statusFeedback',
      key: 'statusFeedback',
      align: 'center',
      width: 200,
      render: (_: any, record: any) => {
        return <div>{renderStatusResponse(record)}</div>
      },
    },
    {
      title: 'Ngày phản hồi',
      dataIndex: 'feedbackDate',
      key: 'feedbackDate',
      align: 'center',
      width: 150,
      render: (_: any, record: any) => {
        return record?.feedbackDate
          ? moment(record?.feedbackDate).format('DD/MM/YYYY')
          : ''
      },
    },
  ]

  const renderStatusResponse = (record: any) => {
    switch (record?.statusFeedback) {
      case '0':
        return 'Không phản hồi'
      case '1':
        return <div className="text-green-primary">Đã phản hồi</div>
      default:
        return ''
    }
  }

  const renderStatusSend = (record: any) => {
    switch (record?.status) {
      case 0:
        return <div className="text-green-primary">Đã gửi</div>
      case 1:
        return 'Chưa gửi'
      case 2:
        return <div className="text-red-primary">Gửi lỗi</div>
      default:
        return ''
    }
  }

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
    </div>
  )
}

export default memo(TableHistorySendMail)
