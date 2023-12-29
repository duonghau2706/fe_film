import logoSANSAN from '@/assets/image/logoSANSAN.png'
import {
  addOneMonthToMoment,
  create_UUID,
  renderInputBank,
} from '@/utils/helper/index'

import { QUERY_KEY, URL } from '@/utils/constants'
import { SERVICE } from '@/utils/constants/index'
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
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const SetupPayment = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { index, serviceSelected, bankName, bankAccount, money } = state
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

  useEffect(() => {
    form.setFieldValue('bankAccount', bankAccount)
    bankName !== null && bankName !== undefined && bankName?.length > 0
      ? form.setFieldValue('bankName', bankName)
      : form.setFieldValue('bankName', renderInputBank(index))
    form.setFieldValue('money', money)
  }, [serviceSelected])

  const mutationTransactionHistories = useMutation({
    mutationFn: (params: any) => transactionHistoriesApi.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_TRANSACTION_HISTORIES_USER])
      toast.success('Kích hoạt tư cách thành viên thành công.', {
        autoClose: 3000,
        style: { marginTop: '50px' },
      })
    },
  })

  const mutationUpdateAccount = useMutation({
    mutationFn: (params: any) => userApi.updateAccount(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_PROFILE_USER])
      setTimeout(() => {
        navigate(URL.HOME)
      }, 3000)
    },
  })

  const triggerMemberHandler = () => {
    const bankNameTrigger = bankName || renderInputBank(index)
    const bankAccount = form.getFieldValue('bankAccount')
    const service = serviceSelected
    const moneyEntered = form.getFieldValue('money')

    if (moneyEntered < SERVICE[service]?.value?.cost) {
      toast.error('Số tiền thanh toán không được ít hơn giá gói đã chọn.')
      return
    }

    const dataTH = {
      id: create_UUID(),
      userId: decode?.id,
      bankName: bankNameTrigger,
      bankAccount,
      money: Number(moneyEntered),
      accountBalance:
        Number(profileUser?.money) +
        Number(moneyEntered) -
        SERVICE[serviceSelected || index]?.value?.cost,
      service,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
    }

    const dataUser = {
      userId: decode?.id,
      bankName: bankNameTrigger,
      bankAccount,
      money:
        Number(profileUser?.money) +
        Number(moneyEntered) -
        SERVICE[serviceSelected || index]?.value?.cost,
      service,
      isMember: true,
      renewalDate: addOneMonthToMoment(
        moment(profileUser?.renewal_date) < moment()
          ? moment()
          : moment(profileUser?.renewal_date)
      ),
      updatedAt: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
    }

    //insert record into history transaction and user profile
    mutationUpdateAccount.mutate(dataUser)
    mutationTransactionHistories.mutate(dataTH)
  }

  const onChangeServiceHandler = () => {
    let urlString = `${
      URL.PLANFORM
    }?indexCurService=${serviceSelected}&bankName=${form.getFieldValue(
      'bankName'
    )}&index=${index}`

    if (form.getFieldValue('bankAccount'))
      urlString += `&bankAccount=${form.getFieldValue('bankAccount')}`

    if (form.getFieldValue('money'))
      urlString += `&money=${form.getFieldValue('money')}`

    navigate(urlString)
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
                    value={bankName || renderInputBank(index)}
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

              <div className="bg-[#f4f4f4] rounded-[5px] flex justify-between pl-4 pr-3 py-4">
                <div className="flex flex-col">
                  <div className="font-semibold">
                    {SERVICE?.[serviceSelected]?.value?.cost} ₫/tháng
                  </div>
                  <div className="text-[#737373]">
                    {SERVICE?.[serviceSelected]?.value?.name}
                  </div>
                </div>
                <div
                  className="flex items-center text-[#0071eb] font-semibold text-[18px] hover:underline cursor-pointer"
                  onClick={onChangeServiceHandler}
                >
                  Thay đổi
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10 w-full">
              <Button
                className="w-full h-[65px] bg-[#e50914] text-white text-[25px] font-semibold hover:bg-red-[#e50914]"
                htmlType="submit"
                onClick={triggerMemberHandler}
              >
                Kích hoạt tư cách thành viên
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default SetupPayment
