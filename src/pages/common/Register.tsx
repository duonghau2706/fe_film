import { Button, Col, ConfigProvider, Form, Input, Row } from 'antd'
import { useNavigate } from 'react-router-dom'

import { loginApi } from '@/adapter'
import accountApi from '@/adapter/account'
import bgRegister from '@/assets/image/bg-register.jpg'
import ContainerRegister from '@/layout/Container/Register'
import { URL } from '@/utils/constants'
import { createTimeStampFromMoment, create_UUID } from '@/utils/helper'
import moment from 'moment'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

const Register = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [emailRegister, setEmailRegister] = useState('')
  const [passwordRegister, setPasswordRegister] = useState()
  const [messageBtn, setMessageBtn] = useState('Bắt đầu')
  const [showMessage, setShowMessage]: any = useState('')

  const handleStart = () => {
    // const emailEntered = form.getFieldValue('emailEntered')
    // console.log('emailEntered', emailEntered)
    if (!emailRegister.includes('@')) {
      setShowMessage('Vui lòng nhập email hợp lệ.')
      return
    } else {
      setShowMessage(undefined)
      mutationExistedEmail.mutate({ email: emailRegister })
    }
    // if (!emailRegister) {
    //   setShowMessage('Vui lòng nhập email hợp lệ.')
    //   return
    // }
    //check email toonf tai chua

    // !emailExisted && setEmailRegister(emailEntered)
  }
  const handleFinish = () => {
    const passwordEntered = form.getFieldValue('passwordEntered')
    if (!passwordEntered) {
      setShowMessage('Mật khẩu phải chứa từ 4 đến 60 ký tự.')
      return
    }

    setPasswordRegister(passwordEntered)
    navigate(URL.SIGNUP, {
      state: { emailRegister, passwordRegister },
    })

    // send mail + them user moi
    mutationVerifyEmail.mutate({
      email: emailRegister,
      password: passwordEntered,
    })

    //add new account
    mutationAddAccount.mutate({
      id: create_UUID(),
      gender: 1,
      role: 0,
      is_member: false,
      deleted: false,
      renewal_date: createTimeStampFromMoment(moment()),
      created_at: createTimeStampFromMoment(moment()),
      updated_at: createTimeStampFromMoment(moment()),
      email: emailRegister,
      password: passwordEntered,
    })

    //login
    mutationLogin.mutate({ email: emailRegister, password: passwordEntered })
  }

  //login
  const mutationLogin = useMutation({
    mutationFn: (params: any) => loginApi.postLogin(params),
    onSuccess: (res) => {
      localStorage.setItem('token', res?.data?.token)
    },
    // onError: (err) => {
    //   console.log('err', err)
    // },
  })

  const mutationAddAccount = useMutation({
    mutationFn: (params: any) => accountApi.addNewAccount(params),
    onSuccess: () => {
      // toast.success('ok')
    },
  })

  const mutationExistedEmail = useMutation({
    mutationFn: (params: any) => accountApi.getUserByEmail(params),
    onSuccess: (res) => {
      if (res?.data?.data?.listUser > 0) {
        setShowMessage('Email đã tồn tại. Nhập địa chỉ email khác.')
        setMessageBtn('Bắt đầu')
      } else {
        setMessageBtn('Đăng ký')
      }
    },
  })

  const mutationVerifyEmail = useMutation({
    mutationFn: (params: any) => accountApi.verifyEmailRegistered(params),
    onSuccess: () => {
      toast.success(
        'Tạo tài khoản thành công. Vui lòng kiểm tra email đã đăng ký!',
        {
          autoClose: 3000, // Tự đóng sau 3000ms (3 giây)
          style: { marginTop: '50px' }, // Thêm style tùy chỉnh
        }
      )

      // setTimeout(() => {
      navigate(URL.SIGNUP)
      // }, 3000)
    },
    onError: () => {
      toast.error('Có lỗi xảy ra. Vui lòng xem lại!', {
        autoClose: 3000, // Tự đóng sau 3000ms (3 giây)
        style: { marginTop: '50px' }, // Thêm style tùy chỉnh
      })
    },
  })

  const validateEmail = (emailText: any) => {
    // setIsTouched(true)
    // if (!emailText?.target?.value?.includes('@')) {
    //   setShowMessage('Vui lòng nhập email hợp lệ.')
    // } else {
    //   setShowMessage(undefined)
    // }
    setEmailRegister(emailText?.target?.value)
  }

  return (
    <div
      className="bg-auto relative w-screen h-screen"
      style={{
        background: `linear-gradient(to top,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.5) 100%), repeating-linear-gradient(to bottom,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.5) 100%),
    url(${bgRegister})`,
      }}
    >
      <ContainerRegister />
      <div className="w-full flex flex-col items-center justify-center text-white mt-[30px] text-center">
        <h1 className="w-full px-40 text-[40px] flex justify-center items-center font-bold">
          Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác
        </h1>
        <h2>Xem ở mọi nơi. Hủy bất kỳ lúc nào.</h2>
        <p>
          Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách
          thành viên của bạn.
        </p>
        {messageBtn === 'Bắt đầu' ? (
          <Form form={form} className="w-[35%]">
            <Form.Item name="emailEntered" className="w-full">
              <Row gutter={5} className="w-full flex">
                <Col span={16}>
                  <ConfigProvider
                    theme={{
                      components: {
                        Input: {
                          activeBorderColor: 'white',
                          hoverBorderColor: 'white',
                        },
                      },
                    }}
                  >
                    <Input
                      className="w-full h-full border-[#2bb871] py-[10px] outline-none bg-[#161616b3] text-white placeholder:text-white"
                      onChange={validateEmail}
                      placeholder="Địa chỉ email"
                    />
                  </ConfigProvider>
                </Col>

                <Col span={8}>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: 'white',
                      },
                    }}
                  >
                    <Button
                      className="w-full h-full font-semibold bg-red-primary border-none text-white text-[18px] cursor-pointer hover:bg-red-secondary"
                      onClick={handleStart}
                      // htmlType="submit"
                    >
                      {messageBtn}
                    </Button>
                  </ConfigProvider>
                </Col>
              </Row>
              {showMessage?.trim().length > 0 && (
                <div className="text-red-600 my-1 flex justify-start">
                  {showMessage}
                </div>
              )}
            </Form.Item>
          </Form>
        ) : (
          <Form form={form} className="w-[35%]">
            <Form.Item name="passwordEntered" className="w-full">
              <Row gutter={5} className="w-full flex">
                <Col span={16}>
                  <ConfigProvider
                    theme={{
                      components: {
                        Input: {
                          activeBorderColor: 'white',
                          hoverBorderColor: 'white',
                        },
                      },
                    }}
                  >
                    <Input
                      className="w-full h-full border-[#2bb871] py-[10px] outline-none bg-[#161616b3] text-white placeholder:text-white"
                      placeholder="Nhập mật khẩu"
                      type="password"
                    />
                  </ConfigProvider>
                </Col>

                <Col span={8}>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: 'white',
                      },
                    }}
                  >
                    <Button
                      className="w-full h-full font-semibold bg-red-primary border-none text-white text-[18px] cursor-pointer hover:bg-red-secondary"
                      onClick={handleFinish}
                      // htmlType="submit"
                    >
                      {messageBtn}
                    </Button>
                  </ConfigProvider>
                </Col>
              </Row>
              {showMessage?.trim().length > 0 && (
                <div className="text-red-600 my-1 flex justify-start">
                  {showMessage}
                </div>
              )}
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  )
}

export default Register
