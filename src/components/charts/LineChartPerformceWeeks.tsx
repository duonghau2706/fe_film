import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Empty } from 'antd'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
    },
  },
}
function LineChart({ dataTotalPerformance }: any) {
  const data2 = dataTotalPerformance?.map((item: any) => [
    item.week_of_month,
    parseFloat(item.performance),
  ])
  const labels = data2.map((item: any) => `Tuần ${item[0]}`)
  const data = {
    labels,
    datasets: [
      {
        label: 'Thống kê hiệu suất theo tuần',
        data: data2.map((item: any) => parseFloat(item[1])),
        borderColor: 'blue',
        backgroundColor: 'orange',
      },
    ],
  }
  const iconStyle = { fontSize: '24px' }
  return (
    <div className="w-full h-[50vh] bg-white mt-10 ">
      {data2 && data2.length > 0 ? (
        <Line
          options={options}
          data={data}
          className="w-[80%] h-[50vh] my-0 mx-auto"
        />
      ) : (
        <div className="w-full h-[50vh] text-center flex justify-center items-center">
          {' '}
          <Empty
            description="Không có dữ liệu"
            image={<ExclamationCircleOutlined />}
            style={iconStyle}
          />
        </div>
      )}
    </div>
  )
}

export default LineChart
