import { URL } from '@/utils/constants'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'

type EditableTableProps = Parameters<typeof Table>[0]

interface IProps {
  dataTable?: any
  pageSize?: number | any
  current?: number | any
  loading: boolean
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const TableViewInquiry = ({
  dataTable,
  pageSize,
  current,
  loading,
}: IProps) => {
  const navigate = useNavigate()

  const handleViewCustomerResource = (record: any) => {
    const newData = {
      id: record?.customersResourceId,
      name: record?.customersResourceName,
    }
    navigate(
      URL.CUSTOMER_OF_RESOURCE.concat(`/${record?.customersResourceId}`),
      {
        state: { data: { record: newData } },
      }
    )
  }

  const handleViewCustomer = (record: any) => {
    navigate(`${URL.VIEW_HISTORY}/${record?.customerId}`)
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
      title: 'Nguồn KH',
      dataIndex: 'customersResourceName',
      key: 'customersResourceName',
      align: 'center',
      width: 200,
      render: (_: any, record: any) => {
        return (
          <a
            className="underline"
            onClick={() => handleViewCustomerResource(record)}
          >
            {record?.customersResourceName ? record?.customersResourceName : ''}
          </a>
        )
      },
    },
    {
      title: 'Tên KH (JP)',
      dataIndex: 'customerName',
      key: 'customerName',
      align: 'center',
      width: 200,
      render: (_: any, record: any) => {
        if (record?.deleted)
          return (
            <label>{record?.customerName ? record?.customerName : ''}</label>
          )
        return (
          <a className="underline" onClick={() => handleViewCustomer(record)}>
            {record?.customerName ? record?.customerName : ''}
          </a>
        )
      },
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      width: 240,
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
    </div>
  )
}

export default TableViewInquiry
