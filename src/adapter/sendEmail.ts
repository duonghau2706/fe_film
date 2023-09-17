import { sendGet, sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const sendMail = async (params: any) => {
  return await sendPost(`${endpoint.send_mail}`, params).then((res) => res.data)
}

const getEmailHistory = async (params: any) => {
  return await sendGet(`${endpoint.get_email_history}`, params).then(
    (res) => res.data
  )
}
const getEmailById = async (params: any) => {
  return await sendGet(`${endpoint.get_email_by_id}`, params).then(
    (res) => res.data
  )
}

const SendMailApi = {
  sendMail,
  getEmailHistory,
  getEmailById,
}

export default SendMailApi
