import Box from './boxCaseStatusSent'
import '@/index.css'
import { getTotalCase } from '@/adapter'
import { useQuery } from 'react-query'
import { QUERY_KEY } from '@/utils/constants'
import useToken from '@/hook/token'
import moment from 'moment'

function boxCase() {
  // data thống kê trạng thái theo từng loại : mail , inquiry and thành công or thất bại
  const { verifyToken } = useToken()

  const { decode } = verifyToken()

  const userId = decode?.id

  const startDate = moment(Date.now()).format('YYYY-MM-DD')

  const endDate = moment(Date.now()).format('YYYY-MM-DD')

  // data thống kê trạng thái theo từng loại : mail , inquiry and thành công or thất bại

  const { data: dataTotalCase = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_TOTAL_CASE, userId, startDate, endDate],
    queryFn: () =>
      getTotalCase
        .getTotal({ userId: userId, startDate: startDate, endDate: endDate })
        .then((res) => {
          const mapDataPercent = res?.data?.map((item: any) => {
            return {
              case_send: item.case_send,
              case_send_mail_success: item.case_send_mail_success,
              case_send_inquiry_success: item.case_send_inquiry_success,
              case_send_fs_mail: item.case_send_fs_mail,
              case_send_fs_inquiry: item.case_send_fs_inquiry,
              percentA: item.phantrammail,
              percentB: item.phantraminquiry,
              percentC: item.phantramfs_mail,
              percentD: item.phantramfs_inquiry,
              khachang_assign: item.khassign,
            }
          })
          return mapDataPercent
        }),
  })

  const datalist = [
    {
      title: 'Số KH phụ trách',
      number: `${
        dataTotalCase[9]?.khachang_assign
          ? dataTotalCase[9]?.khachang_assign
          : 0
      }`,
      percent: '',
      color: 'white',
      background: '#FFA700',
      border: '2px solid #FFA700',
    },
    {
      title: 'Tổng Case đã gửi',
      number: `${
        dataTotalCase[0]?.case_send ? dataTotalCase[0]?.case_send : 0
      }`,
      percent: '',
      color: 'white',
      background: '#4B7902',
      border: '2px solid #4B7902',
    },
    {
      title: 'Gửi email thành công',
      number: `${
        dataTotalCase[1]?.case_send_mail_success
          ? dataTotalCase[1]?.case_send_mail_success
          : 0
      }`,
      percent: `(${
        dataTotalCase[5]?.percentA ? dataTotalCase[5]?.percentA : 0
      })%`,
      color: '#4B7902',
      background: 'white',
      border: '2px solid #4B7902',
    },
    {
      title: 'Gửi inquiry thành công',
      number: `${
        dataTotalCase[2]?.case_send_inquiry_success
          ? dataTotalCase[2]?.case_send_inquiry_success
          : 0
      }`,
      percent: `(${
        dataTotalCase[6]?.percentB ? dataTotalCase[6]?.percentB : 0
      })%`,
      color: '#4B7902',
      background: 'white',
      border: '2px solid #4B7902',
    },
    {
      title: 'Gửi email thất bại',
      number: `${
        dataTotalCase[3]?.case_send_fs_mail
          ? dataTotalCase[3]?.case_send_fs_mail
          : 0
      }`,
      percent: `(${
        dataTotalCase[7]?.percentC ? dataTotalCase[7]?.percentC : 0
      })%`,
      color: '#D9001B',
      background: 'white',
      border: '2px solid #D9001B',
    },
    {
      title: 'Gửi inquiry thất bại',
      number: `${
        dataTotalCase[4]?.case_send_fs_inquiry
          ? dataTotalCase[4]?.case_send_fs_inquiry
          : 0
      }`,
      percent: `(${
        dataTotalCase[8]?.percentD ? dataTotalCase[8]?.percentD : 0
      })%`,
      color: '#D9001B',
      background: 'white',
      border: '2px solid #D9001B',
    },
  ]
  return (
    <div className="w-full mt-4 h-[90px] flex gap-[2%] flex-row justify-between items-center">
      {datalist.map((items: any, index: number) => {
        return (
          <Box
            key={index}
            title={items.title}
            number={items.number}
            percent={items.percent}
            color={items.color}
            background={items.background}
            border={items.border}
          />
        )
      })}
    </div>
  )
}
export default boxCase
