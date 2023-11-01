import { sendPost } from '@/hook/axios'
import { endpoint } from '@/utils/constants'

// const getLogin = async (params: any) => {
//   return await sendGet(`${endpoint.get_all_inquiry}`, params).then(
//     (res) => res.data
//   )
// }
const postLogin = async (params: any) => {
  return await sendPost(`${endpoint.login}`, params).then((res) => res.data)
}

const LoginApi = {
  postLogin,
}

export default LoginApi
