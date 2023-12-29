import { sendGet, sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

// const getLogin = async (params: any) => {
//   return await sendGet(`${endpoint.get_all_inquiry}`, params).then(
//     (res) => res.data
//   )
// }
const getAllMovie = async (params?: any) => {
  return await sendPost(`${endpoint.get_all_movie}`, params).then(
    (res) => res.data
  )
}

const getAllSingleMovie = async (params?: any) => {
  return await sendPost(`${endpoint.get_all_single_movie}`, params).then(
    (res) => res.data
  )
}

const getAllSeriesMovie = async (params?: any) => {
  return await sendPost(`${endpoint.get_all_series_movie}`, params).then(
    (res) => res.data
  )
}

const getListMovieByListMovieId = async (params?: any) => {
  return await sendGet(
    `${endpoint.get_list_movie_by_list_movie_id}`,
    params
  ).then((res) => res.data)
}

const getListEpisode = async (params?: any) => {
  return await sendGet(`${endpoint.get_list_episode}`, params).then(
    (res) => res.data
  )
}

const getInforMovieByMovieId = async (params?: any) => {
  return await sendGet(`${endpoint.get_infor_movie_by_id}`, params).then(
    (res) => res.data
  )
}

const updateRate = async (params?: any) => {
  return await sendPost(`${endpoint.update_rate_movie}`, params).then(
    (res) => res.data
  )
}

const updateView = async (params?: any) => {
  return await sendPost(`${endpoint.update_view_movie}`, params).then(
    (res) => res.data
  )
}

const createMovie = async (params?: any) => {
  return await sendPost(`${endpoint.create_movie}`, params).then(
    (res) => res.data
  )
}

const updateMovie = async (params?: any) => {
  return await sendPost(`${endpoint.update_movie}`, params).then(
    (res) => res.data
  )
}

const deleteMovie = async (params?: any) => {
  return await sendPost(`${endpoint.delete_movie}`, params).then(
    (res) => res.data
  )
}

const movieApi = {
  getAllMovie,
  getListMovieByListMovieId,
  getAllSingleMovie,
  getAllSeriesMovie,
  getListEpisode,
  getInforMovieByMovieId,
  updateRate,
  updateView,
  createMovie,
  updateMovie,
  deleteMovie,
}

export default movieApi
