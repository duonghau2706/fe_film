import { sendDelete, sendGet } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const getQuantityByType = async (params: any) =>
  await sendGet(`${endpoint.get_quantity_document_by_type}`, params).then(
    (res) => res.data
  )

const getListDocuments = async (params?: any) =>
  await sendGet(`${endpoint.get_all_document}`, params).then((res) => res.data)

const deleteById = async (params?: any) => {
  await sendDelete(`${endpoint.delete_document}`, {
    data: { id: params?.id },
  }).then((res) => res.data)
}

const documentAPI = {
  getQuantityByType,
  getListDocuments,
  deleteById,
}

export default documentAPI
