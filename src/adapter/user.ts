import { endpoint } from '@/utils/constants'
import { sendGet, sendPost } from '@/hook/axios'

const getAll = async (params?: any) =>
  await sendGet(`${endpoint.get_user_pagination}`, params).then(
    (res) => res.data
  )

const create = async (params?: any) => {
  return await sendPost(`${endpoint.create_user}`, params).then(
    (res) => res.data
  )
}

const update = async (params?: any) => {
  return await sendPost(`${endpoint.update_user}`, params).then(
    (res: any) => res.data
  )
}

const deletebyId = async (params?: any) => {
  return await sendPost(`${endpoint.delete_user}`, params).then(
    (res: any) => res.data
  )
}

const recordWorkingTime = async (params?: any) => {
  return await sendPost(`${endpoint.record_working_time}`, params).then(
    (res: any) => res.data
  )
}

const viewAllEffortOfMember = async (params?: any) =>
  await sendGet(`${endpoint.view_all_effort_of_member}`, params).then(
    (res) => res.data
  )

const userApi = {
  update,
  create,
  getAll,
  deletebyId,
  recordWorkingTime,
  viewAllEffortOfMember,
}

export default userApi
