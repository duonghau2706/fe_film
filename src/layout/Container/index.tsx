// import LogoAdmin from '@/assets/image/logoAdmin.svg'
import logoNetflix from '@/assets/image/logoNetFlix.png'
// import Logout from '@/assets/image/logout.svg'
import style from '@/common.module.scss'
import { Outlet } from 'react-router-dom'
// import { SearchOutlined } from '@ant-design/icons'
import {
  ArrowDropDown,
  Notifications,
  Search,
  // CloseSharp,
} from '@material-ui/icons'

// import useToken from '@/hook/token'
import { Button } from 'antd'
// import { useState } from 'react'

const ContainerBody = () => {
  // const { verifyToken } = useToken()
  // const { decode } = verifyToken()

  // const handleLogout = () => {
  //   localStorage.removeItem('dataSearch')
  //   localStorage.removeItem('token')
  //   // navigate(URL.LOGIN)
  //   location.replace(
  //     `${import.meta.env.VITE_BASE_API_URl}/api/v1/ms-teams/auth/signout`
  //   )
  // }

  //NEW
  //SCROLL__BAR--SKIP
  // const [isScrolled, setIsScrolled] = useState(true)

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true)
  //   return () => (window.onscroll = null)
  // }

  return (
    <div className={style.wrapper}>
      <div
        className="h-[64px] w-full flex justify-between items-center pr-4 fixed pl-10 z-[9999]"
        style={{
          background:
            'linear-gradient(to top, transparent 0%, rgb(0, 0, 0, 0.8) 100%)',
        }}
      >
        <div className="flex gap-2 cursor-pointer justify-end">
          <img src={logoNetflix} height={25} className="my-auto" />
          <div className="flex">
            <Button className="bg-transparent border-none text-white font-semibold px-[10px]">
              Trang chủ
            </Button>
            <Button className="bg-transparent border-none text-white font-semibold px-[10px]">
              Phim T.hình
            </Button>
            <Button className="bg-transparent border-none text-white font-semibold px-[10px]">
              Phim
            </Button>
            <Button className="bg-transparent border-none text-white font-semibold px-[10px]">
              Mới & Phổ biến
            </Button>
            <Button className="bg-transparent border-none text-white font-semibold px-[10px]">
              Danh sách của tôi
            </Button>
            <Button className="bg-transparent border-none text-white font-semibold px-[10px]">
              Duyệt theo ngôn ngữ
            </Button>
          </div>
        </div>

        <div className="flex pr-10 gap-4 items-center">
          <Search />
          <Notifications />
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="w-[30px] h-[30px] rounded-[5px] object-cover cursor-pointer"
            />
            <ArrowDropDown />
          </div>
        </div>
      </div>

      <div className="bg-[#F5F5F5] min-h-[calc(100vh)] overflow-auto h-[calc(100vh)]">
        <Outlet />
      </div>
    </div>
  )
}

export default ContainerBody
