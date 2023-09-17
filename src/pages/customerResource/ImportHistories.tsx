import { FormSearchImportHistoriesCustomer } from '@/components/form'
import { TableListImportHistoriesCustomer } from '@/components/table'
import { QUERY_KEY } from '@/utils/constants'
import { Pagination } from 'antd'
import { useState } from 'react'

import { CustomerResourceApi } from '@/adapter'
import { DisplayRecord } from '@/components/select'
import { cleanObj } from '@/utils/helper'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const ImportHistories = () => {
  const { id } = useParams()

  const [dataSearch, setDataSearch] = useState<any>()
  const [dataTable, setDataTable] = useState()
  const [reload, setReload] = useState<boolean>(false)

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
    currentPage: 1,
    perPage: 10,
    totalPage: 10,
    totalRecord: 10,
    showTotal: showTotal,
  })

  const getDataTable = async () => {
    const param = {
      ...dataSearch,
      customerResourceId: id,
      currentPage: pagination.currentPage,
      perPage: pagination.perPage,
    }
    const filteredValues = cleanObj(param)
    return await CustomerResourceApi.getImportHistoryCustomer(
      filteredValues
    ).then((res) => {
      setPagination({
        ...pagination,
        totalRecord: res?.data?.paginate?.totalRecord,
        currentPage: res?.data?.paginate?.page,
        perPage: res?.data?.paginate?.size,
      })

      setDataTable(res?.data?.customerResourceSent)
    })
  }

  const { isLoading } = useQuery(
    [QUERY_KEY.VIEW_HISTORIES_IMPORT_CUSTOMER, dataSearch, reload],
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
    <div className="px-6 pt-2 pb-4 overflow-auto h-full w-full">
      <h1>Lịch sử import</h1>
      <FormSearchImportHistoriesCustomer onSearch={onSearch} />

      <div className="border border-solid rounded border-gray-primary py-4 px-[10px] bg-white mt-10">
        <div className="flex justify-between items-center mb-4">
          <DisplayRecord handleChange={handleChange} />
        </div>

        <TableListImportHistoriesCustomer
          dataTable={dataTable}
          current={pagination?.currentPage}
          pageSize={pagination?.perPage}
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
  )
}

export default ImportHistories
