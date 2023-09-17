import { Table } from 'antd'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { URL } from '../../utils/constants/index'

type EditableTableProps = Parameters<typeof Table>[0]

interface IProps {
  dataTable?: any
  enteredDate?: any
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const TableResponsesCustomer = ({ dataTable, enteredDate }: IProps) => {
  const navigate = useNavigate()

  const handleViewCustomerResource = (
    resourceId: any,
    numberOfResponsed: any
  ) => {
    navigate(URL.VIEW_ALL_CUSTOMER_RESPONSED, {
      state: { enteredDate, resourceId, numberOfResponsed },
    })
  }

  const columns: any = [
    {
      title: 'Code nguồn',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      width: 70,
    },
    {
      title: 'Tên nguồn',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 150,
    },
    {
      title: 'Số case đã gửi',
      dataIndex: 'sent',
      key: 'sent',
      align: 'center',
      width: 100,
      render: (_: any, record: any) => {
        return <div>{record?.sent ? record?.sent : 0}</div>
      },
    },
    {
      title: 'Số case phản hồi',
      dataIndex: 'feedback',
      key: 'feedback',
      align: 'center',
      width: 100,
      render: (_: any, record: any) => {
        return (
          <div
            style={{
              cursor: 'pointer',
              color: record?.feedback > 0 ? '#02A7F0' : 'black',
              textDecoration: record?.feedback > 0 ? 'underline' : 'none',
            }}
            onClick={() =>
              handleViewCustomerResource(record?.id, record?.feedback)
            }
          >
            {record?.feedback ? record?.feedback : 0}
          </div>
        )
      },
    },
  ]

  return (
    <div className="flex gap-2 flex-col">
      <Table
        scroll={{ x: 750, y: 350 }}
        rowKey="id"
        bordered
        dataSource={dataTable}
        columns={columns as ColumnTypes}
        pagination={false}
      />
    </div>
  )
}

export default memo(TableResponsesCustomer)
