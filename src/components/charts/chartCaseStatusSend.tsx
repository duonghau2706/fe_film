import React from 'react'
import '@/index.css'
import { Column } from '@ant-design/plots'
export default function ChartBar({ arrayStatus }: any) {
  const data2 = arrayStatus[0]
  const data3 = arrayStatus[1]
  const data4 = arrayStatus[2]
  const data = [
    {
      type: 'Đã Gửi',
      value: parseInt(data2) ? parseInt(data2) : 0,
    },
    {
      type: 'Chưa Gửi',
      value: parseInt(data3) ? parseInt(data3) : 0,
    },
    {
      type: 'Gửi Lỗi',
      value: parseInt(data4) ? parseInt(data4) : 0,
    },
  ]
  const bg_red = 'rgba(255, 99, 132, 0.8)'
  const bg_green = 'rgba(255, 165, 0, 0.8)'
  const bg_blue = 'rgba(0, 204, 102, 0.8)'
  const config: any = {
    data,
    xField: 'type',
    yField: 'value',
    columnWidthRatio: 0.3,
    color: ({ type }: any) => {
      if (type === 'Đã Gửi') {
        return bg_blue
      }
      if (type === 'Chưa Gửi') {
        return bg_green
      }
      return bg_red
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      min: 0,
    },
    colorField: 'color',
    meta: {
      type: {
        alias: 'Số liệu',
      },
      sales: {
        alias: 'Tổng số',
      },
    },
    interactions: [{ type: 'element-highlight' }],
    tooltip: { shared: true },
  }
  return (
    <div className="w-[40%] h-[45vh] bg-white items-start mr-[10px] rounded-[5px]">
      <h2 className="pl-8 pt-6 pb-4">Thống kê khách hàng theo trạng thái</h2>
      <div className="w-[90%] h-[90%] my-0 mx-auto pb-8">
        <Column {...config} className="w-full h-[100%]" />
      </div>
    </div>
  )
}
