// import Featured from '../../components/featured/Featured'
// import List from '../../components/list/List'
import movieApi from '@/adapter/movie'
import ListMovies from '@/components/listMovies/ListMovies'
import { QUERY_KEY, TYPE, URL } from '@/utils/constants'
import { searchListMovie, searchListMovieByType } from '@/utils/helper'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Button, ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useOutletContext } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

const SingleMovie = () => {
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
  const [inputEntered]: any = useOutletContext()

  // call api get all list film
  const [listSingleMovie, setListSingleMovie]: any = useState()
  const [listSearchMovie, setListSearchMovie]: any = useState()
  const [listSearchMovieByType, setListSearchMovieByType]: any = useState()
  const [typeMovie, setTypeMovie]: any = useState()
  const [currentType, setCurrentType] = useState('Thể loại')
  const [isLoading, setIsLoading] = useState(true)

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_SINGLE_MOVIE],
    queryFn: () => {
      movieApi.getAllSingleMovie().then((res) => {
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)

        setListSearchMovieByType(res?.data?.data)
        setListSearchMovie(res?.data?.data)
        setListSingleMovie(res?.data?.data)
      })
    },
  })

  useEffect(() => {
    setListSearchMovie(searchListMovie(listSingleMovie, inputEntered?.trim()))
  }, [inputEntered?.trim()])

  useEffect(() => {
    setIsLoading(true)
    setListSearchMovieByType(
      searchListMovieByType(listSingleMovie, TYPE[typeMovie])
    )
    mutationSelectMovie.mutate({ category: TYPE[typeMovie] })
  }, [typeMovie])

  const mutationSelectMovie = useMutation({
    mutationFn: (params: any) => movieApi.getAllSingleMovie(params),
    onSuccess: (res) => {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      setListSearchMovieByType(res?.data?.data)
      setListSearchMovie(res?.data?.data)
      setListSingleMovie(res?.data?.data)
    },
  })

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

  const [isShowType, setIsShowType] = useState(false)
  const onFilterMovieHandler = (idxType: any) => {
    setIsLoading(true)
    setCurrentType(TYPE[idxType])

    //filter list movie were received
    setTypeMovie(idxType)
    setIsShowType(false)
  }

  //call for detail movie bg
  const [inforMovie, setInforMovie]: any = useState()

  useQuery({
    queryKey: [QUERY_KEY.GET_INFOR_MOVIE_BY_MOVIE_ID],
    queryFn: async () => {
      await movieApi
        .getInforMovieByMovieId({
          movieId: 'a0f29607-036a-4ca6-aebb-e4c3adc49d34',
        })
        .then((res: any) => {
          setInforMovie(res?.data?.data?.[0])
        })
    },
  })

  return (
    <div className="bg-black-primary">
      <div className="bg-auto relative">
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/342b65ac-7b0f-4f04-938c-1eae64275a78/dg77ifl-bc91da77-fe23-4dea-9494-5b8ff3eacdbb.jpg/v1/fill/w_1192,h_670,q_70,strp/scooby_doo__and_krypto__too___2023__by_amazingcoolstuff_dg77ifl-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvMzQyYjY1YWMtN2IwZi00ZjA0LTkzOGMtMWVhZTY0Mjc1YTc4XC9kZzc3aWZsLWJjOTFkYTc3LWZlMjMtNGRlYS05NDk0LTViOGZmM2VhY2RiYi5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.EyKJyNZYabzMShrUGLp2GtCJTgDXjvfkxkdf7MLwyoc"
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
          <div className="flex gap-5">
            <h3 className="text-[30px] p-0 m-0">Phim Lẻ</h3>

            <div className="flex w-[23%] my-auto h-[30px]">
              <div className="relative">
                <Button
                  onClick={() => setIsShowType(!isShowType)}
                  // onBlur={() => setIsShowType(false)}
                  className="flex bg-black-primary font-medium px-2 text-white rounded-none border-2 hover:bg-transparent"
                >
                  {currentType}
                  <ArrowDropDownOutlinedIcon />
                </Button>

                <div
                  className={
                    isShowType
                      ? 'grid grid-cols-3 bg-black-primary py-2 px-3 w-[500px] z-[9999] relative'
                      : 'hidden'
                  }
                  onBlur={() => setIsShowType(false)}
                >
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(0)}
                  >
                    Hành Động
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(1)}
                  >
                    Cổ Trang
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(2)}
                  >
                    Chiến Tranh
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(3)}
                  >
                    Viễn Tưởng
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(4)}
                  >
                    Kinh Dị
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(5)}
                  >
                    Tài Liệu
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(6)}
                  >
                    Bí ẩn
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(7)}
                  >
                    Tình Cảm
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(8)}
                  >
                    Tâm Lý
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(9)}
                  >
                    Thể Thao
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(10)}
                  >
                    Phiêu Lưu
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(11)}
                  >
                    Âm Nhạc
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(12)}
                  >
                    Hài Hước
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(13)}
                  >
                    Hình Sự
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(14)}
                  >
                    Võ Thuật
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(15)}
                  >
                    Khoa Học
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(16)}
                  >
                    Thần Thoại
                  </div>
                  <div
                    className="my-[2px] hover:underline cursor-pointer"
                    onClick={() => onFilterMovieHandler(17)}
                  >
                    Chính Kịch
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="relative top-[65px] inline-block text-[55px] text-center font-home text-[#FBF2A7] font-extrabold [word-spacing: 10px]">
            Scooby-Doo! And Krypto, Too!
          </span>
          {/* <h3 className="font-bold text-[25px] mb-3">
            Xem ngay kết thúc của mùa
          </h3>
          <p className="text-[18px] font-semibold">
            Từ kẻ gan góc sống ngoài vòng pháp luật trở thành phi tần, nữ nhân
            nọ tìm kiếm công lý cho gia đình mình đối mặt với cơn bão khủng
            hoảng giữa cảnh cung đấu ngập tràn hiểm nguy.
          </p> */}
          <div className="flex gap-2 mt-[150px]">
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
                    `${URL.WATCH}/a0f29607-036a-4ca6-aebb-e4c3adc49d34/1`,
                    {
                      state:
                        'https://1080.opstream4.com/share/9dde4d7713ae64986ab6f5c9f9cf94d3',
                    }
                  )
                }
              >
                <PlayArrowIcon className="my-auto mr-1" />
                <div className="text-[20px] font-semibold">Phát</div>
              </Button>
            </ConfigProvider>
            <Button className="flex h-full bg-[#6d6d6eb3] border-none text-white hover:bg-[#525253]">
              <InfoOutlinedIcon className="my-auto mr-1" />
              <div
                className="text-[20px] font-semibold"
                onClick={() =>
                  navigate(
                    `${URL.DETAIL_MOVIE}/a0f29607-036a-4ca6-aebb-e4c3adc49d34`,
                    { state: { movie: inforMovie } }
                  )
                }
              >
                Thông tin khác
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <ListMovies
          listMoviesByType={
            inputEntered?.length > 0
              ? listSearchMovie?.trending
              : listSearchMovieByType?.trending
          }
          isLoading={isLoading}
          listTitle="Hiện đang thịnh hành"
        />
        <ListMovies
          listMoviesByType={
            inputEntered?.length > 0
              ? listSearchMovie?.top
              : listSearchMovieByType?.top
          }
          isLoading={isLoading}
          listTitle="Top 10 phim được xem nhiều nhất trong ngày"
        />
        <ListMovies
          listMoviesByType={
            inputEntered?.length > 0
              ? listSearchMovie?.rate
              : listSearchMovieByType?.rate
          }
          isLoading={isLoading}
          listTitle="Phim được giới chuyên môn đánh giá cao"
        />
        <ListMovies
          listMoviesByType={
            inputEntered?.length > 0
              ? listSearchMovie?.view
              : listSearchMovieByType?.view
          }
          isLoading={isLoading}
          listTitle="Phim được yêu thích nổi tiếng"
        />
        <ListMovies
          listMoviesByType={
            inputEntered?.length > 0
              ? listSearchMovie?.cartoon
              : listSearchMovieByType?.cartoon
          }
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

export default SingleMovie
