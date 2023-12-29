// import Featured from '../../components/featured/Featured'
// import List from '../../components/list/List'
import { userApi } from '@/adapter'
import movieApi from '@/adapter/movie'
import ListMovies from '@/components/listMovies/ListMovies'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { searchListMovie } from '@/utils/helper'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Button, ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  //SKIP----scrollnavbar
  // const dispatch = useDispatch()
  // const isScrolled = useSelector((state) => state.isScrolled)
  // window.onscroll = () => {
  //   if (window.pageYOffset === 0) {
  //     dispatch('SCROLLL')
  //   }
  //   return () => (window.onscroll = null)
  // }

  const navigate = useNavigate()
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const [inputEntered]: any = useOutletContext()

  // call api get all list film
  const [listAllMovie, setListAllMovie]: any = useState()
  const [listSearchMovie, setListSearchMovie]: any = useState()
  const [isLoading, setIsLoading] = useState(true)
  useQuery({
    queryKey: [QUERY_KEY.GET_PROFILE_USER],
    queryFn: () => {
      userApi.getProfile({ userId: decode?.id }).then((res) => {
        if (!res?.data?.data?.[0]?.is_member) {
          toast.success('Vui lòng gia hạn để sử dụng dịch vụ!', {
            autoClose: 3000, // Tự đóng sau 3000ms (3 giây)
            style: { marginTop: '50px' }, // Thêm style tùy chỉnh
          })
          navigate(URL.ACCOUNT)
        }
      })
    },
  })

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_MOVIE],
    queryFn: () => {
      movieApi.getAllMovie().then((res) => {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)

        setListSearchMovie(res?.data?.data)
        setListAllMovie(res?.data?.data)
      })
    },
  })

  useEffect(() => {
    setListSearchMovie(searchListMovie(listAllMovie, inputEntered?.trim()))
  }, [inputEntered?.trim()])

  // call api get list film trending
  // const [listSingleMovieTrending, setListSingleMovieTrending] = useState()
  // useQuery({
  //   queryKey: [QUERY_KEY.GET_ALL_SINGLE_MOVIE_TRENDING],
  //   queryFn: () => {
  //     movieApi.getAllSingleMovie().then((res) => {
  //       console.log('res', res)

  //       setListSingleMovieTrending(res?.data?.data)
  //     })
  //   },
  // })

  // call api get list film of user
  // const [profileUser, setProfileUser]: any = useState()
  // useQuery({
  //   queryKey: [QUERY_KEY.GET_PROFILE_USER],
  //   queryFn: () => {
  //     userApi.getProfile({ userId: decode?.id }).then((res) => {
  //       setProfileUser(res?.data?.data?.[0])
  //     })
  //   },
  // })

  // const listMovieId: any = []
  // profileUser?.list_movie_id?.split(', ')?.map((movie_id: any) => {
  //   listMovieId.push(movie_id?.trim())
  // })
  // const transformed = listMovieId?.join("', '")

  // call api get list infor movie by list movie id
  // const [listMovieById, setListMovieById]: any = useState()
  // useQuery({
  //   queryKey: [QUERY_KEY.GET_LIST_INFOR_MOVIE_BY_LIST_MOVIE_ID, listMovieId],
  //   queryFn: () => {
  //     movieApi
  //       .getListMovieByListMovieId({ listMovieId: transformed })
  //       .then((res) => {
  //         setListMovieById(res?.data?.data)
  //       })
  //   },
  // })

  //call for detail movie bg
  const [inforMovie, setInforMovie]: any = useState()

  useQuery({
    queryKey: [QUERY_KEY.GET_INFOR_MOVIE_BY_MOVIE_ID],
    queryFn: async () => {
      await movieApi
        .getInforMovieByMovieId({
          movieId: 'a0f29607-036a-4ca6-aebb-e4c3adc49d14',
        })
        .then((res: any) => {
          setInforMovie(res?.data?.data?.[0])
        })
    },
  })

  return (
    <div className="bg-black-primary">
      <div className="bg-auto relative ">
        <img
          src="https://img.ophim9.cc/uploads/movies/harry-potter-va-hon-da-phu-thuy-poster.jpg"
          alt="img film home"
          width={1280}
          style={{
            background: 'linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)',
          }}
          // height={650}
        />
        <div
          className="absolute bottom-0 left-0 top-0 right-[50%]"
          style={{
            background: 'linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)',
          }}
        ></div>
        <div className="left-10 absolute z-[99] top-[10%] w-[35%]">
          {/* <span className="inline-block text-[80px] text-center font-home text-[#FBF2A7] font-extrabold [word-spacing: 10px]">
            AN LẠC TRUYỆN
          </span>
          <h3 className="font-bold text-[25px] mb-3">
            Xem ngay kết thúc của mùa
          </h3>
          <p className="text-[18px] font-semibold">
            Từ kẻ gan góc sống ngoài vòng pháp luật trở thành phi tần, nữ nhân
            nọ tìm kiếm công lý cho gia đình mình đối mặt với cơn bão khủng
            hoảng giữa cảnh cung đấu ngập tràn hiểm nguy.
          </p> */}
          <div className="flex gap-2 relative top-[400px]">
            <ConfigProvider
              theme={{
                token: {
                  colorBgContainerDisabled: 'red',
                  colorPrimaryHover: 'black',
                },
              }}
            >
              <Button
                className="flex h-full border-none hover:opacity-[0.7]"
                onClick={() =>
                  navigate(
                    `${URL.WATCH}/a0f29607-036a-4ca6-aebb-e4c3adc49d14`,
                    {
                      state:
                        'https://1080.opstream4.com/share/5607fe8879e4fd269e88387e8cb30b7e',
                    }
                  )
                }
              >
                <PlayArrowIcon className="my-auto mr-1" />
                <div className="text-[20px] font-semibold">Phát</div>
              </Button>
            </ConfigProvider>
            <Button
              className="flex h-full bg-[#6d6d6eb3] border-none text-white hover:bg-[#525253]"
              onClick={() =>
                navigate(
                  `${URL.DETAIL_MOVIE}/a0f29607-036a-4ca6-aebb-e4c3adc49d14`,
                  { state: { movie: inforMovie } }
                )
              }
            >
              <InfoOutlinedIcon className="my-auto mr-1" />
              <div className="text-[20px] font-semibold">Thông tin khác</div>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <ListMovies
          listMoviesByType={listSearchMovie?.trending}
          isLoading={isLoading}
          listTitle="Hiện đang thịnh hành"
        />
        <ListMovies
          listMoviesByType={listSearchMovie?.top}
          isLoading={isLoading}
          listTitle="Top 10 phim được xem nhiều nhất trong ngày"
        />
        <ListMovies
          listMoviesByType={listSearchMovie?.rate}
          isLoading={isLoading}
          listTitle="Phim được giới chuyên môn đánh giá cao"
        />
        <ListMovies
          listMoviesByType={listSearchMovie?.view}
          isLoading={isLoading}
          listTitle="Phim được yêu thích nổi tiếng"
        />
        <ListMovies
          listMoviesByType={listSearchMovie?.cartoon}
          isLoading={isLoading}
          listTitle="Phim hoạt hình"
        />
        {/* {listAllMovies.map((listMoviesByType: any, index: number) => {
          return (
            <ListMovies
              key={index}
              type={listMoviesByType.type}
              listMoviesByType={listMoviesByType.listMoviesByType}
              totalMovies={listMoviesByType.totalMovies}
              isLoading={isLoading}
              listTitle=""
            />
          )
        })} */}
        {/* <ListMovies type={0} listMovies={listMovies} /> */}
      </div>
      <div className=" bg-red-500 top-16"></div>
    </div>
  )
}

export default Home
