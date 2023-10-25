import logo from '@/assets/image/logo.png'
import { Button } from 'antd'

const Navbar = () => {
  return (
    <div>
      <div>
        <img src={logo} alt="logo" />
        <div className="flex">
          <Button>Trang chủ</Button>
          <Button>Phim T.hình</Button>
          <Button>Phim</Button>
          <Button>Mới & Phổ biến</Button>
          <Button>Danh sách của tôi</Button>
          <Button>Duyệt theo ngôn ngữ</Button>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Navbar
