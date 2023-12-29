import iconPaymentNext from '@/assets/image/icon_payment_next.svg'
import logoSANSAN from '@/assets/image/logoSANSAN.png'
import { URL } from '@/utils/constants'
import { CreditCardOutlined } from '@ant-design/icons'
import { Button, ConfigProvider } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Payment = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { serviceSelected } = state

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
          Đăng xuất
        </Link>
      </div>

      <div>
        <div className="flex mt-[50px] mx-auto justify-center w-[50px] h-[50px]">
          <img
            className="w-full h-full"
            src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Lock.png"
            alt="anh"
          />
        </div>
        <div
          style={{ lineHeight: '40px' }}
          className="text-black-primary flex justify-center text-[30px] font-bold mt-[30px] text-center"
        >
          Chọn cách thanh toán
        </div>
        <div className="text-black-main text-center text-[18px] mt-[15px] font-normal">
          Quá trình thanh toán của bạn được mã hóa và bạn <br /> có thể thay đổi
          cách thanh toán bất kỳ lúc nào.
        </div>
        <div
          style={{ lineHeight: '25px' }}
          className=" text-black-main text-center text-[18px] mt-[15px] font-semibold"
        >
          An toàn để tâm. <br /> Hủy trực tuyến dễ dàng.
        </div>

        <div className="flex justify-center mt-5">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#141414',
              },
            }}
          >
            <Button
              style={{ border: '2px solid #ccc' }}
              className="relative w-[500px] h-[65px] bg-white text-black-primary text-[18px] flex items-center justify-betwee"
              onClick={() =>
                navigate(URL.CREDIT_OPTIONS, {
                  state: { serviceSelected },
                })
              }
            >
              <div>Thẻ ngân hàng</div>
              <CreditCardOutlined
                className="ml-[10px]"
                style={{ fontSize: '22px' }}
              />
              {/* <img
              className="w-[39px] h-[25px] ml-1"
              src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/VISA@2x.png"
              alt="visa"
            />
            <img
              className="w-[39px] h-[25px] ml-1"
              src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png"
              alt="visa2"
            />
            <img
              className="w-[39px] h-[25px] ml-1"
              src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/AMEX.png"
              alt="visa3"
            /> */}
              <img
                className="absolute right-2"
                src={iconPaymentNext}
                alt="icon next"
              />
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default Payment
