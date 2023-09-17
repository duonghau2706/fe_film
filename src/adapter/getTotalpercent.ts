import { endpoint } from '@/utils/constants'
import { sendGet } from '@/hook/axios'

const getTotal = async (params?: any) => {
  return await sendGet(`${endpoint.case_status}`, params).then(
    (res) => res.data
  )
}
const getCaseStatus = async (params?: any) => {
  return await sendGet(`${endpoint.case_resource}`, params).then(
    (res) => res.data
  )
}
const getCaseStatusFlowUser = async (params?: any) => {
  return await sendGet(`${endpoint.case_resource_user}`, params).then(
    (res) => res.data
  )
}
const totalPerformanceStatus = async (params?: any) => {
  return await sendGet(`${endpoint.case_performance}`, params).then(
    (res) => res.data
  )
}
const listUserPerformance = async (params?: any) => {
  return await sendGet(`${endpoint.case_list_user_id}`, params).then(
    (res) => res.data
  )
}
const listUserId = async (params?: any) => {
  return await sendGet(`${endpoint.case_list_user}`, params).then(
    (res) => res.data
  )
}

const getTotalCase = {
  getTotal,
  getCaseStatus,
  totalPerformanceStatus,
  getCaseStatusFlowUser,
  listUserId,
  listUserPerformance,
}
export default getTotalCase
