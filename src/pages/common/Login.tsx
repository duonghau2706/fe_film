/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { Button, Form, Input, Row, Col, Checkbox, message } from 'antd'
import { URL } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'
import iconMsTeams from '@/assets/icons8-microsoft-teams-2019.svg'

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
}
const windowProps = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=800, height=800`

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    const user = {
      ...values,
    }
    alert(user)
    navigate(URL.CUSTOMER)
  }

  const handleLoginMsTeams = () => {
    const popup = window.open(
      `${import.meta.env.VITE_WEB_URL}${URL.lOGIN_MS_TEAMS}?loginType=login`,
      'Pop up window',
      windowProps
    )
    popup?.postMessage('message', import.meta.env.VITE_WEB_URL)
  }

  useEffect(() => {
    const childResponse = (event: any) => {
      if (event?.data?.token) {
        localStorage.setItem('token', event?.data?.token)
        navigate('/')
        return
      }

      if (event?.data?.token && !event?.data?.message) {
        message.error('Login failed')
        return
      }
    }
    window.addEventListener('message', childResponse)
    return () => window.removeEventListener('message', childResponse)
  }, [])

  return (
    <div className="w-full h-[100vh] px-8 flex items-center justify-center bg-blue-fouth">
      <div className=" w-[1200px] h-[600px] flex ">
        <div className="w-2/3 h-full bg-admin-login bg-no-repeat bg-center bg-cover"></div>
        <div className="w-1/3 py-10 lg:gap-4 gap-2 bg-white">
          <div className="w-[120px] h-[120px] bg-login-logo bg-no-repeat bg-center bg-contain mx-auto"></div>
          <p className="font-bold lg:text-xl text-black text-center">
            Enjoy Your Journey With Us
          </p>
          <div className="mt-8">
            <p className="font-bold lg:text-3xl text-black text-center">
              Đăng nhập
            </p>
            <Button
              className="w-80 h-14 mx-auto block text-white mt-40 text-base font-bold bg-orange-primary"
              onClick={handleLoginMsTeams}
            >
              Đăng nhập qua Microsoft Teams
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
