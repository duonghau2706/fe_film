import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Column } from '@ant-design/plots'
import { Empty } from 'antd'
function ChartLine({ dataTotalPerformance }: any) {
  const data = dataTotalPerformance?.map((item: any) => {
    return {
      type: item.name_user,
      value: parseFloat(item.performance) ? parseFloat(item.performance) : 0,
    }
  })

  const config: any = {
    data,
    xField: 'type',
    yField: 'value',
    seriesField: '',
    legend: false,
    columnWidthRatio: 0.2,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    interactions: [{ type: 'element-highlight' }],
    tooltip: { shared: true },
  }
  const options: any = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: { position: 'none' },
    bar: { groupWidth: '20%' },
  }

  const iconStyle = { fontSize: '24px' }
  // đã sửa lại đoạn này ngày 17/08/2023
  const hasNonZeroData = data.some((item: any) => item.value !== 0)
  return hasNonZeroData && hasNonZeroData ? (
    <div className="w-[80%] h-[40vh] bg-white mt-10 my-0 mx-auto border-none">
      <Column {...config} options={options} />
    </div>
  ) : (
    <div className="w-[80%] h-[40vh] bg-white mt-10 my-0 mx-auto border-none z-40 flex flex-row justify-center items-center">
      <div className="w-full text-center ">
        <Empty
          description="Không có dữ liệu"
          image={<ExclamationCircleOutlined />}
          style={iconStyle}
        />
      </div>
    </div>
  )
}
export default ChartLine
