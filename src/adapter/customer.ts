import { endpoint } from '@/utils/constants'
import { sendGet, sendPost } from '@/hook/axios'

const getAll = async (params?: any) =>
  await sendGet(`${endpoint.get_customer}`, params).then((res) => res.data)

const create = async (params?: any) => {
  return await sendPost(`${endpoint.create_customer}`, params).then(
    (res) => res.data
  )
}

const update = async (params?: any) => {
  return await sendPost(`${endpoint.update_customer}`, params).then(
    (res: any) => res.data
  )
}

const deletebyId = async (params?: any) => {
  return await sendPost(`${endpoint.delete_customer}`, params).then(
    (res: any) => res.data
  )
}

const getById = async (params?: any) => {
  return await sendPost(`${endpoint.customer_get_by_id}`, params).then(
    (res: any) => res.data
  )
}
const createByExcel = async (params?: any) => {
  return await sendPost(`${endpoint.create_by_excel}`, params).then(
    (res: any) => res.data
  )
}

const assignCustomerByUser = async (params?: any) => {
  return await sendPost(`${endpoint.assign_customer_by_user}`, params).then(
    (res: any) => res.data
  )
}

const updateFrequencyOfEmail = async (params?: any) => {
  return await sendPost(`${endpoint.update_frequency_by_email}`, params).then(
    (res: any) => res.data
  )
}

const updatePregnancyStatusSending = async (params?: any) => {
  return await sendPost(`${endpoint.pregnancy_status_sending}`, params).then(
    (res: any) => res.data
  )
}

const viewHistoryByCustomer = async (params?: any) =>
  await sendGet(`${endpoint.view_history_by_customer}`, params).then(
    (res) => res.data
  )

const updateStatusResponse = async (params?: any) =>
  await sendPost(`${endpoint.update_status_response}`, params).then(
    (res) => res.data
  )

const checkNameCustomer = async (params?: any) =>
  await sendPost(`${endpoint.check_name_exist_customer}`, params).then(
    (res) => res.data
  )

const searchCustomerByElasticSearch = async (params?: any) =>
  await sendGet(`${endpoint.search_customer_by_elastic_search}`, params).then(
    (res) => res.data
  )

const customerApi = {
  update,
  create,
  getAll,
  deletebyId,
  getById,
  createByExcel,
  assignCustomerByUser,
  updateFrequencyOfEmail,
  updatePregnancyStatusSending,
  viewHistoryByCustomer,
  updateStatusResponse,
  checkNameCustomer,
  searchCustomerByElasticSearch,
}

export default customerApi
