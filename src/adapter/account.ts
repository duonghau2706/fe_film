import { sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const getUserByEmail = async (params: any) => {
  return await sendPost(`${endpoint.get_user_by_email}`, params).then(
    (res) => res.data
  )
}

const verifyEmailRegistered = async (params: any) => {
  return await sendPost(`${endpoint.verify_email_registered}`, params).then(
    (res) => res.data
  )
}
const addNewAccount = async (params: any) => {
  return await sendPost(`${endpoint.add_new_account}`, params).then(
    (res) => res.data
  )
}

const accountApi = {
  addNewAccount,
  getUserByEmail,
  verifyEmailRegistered,
}

export default accountApi
