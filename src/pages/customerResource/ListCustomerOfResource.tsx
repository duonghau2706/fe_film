import { TableListCustomerOfResource } from '@/components/table'
import { QUERY_KEY } from '@/utils/constants'
import { Button, Pagination } from 'antd'
import { useState } from 'react'

import { CustomerResourceApi } from '@/adapter'
import DonutChart from '@/components/charts/DoughnutChart'
import { FormSearchCustomerOfResource } from '@/components/form'
import { cleanObj } from '@/utils/helper'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { DisplayRecord } from '@/components/select'

const ListCustomerOfResource = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [dataTable, setDataTable] = useState()
  const [totalSentCount, setTotalSentCount] = useState<number>(0)
  const [totalResponseCount, setTotalResponseCount] = useState<number>(0)

  const [dataSearch, setDataSearch] = useState<any>()

  const [reload, setReload] = useState<boolean>(false)

  const [resonseRate, setResonseRate] = useState<any>([
    { name: 'Đã phản hồi', value: 25 },
    { name: 'Không phản hồi', value: 75 },
  ])

  const showTotal = (total: any, range: any) => {
    return (
      <label className="text-[14px]">
        {`Hiển thị ${range[0].toLocaleString()} ~ ${range[1].toLocaleString()} trên ${total.toLocaleString()} bản ghi `}
      </label>
    )
  }

  const [pagination, setPagination]: any = useState({
    currentPage: 1,
    perPage: 10,
    totalPage: 10,
    totalRecord: 10,
    showTotal: showTotal,
  })

  const getDataTable = async () => {
    const param = {
      ...dataSearch,
      customerResourceId: state?.data?.record?.id,
      currentPage: pagination.currentPage,
      perPage: pagination.perPage,
    }
    const filteredValues = cleanObj(param)
    return await CustomerResourceApi.getCustomerOfResource(filteredValues).then(
      (res) => {
        setPagination({
          ...pagination,
          totalRecord: res?.data?.paginate?.totalRecord,
        })
        setDataTable(res?.data?.customerResource?.data)

        setTotalResponseCount(res?.data?.customerResource?.totalResponseCount)
        setTotalSentCount(res?.data?.customerResource?.totalSentCount)

        const responseRates = Number(
          (
            (res?.data?.customerResource?.totalResponseCount /
              res?.data?.customerResource?.totalSentCount) *
            100
          ).toFixed(1)
        )

        setResonseRate([
          {
            name: 'Đã phản hồi',
            value: res?.data?.customerResource?.totalSentCount
              ? responseRates
              : 0,
          },
          {
            name: 'Không phản hồi',
            value: res?.data?.customerResource?.totalSentCount
              ? 100 - responseRates
              : 100,
          },
        ])

        setPagination({
          ...pagination,
          currentPage: res?.data?.paginate?.page,
          perPage: res?.data?.paginate?.size,
          totalPage: res?.data?.paginate?.totalPage,
          totalRecord: res?.data?.paginate?.totalRecord,
        })
      }
    )
  }

  const { isLoading } = useQuery(
    [QUERY_KEY.GET_ALL_CUSTOMER_RESOURCE, reload, dataSearch],
    () => getDataTable()
  )

  const handleChange = (value: any) => {
    setPagination({ ...pagination, perPage: value, currentPage: 1 })
    setReload(!reload)
  }

  const onSearch = (values: any) => {
    setDataSearch(values)
    setPagination({ ...pagination, currentPage: 1 })
    setReload(!reload)
  }

  const handleChangePage = (values: any) => {
    setPagination({ ...pagination, currentPage: values })
    setReload(!reload)
  }

  return (
    <div className="px-6 py-2">
      <h1>
        Danh sách khách hàng của{' '}
        {state?.data?.record?.name ? state?.data?.record?.name : ''}
      </h1>

      <FormSearchCustomerOfResource onSearch={onSearch} />

      <div className="border border-solid rounded border-gray-primary  bg-white mt-6">
        <DonutChart data={resonseRate} />
        <div className="bg-gray-primary w-full h-[1px]"></div>
        <div className=" py-4 px-[10px]">
          <div className="flex justify-between mb-[10px]">
            <DisplayRecord handleChange={handleChange} />

            <div className="flex gap-10 justify-center font-bold">
              <span className="text-[14px]">
                Tổng số lần gửi:{' '}
                {totalSentCount ? totalSentCount?.toLocaleString() : 0}
              </span>

              <span className="text-[14px]">
                Tổng số lần phản hồi:{' '}
                {totalResponseCount ? totalResponseCount?.toLocaleString() : 0}
              </span>
            </div>
          </div>

          <TableListCustomerOfResource
            dataTable={dataTable}
            idCustomerResource={state?.data?.record?.id}
            pagination={pagination}
            dataSearch={dataSearch}
            loading={isLoading}
          />

          <div className="w-full flex justify-between items-end mt-4">
            <Pagination
              className="w-full flex"
              total={pagination?.totalRecord}
              current={pagination?.currentPage}
              pageSize={pagination?.perPage}
              onChange={handleChangePage}
              showTotal={showTotal}
            />
          </div>
        </div>
      </div>

      <div className="w-full mt-8 mb-6 flex justify-center">
        <Button
          className="w-[120px] border-solid text-white bg-yellow-primary h-10 text-sm font-semibold"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>
      </div>
    </div>
  )
}

export default ListCustomerOfResource
