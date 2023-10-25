import { Button, Col, ConfigProvider, Input, Row } from 'antd'
import { Link } from 'react-router-dom'

import bgRegister from '@/assets/image/bg-register.jpg'
import ContainerRegister from '@/layout/Container/Register'

const Register = () => {
  const handleStart = () => {
    // setEmail(emailRef?.current?.value);
  }
  const handleFinish = () => {
    // setPassword(passwordRef?.current?.value);
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
        {!false ? (
          <Row gutter={5} className="w-[35%] flex">
            <Col span={17}>
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
                  placeholder="Địa chỉ email"
                />
              </ConfigProvider>
            </Col>

            <Col span={7}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: 'white',
                  },
                }}
              >
                <Button
                  className="w-full h-full font-semibold bg-red-primary border-none text-white text-[20px] cursor-pointer hover:bg-red-secondary"
                  onClick={handleStart}
                >
                  Bắt đầu
                </Button>
              </ConfigProvider>
            </Col>
          </Row>
        ) : (
          <form className="input">
            <input type="password" placeholder="password" />
            <Link to="/home" className="startButton">
              <button className="registerButton" onClick={handleFinish}>
                Start
              </button>
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}

export default Register
