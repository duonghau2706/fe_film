import { URL } from '@/utils/constants'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import useToken from '@/hook/token'
import { instance } from '@/hook/axios'

const { verifyToken } = useToken()
const Authentication = () => {
  // if(token == null) return <Navigate to={SYSTEM_PATH.LOGIN}/>
  const { error } = verifyToken()

  if (error) {
    return <Navigate to={URL.LOGIN} />
  }

  const navigate = useNavigate()

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (error.response.status === 403) {
        navigate(URL.LOGIN)
      }
      return Promise.reject(error)
    }
  )
  return <Outlet />
}

export default Authentication
