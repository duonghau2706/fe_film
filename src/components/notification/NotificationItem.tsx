import { userApi } from '@/adapter'
import paymentSuccesful from '@/assets/image/payment_succesful.png'
import useToken from '@/hook/token'
import { QUERY_KEY, SERVICE } from '@/utils/constants'
import { renderDateStringYear, renderTimeOct } from '@/utils/helper'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined'
import { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
const NotificationItem = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  // //get infor user
  // const [profileUser, setProfileUser]: any = useState()
  // useQuery({
  //   queryKey: [QUERY_KEY.GET_PROFILE_USER],
  //   queryFn: () => {
  //     userApi.getProfile({ userId: decode?.id }).then((res) => {
  //       setProfileUser(res?.data?.data?.[0])
  //     })
  //   },
  // })

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

  return (
    <div className="absolute right-[150px] text-black-primary">
      <div className="rounded-[5px] bg-white pb-3 px-4 mt-[18px] h-[500px] overflow-y-auto">
        {transactionHistories?.map((trans: any, index: number) => (
          <Fragment key={index}>
            {trans?.service !== null &&
              trans?.service !== undefined &&
              trans?.service >= 0 && (
                <div
                  style={{
                    borderTop: index === 0 ? 'none' : '1px solid #cfcdcc',
                  }}
                  className="flex justify-between pb-2 pt-3 gap-10"
                >
                  <div className="flex">
                    <div
                      style={{ border: '2px solid #cfcdcc', color: '#e50914' }}
                      className="text-red-500 rounded-[50%] w-[50px] h-[50px] p-2 mr-2 my-auto items-center justify-center flex"
                    >
                      <ShoppingCartCheckoutOutlinedIcon />
                    </div>
                    <div>
                      <div className="font-semibold">
                        Thanh toán gói{' '}
                        {
                          SERVICE[transactionHistories?.[index]?.service]?.value
                            ?.name
                        }
                      </div>
                      <div className="text-[13px] text-[#969595] mt-[-1px] mb-[2px]">
                        {renderTimeOct(
                          transactionHistories?.[index]?.created_at
                        )}{' '}
                        -{' '}
                        {renderDateStringYear(
                          transactionHistories?.[index]?.created_at,
                          '-'
                        )}
                      </div>
                      <div className="text-[15px]">
                        Số dư tài khoản:{' '}
                        <span className="font-bold text-[#7b7b7b]">
                          {Number(
                            transactionHistories?.[index]?.account_balance
                          ).toLocaleString()}
                          ₫
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-[20px] text-[#e05914] flex items-end">
                    -{' '}
                    {Number(
                      SERVICE[transactionHistories?.[index]?.service]?.value
                        ?.cost
                    ).toLocaleString()}
                    ₫
                  </div>
                </div>
              )}

            {trans?.money !== null &&
              trans?.money !== undefined &&
              trans?.money > 0 && (
                <div
                  style={{
                    borderTop:
                      index === 0 && trans.service === 'null'
                        ? 'none'
                        : '1px solid #cfcdcc',
                  }}
                  className="flex justify-between pb-2 pt-3 gap-10"
                >
                  <div className="flex">
                    <div
                      style={{ border: '2px solid #cfcdcc' }}
                      className=" rounded-[50%] w-[50px] h-[50px] p-2 mr-2 my-auto"
                    >
                      <img
                        className="w-full h-full"
                        src={paymentSuccesful}
                        alt="pmsc"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">
                        Nạp tiền vào tài khoản từ {trans?.bank_name}
                      </div>
                      <div className="text-[13px] text-[#969595] mt-[-1px] mb-[2px]">
                        {renderTimeOct(
                          transactionHistories?.[index]?.created_at
                        )}{' '}
                        -{' '}
                        {renderDateStringYear(
                          transactionHistories?.[index]?.created_at,
                          '-'
                        )}
                      </div>
                      <div className="text-[15px]">
                        Số dư tài khoản:{' '}
                        <span className="font-bold text-[#7b7b7b]">
                          {!trans?.service && trans?.service !== 0
                            ? Number(trans?.account_balance).toLocaleString()
                            : (
                                Number(trans?.account_balance) +
                                SERVICE[trans?.service]?.value?.cost
                              ).toLocaleString()}
                          ₫
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-[20px] text-[#0B783D] flex items-end">
                    +{Number(trans?.money).toLocaleString()}₫
                  </div>
                </div>
              )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default NotificationItem
