import { endpoint } from '@/utils/constants'
import { sendGet } from '@/hook/axios'

const get_by_date_case = async (params?: any) =>
  await sendGet(`${endpoint.get_by_date_case}`, params).then((res) => res.data)

const get_by_date_response = async (params?: any) =>
  await sendGet(`${endpoint.get_by_date_response}`, params).then(
    (res) => res.data
  )

const getCustomerRepsponsd = async (params?: any) => {
  return await sendGet(
    `${endpoint.get_all_customer_resource_responsed}`,
    params
  ).then((res) => res.data)
}

const dashBoardApi = {
  get_by_date_case,
  get_by_date_response,
  getCustomerRepsponsd,
}

export default dashBoardApi
