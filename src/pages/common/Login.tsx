/* eslint-disable no-unused-vars */
import { URL } from '@/utils/constants'
import { Button, Checkbox, Col, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useInput from '@/hook/use-input'
import logoNetFlix from '@/assets/image/logoNetFlix.png'
import bgHome from '@/assets/image/home.jpg'

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
    // navigate(URL.CUSTOMER)
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

  //logic
  const {
    value: enteredAccount,
    inputIsNotValid: accountIsNotValid,
    inputChangeHandler: accountChangeHandler,
    inputBlurHandler: accountBlurHandler,
    inputReset: accountReset,
  } = useInput(
    (value: any) => value.trim() === '' || !String(value).includes('@')
  )

  const {
    value: enteredPass,
    inputIsNotValid: passIsNotValid,
    inputChangeHandler: passChangeHandler,
    inputBlurHandler: passBlurHandler,
    inputReset: passReset,
  } = useInput((value: any) => value.length < 4 || value.length > 60)

  const formIsValid = !accountIsNotValid && !passIsNotValid

  const formSubmittedHandler = (event: any) => {
    event.preventDefault()
    if (accountIsNotValid || passIsNotValid) {
      return
    }

    accountReset()
    passReset()
  }

  //dung xoa
  const loginHandler = () => {
    navigate(URL.HOME)
  }

  return (
    <div
      className="w-screen h-screen bg-auto relative"
      style={{
        background: `linear-gradient(to top,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.5) 100%), repeating-linear-gradient(to bottom,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.5) 100%),
    url(${bgHome})`,
      }}
    >
      <header className="px-[7%] py-[30px] flex items-center justify-between">
        <img className="h-[40px]" src={logoNetFlix} alt="logo netflix" />
      </header>

      <main className="flex justify-center">
        <Col
          span={7}
          className="w-full px-[50px] bg-[#000000bf] rounded-[7px] pt-[30px] pb-[30px]"
        >
          <h1 className="text-[2rem]">Đăng nhập</h1>
          <div>
            <Input
              className="mb-3 h-10"
              placeholder="Email hoặc số điện thoại"
            />
            <Input className="mb-7 h-10" placeholder="Mật khẩu" />
          </div>
          <div>
            <Button
              className="w-full bg-red-primary text-white text-[16px] font-semibold border-none hover:bg-red-secondary py-5 items-center flex justify-center"
              onClick={loginHandler}
            >
              Đăng nhập
            </Button>
            <div className="flex mt-2 justify-between">
              <Checkbox className="flex items-center text-[#b3b3b3] text-[13px]">
                Ghi nhớ tôi
              </Checkbox>
              <div className="flex items-center text-[13px] text-[#b3b3b3]">
                Bạn cần trợ giúp?
              </div>
            </div>
            <div>
              <div className=" flex mt-10 text-[#737373]">
                <p className="mr-3 ">Bạn mới tham gia Netflix?</p>
                <Link className="text-white" to={URL.REGISTER}>
                  Đăng ký ngay.
                </Link>
              </div>
              <div className="text-[13px]">
                <p className="text-[#8c8c8c]">
                  Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không
                  phải là robot.
                  {/* <p>Tìm hiểu thêm</p> */}
                </p>
              </div>
            </div>
          </div>
        </Col>
      </main>
    </div>
  )

  // return (
  //   <div className="w-full h-[100vh] px-8 flex items-center justify-center bg-blue-fouth">
  //     <div className=" w-[1200px] h-[600px] flex ">
  //       <div className="w-2/3 h-full bg-admin-login bg-no-repeat bg-center bg-cover"></div>
  //       <div className="w-1/3 py-10 lg:gap-4 gap-2 bg-white">
  //         <div className="w-[120px] h-[120px] bg-login-logo bg-no-repeat bg-center bg-contain mx-auto"></div>
  //         <p className="font-bold lg:text-xl text-black text-center">
  //           Enjoy Your Journey With Us
  //         </p>
  //         <div className="mt-8">
  //           <p className="font-bold lg:text-3xl text-black text-center">
  //             Đăng nhập
  //           </p>
  //           <Button
  //             className="w-80 h-14 mx-auto block text-white mt-40 text-base font-bold bg-orange-primary"
  //             onClick={handleLoginMsTeams}
  //           >
  //             Đăng nhập qua Microsoft Teams
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}
export default Login
