import { sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

const create = async (params?: any) => {
  return await sendPost(
    `${endpoint.create_transaction_histories}`,
    params
  ).then((res) => res.data)
}

const transactionHistoriesApi = {
  create,
}

export default transactionHistoriesApi
