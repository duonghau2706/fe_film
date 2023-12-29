import { queryClient } from '@/App'
import { userApi } from '@/adapter'
import movieApi from '@/adapter/movie'
import Rate from '@/components/rate/Rate'
import useToken from '@/hook/token'
import { QUERY_KEY, URL } from '@/utils/constants'
import { renderDateStringDay } from '@/utils/helper'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import { Button, ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'

const DetailMovie = () => {
  const navigate = useNavigate()
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const { state } = useLocation()
  const movie = state?.movie

  const [rated, setRated] = useState(movie?.number_of_rated)
  const [currentRated, setCurrentRated] = useState(movie?.current_rated ?? 0)
  //lifting state up rate
  const onRateChangeHandler = (newRate: any, numberOfRated: any) => {
    setRated(numberOfRated)
    setCurrentRated(newRate)
  }

  /***********FEATURE_FAVOURITE***************/
  //add or delete movie for user's list movies
  //step1: get infor user
  const [profileUser, setProfileUser]: any = useState()
  useQuery({
    queryKey: [QUERY_KEY.GET_PROFILE_USER],
    queryFn: async () => {
      setIsLoading(false)
      return await userApi.getProfile({ userId: decode?.id }).then((res) => {
        setProfileUser(res?.data?.data?.[0])
      })
    },
  })

  //call api get movie's infor by movie id
  //khi log ra, do api get infor movie goi truoc roi moi goi api
  //update nen khi log inforMovie se bi cham 1 nhip
  const [inforMovie, setInforMovie] = useState(movie)

  useQuery({
    queryKey: [QUERY_KEY.GET_INFOR_MOVIE_BY_MOVIE_ID, currentRated],
    queryFn: async () => {
      await movieApi
        .getInforMovieByMovieId({ movieId: inforMovie?.id })
        .then((res: any) => {
          setInforMovie(res?.data?.data?.[0])
        })
    },
  })

  useEffect(() => {
    queryClient.invalidateQueries([QUERY_KEY.GET_INFOR_MOVIE_BY_MOVIE_ID])
  }, [currentRated, rated])

  // console.log('profile', profileUser)

  // console.log('infor', inforMovie)

  const listMovieId: any = []
  profileUser?.list_movie_id?.split(', ')?.map((movie_id: any) => {
    listMovieId.push(movie_id?.trim())
  })
  // console.log('listMovieId', listMovieId)

  //step2: compare id movie with db
  const [isDelete, setIsDelete]: any = useState(false)

  // listMovieId.includes(inforMovie?.id)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsDelete(profileUser?.list_movie_id?.includes(inforMovie?.id))
    // queryClient.invalidateQueries([QUERY_KEY.GET_PROFILE_USER])
  }, [profileUser])

  //step3: update in db
  const mutationFavourite = useMutation({
    mutationFn: (params: any) => userApi.updateFavourite(params),
    onSuccess: () => {
      // setProfileUser(res)
      queryClient.invalidateQueries([QUERY_KEY.GET_PROFILE_USER])
    },
    // onError: (err) => {
    //   console.log('err', err)
    // },
  })

  const listCategory: any = []
  inforMovie?.category?.split(',')?.map((item: any) => {
    // const category = CATEGORY.filter(
    //   (category) => category.name === item.trim()
    // )
    listCategory.push(item?.trim())
  })

  const showMovieHandler = (url: any, index: number) => {
    mutationView.mutate({
      id: inforMovie?.id,
      view: inforMovie?.view + 1,
      view_of_day: inforMovie?.view_of_day + 1,
      view_of_month: inforMovie?.view_of_month + 1,
    })
    navigate(`${URL.WATCH}/${inforMovie?.id}/${index + 1}`, { state: url })
  }

  /**********FEATURE_PLAY***********/
  //step 1: get list link episode movie -> get url episode 1
  const listEpisode: any = []
  inforMovie?.url.split(',')?.map((url: any) => listEpisode.push(url.trim()))

  //step 2: navigate + url of the movie
  const onPlay = (list: any) => {
    mutationView.mutate({
      id: inforMovie?.id,
      view: inforMovie?.view + 1,
      view_of_day: inforMovie?.view_of_day + 1,
      view_of_month: inforMovie?.view_of_month + 1,
    })
    navigate(`${URL.WATCH}/${inforMovie?.id}/1`, { state: list[0] })
  }

  //update view
  const mutationView = useMutation({
    mutationFn: (params: any) => movieApi.updateView(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_ALL_SINGLE_MOVIE])
      queryClient.invalidateQueries([QUERY_KEY.GET_INFOR_MOVIE_BY_MOVIE_ID])
    },
  })

  const selectChangeHandler = () => {
    // ahii()
    if (isDelete) {
      setIsDelete(false)
      const transformed = listMovieId
        ?.filter((id: any) => id !== inforMovie?.id)
        ?.join(', ')

      mutationFavourite.mutate({
        userId: profileUser?.id,
        listMovieId: transformed,
      })
    } else {
      setIsDelete(true)
      const transformedAdd =
        profileUser?.list_movie_id?.length > 0
          ? profileUser?.list_movie_id + `, ${inforMovie?.id}`
          : profileUser?.list_movie_id + `${inforMovie?.id}`
      mutationFavourite.mutate({
        userId: profileUser?.id,
        listMovieId: transformedAdd,
      })
    }
  }

  //import movie to excel
  // const mutationImportMovie = useMutation({
  //   mutationFn: (params: any) => movieApi.createMovie(params),
  //   onSuccess: (res) => {
  //     console.log('res', res)
  //   },
  // })

  // const ahii = async () => {
  //   const response = await fetch(
  //     'https://ophim1.com/phim/anh-ay-buoc-ra-tu-anh-lua'
  //   )
  //   const movies = await response.json()

  //   const {
  //     name,
  //     thumb_url,
  //     time,
  //     episode_total,
  //     year,
  //     actor,
  //     category,
  //     country,
  //     content,
  //   } = movies.movie
  //   //url
  //   const tmpUrl: any = []
  //   movies.episodes?.[0]?.server_data.map((item: any) =>
  //     tmpUrl.push(item?.link_embed)
  //   )
  //   const urlTransformed = tmpUrl.join(', ')

  //   const timeTransformed = time.split(' ')[0]
  //   const episodeTotalTransformed = episode_total.split(' ')[0]
  //   const actorTransformed = actor.join(', ')

  //   //category
  //   const tmp: any = []
  //   category.map((item: any) => tmp.push(item?.name))

  //   const categoryTransformed = tmp.join(', ')
  //   const countryTrannsformed = country[0]?.name
  //   const contentTransform = content.substring(
  //     3,
  //     movies.movie.content.length - 4
  //   )

  //   mutationImportMovie.mutate({
  //     id: 'a0f29607-036a-4ca6-aebb-e4c3adc49d80',
  //     name,
  //     type: 'series',
  //     category: categoryTransformed,
  //     url: urlTransformed,
  //     poster_url: thumb_url,
  //     country: countryTrannsformed,
  //     time: timeTransformed,
  //     actor: actorTransformed,
  //     episode_total: episodeTotalTransformed,
  //     content: contentTransform,
  //     publish: year,
  //     admin_id: 'f0f29607-036a-4ca6-aebb-e4c3adc49da0',
  //     created_by: 'Hậu',
  //     created_at: '2023-11-17 18:28:13.034+07',
  //     updated_at: '2023-11-17 18:28:13.034+07',
  //   })
  //   // console.log(
  //   //   urlTransformed,
  //   //   timeTransformed,
  //   //   episodeTotalTransformed,
  //   //   actorTransformed,
  //   //   categoryTransformed,
  //   //   countryTrannsformed,
  //   //   contentTransform
  //   // )
  // }

  return (
    <div className="bg-black-primary pt-[84px] pl-10 pr-10">
      <div className="flex justify-between gap-20">
        <div className="flex flex-col w-[800px]">
          <div className="flex relative">
            <h1 className="m-0 mt-5 p-0">{inforMovie?.name}</h1>
            {inforMovie?.type === 'series' && (
              <div className=" px-5 text-[30px] font-bold rounded-[5px] bg-[#ff0000cb] text-white absolute right-0">
                {inforMovie?.episode_total} tập
              </div>
            )}
          </div>
          <div className="flex mt-5">
            <Rate
              movie={inforMovie}
              onRateChangeHandler={onRateChangeHandler}
            />
          </div>
          <div className="flex mt-5 text-[13px] gap-2">
            <div>
              Ngày phát hành: {renderDateStringDay(inforMovie?.publish, '/')}
            </div>
            <div style={{ borderLeft: '1px solid white' }} className="pl-2">
              Thời lượng: {inforMovie?.time} phút
            </div>
            <div style={{ borderLeft: '1px solid white' }} className="pl-2">
              Quốc gia: {inforMovie?.country}
            </div>
            <div style={{ borderLeft: '1px solid white' }} className="pl-2">
              Lượt xem: {inforMovie?.view}
            </div>
            <div style={{ borderLeft: '1px solid white' }} className="pl-2">
              Số lượt đánh giá: {inforMovie?.number_of_rated}
            </div>
          </div>
          <div className="flex gap-2 mt-5 ">
            {listCategory.map((category: any, index: number) => {
              return (
                <div
                  key={index}
                  style={{ border: '1px solid white' }}
                  className="text-[13px] px-2 py-1 rounded-[5px] bg-[#ffffff14] cursor-pointer"
                >
                  {category}
                </div>
              )
            })}
          </div>
          <div className="mt-[20px] mb-2 text-[15px]">
            Diễn viên chính: {inforMovie?.actor}
          </div>
          <div style={{ lineHeight: '25px' }} className="text-[15px] mt-3">
            Miêu tả: {inforMovie?.content}
          </div>
          <div className="flex gap-3">
            <div className="mt-10">
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
                  onClick={() => onPlay(listEpisode)}
                >
                  <PlayArrowIcon className="my-auto mr-1" />
                  <div className="text-[18px] font-semibold">Phát</div>
                </Button>
              </ConfigProvider>
            </div>

            <div className="mt-10">
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
                  onClick={selectChangeHandler}
                >
                  {isLoading && (
                    <div className="text-[18px] font-semibold">Loading...</div>
                  )}
                  {!isLoading && isDelete && (
                    <div className="flex">
                      <PlaylistRemoveIcon className="my-auto mr-1" />
                      <div className="text-[18px] font-semibold">
                        Xóa khỏi danh sách của tôi
                      </div>
                    </div>
                  )}
                  {!isLoading && !isDelete && (
                    <div className="flex">
                      <PlaylistAddOutlinedIcon className="my-auto mr-1" />
                      <div className="text-[18px] font-semibold">
                        Thêm vào danh sách của tôi
                      </div>
                    </div>
                  )}

                  {/* <PlaylistAddOutlinedIcon className="my-auto mr-1" />
                  <div className="text-[18px] font-semibold">
                    {isLoading && 'Loading...'}
                    { ? 'Xóa khỏi danh sách của tôi' : ''}
                    {!isLoading && !isDelete && ''}
                  </div>
                  <PlaylistRemoveIcon className="my-auto mr-1" /> */}
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </div>

        <div className="w-[500px]">
          <img
            src={inforMovie?.poster_url}
            alt="poster_url"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div style={{ borderTop: '1px solid #ffffff65' }} className="mt-10"></div>

      <div className="ml-5">
        <div className="text-[20px] mt-5 mb-5 text-white font-semibold">
          Chọn tập phim
        </div>
        {listEpisode.map((url: any, index: number) => {
          return (
            <ConfigProvider
              key={index}
              theme={{
                token: {
                  colorBgContainerDisabled: 'red',
                  colorPrimaryHover: 'white',
                },
              }}
            >
              <Button
                className="w-[80px] text-white bg-[#666666] border-none mr-[6px] mb-2 hover:bg-red-600 text-[15px]"
                // key={index}
                onClick={() => showMovieHandler(url, index)}
              >
                {index + 1} {index + 1 === inforMovie?.episode_total && 'END'}
              </Button>
            </ConfigProvider>
          )
        })}
      </div>

      <div
        style={{ borderBottom: '1px solid #ffffff65' }}
        className="mt-10"
      ></div>
    </div>
  )
}

export default DetailMovie
