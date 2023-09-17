import InquiryApi from '@/adapter/inquiry'
import { FormSearchEmail } from '@/components/form'
import { DisplayRecord } from '@/components/select'
import { TableListInquiry } from '@/components/table'
import { QUERY_KEY, URL } from '@/utils/constants'
import { cleanObj } from '@/utils/helper'
import { Pagination } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'

const InquiryManagement = () => {
  const [dataSearch, setDataSearch] = useState<any>()
  const [dataTable, setDataTable] = useState()

  const { currentPage } = useParams()

  const navigate = useNavigate()

  const showTotal = (total: any, range: any) => {
    return (
      <label className="text-[14px]">
        {`Hiển thị ${range[0]} ~ ${
          range[1]
        } trên ${total.toLocaleString()} bản ghi `}
      </label>
    )
  }

  const [pagination, setPagination]: any = useState({
    perPage: 10,
    totalPage: 10,
    totalRecord: 10,
    showTotal: showTotal,
  })

  const getDataTable = async () => {
    const param = {
      ...dataSearch,
      currentPage: currentPage,
      perPage: pagination.perPage,
    }
    const filteredValues = cleanObj(param)
    return await InquiryApi.getInquiry(filteredValues).then((res) => {
      setPagination({
        ...pagination,
        totalRecord: res?.data?.paginate?.totalRecord,
      })
      setDataTable(res?.data?.inquiryHistory)
    })
  }

  const { isLoading } = useQuery(
    [
      QUERY_KEY.GET_ALL_INQUIRY_HISTORY,
      dataSearch,
      pagination?.perPage,
      currentPage,
    ],
    () => getDataTable()
  )

  const handleChange = (value: any) => {
    setPagination({ ...pagination, perPage: value })
    navigate(`${URL.INQUIRY_MANAGEMENT}/1`)
  }

  const onSearch = (values: any) => {
    setDataSearch(values)
    navigate(`${URL.INQUIRY_MANAGEMENT}/1`)
  }

  const handleChangePage = (values: any) => {
    navigate(`${URL.INQUIRY_MANAGEMENT}/${values}`)
  }

  return (
    <div className="px-6 pt-2 pb-4 overflow-auto h-full">
      <h1>Quản lý gửi inquiry</h1>
      <FormSearchEmail onSearch={onSearch} />

      <div className="border border-solid rounded border-gray-primary py-4 px-[10px] mt-10 bg-white">
        <div className="mb-4">
          <DisplayRecord handleChange={handleChange} />
        </div>
        <TableListInquiry
          dataTable={dataTable}
          current={+(currentPage as string) || 1}
          pageSize={pagination?.perPage}
          loading={isLoading}
        />

        <div className="w-full flex justify-between items-end mt-4">
          <Pagination
            className="w-full flex"
            total={pagination?.totalRecord}
            current={+(currentPage as string) || 1}
            pageSize={pagination?.perPage}
            onChange={handleChangePage}
            showTotal={showTotal}
          />
        </div>
      </div>
    </div>
  )
}

export default InquiryManagement
