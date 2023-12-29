import logoSANSAN from '@/assets/image/logoSANSAN.png'
import tickPlanForm from '@/assets/image/tick-planform.svg'

import { QUERY_KEY, URL } from '@/utils/constants'

import { Button } from 'antd'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { userApi } from '@/adapter'
import useToken from '@/hook/token'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const PlanForm = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const [searchParams] = useSearchParams()

  const bankName = searchParams.get('bankName')
  const bankAccount = searchParams.get('bankAccount')
  const money = searchParams.get('money')
  const indexCurService = searchParams.get('indexCurService')

  const navigate = useNavigate()

  //get infor user
  const [profileUser, setProfileUser]: any = useState()
  useQuery({
    queryKey: [QUERY_KEY.GET_PROFILE_USER],
    queryFn: async () => {
      return await userApi.getProfile({ userId: decode?.id }).then((res) => {
        setProfileUser(res?.data?.data?.[0])
      })
    },
  })

  const [serviceSelected, setServiceSelected]: any = useState(
    indexCurService ? Number(indexCurService) : profileUser?.service
  )

  useEffect(() => {
    setServiceSelected(
      indexCurService ? Number(indexCurService) : profileUser?.service
    )
  }, [indexCurService, profileUser?.service])

  const nextStepHandler = () => {
    indexCurService
      ? navigate(URL.SETUP_PAYMENT, {
          state: { serviceSelected, bankName, bankAccount, money },
        })
      : navigate(URL.PAYMENT, {
          state: { serviceSelected },
        })
  }

  return (
    <div className="bg-[#ffffff] pl-10 pt-5 pr-10 pb-[60px]">
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

      <div className="pl-[130px] pr-[150px]">
        <div className="text-black-primary font-bold text-[30px]">
          <div className="my-5 mb-[14px]">Chọn gói dịch vụ phù hợp với bạn</div>
          <div className="flex gap-[10px] items-center mb-3">
            <div className="flex">
              <img src={tickPlanForm} alt="tick" />
            </div>
            <div className="text-[18px] font-medium">
              Xem mọi nội dung bạn muốn. Không có quảng cáo.
            </div>
          </div>

          <div className="flex gap-[10px] items-center mb-3">
            <div className="flex">
              <img src={tickPlanForm} alt="tick" />
            </div>
            <div className="text-[18px] font-medium">
              Đề xuất dành riêng cho bạn.
            </div>
          </div>

          <div className="flex gap-[10px] items-center mb-3">
            <div className="flex">
              <img src={tickPlanForm} alt="tick" />
            </div>
            <div className="text-[18px] font-medium">
              Thay đổi hoặc hủy gói dịch vụ của bạn bất cứ khi nào.
            </div>
          </div>
        </div>

        <div className="text-white flex gap-[24px] justify-end mt-[50px]">
          <div
            style={{ opacity: serviceSelected === 0 ? '1' : '.6' }}
            className="rounded border-[2px] font-semibold text-[17px] bg-[#e50914] flex items-center justify-center w-[120px] h-[120px] cursor-pointer"
            onClick={() => {
              setServiceSelected(0)
            }}
          >
            Di động
          </div>
          <div
            style={{ opacity: serviceSelected === 1 ? '1' : '.6' }}
            className="rounded border-[2px] font-semibold text-[17px] bg-[#e50914] flex items-center justify-center w-[120px] h-[120px] cursor-pointer"
            onClick={() => {
              setServiceSelected(1)
            }}
          >
            Cơ bản
          </div>
          <div
            style={{ opacity: serviceSelected === 2 ? '1' : '.6' }}
            className="rounded border-[2px] font-semibold text-[17px] bg-[#e50914] flex items-center justify-center w-[120px] h-[120px] cursor-pointer"
            onClick={() => {
              setServiceSelected(2)
            }}
          >
            Tiêu chuẩn
          </div>
          <div
            style={{ opacity: serviceSelected === 3 ? '1' : '.6' }}
            className="rounded border-[2px] font-semibold text-[17px] bg-[#e50914] flex items-center justify-center w-[120px] h-[120px] cursor-pointer"
            onClick={() => {
              setServiceSelected(3)
            }}
          >
            Cao cấp
          </div>
        </div>
      </div>

      <div className="pl-[130px] pr-[150px]">
        <div
          style={{ borderBottom: '1px solid #ccc' }}
          className="flex justify-between pt-4 pb-5"
        >
          <div className="text-black-primary font-medium">Giá hàng tháng</div>
          <div className="flex w-[565px]">
            <div
              style={{ color: serviceSelected === 0 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[45px]"
            >
              70.000 ₫
            </div>
            <div
              style={{ color: serviceSelected === 1 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[123px]"
            >
              108.000 ₫
            </div>
            <div
              style={{ color: serviceSelected === 2 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[197px]"
            >
              220.000 ₫
            </div>
            <div
              style={{ color: serviceSelected === 3 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[270px]"
            >
              260.000 ₫
            </div>
          </div>
        </div>

        <div
          style={{ borderBottom: '1px solid #ccc' }}
          className="flex justify-between pt-5 pb-5"
        >
          <div className="text-black-primary font-medium">Chất lượng video</div>
          <div className="flex w-[565px]">
            <div
              style={{ color: serviceSelected === 0 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[60px]"
            >
              Tốt
            </div>
            <div
              style={{ color: serviceSelected === 1 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[180px]"
            >
              Tốt
            </div>
            <div
              style={{ color: serviceSelected === 2 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[287px]"
            >
              Tốt hơn
            </div>
            <div
              style={{ color: serviceSelected === 3 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[370px]"
            >
              Tốt nhất
            </div>
          </div>
        </div>

        <div
          style={{ borderBottom: '1px solid #ccc' }}
          className="flex justify-between pt-5 pb-5"
        >
          <div className="text-black-primary font-medium">Độ phân giải</div>
          <div className="flex w-[565px]">
            <div
              style={{ color: serviceSelected === 0 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[55px]"
            >
              480p
            </div>
            <div
              style={{ color: serviceSelected === 1 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[165px]"
            >
              720p
            </div>
            <div
              style={{ color: serviceSelected === 2 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[270px]"
            >
              1080p
            </div>
            <div
              style={{ color: serviceSelected === 3 ? '#e50914' : '#737373' }}
              className="font-semibold relative left-[365px]"
            >
              4K+HDR
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Button
          className="w-[340px] h-[65px] bg-[#e50914] text-white text-[25px] font-semibold hover:bg-red-light"
          onClick={nextStepHandler}
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  )
}

export default PlanForm
