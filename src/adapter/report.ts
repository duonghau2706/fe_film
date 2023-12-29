import { sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const get = async (params?: any) => {
  return await sendPost(`${endpoint.get_report_pdf}`, params).then(
    (res) => res.data
  )
}

const renderEjsRevenue = async (params?: any) => {
  return await sendPost(`${endpoint.render_ejs_revenue}`, params).then(
    (res) => res.data
  )
}

const renderEjsMovie = async (params?: any) => {
  return await sendPost(`${endpoint.render_ejs_movie}`, params).then(
    (res) => res.data
  )
}

const reportApi = {
  get,
  renderEjsRevenue,
  renderEjsMovie,
}

export default reportApi
