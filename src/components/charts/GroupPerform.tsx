import { useState } from 'react'
import { getTotalCase } from '@/adapter'
import { useQuery } from 'react-query'
import { QUERY_KEY } from '@/utils/constants'
import PerformanceUser from './performance'
import useToken from '@/hook/token'

function GroupPerform() {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const [userId, setUserId] = useState<any>(decode?.id)
  const handleSelectedUserChange = (newUserId: any) => {
    setUserId(newUserId)
  }
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
  return (
    <div className="w-full flex flex-row space-evenly">
      <PerformanceUser
        userId={userId}
        dataListUserId={dataListUserId}
        onSelectedUserChange={handleSelectedUserChange}
      />
    </div>
  )
}
export default GroupPerform
