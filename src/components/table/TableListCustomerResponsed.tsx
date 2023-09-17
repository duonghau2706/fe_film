import { Table } from 'antd'
import moment from 'moment'
import { memo } from 'react'

type EditableTableProps = Parameters<typeof Table>[0]

interface IProps {
  dataTable?: any
  pagination?: any
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const TableListCustomerResponsed = ({ dataTable, pagination }: IProps) => {
  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: 60,
      render: (_: any, record: any, row: any) => {
        return (
          <div>
            {pagination?.perPage * (pagination?.currentPage - 1) + (row + 1)}
          </div>
        )
      },
    },
    {
      title: 'Tên nguồn',
      dataIndex: 'source_name',
      key: 'source_name',
      align: 'center',
      width: 150,
    },
    {
      title: 'Tên KH (JP)',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center',
      width: 250,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: 200,
    },
    {
      title: 'Trạng thái phản hồi',
      dataIndex: 'status_feedback',
      key: 'status_feedback',
      align: 'center',
      width: 200,
    },
    {
      title: 'Thời gian phản hồi',
      dataIndex: 'feedback_date',
      key: 'feedback_date',
      align: 'center',
      width: 200,
      render: (text: string) => {
        return text ? moment(text).format('DD/MM/YYYY') : ''
      },
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
      />
    </div>
  )
}

export default memo(TableListCustomerResponsed)
