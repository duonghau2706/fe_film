import { useCallback, useState, useEffect } from 'react'
import { TableViewEffortOfMember } from '@/components/table'
import { FormSearchEffortOfMember } from '@/components/form'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { QUERY_KEY } from '@/utils/constants'
import { userApi } from '@/adapter'
import { cleanObj } from '@/utils/helper'
import moment from 'moment'
import dayjs from 'dayjs'

const currentDate = dayjs() // Ngày hiện tại
const startOfMonth = currentDate.startOf('month') // Ngày đầu tháng
const endOfMonth = currentDate.endOf('month') // Ngày cuối tháng

const EffortOfAllMember = () => {
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState<any>([])
  const [searchCustomer, setSearchCustomer] = useState<any>({})
  const [dataIdUser, setDataIdUser] = useState<any>()
  const [initialValueData, setInitialValueData] = useState<any>([])

  // const [statusCallApi, setStatusCallAPi] = useState<boolean>(false)

  const onSearchCustomer = (value: any) => {
    const id = value.userId ? value.userId : null
    const fromDate = value?.dateFilter
      ? value?.dateFilter[0]?.format('YYYY-MM-DD')
      : ''
    const toDate = value?.dateFilter
      ? value?.dateFilter[1]?.format('YYYY-MM-DD')
      : ''
    const searchData = {
      ...value,
      dateFilter: value.dateFilter ? [fromDate, toDate] : undefined,
    }
    if (id) {
      setDataIdUser(id)
      setSearchCustomer(searchData)
      return
    }
  }

  const {
    data: detailCustomer,
    refetch: refetchProductDetail,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.VIEW_EFFORT_ALL_MEMBER, searchCustomer],
    queryFn: () =>
      userApi
        .viewAllEffortOfMember({
          ...cleanObj(searchCustomer),
        })
        .then((res) => res?.data),
    enabled: false,
  })

  useEffect(() => {
    if (dataIdUser) {
      refetchProductDetail()
    }
  }, [dataIdUser, searchCustomer])

  const getDaysInMonthRange = (
    startDay: number,
    startMonth: number,
    startYear: number,
    endDay: number,
    endMonth: number,
    endYear: number
  ) => {
    const daysArray = []

    const currentDate = new Date(startYear, startMonth - 1, startDay)

    while (currentDate <= new Date(endYear, endMonth - 1, endDay)) {
      const day = currentDate.getDate()
      const month = currentDate.getMonth() + 1
      const year = currentDate.getFullYear()

      const formattedDate = `${day.toString().padStart(2, '0')}/${month
        .toString()
        .padStart(2, '0')}/${year}`
      daysArray.push(formattedDate)

      currentDate.setDate(currentDate.getDate() + 1)
    }
    return daysArray
  }

  const getDayOfWeek = (dateString: any) => {
    const daysOfWeek = [
      'Chủ nhật',
      'Thứ hai',
      'Thứ ba',
      'Thứ tư',
      'Thứ năm',
      'Thứ sáu',
      'Thứ bảy',
    ]
    const dateParts = dateString.split('/')
    const year = dateParts[2]
    const month = dateParts[1]
    const day = dateParts[0]
    const date = new Date(year, month - 1, day)
    const dayOfWeek = date.getDay()
    return daysOfWeek[dayOfWeek]
  }

  useEffect(() => {
    if (!detailCustomer?.element) return setDataSource([])

    const [startDay, startMonth, startYear] = searchCustomer?.dateFilter
      ? searchCustomer?.dateFilter[0].split('-').reverse()
      : startOfMonth.format('DD/MM/YYYY').split('/')
    const [endDay, endMonth, endYear] = searchCustomer?.dateFilter
      ? searchCustomer?.dateFilter[1].split('-').reverse()
      : endOfMonth.format('DD/MM/YYYY').split('/')

    const newData = getDaysInMonthRange(
      +startDay,
      +startMonth,
      +startYear,
      +endDay,
      +endMonth,
      +endYear
    ).map((item) => {
      const element = detailCustomer?.element.find(
        (el: any) => moment(el.workDate).format('DD/MM/YYYY') === item
      )
      return {
        date: item,
        day: getDayOfWeek(item),
        ...element,
        numberWorkHours: element?.numberWorkHours
          ? element?.numberWorkHours
          : 0,
        id: element?.id ? element?.id : item,
      }
    })
    setDataSource(newData || [])
    setInitialValueData(newData || [])
  }, [detailCustomer, searchCustomer])

  const onBack = useCallback(() => {
    navigate(-1)
  }, [])

  return (
    <div className="flex gap-4 flex-col px-6 p-4 overflow-auto h-full">
      <h1>Xem effort làm việc của member</h1>
      <FormSearchEffortOfMember onFinish={onSearchCustomer} />
      <div className="flex items-center gap-2">
        <label className="text-[16px] font-bold text-black">
          Tổng thời gian làm việc:
        </label>
        {dataSource.length !== 0 ? (
          <label className="text-[16px] font-bold text-black">
            {`${
              dataSource.reduce((accumulator: any, currentValue: any) => {
                const size = +currentValue.numberWorkHours
                return accumulator + size
              }, 0) || 0
            } giờ`}
          </label>
        ) : (
          '0 giờ'
        )}
      </div>
      <TableViewEffortOfMember
        setStatus={refetchProductDetail}
        setDataSource={setDataSource}
        dataSource={dataSource}
        initialValueData={initialValueData}
        userIds={dataIdUser}
        loading={isLoading}
      />
      <Button
        onClick={onBack}
        className="w-[150px] border font-bold border-solid border-orange-primary bg-white text-orange-primary h-10 text-sm"
      >
        Quay lại
      </Button>
    </div>
  )
}

export default EffortOfAllMember
