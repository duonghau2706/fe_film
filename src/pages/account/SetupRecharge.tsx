import logoSANSAN from '@/assets/image/logoSANSAN.png'
import { create_UUID, renderInputBank } from '@/utils/helper/index'

import { QUERY_KEY, URL } from '@/utils/constants'
import { toast } from 'react-toastify'

import { CreditCardOutlined } from '@ant-design/icons'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'

import { queryClient } from '@/App'
import { userApi } from '@/adapter'
import transactionHistoriesApi from '@/adapter/transactionHistories'
import useToken from '@/hook/token'
import { Button, Form, Input } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const SetupRecharge = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { index } = state
  const [form] = Form.useForm()

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

  const mutationTransactionHistories = useMutation({
    mutationFn: (params: any) => transactionHistoriesApi.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_PROFILE_USER])
      queryClient.invalidateQueries([QUERY_KEY.GET_TRANSACTION_HISTORIES_USER])
      toast.success('Nạp tiền thành công!', { autoClose: 3000 })
    },
  })

  const mutationUpdateAccount = useMutation({
    mutationFn: (params: any) => userApi.updateAccount(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_PROFILE_USER])
    },
  })

  const triggerMemberHandler = () => {
    const bankNameTrigger = renderInputBank(index)
    const bankAccount = form.getFieldValue('bankAccount')
    const moneyEntered = form.getFieldValue('money')

    if (!bankAccount) {
      toast.error('Vui lòng điền số tài khoản hợp lệ.')
      return
    }

    if (!Number(moneyEntered)) {
      if (Number(moneyEntered) === 0) {
        toast.error('Số tiền giao dịch phải lớn hơn 0.')
        return
      }
      toast.error('Vui lòng điền số tiền giao dịch hợp lệ.')
      return
    }

    const dataTH = {
      id: create_UUID(),
      userId: decode?.id,
      bankName: bankNameTrigger,
      bankAccount,
      money: Number(moneyEntered || 0),
      accountBalance: Number(profileUser?.money) + Number(moneyEntered || 0),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
    }

    const dataUser = {
      userId: decode?.id,
      bankName: bankNameTrigger,
      bankAccount,
      money: Number(profileUser?.money) + Number(moneyEntered || 0),
      isMember: true,
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
    }

    //insert record into history transaction and user profile
    mutationUpdateAccount.mutate(dataUser)
    mutationTransactionHistories.mutate(dataTH)

    setTimeout(() => {
      navigate(URL.ACCOUNT)
    }, 3000)
  }

  return (
    <Form form={form}>
      <div className="bg-[#ffffff] pl-10 pt-5 pr-10 pb-[30px] text-black-primary">
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
        <div className="pl-[10px] pr-[10px]">
          <div className="text-black-primary font-bold text-[30px]">
            <div className="my-5 mb-[18px] flex justify-center">
              Điền thông tin giao dịch
            </div>
          </div>

          <div className="w-[440px] mx-auto">
            <div className="flex flex-col gap-3 w-full">
              <Form.Item name="bankName">
                <div
                  style={{ border: '1px solid #8c8c8c' }}
                  className="flex rounded-[2px] pl-1 pr-3 py-4 bg-gray-disable"
                >
                  <Input
                    className="text-[18px] border-none placeholder:text-[18px] placeholder:font-semibold"
                    placeholder="Số thẻ"
                    style={{ backgroundColor: '#ebebeb', color: '#a8a7a7' }}
                    value={renderInputBank(index)}
                    disabled
                  />
                  <div className="flex items-center my-auto h-full">
                    <AccountBalanceOutlinedIcon
                      style={{
                        fontSize: '30px',
                      }}
                    />
                  </div>
                </div>
              </Form.Item>

              <div
                style={{ border: '1px solid #8c8c8c' }}
                className="flex rounded-[2px] pl-1 pr-3 py-4 justify-between"
              >
                <Form.Item name="bankAccount" className="w-full">
                  <Input
                    className="text-[18px] w-full border-none placeholder:text-[18px] placeholder:font-semibold"
                    placeholder="Số thẻ"
                  />
                </Form.Item>
                <div className="flex items-center my-auto h-full">
                  <CreditCardOutlined
                    style={{
                      fontSize: '30px',
                    }}
                  />
                </div>
              </div>

              <div
                style={{ border: '1px solid #8c8c8c' }}
                className="flex rounded-[2px] pl-1 pr-3 py-4 justify-between "
              >
                <Form.Item name="money" className="w-full">
                  <Input
                    className="text-[18px] w-full border-none placeholder:text-[18px] placeholder:font-semibold"
                    placeholder="Số tiền thanh toán"
                  />
                </Form.Item>
                <div className="flex items-center my-auto h-full">
                  <MonetizationOnOutlinedIcon
                    style={{
                      fontSize: '30px',
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10 w-full">
              <Button
                className="w-full h-[65px] bg-[#e50914] text-white text-[25px] font-semibold hover:bg-red-[#e50914]"
                htmlType="submit"
                onClick={triggerMemberHandler}
              >
                Nạp tiền
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default SetupRecharge
