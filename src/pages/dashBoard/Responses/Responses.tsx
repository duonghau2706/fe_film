// import BasicTable from '../../Table/TableResponses'
import { Col, DatePicker, Row } from 'antd'
import { useState } from 'react'

const { RangePicker } = DatePicker

import dashBoardApi from '@/adapter/dashboard'
import DoughnutChart from '@/components/charts/DoughnutChart'
import { TableResponsesCustomer } from '@/components/table'
import { QUERY_KEY } from '@/utils/constants'
import { cleanObj } from '@/utils/helper'
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  SubTitle,
  Tooltip,
} from 'chart.js'
import moment from 'moment'
import { useQuery } from 'react-query'

ChartJS.register(ArcElement, Tooltip, Legend, SubTitle)

const Responses = () => {
  //Date onChange
  const [enteredDate, setEnteredDate] = useState<{
    start: any
    end: any
  }>({
    start: undefined,
    end: undefined,
  })

  const dateChangeHandler: any = (_: any, dateStrings: any) => {
    const start = dateStrings?.[0]
      ? moment(dateStrings?.[0], 'DD/MM/YYYY').format('YYYY-MM-DD')
      : ''
    const end = dateStrings?.[1]
      ? moment(dateStrings?.[1], 'DD/MM/YYYY').format('YYYY-MM-DD')
      : ''
    setEnteredDate({ start, end })
  }

  //call api
  const [dataDashBoardResponses, setDataDashBoardResponses] = useState<{
    totalResponses: number
    successfulResponses: number
    successfulCases: number
    table: []
  }>()

  useQuery({
    queryKey: [QUERY_KEY.GET_DASHBOARD_RESPONSES, enteredDate],
    queryFn: () => {
      const filteredValues = cleanObj(enteredDate)

      const startDate = filteredValues?.start

      const endDate = filteredValues?.end

      dashBoardApi
        .get_by_date_response({ startDate, endDate })
        .then((res: any) => {
          const totalResponses =
            Number(res?.data?.data?.responses?.[0]?.total) || 0

          const successfulResponses =
            Number(res?.data.data.responses[0].responsed) || 0

          const table = res?.data?.data?.table || []
          const successfulCases = Number(res?.data.data.cases[0].sent) || 0

          setDataDashBoardResponses({
            totalResponses,
            successfulResponses,
            successfulCases,
            table,
          })
        })
    },
  })

  const successfulCases = dataDashBoardResponses?.successfulCases || 0
  // const totalResponses = dataDashBoardResponses?.totalResponses || 0
  const successfulResponses = dataDashBoardResponses?.successfulResponses || 0
  const table = dataDashBoardResponses?.table || []

  const responsed = successfulCases
    ? Math.round(((successfulResponses * 100) / successfulCases) * 100) / 100
    : 0

  const UnResponsed = 100 - responsed

  const dataRes = [
    { name: 'Đã phản hồi', value: responsed || 0 },
    { name: 'Không phản hồi', value: UnResponsed || 100 },
  ]

  return (
    <section className="flex flex-col bg-white rounded-[5px] overflow-hidden pt-6 mt-6 pl-8 pr-4 pb-4">
      <header className="flex justify-between items-center pb-4">
        <span className="font-medium font-inherit text-[#333333] text-[24px]">
          Thống kê số lượng phản hồi
        </span>
        <div className="flex justify-between gap-[15px]">
          <div className="flex gap-4 item-center">
            <label className="mt-[3px] text-sm">Thời gian</label>
            <RangePicker
              onChange={dateChangeHandler}
              format={'DD/MM/YYYY'}
              placeholder={['Từ ngày', 'Đến ngày']}
            />
          </div>
        </div>
      </header>

      <Row gutter={80}>
        <Col span={8} className="flex justify-center items-center">
          <DoughnutChart data={dataRes} responsed={responsed} type="res" />
        </Col>
        <Col span={16}>
          <TableResponsesCustomer dataTable={table} enteredDate={enteredDate} />
        </Col>
      </Row>
    </section>
  )
}

export default Responses
