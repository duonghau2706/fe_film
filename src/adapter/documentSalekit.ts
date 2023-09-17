import { sendGet, sendPost, sendPut } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const uploadfile = async (params?: any) => {
  return await sendPost(`${endpoint.upload_file_url}`, params).then(
    (res) => res
  )
}
const createfile = async (params?: any) => {
  return await sendPost(`${endpoint.create_url_file}`, params).then(
    (res) => res
  )
}
const documentCategories = async (params?: any) => {
  return await sendGet(`${endpoint.document_file_categories}`, params).then(
    (res) => res
  )
}
const getDocumentResource = async (params?: any) => {
  return await sendGet(`${endpoint.list_document_resource}`, params).then(
    (res) => res.data
  )
}
const getDocumentById = async (params?: any) => {
  const newData = { id: params }
  return await sendGet(`${endpoint.get_document_by_id}`, newData).then(
    (res) => res?.data
  )
}
const updateDocument = async (params?: any) => {
  return await sendPut(`${endpoint.update_document_by_id}`, params).then(
    (res) => res
  )
}
const DocumentSalekitApi = {
  uploadfile,
  createfile,
  documentCategories,
  getDocumentResource,
  getDocumentById,
  updateDocument,
}
export default DocumentSalekitApi
