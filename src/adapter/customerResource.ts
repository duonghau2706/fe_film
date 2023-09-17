import { endpoint } from '@/utils/constants'
import { sendGet, sendPost } from '@/hook/axios'

const searchCustomerResource = async (params?: any) => {
  return await sendGet(`${endpoint.get_all_customer_resource}`, params).then(
    (res) => res.data
  )
}
const getCustomerOfResource = async (params?: any) => {
  return await sendGet(`${endpoint.get_all_customer_of_resource}`, params).then(
    (res) => res.data
  )
}

const createCustomerResource = async (params: any) => {
  return await sendPost(`${endpoint.create_customer_resource}`, params).then(
    (res) => res.data
  )
}
const updateCustomerResource = async (params: any) => {
  return await sendPost(`${endpoint.update_customer_resource}`, params).then(
    (res) => res.data
  )
}

const deleteCustomerResource = async (params: any) => {
  return await sendPost(`${endpoint.delete_customer_resource}`, params).then(
    (res: any) => res.data
  )
}

const getHistorySendMail = async (params: any) => {
  return await sendGet(`${endpoint.get_all_history_send_mail}`, params).then(
    (res: any) => res.data
  )
}

const getWithCustomerSent = async (params: any) => {
  return await sendGet(`${endpoint.get_all_customer_sent}`, params).then(
    (res: any) => res.data
  )
}

const getImportHistoryCustomer = async (params: any) => {
  return await sendGet(
    `${endpoint.view_histories_import_customer}`,
    params
  ).then((res: any) => res.data)
}

const getDetailImportHistoryCustomer = async (params: any) => {
  return await sendGet(
    `${endpoint.view_detail_histories_import_customer}`,
    params
  ).then((res: any) => res.data)
}

const CustomerResourceApi = {
  searchCustomerResource,
  createCustomerResource,
  updateCustomerResource,
  deleteCustomerResource,
  getCustomerOfResource,
  getHistorySendMail,
  getWithCustomerSent,
  getImportHistoryCustomer,
  getDetailImportHistoryCustomer,
}

export default CustomerResourceApi
