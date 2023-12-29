import { userApi } from '@/adapter'
import movieApi from '@/adapter/movie'
import ListMovies from '@/components/listMovies/ListMovies'
import useToken from '@/hook/token'
import { QUERY_KEY } from '@/utils/constants'
import { useState } from 'react'
import { useQuery } from 'react-query'

const UserListMovie = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  // call api get list film of user
  const [profileUser, setProfileUser]: any = useState()
  useQuery({
    queryKey: [QUERY_KEY.GET_PROFILE_USER],
    queryFn: () => {
      userApi.getProfile({ userId: decode?.id }).then((res) => {
        setProfileUser(res?.data?.data?.[0])
      })
    },
  })

  const listMovieId: any = []
  profileUser?.list_movie_id?.split(', ')?.map((movie_id: any) => {
    listMovieId.push(movie_id?.trim())
  })
  const transformed = listMovieId?.join("', '")

  // call api get list infor movie by list movie id
  const [listMovieById, setListMovieById]: any = useState()
  const [isLoading, setIsLoading] = useState(true)

  useQuery({
    queryKey: [QUERY_KEY.GET_LIST_INFOR_MOVIE_BY_LIST_MOVIE_ID, listMovieId],
    queryFn: () => {
      movieApi
        .getListMovieByListMovieId({ listMovieId: transformed })
        .then((res) => {
          setListMovieById(res?.data?.data)
          setTimeout(() => {
            setIsLoading(false)
          }, 1500)
        })
    },
  })

  return (
    <div className="pt-[100px] bg-black-primary">
      <ListMovies
        listMoviesByType={listMovieById || []}
        listTitle="Danh sách phim của tôi"
        isLoading={isLoading}
      />
    </div>
  )
}

export default UserListMovie
