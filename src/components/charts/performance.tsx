import { getTotalCase } from '@/adapter'
import useToken from '@/hook/token'
import '@/index.css'
import { QUERY_KEY } from '@/utils/constants'
import { Button, DatePicker, Form, Radio, Select, Space } from 'antd'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import ChartLine from './ChartLinePerformance'
import LineChart from './LineChartPerformceWeeks'
import { useForm } from 'antd/es/form/Form'

const { RangePicker } = DatePicker
function Perform({ dataListUserId }: any) {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const [userID, setUserID] = useState<any>(decode?.id)
  const firstDayOfMonth = dayjs().startOf('month')
  const lastDayOfMonth = dayjs().endOf('month')
  const [startDate, setStartDate] = useState<any>(firstDayOfMonth)
  const [endDate, setEndDate] = useState<any>(lastDayOfMonth)
  const [, setdataTotalPerformance] = useState<any>([])
  const [, setdataTotalPerformanceWeek] = useState<any>([])

  const queryClient = useQueryClient()
  const [selectChoose, setSelectChoose] = useState(1)

  const [form] = useForm()

  // gọi lại api khi thay đổi
  const handleDateRangeChange = (dates: any) => {
    if (dates) {
      const [start, end] = dates
      setStartDate(start)
      setEndDate(end)
      queryClient.invalidateQueries([QUERY_KEY.GET_PERFORMANCE_USER, dates])
    }
  }
  const { data: dataTotalPerformance = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_PERFORMANCE_USER, startDate, endDate],
    queryFn: async () => {
      const res = await getTotalCase.totalPerformanceStatus({
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      })
      const result1 = res?.data || []
      const dataListUser1 = result1.map((item: any) => {
        return {
          user_id: item.user_id,
          name_user: item.name_user,
          performance: item.performance,
        }
      })
      const dataListUser = dataListUser1

      return dataListUser
    },
  })
  const { data: dataTotalPerformanceWeek = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_LIST_PERFORMANCE_USER, userID, startDate, endDate],
    queryFn: async () => {
      const res = await getTotalCase.listUserPerformance({
        userID,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      })
      const dataListUserWeek = res?.data?.map((item: any) => {
        return {
          performance: item.performance,
          user_id: item.user_id,
          week_of_month: item.week_of_month,
        }
      })
      return dataListUserWeek
    },
  })

  const handlerChange = (e: any) => {
    setSelectChoose(e.target.value)
  }

  const handleChooseValue = () => {
    if (selectChoose === 2) {
      const userId = form.getFieldValue('chooseUser')
      setUserID(userId)
    }
  }
  useEffect(() => {
    queryClient.invalidateQueries([
      QUERY_KEY.GET_PERFORMANCE_USER,
      startDate,
      endDate,
    ])
  }, [startDate, endDate, queryClient])

  useEffect(() => {
    queryClient.invalidateQueries([
      QUERY_KEY.GET_LIST_PERFORMANCE_USER,
      userID,
      startDate,
      endDate,
    ])
  }, [userID, startDate, endDate, queryClient])

  useEffect(() => {
    if (dataTotalPerformance?.data?.result) {
      setdataTotalPerformance(dataTotalPerformance.data.result)
    }
  }, [dataTotalPerformance?.data?.result])

  useEffect(() => {
    if (dataTotalPerformanceWeek?.data?.result) {
      setdataTotalPerformanceWeek(dataTotalPerformanceWeek.data.result)
    }
  }, [dataTotalPerformanceWeek?.data?.result])
  return (
    <div className="w-full mt-6 mx-auto bg-white rounded-[5px]">
      <h2 className="text-start pl-8 pt-6 pb-4">
        Thống kê hiệu suất của member
      </h2>
      <div className="w-full h-[5px] flex flex-row items-center justify-evenly py-[30px] pl-8 px-4">
        <div className="w-full h-[70px] leading-[70px] p-0.5 md:p-x-10  border-[1px] border-solid border-black flex flex-row items-center justify-evenly">
          <span>Thời gian:</span>
          <div className="w-[40%] flex flex-row justify-center">
            <Space direction="vertical" size={14}>
              <RangePicker
                value={[startDate, endDate]}
                onChange={handleDateRangeChange}
                format={'DD/MM/YYYY'}
              />
            </Space>
          </div>
          <div className="w-[40%] flex flex-row justify-evenly">
            <Radio.Group
              onChange={handlerChange}
              value={selectChoose}
              className="w-[60%] flex flex-row items-center  justify-evenly"
            >
              <Radio value={1}>Tất cả member</Radio>
              <Radio value={2}>Chọn member</Radio>
            </Radio.Group>
            {selectChoose === 2 ? (
              <Form
                form={form}
                className=" flex flex-row items-center justify-center"
              >
                <Form.Item name="chooseUser" className="w-[200px]">
                  <Select className="w-[200px]" value={userID}>
                    {dataListUserId.map((item: any, index: any) => (
                      <Select.Option key={index} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
            ) : (
              false
            )}
          </div>
          <div className="w-[95px] h-[40px] rounded-[5px] leading-[40px] border-none  text-white ">
            <Button
              className="h-10  text-white text-[16px] font-medium bg-yellow-primary "
              onClick={() => handleChooseValue()}
            >
              Thống kê
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full pb-8">
        {selectChoose === 1 ? (
          <ChartLine dataTotalPerformance={dataTotalPerformance} />
        ) : (
          <LineChart dataTotalPerformance={dataTotalPerformanceWeek} />
        )}
      </div>
    </div>
  )
}
export default Perform
