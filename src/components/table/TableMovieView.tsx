import { memo } from 'react'
import style from '@/common.module.scss'
import { renderDateStringDay } from '@/utils/helper'
import { Table } from 'antd'

const TableMovieView = ({ dataSource, loading }: any) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      align: 'center',
      width: 60,
      fixed: true,
      render: (__: any, _: any, index: number) => <div>{index + 1}</div>,
    },
    {
      title: 'ID phim',
      dataIndex: 'id',
      align: 'center',
      width: '130px',
    },

    {
      title: 'Tên phim',
      dataIndex: 'name',
      align: 'center',
      width: '230px',
    },

    {
      title: 'Thời gian phát hành',
      dataIndex: 'publish',
      align: 'center',
      width: '130px',
      render: (__: any, _: any) => (
        <div>{renderDateStringDay(_?.publish, '/')} </div>
      ),
    },

    {
      title: 'Số lượt xem',
      dataIndex: 'view',
      align: 'center',
      width: '140px',
      render: (__: any, _: any) => (
        <div>{Number(_?.view)?.toLocaleString()} </div>
      ),
    },

    {
      title: 'Điểm đánh giá trung bình',
      dataIndex: 'avg_rated',
      align: 'center',
      width: '150px',
    },
  ]

  // const htmlString = renderToString(
  //   <TableMovieView dataSource={dataSource} loading={loading} />
  // )

  // console.log('htmlString', htmlString)

  return (
    // <div className={style.disableRrowTableCheckbox}>
    <Table
      className={style.disableRrowTableCheckbox}
      rowClassName={style.removeRowSelected}
      columns={columns as any}
      dataSource={dataSource}
      scroll={{ x: 1100, y: 450 }}
      pagination={false}
      rowKey="id"
      loading={loading}
    />
    // </div>
  )
}

export default memo(TableMovieView)
