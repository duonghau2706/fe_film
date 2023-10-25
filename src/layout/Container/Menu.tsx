import useToken from '@/hook/token'
import Home from '@/pages/Home'
import { URL } from '@/utils/constants'
import {
  FileTextOutlined,
  MailOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  // HomeOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

const role = {
  admin: 0,
  staff: 1,
  collaborators: 2,
}

const SideBar = () => {
  const navigate = useNavigate()
  const [openKeys, setOpenKeys] = useState(['sub1'])
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const items: MenuItem[] = useMemo(() => {
    return [
      getItem('Trang chủ', URL.HOME, <Home />),
      getItem('Phim T.hình', `URL.CUSTOMER_RESOURCE`, <GlobalOutlined />),
      getItem('Quản lý khách hàng', `URL.CUSTOMER`, <TeamOutlined />),
      ...(decode?.role === role.admin
        ? [getItem('Quản lý người dùng', `URL.USER`, <UserOutlined />)]
        : []),
      getItem('Quản lý gửi', 'sub3', <MailOutlined />, [
        getItem('Quản lý gửi mail', `URL.EMAIL_MANAGEMENT`.concat(`/1`)),
        getItem('Quản lý gửi inquiry', `URL.INQUIRY_MANAGEMENT`.concat(`/1`)),
      ]),

      getItem(
        'Quản lý template',
        `URL.TEMPLATE_MANAGEMENT`.concat(`/1`),
        <FileTextOutlined />
      ),
      getItem('Quản lý tài liệu', `URL.DOCUMENT`, <FileTextOutlined />),
      getItem('Thông tin liên hệ', `URL.CONTACT_INFOR`, <InfoCircleOutlined />),

      // getItem('Quản lý lịch hẹn', URL.SCHEDULE, <CalendarOutlined />),
      // getItem('Quản lý danh mục', 'sub2', <BarsOutlined />, [
      //   getItem('Danh mục roles', URL.ROLE),
      //   getItem('Danh mục folder KH', URL.FOLDER),
      //   getItem('Danh mục lĩnh vực', URL.FIEL),
      //   getItem('Danh mục nhóm template', URL.GROUP_TEMPLATE_LIST),
      // ]),
    ]
  }, [])

  const handleClick = (keys: any) => {
    if (keys.key !== `URL.CUSTOMER`) localStorage.removeItem('dataSearch')
    navigate(keys.key)
  }

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={handleClick}
      items={items}
    />
  )
}

export default SideBar
