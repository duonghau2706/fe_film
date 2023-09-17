import { QUERY_KEY } from '@/utils/constants'
import { Form, Pagination, Select } from 'antd'
import { useEffect, useState } from 'react'

import { CustomerResourceApi } from '@/adapter'
import dashBoardApi from '@/adapter/dashboard'
import TableListCustomerResponsed from '@/components/table/TableListCustomerResponsed'
import { cleanObj } from '@/utils/helper'
import { useForm } from 'antd/es/form/Form'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'

const ListCustomerResponsed = () => {
  const { state } = useLocation()

  const [form] = useForm()

  const [dataTable, setDataTable] = useState()

  const [sourceSelect, setSourceSelect] = useState(state?.resourceId)

  const showTotal = (total: any, range: any) => {
    return (
      <label className="text-[14px]">
        {`Hiển thị ${range[0]} ~ ${range[1]} trên ${total} bản ghi `}
      </label>
    )
  }

  useEffect(() => {
    form.setFieldValue('customerResourceResponse', state?.resourceId)
  }, [])

  const [pagination, setPagination]: any = useState({
    currentPage: 1,
    perPage: 10,
    totalPage: 10,
    totalRecord: 10,
    showTotal: showTotal,
  })

  const getDataTable = async () => {
    const param = {
      ...pagination,
      startDate: state.enteredDate.start,
      endDate: state.enteredDate.end,
      resourceId: sourceSelect,
    }

    delete param?.totalPage
    delete param?.totalRecord
    delete param?.showTotal

    const filteredValues = cleanObj(param)

    return await dashBoardApi
      .getCustomerRepsponsd(filteredValues)
      .then((res) => {
        const newData = res?.data?.data?.customerResourceResponsed?.map(
          (item: any, index: number) => {
            return { ...item, id: index + 1 }
          }
        )
        setDataTable(newData)

        setPagination({
          ...pagination,
          currentPage: res?.data?.data?.paginate?.page,
          perPage: res?.data?.data?.paginate?.size,
          totalPage: res?.data?.data?.paginate?.totalPage,
          totalRecord: res?.data?.data?.paginate?.totalRecord,
        })
      })
  }

  useQuery(
    [
      QUERY_KEY.GET_ALL_CUSTOMER_RESOURCE_RESPONSED,
      sourceSelect,
      pagination.currentPage,
    ],
    () => {
      getDataTable()
    }
  )

  const { data: dataResource } = useQuery(
    [QUERY_KEY.GET_ALL_CUSTOMER_RESOURCE, state?.numberOfResponsed],
    () =>
      CustomerResourceApi.searchCustomerResource().then((res: any) =>
        res?.data?.customerResource?.map((item: any) => {
          return { label: item?.name, value: item?.id }
        })
      )
  )

  const handleChangeResource = (value: any) => {
    setSourceSelect(value)
    setPagination({ ...pagination, currentPage: 1 })
  }

  const handleChangePage = (values: any) => {
    setPagination({ ...pagination, currentPage: values })
  }

  return (
    <div className="px-6 pt-2 pb-4 overflow-auto h-full">
      <h1>Danh sách KH phản hồi</h1>

      <Form form={form} className="w-full mb-4">
        <Form.Item
          name={'customerResourceResponse'}
          label="Nguồn"
          className="w-[250px]"
        >
          <Select
            onChange={handleChangeResource}
            className="w-[220px]"
            options={dataResource}
            allowClear
          />
        </Form.Item>
      </Form>

      <div className="border border-solid rounded border-gray-primary py-4 px-[10px]">
        <TableListCustomerResponsed
          dataTable={dataTable}
          pagination={pagination}
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

export default ListCustomerResponsed
