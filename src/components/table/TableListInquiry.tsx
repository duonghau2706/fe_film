import { Button, Space, Table } from 'antd'

import IconView from '@/assets/image/icon_view.svg'
import { URL } from '@/utils/constants'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

type EditableTableProps = Parameters<typeof Table>[0]

interface IProps {
  dataTable?: any
  pageSize?: number | any
  current?: number | any
  loading: boolean
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const TableListInquiry = ({
  dataTable,
  pageSize,
  current,
  loading,
}: IProps) => {
  const navigate = useNavigate()

  const handleViewTemplate = (value: any) => {
    navigate(URL.TEMPLATE.concat(`/${value}`), {
      state: { data: { id: value }, action: 'edit' },
    })
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
      title: 'Thời gian gửi',
      dataIndex: 'sendDate',
      key: 'sendDate',
      align: 'center',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <div>
            {record?.sendDate
              ? moment(record?.sendDate).format('DD/MM/YYYY')
              : ''}
          </div>
        )
      },
    },
    {
      title: 'Tên template',
      dataIndex: 'templateName',
      key: 'templateName',
      align: 'center',
      width: 300,
      render: (_: any, record: any) => {
        return (
          <a
            className="underline"
            onClick={() => handleViewTemplate(record?.templateId)}
          >
            {record?.templateName ? record?.templateName : ''}
          </a>
        )
      },
    },
    {
      title: 'Số lượng KH',
      dataIndex: 'countCustomer',
      key: 'countCustomer',
      align: 'center',
      width: 80,
      render: (_: any, record: any) => {
        return record?.countCustomer
          ? record?.countCustomer?.toLocaleString()
          : ''
      },
    },
    {
      title: 'Người gửi',
      dataIndex: 'sendBy',
      key: 'sendBy',
      align: 'center',
      width: 150,
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 90,
      fixed: 'right',
      render: (record: any) => (
        <Space className="flex justify-center items-center">
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconView} width={30} height={17} />}
            onClick={() => handleView(record)}
          ></Button>
        </Space>
      ),
    },
  ]

  const handleView = (record: any) => {
    navigate(URL.INQUIRY.concat(`/${record?.id}`), {
      state: { data: record },
    })
  }

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

export default TableListInquiry
