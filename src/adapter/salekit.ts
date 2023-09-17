import { endpoint } from '@/utils/constants'
import { sendGet } from '@/hook/axios'

const getHistoryDocument = async (params?: any) => {
  // console.log(params)
  return await sendGet(`${endpoint.get_history_document}`, params).then(
    (res) => res.data
  )
}

const SalekitApi = {
  getHistoryDocument,
}

export default SalekitApi
