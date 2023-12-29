import { endpoint } from '@/utils/constants'
import { sendGet, sendPost } from '@/hook/axios'

const getUser = async (params?: any) =>
  await sendGet(`${endpoint.get_user}`, params).then((res) => res.data)

const getProfile = async (params?: any) =>
  await sendGet(`${endpoint.get_profile_user}`, params).then((res) => res.data)

const getTransactionHistories = async (params?: any) =>
  await sendGet(`${endpoint.get_transaction_histories_user}`, params).then(
    (res) => res.data
  )

const getAllUserDb = async (params?: any) =>
  await sendPost(`${endpoint.get_all_user_db}`, params).then((res) => res.data)

const createUser = async (params?: any) =>
  await sendPost(`${endpoint.create_user}`, params).then((res) => res.data)

const updateUser = async (params?: any) =>
  await sendPost(`${endpoint.update_user}`, params).then((res) => res.data)

const deleteUser = async (params?: any) =>
  await sendPost(`${endpoint.delete_user}`, params).then((res) => res.data)

// const update = async (params?: any) => {
//   return await sendPost(`${endpoint.update_user}`, params).then(
//     (res: any) => res.data
//   )
// }

const updateAccount = async (params?: any) => {
  return await sendPost(`${endpoint.update_account_user}`, params).then(
    (res: any) => res.data
  )
}

const updateProfile = async (params?: any) => {
  return await sendPost(`${endpoint.update_profile_user}`, params).then(
    (res: any) => res.data
  )
}

const updateFavourite = async (params?: any) => {
  return await sendPost(`${endpoint.update_list_movie_user}`, params).then(
    (res: any) => res.data
  )
}

const updateStatusMember = async (params?: any) => {
  return await sendPost(`${endpoint.update_status_member}`, params).then(
    (res: any) => res.data
  )
}

const userApi = {
  updateStatusMember,
  createUser,
  updateUser,
  deleteUser,
  updateAccount,
  updateProfile,
  updateFavourite,
  getProfile,
  getUser,
  getTransactionHistories,
  getAllUserDb,
}

export default userApi
