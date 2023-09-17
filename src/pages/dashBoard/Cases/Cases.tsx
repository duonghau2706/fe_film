import Cards from './Cards'

import logo_failedCases from '@/assets/image/logo_failedCases.png'
import logo_successfulCases from '@/assets/image/logo_successfulCases.png'
import logo_totalCases from '@/assets/image/logo_totalCases.png'

import { QUERY_KEY } from '@/utils/constants'
import { DatePicker, Form } from 'antd'
import { Dayjs } from 'dayjs'
import { useState } from 'react'

const { RangePicker } = DatePicker

import dashBoardApi from '@/adapter/dashboard'
import DoughnutChart from '@/components/charts/DoughnutChart'
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  SubTitle,
  Title,
  Tooltip,
} from 'chart.js'
import { useQuery } from 'react-query'

ChartJS.register(ArcElement, Tooltip, Legend, SubTitle, Title)

const Cases = () => {
  //Date onChange
  const [enteredDate, setEnteredDate] = useState<{
    start: Dayjs | undefined
    end: Dayjs | undefined
  }>({
    start: undefined,
    end: undefined,
  })

  const dateChangeHandler: any = (dates: [Dayjs, Dayjs]) => {
    // Lấy các giá trị ngày tháng được chọn
    const enteredStartDate = dates?.[0]
    const enteredEndDate = dates?.[1]

    setEnteredDate({ start: enteredStartDate, end: enteredEndDate })
  }

  //call api
  const [dataDashBoardCases, setDataDashBoardCases] = useState<{
    totalCases: number
    successfulCases: number
  }>()

  useQuery({
    queryKey: [QUERY_KEY.GET_DASHBOARD_CASES, enteredDate],
    queryFn: () => {
      const startDate = enteredDate.start?.format('YYYY-MM-DD')
      const endDate = enteredDate.end?.format('YYYY-MM-DD')

      dashBoardApi.get_by_date_case({ startDate, endDate }).then((res: any) => {
        const totalCases = Number(res?.data?.data?.cases?.[0]?.total) || 0
        const successfulCases = Number(res?.data?.data?.cases?.[0]?.sent) || 0

        setDataDashBoardCases({
          totalCases,
          successfulCases,
        })
      })
    },
  })

  const totalCases = dataDashBoardCases?.totalCases || 0
  const successfulCases = dataDashBoardCases?.successfulCases || 0

  const CARDS: {
    img: any
    description: string
    value: number
    valueColor: string
    percent: number | undefined
    sizeImg: number
  }[] = [
    {
      img: logo_totalCases,
      description: 'Tổng số case gửi',
      value: totalCases,
      valueColor: '#015478',
      percent: undefined,
      sizeImg: 50,
    },
    {
      img: logo_successfulCases,
      description: 'Số case gửi thành công',
      value: successfulCases,
      valueColor: '#03B615',
      percent: totalCases
        ? Math.round(((successfulCases * 100) / totalCases) * 100) / 100
        : 0,
      sizeImg: 50,
    },
    {
      img: logo_failedCases,
      description: 'Số case gửi thất bại',
      value: totalCases ? totalCases - successfulCases : 0,
      valueColor: '#D9001B',
      percent: totalCases
        ? Math.round((100 - (successfulCases * 100) / totalCases) * 100) / 100
        : 0,
      sizeImg: 52,
    },
  ]

  const newCards = CARDS.filter((card) => card.percent !== undefined)

  const dataChart = [
    { name: 'Gửi thành công', value: newCards?.[0]?.value },
    { name: 'Gửi thất bại', value: newCards?.[1]?.value },
  ]

  return (
    <section className="flex flex-col bg-[#ffffff] rounded-[5px] pl-8 pt-6 pr-4 mt-6">
      <header className="flex justify-between items-center pb-4">
        <span className="font-medium font-inherit text-[#333333] text-[24px]">
          Tổng số case đã gửi
        </span>
        <div className="flex justify-between gap-[15px]">
          <Form>
            <Form.Item className="w-full" name="resourceId" label="Thời gian">
              <RangePicker
                className="w-full"
                onChange={dateChangeHandler}
                format={'DD/MM/YYYY'}
                placeholder={['Từ ngày', 'Đến ngày']}
              />
            </Form.Item>
          </Form>
        </div>
      </header>

      <main className="flex">
        <Cards cards={CARDS} />
        <DoughnutChart
          data={dataChart}
          color={['#00B050', '#FF0000']}
          type="case"
          totalCases={totalCases}
        />
      </main>
    </section>
  )
}
export default Cases
