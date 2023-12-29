import { ModalExtend } from '@/components/modal'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined'
import { Col, Row } from 'antd'

import { queryClient } from '@/App'
import { userApi } from '@/adapter'
import transactionHistoriesApi from '@/adapter/transactionHistories'
import ModalCancelMember from '@/components/modal/ModalCancelMember'
import useToken from '@/hook/token'
import { QUERY_KEY, SERVICE, URL } from '@/utils/constants'
import {
  addOneMonthToMoment,
  create_UUID,
  renderDateStringYear,
} from '@/utils/helper'
import moment from 'moment'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Account = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
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

  // call api get list transaction histories by user
  const [transactionHistories, setTransactionHistories]: any = useState()
  useQuery({
    queryKey: [QUERY_KEY.GET_TRANSACTION_HISTORIES_USER],
    queryFn: async () => {
      return await userApi
        .getTransactionHistories({ userId: decode?.id })
        .then((res) => {
          setTransactionHistories(res?.data?.data)
        })
    },
  })

  //ngay bat dau
  const startTransaction = transactionHistories
    ?.reverse()
    ?.find(
      (record: any) =>
        record.service !== null && record.service >= 0 && record.service <= 3
    )
  const startDateTH = renderDateStringYear(startTransaction?.created_at, '-')

  let renderPassword = ''
  const len = profileUser?.password?.length
  for (let i = 0; i < len; i++) {
    renderPassword += '*'
  }

  //show modal extend
  const [openModalExtend, setOpenModalExtend] = useState(false)
  const onExtendHandler = () => {
    setOpenModalExtend(true)
  }

  //show modal cancel member
  const [openModalCancleMember, setOpenModalCancleMember] = useState(false)
  const onCancleMemberHandler = () => {
    setOpenModalCancleMember(true)
  }

  //call api extend: update TH, profile
  const mutationTransactionHistories = useMutation({
    mutationFn: (params: any) => transactionHistoriesApi.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_TRANSACTION_HISTORIES_USER])
    },
  })

  const mutationUpdateAccount = useMutation({
    mutationFn: (params: any) => userApi.updateAccount(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_PROFILE_USER])
    },
  })
  // console.log('profileue.monye', Number(profileUser?.money))
  // console.log('profileUser?.service', profileUser?.service)
  // console.log(
  //   'Number(profileUser?.money) - SERVICE[profileUser?.service]?.value?.cost',
  //   Number(profileUser?.money) - SERVICE[profileUser?.service]?.value?.cost
  // )

  const dataTH = {
    id: create_UUID(),
    userId: decode?.id,
    accountBalance:
      Number(profileUser?.money) - SERVICE[profileUser?.service]?.value?.cost,
    bankName: profileUser?.bank_name,
    bankAccount: profileUser?.bank_account,
    service: profileUser?.service,
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
  }

  const dataUser = {
    userId: decode?.id,
    bankName: profileUser?.bank_name,
    bankAccount: profileUser?.bank_account,
    money:
      Number(profileUser?.money) - SERVICE[profileUser?.service]?.value?.cost,
    isMember: true,
    renewalDate: addOneMonthToMoment(
      moment(profileUser?.renewal_date) < moment()
        ? moment()
        : moment(profileUser?.renewal_date)
    ),
    updatedAt: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
  }
  // console.log('profile', profileUser?.is_member === true)

  const onSaveExtend = () => {
    if (
      Number(profileUser?.money) - SERVICE[profileUser?.service]?.value?.cost <
      0
    ) {
      setOpenModalExtend(false)
      toast.error('Số dư tài khoản không đủ để giao dịch!', {
        autoClose: 3000, // Tự đóng sau 3000ms (3 giây)
        style: { marginTop: '50px' }, // Thêm style tùy chỉnh
      })
      return
    }

    mutationTransactionHistories.mutate(dataTH)
    mutationUpdateAccount.mutate(dataUser)

    setOpenModalExtend(false)
    toast.success('Gia hạn thành công!', {
      autoClose: 3000, // Tự đóng sau 3000ms (3 giây)
      style: { marginTop: '50px' }, // Thêm style tùy chỉnh
    })
  }

  const onSaveCancelMember = () => {
    mutationUpdateAccount.mutate({
      ...dataUser,
      isMember: false,
      money: profileUser?.money,
    })

    setOpenModalCancleMember(false)
    toast.success('Hủy tư cách thành viên thành công.', {
      autoClose: 3000, // Tự đóng sau 3000ms (3 giây)
      style: { marginTop: '50px' }, // Thêm style tùy chỉnh
    })
  }

  return (
    <div className="pt-20 px-[150px]">
      <div
        style={{ borderBottom: '1px solid #999' }}
        className="flex text-black-main gap-5 pb-4"
      >
        <div className="text-[35px] font-normal">Tài khoản</div>
        <div className="flex items-center">
          <div className="w-[26px] h-[26px] flex">
            <img
              className="w-full h-full"
              src="https://assets.nflxext.com/ffe/siteui/account/svg/membersince.svg"
            />
          </div>
          <div className="text-[13px] text-[#555] font-bold my-auto">
            Thành viên từ tháng {startDateTH?.split('/')?.[1]} năm{' '}
            {startDateTH?.split('/')?.[2]}
          </div>
        </div>
      </div>

      <Row
        style={{ borderBottom: '1px solid #999' }}
        className="text-black-main my-4 pb-6"
      >
        <Col span={14}>
          <div className="text-gray-account text-[20px] mb-2">
            TƯ CÁCH THÀNH VIÊN VÀ TÍNH PHÍ
          </div>
          <div
            style={{ boxShadow: '0 1px 0 rgba(0,0,0,.2)' }}
            className="mb-2 bg-[#e6e6e6] px-2 py-2 w-[200px] flex justify-center cursor-pointer hover:bg-[#a7a6a6]"
            onClick={onCancleMemberHandler}
          >
            Hủy tư cách thành viên
          </div>
          <div
            style={{ boxShadow: '0 1px 0 rgba(0,0,0,.2)' }}
            className="mb-2 bg-[#e6e6e6] px-2 py-2 w-[200px] flex justify-center cursor-pointer hover:bg-[#a7a6a6]"
            onClick={onExtendHandler}
          >
            Gia hạn
          </div>
          <div
            style={{ boxShadow: '0 1px 0 rgba(0,0,0,.2)' }}
            className="mb-2 bg-[#e6e6e6] px-2 py-2 w-[200px] flex justify-center cursor-pointer hover:bg-[#a7a6a6]"
            onClick={() =>
              navigate(URL.RECHARGE, { state: { recharge: 'recharge' } })
            }
            // recharge
          >
            Nạp tiền
          </div>
        </Col>

        <Col span={10}>
          <div className="flex mt-5">
            <EmailOutlinedIcon
              className="my-auto"
              style={{ fontSize: '20px' }}
            />
            <div className="ml-1 text-[16px]">Email: {profileUser?.email}</div>
          </div>

          <div className="flex mt-5">
            <KeyOutlinedIcon className="my-auto" style={{ fontSize: '20px' }} />
            <div className="ml-1 text-[16px]">Password: {renderPassword}</div>
          </div>

          <div className="flex mt-5">
            <CallOutlinedIcon
              className="my-auto"
              style={{ fontSize: '20px' }}
            />
            <div className="ml-1 text-[16px]">
              SĐT:{' '}
              {profileUser?.phone?.[0] === '0'
                ? profileUser?.phone
                : profileUser?.phone?.length > 0
                ? '0' + profileUser?.phone
                : null}
            </div>
          </div>

          <div className="flex mt-5">
            <AccountBalanceOutlinedIcon
              className="my-auto"
              style={{ fontSize: '20px' }}
            />
            <div className="ml-1 text-[16px]">
              Ngân hàng: {profileUser?.bank_name}
            </div>
            {/* <div className="w-[30px] h-[30px] flex items-center my-auto">
              <img className="w-full h-full" src={logoVcb} alt="vcb" />
            </div> */}
          </div>

          <div className="flex mt-5">
            <WalletOutlinedIcon
              className="my-auto"
              style={{ fontSize: '20px' }}
            />
            <div className="ml-1 text-[16px]">
              Tài khoản ngân hàng: {profileUser?.bank_account}
            </div>
          </div>

          <div className="flex mt-5">
            <CreditScoreOutlinedIcon
              className="my-auto"
              style={{ fontSize: '20px' }}
            />
            <div className="ml-1 text-[16px]">
              {profileUser?.is_member
                ? 'Ngày tính phí tiếp theo của bạn là'
                : 'Ngày hết hạn dịch vụ của bạn là'}
              : {renderDateStringYear(profileUser?.renewal_date, '-')}
            </div>
          </div>
        </Col>
      </Row>

      <Row className="text-black-main my-4 pb-6">
        <Col span={14}>
          <div className="text-gray-account text-[20px] mb-2">
            THÔNG TIN GÓI DỊCH VỤ
          </div>
        </Col>

        <Col span={10}>
          <div className="flex">
            <div className="max-w-[150px] text-[20px] font-semibold">
              {profileUser?.is_member === true
                ? SERVICE[profileUser?.service]?.value?.name
                : 'Đã hủy tư cách thành viên'}
            </div>
            <div
              className="text-[15px] font-semibold flex items-center ml-3 relative top-[2px] text-[#0073e6] cursor-pointer hover:underline"
              onClick={() => navigate(URL.CHANGE_PLAN)}
            >
              Thay đổi gói dịch vụ
            </div>
          </div>
          {/* <div>
            <img src="" alt="dich vu" />
        </div> */}
        </Col>
      </Row>

      <ModalExtend
        isOpen={openModalExtend}
        setIsOpen={setOpenModalExtend}
        onSave={onSaveExtend}
        header={'Xác nhận'}
        content={`Bạn có chắc chắn muốn gia hạn gói ${
          SERVICE[profileUser?.service]?.value?.name
        }?`}
        footer={true}
      />

      <ModalCancelMember
        isOpen={openModalCancleMember}
        setIsOpen={setOpenModalCancleMember}
        onSave={onSaveCancelMember}
        header={'Xác nhận'}
        content={'Bạn có chắc chắn muốn hủy tư cách thành viên?'}
        footer={true}
      />
    </div>
  )
}

export default Account
