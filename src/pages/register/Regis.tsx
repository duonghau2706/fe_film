import logoSANSAN from '@/assets/image/logoSANSAN.png'
import { URL } from '@/utils/constants'
import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const Regis = () => {
  const navigate = useNavigate()

  return (
    <div className="h-[100vh] bg-[#ffffff] pl-10 pt-5 pr-10">
      <div
        style={{ borderBottom: '1px solid #e6e6e6' }}
        className="relative pb-5"
      >
        <img className="h-[40px]" src={logoSANSAN} alt="logo netflix" />
        <Link
          to={URL.LOGIN}
          className="text-[19px] text-black-main font-semibold absolute right-0"
        >
          Đăng nhập
        </Link>
      </div>

      <div>
        <div className="flex mt-[80px] mx-auto justify-center w-[260px] h-[70px]">
          <img
            className="w-full h-full"
            src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png"
            alt="anh"
          />
        </div>
        <div
          style={{ lineHeight: '40px' }}
          className="text-black-primary flex justify-center text-[30px] font-bold mt-[30px] text-center"
        >
          Hoàn thành việc cài <br /> đặt tài khoản của bạn
        </div>
        <div className="text-black-main text-center text-[18px] mt-[15px] font-normal">
          SANSAN được cá nhân hóa cho riêng bạn. <br /> Tạo mật khẩu để xem
          SANSAN trên <br /> bất kỳ thiết bị nào, vào bất cứ lúc nào.
        </div>
        <div className="flex justify-center mt-5">
          <Button
            className="w-[340px] h-[65px] bg-red-600 text-white text-[25px] font-semibold hover:bg-red-light"
            onClick={() => navigate(URL.PLANFORM)}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Regis
