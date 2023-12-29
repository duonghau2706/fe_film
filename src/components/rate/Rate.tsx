import { queryClient } from '@/App'
import movieApi from '@/adapter/movie'
import { QUERY_KEY } from '@/utils/constants'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import './Rate.css'

const Rate = ({ movie, onRateChangeHandler }: any) => {
  const [curMovie, setCurMovie] = useState(movie)
  const [rate, setRate] = useState(curMovie?.current_rated) // Giá trị mặc định là 5

  // // Gọi API để lấy thông tin chi tiết của phim
  // const queryGetInforMovie = useQuery(
  //   [QUERY_KEY.GET_INFOR_MOVIE_BY_MOVIE_ID, movie?.id],
  //   () => movieApi.getInforMovieByMovieId({ movieId: movie?.id })
  // )

  // console.log('queryGetInforMovie', queryGetInforMovie)

  // // Set giá trị của curMovie khi thông tin chi tiết được lấy về
  // useEffect(() => {
  //   if (queryGetInforMovie.data) {
  //     setCurMovie(queryGetInforMovie.data.data[0])
  //   }
  // }, [queryGetInforMovie.data])

  const mutationRate = useMutation({
    mutationFn: (params: any) => movieApi.updateRate(params),
    onSuccess: (res) => {
      queryClient.invalidateQueries([QUERY_KEY.GET_INFOR_MOVIE_BY_MOVIE_ID])
      setCurMovie(res?.data?.data[0])
      // setAvgRated(res?.data?.data[0].avg_rated)
    },
    // onError: (err) => {
    //   console.log('err', err)
    // },
  })

  const rateChangeHandler = (value: any) => {
    let list_rated_mutation = movie?.list_rated

    let number_of_rated_mutation = movie?.number_of_rated

    if (movie?.current_rated >= 1 && movie?.current_rated <= 10) {
      let arr = list_rated_mutation?.split(',')
      arr.pop()
      arr.join()
      arr += `, ${value}`
      list_rated_mutation = arr
      // onRateChangeHandler(value, movie?.number_of_rated)
    } else {
      if (list_rated_mutation === null || list_rated_mutation === undefined)
        list_rated_mutation = `${value}`
      else list_rated_mutation += `, ${value}`
      ++number_of_rated_mutation
      // onRateChangeHandler(value, movie?.number_of_rated + 1)
    }

    //avg rated to send with mutation
    const listRatedTmp: any = []
    list_rated_mutation
      ?.split(',')
      ?.map((rated: any) => listRatedTmp.push(Number(rated.trim())))
    let sumTmp = 0
    listRatedTmp.forEach((ele: number) => {
      sumTmp += ele
    })
    const rate_avg_mutation =
      number_of_rated_mutation <= 0
        ? 0
        : (sumTmp / number_of_rated_mutation).toFixed(1)

    mutationRate.mutate({
      id: movie?.id,
      current_rated: value,
      list_rated: list_rated_mutation,
      avg_rated: rate_avg_mutation,
      number_of_rated: number_of_rated_mutation,
    })

    onRateChangeHandler(value, number_of_rated_mutation)
    setRate(value)
  }

  //get average rated
  const listRated: any = []
  curMovie?.list_rated

    ?.split(',')
    ?.map((rated: any) => listRated.push(Number(rated.trim())))

  return (
    <div className="flex">
      <div className=" px-5 text-[30px] font-bold rounded-[5px] bg-[#ff0000cb] text-white">
        {curMovie?.avg_rated.toFixed(1)}
      </div>

      <div className="rate">
        {/* Các radio button */}
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((value) => (
          <React.Fragment key={value}>
            <input
              type="radio"
              id={`star${value}`}
              name="rate"
              value={value}
              checked={rate === value} // Kiểm tra xem radio nào được chọn
              onChange={() => rateChangeHandler(value)}
            />
            <label htmlFor={`star${value}`} title={`text ${value}`}>
              {value} stars
            </label>
          </React.Fragment>
        ))}
      </div>

      <div
        style={{ border: '1px white solid' }}
        className="px-2 py-1 rounded-[5px] text-[15px] flex items-center"
      >
        Đánh giá của bạn:{' '}
        {curMovie?.current_rated ? curMovie?.current_rated : 0}
      </div>
    </div>
  )
}

export default Rate
