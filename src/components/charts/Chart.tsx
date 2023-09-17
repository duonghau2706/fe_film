import { useEffect, useState } from 'react'
import { getTotalCase } from '@/adapter'
import { useQuery } from 'react-query'
import { QUERY_KEY } from '@/utils/constants'
import ChartBar from './chartCaseStatusSend'
import useToken from '@/hook/token'
import Table from '../table/TableDataResource'
import '@/index.css'
function Chart() {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const [userId, setUserId] = useState<any>(decode?.id)
  const handleSelectedUserChange = (newUserId: any) => {
    setUserId(newUserId)
  }
  const [, setData] = useState([])
  const { data: dataTotalCaseSendAndUnsend = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_CASE_STATUS],
    queryFn: () =>
      getTotalCase.getCaseStatus().then((res) => {
        const mapData = res?.data.map((item: any) => {
          return {
            total: item.total,
            totalsent: item.totalsent,
            totalunsent: item.totalunsent,
            totalsentfalse: item.totalsentfalse,
          }
        })
        return mapData
      }),
  })
  useEffect(() => {
    setData(dataTotalCaseSendAndUnsend || 0)
  }, [dataTotalCaseSendAndUnsend])
  const { data: dataListUserId = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_LIST_USER_ID],
    queryFn: () =>
      getTotalCase.listUserId().then((res) => {
        const mapData = res?.data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
          }
        })
        return mapData
      }),
  })
  const totalsentmail = dataTotalCaseSendAndUnsend.reduce(
    (sum: any, val: any) => parseInt(sum) + parseInt(val.totalsent),
    0
  )
  const totalunsentmail = dataTotalCaseSendAndUnsend.reduce(
    (sum: any, val: any) => parseInt(sum) + parseInt(val.totalunsent),
    0
  )
  const totalsentmailfalse = dataTotalCaseSendAndUnsend.reduce(
    (sum: any, val: any) => parseInt(sum) + parseInt(val.totalsentfalse),
    0
  )
  const arrayStatus = []
  arrayStatus.push(totalsentmail)
  arrayStatus.push(totalunsentmail)
  arrayStatus.push(totalsentmailfalse)
  return (
    <div className="w-full mt-6 flex flex-row space-evenly">
      <ChartBar arrayStatus={arrayStatus} />
      <Table
        dataTotalCaseSendAndUnsend={dataTotalCaseSendAndUnsend}
        dataListUserId={dataListUserId}
        userId={userId}
        onSelectedUserChange={handleSelectedUserChange}
      />
    </div>
  )
}
export default Chart
