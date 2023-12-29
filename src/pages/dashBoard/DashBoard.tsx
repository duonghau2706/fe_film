import { Button, Col, ConfigProvider, DatePicker, Row } from 'antd'
import { useState } from 'react'

import imgAllShow from '@/assets/image/dashBoardAllShow.png'
import imgImdb from '@/assets/image/dashBoardImdb.png'
import imgMovies from '@/assets/image/dashBoardMovies.png'
import imgSeries from '@/assets/image/dashBoardSeries.png'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const { RangePicker } = DatePicker

import Card from '@/components/card/Card'
import moment from 'moment'
import { userApi } from '@/adapter'
import dashBoardApi from '@/adapter/dashboard'
import movieApi from '@/adapter/movie'
import AreaDB from '@/components/charts/Area'
import BarChart from '@/components/charts/BarChart'
import Doughnut from '@/components/charts/Doughnut'
import Pie from '@/components/charts/Pie'
import StackedBar from '@/components/charts/StackedBar'
import TableMovieView from '@/components/table/TableMovieView'
import TableUserPayment from '@/components/table/TableUserPayment'
import { QUERY_KEY } from '@/utils/constants'
import {
  createStartDateDbFromOnlyYear,
  createTimeStampFromMoment,
  getSum,
  reverseStringDay,
} from '@/utils/helper'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import dayjs from 'dayjs'
import { useMutation, useQuery } from 'react-query'
import reportApi from '@/adapter/report'
import axios from 'axios'
import useToken from '@/hook/token'

const DashBoard = () => {
  // Tạo theme với màu đỏ cho Slider
  const theme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          rail: {
            backgroundColor: 'lightgray', // Màu xám cho thanh trượt khi không được chọn
          },
          thumb: {
            color: 'white', // Màu trắng cho đốt
            border: '2px solid #e50914', // Viền đỏ cho đốt
          },
          track: {
            backgroundColor: '#e50914', // Màu đỏ cho thanh trượt
            border: '2px solid #e50914', // Viền đỏ cho thanh trượt
          },
        },
      },
    },
  })
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const [listMovie, setListMovie]: any = useState()
  const [listPaymentUser, setListPaymentUser]: any = useState()
  // const [dateRevenue, setDateReveneu]
  const [cardAvg, setCardAvg]: any = useState()
  const [cardAllShows, setCardAllShows]: any = useState()
  const [cardSingle, setCardSingle]: any = useState()
  const [cardSeries, setCardSeries]: any = useState()
  const [timeSort, setTimeSort]: any = useState()
  const [timeNormal, setTimeNormal]: any = useState()
  const [timeLong, setTimeLong]: any = useState()
  const [timeVeryLong, setTimeVeryLong]: any = useState()
  const [viewVeryFew, setViewVeryFew]: any = useState()
  const [viewFew, setViewFew]: any = useState()
  const [viewMuch, setViewMuch]: any = useState()
  const [viewVeryMuch, setViewVeryMuch]: any = useState()
  const [monday, setMonday]: any = useState()
  const [tuesday, setTuesday]: any = useState()
  const [wednesday, setWednesday]: any = useState()
  const [thursday, setThursday]: any = useState()
  const [friday, setFriday]: any = useState()
  const [saturday, setSaturday]: any = useState()
  const [sunday, setSunday]: any = useState()
  const [one, setOne]: any = useState()
  const [two, setTwo]: any = useState()
  const [three, setThree]: any = useState()
  const [four, setFour]: any = useState()
  const [five, setFive]: any = useState()
  const [six, setSix]: any = useState()
  const [seven, setSeven]: any = useState()
  const [eight, setEight]: any = useState()
  const [nine, setNine]: any = useState()
  const [ten, setTen]: any = useState()
  const [eleven, setEleven]: any = useState()
  const [twelve, setTwelve]: any = useState()
  const [yearPublishSingle, setYearPublishSingle]: any = useState()
  const [yearPublishMovies, setYearPublishMovies]: any = useState()

  const mutationDb = useMutation({
    mutationFn: (params: any) => dashBoardApi.getAll(params),
    onSuccess: (res) => {
      setCardAllShows(res?.data?.data?.card?.cardAllShows?.[0]?.all_shows)
      setCardSingle(res?.data?.data?.card?.cardSingle?.[0]?.single)
      setCardSeries(res?.data?.data?.card?.cardSeries?.[0]?.series)

      const arr = res?.data?.data?.card?.cardAvg?.map(
        (item: any) => item?.list_rated
      )
      const arrNested = arr?.map((ele: any) =>
        ele?.split(',')?.map((child: any) => Number(child))
      )
      const listRatedDb: any = []
      arrNested.map((item: any) =>
        item?.map((child: any) => listRatedDb.push(child))
      )

      const IMDB =
        listRatedDb?.length > 0
          ? (getSum(listRatedDb) / listRatedDb?.length).toFixed(2)
          : 0
      setCardAvg(IMDB)

      setTimeSort(res?.data?.data?.chart?.time?.sort?.[0]?.sort)
      setTimeNormal(res?.data?.data?.chart?.time?.normal?.[0]?.normal)
      setTimeLong(res?.data?.data?.chart?.time?.long?.[0]?.long)
      setTimeVeryLong(res?.data?.data?.chart?.time?.veryLong?.[0]?.very_long)

      setViewVeryFew(res?.data?.data?.chart?.view?.veryFew?.[0]?.very_few)
      setViewFew(res?.data?.data?.chart?.view?.few?.[0]?.few)
      setViewMuch(res?.data?.data?.chart?.view?.much?.[0]?.much)
      setViewVeryMuch(res?.data?.data?.chart?.view?.veryMuch?.[0]?.very_much)
    },
  })

  const mutationUser = useMutation({
    mutationFn: (params: any) => userApi.getAllUserDb(params),
    onSuccess: (res) => {
      setListPaymentUser(res?.data?.data)
    },
  })

  const mutationMovie = useMutation({
    mutationFn: (params: any) => movieApi.getAllMovie(params),
    onSuccess: (res) => {
      setListMovie(res?.data?.data?.all)
    },
  })

  //Date dashboard
  const [startDb, setStartDb] = useState(1970)
  const [endDb, setEndDb] = useState(dayjs().year())
  const [startRevenue, setStartRevenue]: any = useState()
  const [endRevenue, setEndRevenue]: any = useState()
  const [startMovie, setStartMovie]: any = useState()
  const [endMovie, setEndMovie]: any = useState()

  // call api get all movie, user, db
  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_DB],
    queryFn: () => {
      dashBoardApi.getAll().then((res) => {
        setCardAllShows(res?.data?.data?.card?.cardAllShows?.[0]?.all_shows)
        setCardSingle(res?.data?.data?.card?.cardSingle?.[0]?.single)
        setCardSeries(res?.data?.data?.card?.cardSeries?.[0]?.series)

        const arr = res?.data?.data?.card?.cardAvg?.map(
          (item: any) => item?.list_rated
        )
        const arrNested = arr?.map((ele: any) =>
          ele?.split(',')?.map((child: any) => Number(child))
        )
        const listRatedDb: any = []
        arrNested.map((item: any) =>
          item?.map((child: any) => listRatedDb.push(child))
        )

        const IMDB =
          listRatedDb?.length > 0
            ? (getSum(listRatedDb) / listRatedDb?.length).toFixed(2)
            : 0
        setCardAvg(IMDB)

        setTimeSort(res?.data?.data?.chart?.time?.sort?.[0]?.sort)
        setTimeNormal(res?.data?.data?.chart?.time?.normal?.[0]?.normal)
        setTimeLong(res?.data?.data?.chart?.time?.long?.[0]?.long)
        setTimeVeryLong(res?.data?.data?.chart?.time?.veryLong?.[0]?.very_long)

        setViewVeryFew(res?.data?.data?.chart?.view?.veryFew?.[0]?.very_few)
        setViewFew(res?.data?.data?.chart?.view?.few?.[0]?.few)
        setViewMuch(res?.data?.data?.chart?.view?.much?.[0]?.much)
        setViewVeryMuch(res?.data?.data?.chart?.view?.veryMuch?.[0]?.very_much)

        setMonday(res?.data?.data?.chart?.trending?.week?.monday)
        setTuesday(res?.data?.data?.chart?.trending?.week?.tuesday)
        setWednesday(res?.data?.data?.chart?.trending?.week?.wednesday)
        setThursday(res?.data?.data?.chart?.trending?.week?.thursday)
        setFriday(res?.data?.data?.chart?.trending?.week?.friday)
        setSaturday(res?.data?.data?.chart?.trending?.week?.saturday)
        setSunday(res?.data?.data?.chart?.trending?.week?.sunday)

        setOne(res?.data?.data?.chart?.trending?.month?.monthOne)
        setTwo(res?.data?.data?.chart?.trending?.month?.monthTwo)
        setThree(res?.data?.data?.chart?.trending?.month?.monthThree)
        setFour(res?.data?.data?.chart?.trending?.month?.monthFour)
        setFive(res?.data?.data?.chart?.trending?.month?.monthFive)
        setSix(res?.data?.data?.chart?.trending?.month?.monthSix)
        setSeven(res?.data?.data?.chart?.trending?.month?.monthSeven)
        setEight(res?.data?.data?.chart?.trending?.month?.monthEight)
        setNine(res?.data?.data?.chart?.trending?.month?.monthNine)
        setTen(res?.data?.data?.chart?.trending?.month?.monthTen)
        setEleven(res?.data?.data?.chart?.trending?.month?.monthEleven)
        setTwelve(res?.data?.data?.chart?.trending?.month?.monthTwelve)

        setYearPublishSingle(res?.data?.data?.chart?.yearPublish?.yearSingle)
        setYearPublishMovies(res?.data?.data?.chart?.yearPublish?.yearSeries)
      })
    },
  })

  const { isLoading: isLoadingAllMovie, refetch: refetchMovie } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_MOVIE],
    queryFn: () => {
      movieApi.getAllMovie().then((res) => {
        setListMovie(res?.data?.data?.all)
      })
    },
  })

  const { isLoading: isLoadingUserDB, refetch: refetchUserDb } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_USER_DB],
    queryFn: () => {
      userApi.getAllUserDb().then((res) => {
        setListPaymentUser(res?.data?.data)
      })
    },
  })

  const [value, setValue] = useState<number[]>([1970, 2023])

  const handleChange: any = (event: any, newValue: number[]) => {
    setStartDb(newValue?.[0])
    setEndDb(newValue?.[1])
    setValue(newValue as number[])
  }

  const dateUserChangeHandler: any = (_: any, dateStrings: any) => {
    setStartRevenue(dateStrings?.[0])
    setEndRevenue(dateStrings?.[1])

    mutationUser.mutate({
      enteredStartDatetUser: createTimeStampFromMoment(
        moment(reverseStringDay(dateStrings?.[0]))
      ),
      enteredEndDateUser: createTimeStampFromMoment(
        moment(reverseStringDay(dateStrings?.[1]))
      ),
    })
  }

  const dateMovieChangeHandler: any = (_: any, dateStrings: any) => {
    setStartMovie(dateStrings?.[0])
    setEndMovie(dateStrings?.[1])

    mutationMovie.mutate({
      enteredStartDatetMovie: createTimeStampFromMoment(
        moment(reverseStringDay(dateStrings?.[0]))
      ),
      enteredEndDateMovie: createTimeStampFromMoment(
        moment(reverseStringDay(dateStrings?.[1]))
      ),
    })
  }

  //------CLICK THEM BAN GHI TRONG DB-----------
  // const html = renderToString(<TableUserPayment />)
  // console.log('html ', html)

  const filterDbHandler = () => {
    const startMoment = moment(createStartDateDbFromOnlyYear(startDb))
    const endMoment = moment(`${endDb}-12-31 23:59:59.999`)

    mutationDb.mutate({
      startDb: createTimeStampFromMoment(startMoment),
      endDb: createTimeStampFromMoment(endMoment),
    })
  }

  const mutationGetPdfRevenue = useMutation({
    // mutationFn: (params: any) => reportApi.get(params),
    mutationFn: (params: any) =>
      axios.post(`http://localhost:3000/api/v1/report/pdf`, params, {
        responseType: 'blob',
        headers: {
          Accept: 'application/pdf',
          // 'Content-Type': 'text/html',
        },
      }),
    onSuccess: (res) => {
      const blobData = new Blob([res?.data], { type: 'application/pdf' })

      const fileURL = window.URL.createObjectURL(blobData)
      const alink = document.createElement('a')
      alink.href = fileURL
      alink.download =
        startRevenue && endRevenue
          ? `Thống kê doanh thu theo thành viên_${startRevenue}_${endRevenue}`
          : 'Thống kê doanh thu theo thành viên'
      alink.click()
    },
  })

  const mutationGetPdfMovie = useMutation({
    // mutationFn: (params: any) => reportApi.get(params),
    mutationFn: (params: any) =>
      axios.post(`http://localhost:3000/api/v1/report/pdf`, params, {
        responseType: 'blob',
        headers: {
          Accept: 'application/pdf',
          // 'Content-Type': 'text/html',
        },
      }),
    onSuccess: (res) => {
      const blobData = new Blob([res?.data], { type: 'application/pdf' })

      const fileURL = window.URL.createObjectURL(blobData)
      const alink = document.createElement('a')
      alink.href = fileURL
      alink.download =
        startMovie && endMovie
          ? `Thống kê chi tiết lượt xem các phim_${startMovie}_${endMovie}`
          : 'Thống kê chi tiết lượt xem các phim'
      alink.click()
    },
  })

  const mutationRpRevenue = useMutation({
    // mutationFn: () => reportApi.get(),
    // mutationFn: (params?: any) =>
    //   axios.post(`http://localhost:3000/api/v1/render-ejs`, params, {
    //     responseType: 'blob',
    //     headers: {
    //       Accept: 'application/pdf',
    //       // 'Content-Type': 'text/typescript',
    //     },
    //   }),
    mutationFn: (params: any) => reportApi.renderEjsRevenue(params),
    onSuccess: (res) => {
      // --html string
      mutationGetPdfRevenue.mutate({ contentHtml: res })
    },
  })

  const mutationRpMovie = useMutation({
    // mutationFn: () => reportApi.get(),
    // mutationFn: (params?: any) =>
    //   axios.post(`http://localhost:3000/api/v1/render-ejs`, params, {
    //     responseType: 'blob',
    //     headers: {
    //       Accept: 'application/pdf',
    //       // 'Content-Type': 'text/typescript',
    //     },
    //   }),
    mutationFn: (params: any) => reportApi.renderEjsMovie(params),
    onSuccess: (res) => {
      // --html string
      mutationGetPdfMovie.mutate({ contentHtml: res })
    },
  })

  const printPdfRevenueHandler = () => {
    mutationRpRevenue.mutate({
      listPaymentUser,
      startRevenue,
      endRevenue,
      curDay: moment().date(),
      curMonth: moment().month() + 1,
      curYear: moment().year(),
      name: decode?.name,
    })
    // mutationGetPdf.mutate
    // mutationRpRevenue.mutate()
  }

  const printPdfMovieHandler = () => {
    mutationRpMovie.mutate({
      listMovie,
      startMovie,
      endMovie,
      curDay: moment().date(),
      curMonth: moment().month() + 1,
      curYear: moment().year(),
      name: decode?.name,
    })
  }

  let total = 0
  listPaymentUser?.forEach((e: any) => {
    total += Number(e?.revenue)
  })

  return (
    <div className="bg-[#AE1500] pl-8">
      <div className="flex flex-col pr-4 pb-5">
        <section className="pt-[90px] mb-5 flex gap-2">
          <Card icon={imgImdb} title={'IMDb Score'} value={cardAvg} />
          <Card icon={imgAllShow} title={'All Shows'} value={cardAllShows} />
          <Card icon={imgMovies} title={'Movies'} value={cardSingle} />
          <Card icon={imgSeries} title={'Series'} value={cardSeries} />
          <div
            style={{ boxShadow: '8px 10px 12px -7px rgba(0,0,0,0.67)' }}
            className="w-fit bg-black-main flex flex-col pl-4 pr-7 pt-4 border-0 border-solid rounded-[9px] gap-3"
          >
            <div className="flex justify-center items-end gap-2">
              <div className="border-solid border-white rounded-[3px] px-5 py-1 text-[18px] font-semibold text-white ">
                {startDb}
              </div>

              <div className="border-solid border-white rounded-[3px] px-5 py-1 text-[18px] font-semibold text-white ">
                {endDb}
              </div>

              <Button
                htmlType="submit"
                className="border-none font-semibold flex items-center justify-center rounded-[2px] py-3 px-5 h-[30px] bg-green-ok text-white hover:bg-green-okHover"
                onClick={filterDbHandler}
              >
                Lọc
              </Button>
            </div>
            <Box sx={{ width: 255 }}>
              <ThemeProvider theme={theme}>
                <Slider
                  // aria-label="Temperature"
                  // theme={theme}
                  getAriaLabel={() => 'Temperature range'}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  defaultValue={2023}
                  min={1970}
                  max={2023}
                  // getAriaValueText={valuetext}
                />
              </ThemeProvider>
            </Box>
          </div>
        </section>

        <div className="flex justify-between">
          <section className="mb-5">
            <Doughnut
              timeSort={timeSort}
              timeNormal={timeNormal}
              timeLong={timeLong}
              timeVeryLong={timeVeryLong}
            />
          </section>

          <section className="mb-5">
            <StackedBar
              monday={monday}
              tuesday={tuesday}
              wednesday={wednesday}
              thursday={thursday}
              friday={friday}
              saturday={saturday}
              sunday={sunday}
            />
          </section>

          <section className="mb-5">
            <Pie
              viewVeryFew={viewVeryFew}
              viewFew={viewFew}
              viewMuch={viewMuch}
              viewVeryMuch={viewVeryMuch}
            />
          </section>
        </div>

        <div className="flex justify-between">
          <section className="mb-5">
            <BarChart
              yearPublishSingle={yearPublishSingle}
              yearPublishMovies={yearPublishMovies}
            />
          </section>

          <section className="mb-5">
            <AreaDB
              one={one}
              two={two}
              three={three}
              four={four}
              five={five}
              six={six}
              seven={seven}
              eight={eight}
              nine={nine}
              ten={ten}
              eleven={eleven}
              twelve={twelve}
            />
          </section>
        </div>
      </div>

      <section
        style={{
          borderBottom: '1px solid #A7A9AA',
          borderTop: '1px solid #A7A9AA',
        }}
        className="flex flex-col rounded-[5px] overflow-hidden] pr-4 pt-5 pb-8"
      >
        <header className="flex justify-between items-center pb-2">
          <span className="font-medium font-inherit text-white text-[24px] mb-2">
            Thống kê doanh thu theo thành viên
          </span>

          <div className="flex justify-between gap-[15px] relative left-[150px]">
            <div className="flex gap-4 item-center">
              <label className="mt-[3px] text-base semi-bold text-white">
                Thời gian
              </label>
              <ConfigProvider
                theme={{
                  token: {
                    controlOutline: 'rgba(5, 145, 255, 0.1)',
                    colorPrimary: 'red',
                  },
                }}
              >
                <RangePicker
                  onChange={dateUserChangeHandler}
                  format={'DD/MM/YYYY'}
                  placeholder={['Từ ngày', 'Đến ngày']}
                />
              </ConfigProvider>
            </div>
          </div>

          <ConfigProvider
            theme={{
              token: {
                colorPrimary: 'white',
              },
            }}
          >
            <Button
              className="relative w-[130px] bg-green-ok justify-center text-white border-none text-[15px] px-[5px] py-[17px] rounded-[4px] font-bold cursor-pointer flex items-center hover:bg-green-okHover"
              onClick={printPdfRevenueHandler}
            >
              In thống kê
            </Button>
          </ConfigProvider>
        </header>

        <Row>
          <Col span={24}>
            <div className=" w-full flex justify-end mb-2">
              <label className="font-bold text-[14px]">
                Tổng số thành viên:{' '}
                {(listPaymentUser?.length || 0).toLocaleString()}
              </label>
            </div>

            <TableUserPayment
              dataSource={listPaymentUser}
              loading={isLoadingUserDB}
              refetch={refetchUserDb}
            />

            <div className=" w-full flex justify-end my-2">
              <label className="font-bold text-[14px]">
                Tổng số tiền: {total.toLocaleString()}
              </label>
            </div>
          </Col>
        </Row>
      </section>

      <section className="flex flex-col rounded-[5px] overflow-hidden pl-8] pr-4 pb-8 pt-5">
        <header className="flex justify-between items-center pb-3">
          <span className="font-medium font-inherit text-white text-[24px] mb-2">
            Thống kê chi tiết lượt xem các phim
          </span>

          <div className="flex justify-between gap-[15px] relative left-[150px]">
            <div className="flex gap-4 item-center">
              <label className="mt-[3px] text-base semi-bold text-white">
                Thời gian
              </label>
              <ConfigProvider
                theme={{
                  token: {
                    controlOutline: 'rgba(5, 145, 255, 0.1)',
                    colorPrimary: 'red',
                  },
                }}
              >
                <RangePicker
                  onChange={dateMovieChangeHandler}
                  format={'DD/MM/YYYY'}
                  placeholder={['Từ ngày', 'Đến ngày']}
                />
              </ConfigProvider>
            </div>
          </div>

          <ConfigProvider
            theme={{
              token: {
                colorPrimary: 'white',
              },
            }}
          >
            <Button
              onClick={printPdfMovieHandler}
              className="relative w-[130px] bg-green-ok justify-center text-white border-none text-[15px] px-[5px] py-[17px] rounded-[4px] font-bold cursor-pointer flex items-center hover:bg-green-okHover"
            >
              In thống kê
            </Button>
          </ConfigProvider>
        </header>

        <Row>
          {/* <Col span={8} className="flex justify-center items-center">
          <DoughnutChart data={dataRes} responsed={responsed} type="res" />
        </Col> */}
          <Col span={24}>
            <div className=" w-full flex justify-end mb-2">
              <label className="font-bold text-[14px]">
                Tổng số phim: {(listMovie?.length || 0).toLocaleString()}
              </label>
            </div>

            <TableMovieView
              dataSource={listMovie}
              loading={isLoadingAllMovie}
              refetch={refetchMovie}
            />
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default DashBoard
