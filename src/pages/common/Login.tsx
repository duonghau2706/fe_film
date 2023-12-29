/* eslint-disable no-unused-vars */
import { URL } from '@/utils/constants'
import { Button, Checkbox, Col, ConfigProvider, Form, Input } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// import useInput from '@/hook/use-input'
import bgHome from '@/assets/image/home.jpg'
import logoSANSAN from '@/assets/image/logoSANSAN.png'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useMutation } from 'react-query'

import { loginApi, userApi } from '@/adapter'
import { toast } from 'react-toastify'

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
}
// const windowProps = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=800, height=800`

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [showMessage, setShowMessage] = useState('')

  //update status is_member
  const mutationUpdateStatus = useMutation({
    mutationFn: (params: any) => userApi.updateStatusMember(params),
    onSuccess: () => {
      // toast.success('Vui ')

      mutationLogin.mutate({
        email: form.getFieldValue('email'),
        password: form.getFieldValue('password'),
      })
    },
  })

  const loginHandler = () => {
    const email = form.getFieldValue('email')
    const password = form.getFieldValue('password')

    if (email && !password) {
      setShowMessage('Mật khẩu phải chứa từ 4 đến 60 ký tự.')
    } else if (!email && password) {
      setShowMessage('Vui lòng nhập email hợp lệ.')
    } else if (!email && !password) {
      setShowMessage('Vui lòng nhập tài khoản hợp lệ.')
    } else {
      mutationUpdateStatus.mutate({ email })
    }
  }

  const mutationLogin = useMutation({
    mutationFn: (params: any) => loginApi.postLogin(params),
    onSuccess: (res) => {
      res.data.token
        ? navigate(URL.HOME)
        : setShowMessage('Tài khoản hoặc mật khẩu không đúng.')
      localStorage.setItem('token', res?.data?.token)
    },
    onError: () => {
      toast.error('Tài khoản hoặc mật khẩu không đúng.')
    },
  })

  // const { data } = useQuery({
  //   queryKey: [QUERY_KEY.LOGIN, enteredAccount, enteredPass],
  //   queryFn: () => {
  //     loginApi
  //       .postLogin({ email: enteredAccount, passsword: enteredPass })
  //       .then((res) => {
  //         console.log('res', res)
  //         return res
  //       })
  //   },
  // })

  const onChange = (e: CheckboxChangeEvent) => {
    // console.log(`checked = ${e.target.checked}`)
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
        <img className="h-[40px]" src={logoSANSAN} alt="logo netflix" />
      </header>

      <main className="flex justify-center">
        <Col
          span={7}
          className="w-full px-[50px] bg-[#000000bf] rounded-[7px] pt-[30px] pb-[30px]"
        >
          <h1
            className={
              showMessage.length > 0 ? 'text-[2rem] mb-0' : 'text-[2rem]'
            }
          >
            Đăng nhập
          </h1>
          {showMessage.length > 0 && (
            <div className="text-red-600 my-1">{showMessage}</div>
          )}
          <Form form={form} validateMessages={validateMessages}>
            <Form.Item name="email">
              <Input className="mb-3 h-10" placeholder="Email" />
            </Form.Item>

            <Form.Item name="password">
              <Input
                className="mb-7 h-10"
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
          </Form>
          <div>
            <Button
              className="w-full bg-red-primary text-white text-[16px] font-semibold border-none hover:bg-red-secondary py-5 items-center flex justify-center"
              htmlType="submit"
              onClick={loginHandler}
            >
              Đăng nhập
            </Button>
            <div className="flex mt-2 justify-between">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#1677ff',
                  },
                }}
              >
                <Checkbox
                  className="flex items-center text-[#b3b3b3] text-[13px]"
                  onChange={onChange}
                >
                  Ghi nhớ tôi
                </Checkbox>
              </ConfigProvider>
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
