import logoNetflix from '@/assets/image/logoNetFlix.png'
import { URL } from '@/utils/constants'
import { Button, ConfigProvider } from 'antd'
import { useNavigate } from 'react-router-dom'

const ContainerRegister = () => {
  const navigation = useNavigate()

  const handlerLogin = () => {
    navigation(URL.LOGIN)
  }
  return (
    <div>
      <header className="flex items-center justify-between px-[20px] w-[80%] mx-auto">
        <div className="px-[20px] py-[50px] flex items-center justify-between">
          <img className="h-[40px]" src={logoNetflix} alt="logo netflix" />
        </div>
        <div className="flex">
          <div>Tieng viet</div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: 'white',
              },
            }}
          >
            <Button
              className="bg-red-primary text-white border-none text-[15px] px-[15px] py-[7px] rounded-[7px] font-medium cursor-pointer flex items-center hover:bg-[#c11119]"
              onClick={handlerLogin}
            >
              Đăng nhập
            </Button>
          </ConfigProvider>
        </div>
      </header>
    </div>
  )
}

export default ContainerRegister
