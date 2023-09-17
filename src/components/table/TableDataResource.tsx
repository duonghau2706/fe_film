import { getTotalCase } from '@/adapter'
import { QUERY_KEY } from '@/utils/constants'
import { Select, Table } from 'antd'
import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

interface Table {
  userId: any
  rowSelection: any
  onSelectedUserChange: () => void
}

const columns = [
  {
    title: 'Tên Nguồn',
    dataIndex: 'rs_name',
    align: 'center',
    width: 120,
    fixed: true,
  },
  {
    title: 'Số KH phụ trách',
    dataIndex: 'total',
    align: 'center',
    width: 160,
    ellipsis: true,
  },
  {
    title: 'Số KH đã gửi',
    dataIndex: 'totalsent',
    align: 'center',
    width: 160,
    ellipsis: true,
  },
  {
    title: 'Số KH chưa gửi',
    dataIndex: 'totalunsent',
    align: 'center',
    width: 160,
    ellipsis: true,
  },
]
function tableData({
  userId,
  onSelectedUserChange,
  rowSelection,
  dataListUserId,
}: any) {
  //Tổng số khách hàng phụ trách ở từng nguồn
  const calculateTotal = (data: any, key: any) => {
    return data.reduce(
      (total: any, item: any) => total + parseInt(item[key], 10),
      0
    )
  }
  const [, setdataTotalCaseSendAndUnsendFlowUsers] = useState<any>([])
  // Gọi api
  const queryClient = useQueryClient()

  const { data: dataTotalCaseSendAndUnsendFlowUsers = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_CASE_STATUS_USER, userId],
    queryFn: () =>
      getTotalCase.getCaseStatusFlowUser({ userId: userId }).then((res) => {
        const mapData = res?.data.map((item: any, index: number) => {
          return {
            id: index,
            rs_name: item.rs_name,
            total: item.total,
            totalsent: item.totalsent,
            totalunsent: item.totalunsent,
          }
        })
        return mapData
      }),
  })
  const handlerChangeChoose = (value: any) => {
    onSelectedUserChange(value)
    // Xóa cache của truy vấn cũ và tải lại với userId mới
    queryClient.invalidateQueries([QUERY_KEY.GET_CASE_STATUS_USER, value])
  }
  // Tính tổng các giá trị tương ứng
  const totalTotal = calculateTotal(
    dataTotalCaseSendAndUnsendFlowUsers,
    'total'
  )
  const totalTotalSent = calculateTotal(
    dataTotalCaseSendAndUnsendFlowUsers,
    'totalsent'
  )
  const totalTotalUnsent = calculateTotal(
    dataTotalCaseSendAndUnsendFlowUsers,
    'totalunsent'
  )
  useEffect(() => {
    setdataTotalCaseSendAndUnsendFlowUsers(dataTotalCaseSendAndUnsendFlowUsers)
  }, [dataTotalCaseSendAndUnsendFlowUsers])
  return (
    <div className="w-[60%] h-[45vh] bg-white pl-[10px] flex flex-col rounded-[5px]">
      <div className="w-full flex flex-row">
        <h2 className="w-[60%] pl-4 pt-6 pb-4">
          Thống kê khách hàng theo nguồn
        </h2>
        <div className="w-[40%] pt-6 pb-4 pr-4">
          <Select
            className="w-full h-[40px]"
            onChange={handlerChangeChoose}
            value={userId}
          >
            {dataListUserId.map((item: any, index: any) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="h-[70%] px-4">
        <Table
          rowSelection={rowSelection}
          columns={columns as any}
          dataSource={dataTotalCaseSendAndUnsendFlowUsers}
          scroll={{ x: 600, y: 300 }}
          pagination={false}
          bordered
          rowKey="id"
        />
      </div>
      <div className="w-full h-[10%] my-[0px] mx-auto bg-white flex flex-row space-evenly fw-bold">
        <span className="w-[25%]  font-bold text-[16px]">Tổng</span>
        <span className="w-[25%]  font-bold text-[16px]">{totalTotal}</span>
        <span className="w-[25%]  font-bold text-[16px]">{totalTotalSent}</span>
        <span className="w-[25%]  font-bold text-[16px]">
          {totalTotalUnsent}
        </span>
      </div>
    </div>
  )
}
export default tableData
