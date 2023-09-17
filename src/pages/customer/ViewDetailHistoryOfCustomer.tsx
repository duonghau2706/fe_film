import { useState, useEffect, useCallback } from 'react'
import { TableViewDetaillHistorySendMail } from '@/components/table'
import { Row, Pagination, Button } from 'antd'
import { QUERY_KEY } from '@/utils/constants'
import { FormSearchViewDetailHistory } from '@/components/form'
import { useQuery } from 'react-query'
import { SelectLimitRecord } from '@/components/select'

import {
  cleanObj,
  handleCurrentPage,
  handleCurrentPageNew,
} from '@/utils/helper'
import { useNavigate, useParams } from 'react-router-dom'
import { customerApi } from '@/adapter'

const ViewDetailHistoryOfCustomer = () => {
  const navigate = useNavigate()

  const { id: customerId } = useParams()

  const [dataSource, setDataSource] = useState<any>([])

  const [perPage, setperPage] = useState(10)

  const [currentPage, setCurrentPage] = useState(1)

  const [totalRecord, setTotalRecord] = useState()

  const [searchCustomer, setSearchCustomer] = useState({})

  const onSearchCustomer = (values: any) => {
    setCurrentPage(1)
    const fromDate = values?.dateFilter
      ? values?.dateFilter[0]?.format('YYYY-MM-DD')
      : ''
    const toDate = values?.dateFilter
      ? values?.dateFilter[1]?.format('YYYY-MM-DD')
      : ''
    // setCurrentPage(1)
    const searchData = {
      ...values,
      dateFilter: values.dateFilter ? [fromDate, toDate] : undefined,
    }
    setSearchCustomer(searchData)
  }

  const handleSelectPerPage = useCallback((value: number) => {
    setCurrentPage(1)
    setperPage(value)
  }, [])

  const setCurrentPageCategory = useCallback((value: number) => {
    setCurrentPage(value)
  }, [])

  const {
    data: detailCustomer,
    refetch: refetchCustomerDetail,
    isLoading: isLoadingDetailProduct,
  } = useQuery({
    queryKey: [
      QUERY_KEY.VIEW_HISTORY_BY_CUSTOMER,
      currentPage,
      perPage,
      searchCustomer,
    ],
    queryFn: () =>
      customerApi
        .viewHistoryByCustomer({
          customerId,
          currentPage,
          perPage,
          ...cleanObj(searchCustomer),
        })
        .then((res) => res?.data),
    // enabled: false,
  })

  useEffect(() => {
    if (customerId) {
      refetchCustomerDetail()
    }
  }, [customerId])

  useEffect(() => {
    if (customerId && detailCustomer) {
      setDataSource(detailCustomer?.detailHistorySendMail || [])
      setTotalRecord(detailCustomer?.paginate.totalRecord)
    }
  }, [detailCustomer])

  const onBack = useCallback(() => {
    navigate(-1)
  }, [])

  return (
    <div className="px-6 py-2">
      <h1>Lịch sử gửi của khách hàng</h1>

      <FormSearchViewDetailHistory onFinish={onSearchCustomer} />

      <Button
        onClick={onBack}
        className="w-[150px] border font-bold border-solid border-orange-primary bg-white text-orange-primary mt-4 h-10 text-sm"
      >
        Quay lại
      </Button>

      <div className="p-4 border border-solid border-gray-primary rounded-lg my-4 bg-white">
        <div className="mb-4 flex justify-between">
          <SelectLimitRecord handleChangeValue={handleSelectPerPage} />
        </div>
        <TableViewDetaillHistorySendMail
          currentPage={currentPage}
          perPage={perPage}
          dataSource={dataSource}
          loading={isLoadingDetailProduct}
        />
        {dataSource?.length != 0 ? (
          <Row className="mt-4 flex justify-between items-center text-black">
            <span>
              Hiển thị {handleCurrentPage(currentPage, perPage)}~
              {handleCurrentPageNew(totalRecord, currentPage, perPage)} trên{' '}
              {totalRecord} bản ghi
            </span>
            <Pagination
              current={currentPage}
              defaultCurrent={1}
              total={totalRecord}
              pageSize={perPage}
              onChange={setCurrentPageCategory}
            />
          </Row>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default ViewDetailHistoryOfCustomer
