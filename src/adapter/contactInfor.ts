import { endpoint } from '@/utils/constants'
import { sendGet, sendPost } from '@/hook/axios'

const getAll = async (params?: any) =>
  await sendGet(`${endpoint.get_contact_infor}`, params).then((res) => res.data)

const update = async (params?: any) => {
  return await sendPost(`${endpoint.update_contact_infor}`, params).then(
    (res: any) => res.data
  )
}
const findById = async (params?: any) => {
  return await sendGet(`${endpoint.find_by_id_contact_infor}`, params).then(
    (res: any) => res.data
  )
}

const contactInforApi = {
  update,
  getAll,
  findById,
}

export default contactInforApi
