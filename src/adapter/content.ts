import { endpoint } from '@/utils/constants'
import { sendGet, sendPost } from '@/hook/axios'

const searchContent = async (params?: any) => {
  return await sendGet(`${endpoint.search_content}`, params).then(
    (res) => res.data
  )
}

const createContent = async (params: any) => {
  return await sendPost(`${endpoint.create_content}`, params).then(
    (res) => res.data
  )
}
const updateContent = async (params: any) => {
  return await sendPost(`${endpoint.update_content}`, params).then(
    (res) => res.data
  )
}

const findContent = async (params?: any) => {
  return await sendGet(`${endpoint.find_content_by_id}`, params).then(
    (res: any) => res.data
  )
}

const deleteContent = async (params: any) => {
  return await sendPost(`${endpoint.delete_content}`, params).then(
    (res: any) => res.data
  )
}
const changeStatus = async (params: any) => {
  return await sendPost(`${endpoint.change_status_content}`, params).then(
    (res: any) => res.data
  )
}

const ContentApi = {
  searchContent,
  createContent,
  updateContent,
  findContent,
  deleteContent,
  changeStatus,
}

export default ContentApi
