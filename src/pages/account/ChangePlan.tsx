import logoSANSAN from '@/assets/image/logoSANSAN.png'
import tickChangePlan from '@/assets/image/tick-change-plan.png'
import style from '@/common.module.scss'
import {
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import { ArrowDropDown } from '@material-ui/icons'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import { Link, useNavigate } from 'react-router-dom'

import { queryClient } from '@/App'
import { userApi } from '@/adapter'
import useToken from '@/hook/token'
import { QUERY_KEY, SERVICE, URL } from '@/utils/constants'
import { Button, ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import '../../layout/Container/index.scss'

const ChangePlan = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const navigate = useNavigate()

  const handlerLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  //get infor user
  const [profileUser, setProfileUser]: any = useState()
  useQuery({
    queryKey: [QUERY_KEY.GET_PROFILE_USER],
    queryFn: () => {
      userApi.getProfile({ userId: decode?.id }).then((res) => {
        setProfileUser(res?.data?.data?.[0])
      })
    },
  })

  const [selected, setSelected]: any = useState({
    idx0: false,
    idx1: false,
    idx2: false,
    idx3: false,
  })

  useEffect(() => {
    if (profileUser?.service === 0) {
      setSelected({
        idx0: true,
        idx1: false,
        idx2: false,
        idx3: false,
      })
    } else if (profileUser?.service === 1) {
      setSelected({
        idx0: false,
        idx1: true,
        idx2: false,
        idx3: false,
      })
    } else if (profileUser?.service === 2) {
      setSelected({
        idx0: false,
        idx1: false,
        idx2: true,
        idx3: false,
      })
    } else {
      setSelected({
        idx0: false,
        idx1: false,
        idx2: false,
        idx3: true,
      })
    }
  }, [profileUser?.service])

  const onChangePlan = (index: number) => {
    setSelected((prevSelected: any) => {
      // Tạo một bản sao mới của trạng thái trước đó
      const newSelected = { ...prevSelected }

      // Đặt giá trị mới cho chỉ mục được click, và đặt tất cả các giá trị khác thành false
      Object.keys(newSelected).forEach((key) => {
        newSelected[key] = key === `idx${index}`
      })

      return newSelected
    })
  }

  const mutationUpdateAccount = useMutation({
    mutationFn: (params: any) => userApi.updateAccount(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_PROFILE_USER])
      toast.success('Thay đổi gói dịch vụ thành công.', {
        autoClose: 3000,
        style: { marginTop: '50px' },
      })
      navigate(URL.ACCOUNT)
    },
  })

  const onSelectService = () => {
    const serviceSelected = selected.idx0
      ? 0
      : selected.idx1
      ? 1
      : selected.idx2
      ? 2
      : 3

    const dataUser = {
      userId: profileUser.id,
      bankName: profileUser.bank_name,
      bankAccount: profileUser.bank_account,
      money: profileUser.money,
      service: serviceSelected,
      updatedAt: profileUser.updated_at,
      renewalDate: profileUser.renewal_date,
    }

    mutationUpdateAccount.mutate(dataUser)
  }

  return (
    <div className={style.wrapper}>
      <div
        className="bg-black-main h-[70px] w-full flex justify-between items-center pr-4 fixed pl-10 z-[9999]"
        style={{
          background: '#0b0b0b',
        }}
      >
        <div
          // onBlur={() => setIsSearch(false)}
          className="flex pr-10 gap-4 items-center w-full justify-between"
        >
          <img src={logoSANSAN} height={30} className="my-auto" />
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="w-[30px] h-[30px] rounded-[5px] object-cover cursor-pointer"
            />

            <div className="profile w-[50px]">
              <ArrowDropDown className="mt-1" />
              <div className="options">
                <Link to={URL.MANAGE} className="changeColor">
                  <span>Cài đặt</span>
                </Link>
                <Link to={URL.ACCOUNT} className="changeColor">
                  <span>Tài khoản</span>
                </Link>
                <div className="changeColor" onClick={handlerLogout}>
                  <span className="font-semibold">Đăng xuất</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-[#F5F5F5] min-h-[calc(100vh)] overflow-x-hidden h-[calc(100vh)]"> */}
      <div className="bg-[#F5F5F5] overflow-x-hidden pb-5">
        <div className="pt-[80px] px-[120px] text-black-primary">
          <div className="text-[34px] font-medium mb-4">
            Thay đổi gói dịch vụ phát trực tuyến
          </div>

          <div
            style={{
              border: selected.idx0 ? '4px solid #4057EF' : '4px solid #ccc',
            }}
            className="mb-5 cursor-pointer"
            onClick={() => onChangePlan(0)}
          >
            <div className="flex  rounded-[2px] relative">
              {selected.idx0 && (
                <div className="w-[42px] h-[42px] absolute left-[-21px] top-[31px]">
                  <img
                    className="w-full h-full bg-white rounded-[50%] border-none border-0"
                    src={tickChangePlan}
                    alt="tick"
                  />
                </div>
              )}
              <div
                style={{
                  backgroundColor: selected.idx0 ? '#cccccc' : '#F3F3F3',
                }}
                className="w-[150px] h-[104px] pl-[19px] py-[9px] font-medium flex justify-center items-center"
              >
                {SERVICE[0].value.name}
              </div>
              <div className="w-[700px] pl-[20px] py-[9px] flex justify-center items-center bg-[#ffffff]">
                Chất lượng hình ảnh tốt ở chế độ SD (480p). Xem trên điện thoại
                và máy tính bảng bất kỳ, không quảng cáo. Không bao gồm máy tính
                cá nhân và TV. Tải xuống trên 1 thiết bị.
              </div>
              <div className="w-[300px] flex justify-center items-center pl-10 text-[19px] font-medium bg-[#ffffff]">
                {SERVICE[0].value.cost.toLocaleString()} ₫/tháng
              </div>
            </div>
          </div>

          <div
            style={{
              border: selected.idx1 ? '4px solid #4057EF' : '4px solid #ccc',
            }}
            className="mb-5 cursor-pointer"
            onClick={() => onChangePlan(1)}
          >
            <div className="flex  rounded-[2px] relative">
              {selected.idx1 && (
                <div className="w-[42px] h-[42px] absolute left-[-21px] top-[31px]">
                  <img
                    className="w-full h-full bg-white rounded-[50%] border-none border-0"
                    src={tickChangePlan}
                    alt="tick"
                  />
                </div>
              )}
              <div
                style={{
                  backgroundColor: selected.idx1 ? '#cccccc' : '#F3F3F3',
                }}
                className="w-[150px] h-[104px] pl-[19px] py-[9px] font-medium flex justify-center items-center"
              >
                {SERVICE[1].value.name}
              </div>
              <div className="w-[700px] pl-[20px] py-[9px] flex justify-center items-center bg-[#ffffff]">
                Chất lượng hình ảnh tốt ở chế độ SD (480p). Xem trên điện thoại
                và máy tính bảng bất kỳ, không quảng cáo. Không bao gồm máy tính
                cá nhân và TV. Tải xuống trên 1 thiết bị.
              </div>
              <div className="w-[300px] flex justify-center items-center pl-10 text-[19px] font-medium bg-[#ffffff]">
                {SERVICE[1].value.cost.toLocaleString()} ₫/tháng
              </div>
            </div>
          </div>

          <div
            style={{
              border: selected.idx2 ? '4px solid #4057EF' : '4px solid #ccc',
            }}
            className="mb-5 cursor-pointer"
            onClick={() => onChangePlan(2)}
          >
            <div className="flex  rounded-[2px] relative">
              {selected.idx2 && (
                <div className="w-[42px] h-[42px] absolute left-[-21px] top-[31px]">
                  <img
                    className="w-full h-full bg-white rounded-[50%] border-none border-0"
                    src={tickChangePlan}
                    alt="tick"
                  />
                </div>
              )}
              <div
                style={{
                  backgroundColor: selected.idx2 ? '#cccccc' : '#F3F3F3',
                }}
                className="w-[150px] h-[104px] pl-[19px] py-[9px] font-medium flex justify-center items-center"
              >
                {SERVICE[2].value.name}
              </div>
              <div className="w-[700px] pl-[20px] py-[9px] flex justify-center items-center bg-[#ffffff]">
                Chất lượng hình ảnh tốt ở chế độ SD (480p). Xem trên điện thoại
                và máy tính bảng bất kỳ, không quảng cáo. Không bao gồm máy tính
                cá nhân và TV. Tải xuống trên 1 thiết bị.
              </div>
              <div className="w-[300px] flex justify-center items-center pl-10 text-[19px] font-medium bg-[#ffffff]">
                {SERVICE[2].value.cost.toLocaleString()} ₫/tháng
              </div>
            </div>
          </div>

          <div
            style={{
              border: selected.idx3 ? '4px solid #4057EF' : '4px solid #ccc',
            }}
            className="mb-5 cursor-pointer"
            onClick={() => onChangePlan(3)}
          >
            <div className="flex  rounded-[2px] relative">
              {selected.idx3 && (
                <div className="w-[42px] h-[42px] absolute left-[-21px] top-[31px]">
                  <img
                    className="w-full h-full bg-white rounded-[50%] border-none border-0"
                    src={tickChangePlan}
                    alt="tick"
                  />
                </div>
              )}
              <div
                style={{
                  backgroundColor: selected.idx3 ? '#cccccc' : '#F3F3F3',
                }}
                className="w-[150px] h-[104px] pl-[19px] py-[9px] font-medium flex justify-center items-center"
              >
                {SERVICE[3].value.name}
              </div>
              <div className="w-[700px] pl-[20px] py-[9px] flex justify-center items-center bg-[#ffffff]">
                Chất lượng hình ảnh tốt ở chế độ SD (480p). Xem trên điện thoại
                và máy tính bảng bất kỳ, không quảng cáo. Không bao gồm máy tính
                cá nhân và TV. Tải xuống trên 1 thiết bị.
              </div>
              <div className="w-[300px] flex justify-center items-center pl-10 text-[19px] font-medium bg-[#ffffff]">
                {SERVICE[3].value.cost.toLocaleString()} ₫/tháng
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-[40px]">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: 'black',
              },
            }}
          >
            <Button
              className="flex items-center justify-center rounded-[3px] py-3 w-[98px] h-[37px] bg-[#e6e6e6] border-none hover:bg-[#c6c6c6]"
              onClick={() => navigate(-1)}
            >
              Trở lại
            </Button>
          </ConfigProvider>
          <Button
            className="flex items-center justify-center rounded-[3px] py-3 w-[98px] h-[37px] bg-[#0080ff] text-white hover:bg-[#1573d1]"
            onClick={onSelectService}
          >
            Tiếp tục
          </Button>
        </div>
      </div>

      <div className="bg-[#F3F3F3] text-[#141313] pl-10 pt-10  flex justify-center">
        <div className="w-[80%]">
          <div className="flex text-white gap-5 mb-5">
            <FacebookOutlinedIcon
              style={{ fontSize: 25 }}
              className="cursor-pointer"
            />
            <InstagramOutlined
              style={{ fontSize: 25 }}
              className="cursor-pointer"
            />
            <TwitterOutlined
              style={{ fontSize: 25 }}
              className="cursor-pointer"
            />
            <YoutubeOutlined
              style={{ fontSize: 25 }}
              className="cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-4 text-[13px] gap-2">
            <div className="cursor-pointer hover:underline">Mô tả âm thanh</div>
            <div className="cursor-pointer hover:underline">
              Trung tâm trợ giúp
            </div>
            <div className="cursor-pointer hover:underline">Thẻ quà tặng</div>
            <div className="cursor-pointer hover:underline">
              Trung tâm đa phương tiện
            </div>
            <div className="cursor-pointer hover:underline">
              Quan hệ với nhà đầu tư
            </div>
            <div className="cursor-pointer hover:underline">Việc làm</div>
            <div className="cursor-pointer hover:underline">
              Điều khoản sử dụng
            </div>
            <div className="cursor-pointer hover:underline">Quyền riêng tư</div>
            <div className="cursor-pointer hover:underline">
              Thông báo pháp lý
            </div>
            <div className="cursor-pointer hover:underline">
              Tùy chọn cookie
            </div>
            <div className="cursor-pointer hover:underline">
              Thông tin doanh nghiệp
            </div>
            <div className="cursor-pointer hover:underline">
              Liên hệ với chúng tôi
            </div>
          </div>

          <div
            style={{ border: '1px solid black' }}
            className="w-[82px] h-[30px] text-[13px] mb-4 mt-5 p-2 flex items-center justify-center cursor-pointer hover:text-white"
          >
            Mã dịch vụ
          </div>
          <span className="mb-3 block text-[13px]">© 2023 SANSAN, Inc.</span>
        </div>
      </div>
    </div>
  )
}

export default ChangePlan
