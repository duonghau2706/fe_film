import { sendGet } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const getInquiry = async (params: any) => {
  return await sendGet(`${endpoint.get_all_inquiry}`, params).then(
    (res) => res.data
  )
}
const getInquiryById = async (params: any) => {
  return await sendGet(`${endpoint.get_inquiry_by_id}`, params).then(
    (res) => res.data
  )
}

const InquiryApi = {
  getInquiry,
  getInquiryById,
}

export default InquiryApi
