import style from '@/common.module.scss'
import { Table } from 'antd'
import { memo } from 'react'

const TableUser = ({ dataSource, loading }: any) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      align: 'center',
      width: '60px',
      fixed: true,
      render: (__: any, _: any, index: number) => <div>{index + 1}</div>,
    },
    {
      title: 'ID thành viên',
      dataIndex: 'user_id',
      align: 'center',
      width: '150px',
    },

    {
      title: 'Tên thành viên',
      dataIndex: 'name',
      align: 'center',
      width: '140px',
    },

    {
      title: 'Số lượng giao dịch',
      dataIndex: 'number_of_trans',
      align: 'center',
      width: '80px',
      render: (row: any, record: any) => (
        <div className="text-blue-primary underline cursor-pointer">
          {Number(record?.number_of_trans) || 0}
        </div>
      ),
    },

    {
      title: 'Số tiền thanh toán',
      dataIndex: 'revenue',
      align: 'center',
      width: '150px',
      render: (row: any, record: any) => (
        <div>{Number(record?.revenue).toLocaleString() || 0}</div>
      ),
    },
  ]

  return (
    <div className={style.disableRrowTableCheckbox}>
      <Table
        className={style.disableRrowTableCheckbox}
        columns={columns as any}
        dataSource={dataSource}
        loading={loading}
        scroll={{ x: 1200 }}
        pagination={false}
        rowKey="id"
      />
    </div>
  )
}

export default memo(TableUser)
