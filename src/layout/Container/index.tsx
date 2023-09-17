import LogoAdmin from '@/assets/image/logoAdmin.svg'
import Logout from '@/assets/image/logout.svg'
import Logo from '@/assets/image/logo.png'
import LogoH from '@/assets/image/logo_h.png'
import style from '@/common.module.scss'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import SideBar from './SideBar'
import useToken from '@/hook/token'
import { URL } from '@/utils/constants'

const { Sider } = Layout

const ContainerBody = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(window.innerWidth <= 1024)

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('dataSearch')
    localStorage.removeItem('token')
    // navigate(URL.LOGIN)
    location.replace(
      `${import.meta.env.VITE_BASE_API_URl}/api/v1/ms-teams/auth/signout`
    )
  }

  return (
    <div className={style.wrapper}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="h-screen bg-[#001233] fixed top-0 left-0 transition-all duration-500"
        width={250}
      >
        <div className="relative h-screen cursor-pointer">
          {!collapsed ? (
            <div
              className="px-4 py-[4px] bg-white h-[60px] flex justify-center items-center"
              onClick={() => navigate(URL.HOME)}
            >
              <img src={Logo} width={150} height={50} />
            </div>
          ) : (
            <div
              className="px-4 py-[4px] bg-white h-[60px] flex justify-center items-center"
              onClick={() => navigate(URL.HOME)}
            >
              <img src={LogoH} width={35} height={45} />
            </div>
          )}
          <div className="mt-2">
            <SideBar />
          </div>
        </div>
      </Sider>
      <div
        className={`${
          collapsed ? 'ml-[80px]' : 'ml-[250px]'
        } h-screen transition-all duration-500 top-0 inset-x-0 fixed z-30 transition-position lg:w-auto`}
      >
        <div>
          <div className="h-[60px] flex justify-between items-center pr-4 ">
            {collapsed ? (
              <MenuUnfoldOutlined
                style={{ fontSize: '30px', color: '' }}
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : (
              <MenuFoldOutlined
                style={{ fontSize: '30px', color: '' }}
                onClick={() => setCollapsed(!collapsed)}
              />
            )}

            <div className="flex gap-2 cursor-pointer justify-end">
              <img src={LogoAdmin} width={18} height={23}></img>
              <label className="cursor-pointer mt-[3px] font-bold">
                {decode?.name}
              </label>

              <div
                className="flex gap-2 cursor-pointer ml-4 justify-end items-center"
                onClick={handleLogout}
              >
                <label className="cursor-pointer text-red-primary font-semibold underline -translate-y-[1px] mt-[3px]">
                  Đăng xuất
                </label>
                <img src={Logout} width={20} height={18}></img>
              </div>
            </div>
          </div>
          <div className="bg-[#001233] h-1"></div>
        </div>
        <div className="bg-[#F5F5F5] min-h-[calc(100vh-64px)] overflow-auto h-[calc(100vh-64px)]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ContainerBody
