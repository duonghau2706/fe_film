import { FormSearchSourceCustomer } from '@/components/form'
import { TableListCustomerResource } from '@/components/table'
import { MESSAGE, QUERY_KEY } from '@/utils/constants'
import { Button, Pagination } from 'antd'
import { useState } from 'react'

import { CustomerResourceApi } from '@/adapter'
import styles from '@/common.module.scss'
import { ModalAddSourceCustomer } from '@/components/modal'
import useToken from '@/hook/token'
import { cleanObj } from '@/utils/helper'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { DisplayRecord } from '@/components/select'

const ListCustomerResource = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const [dataSearch, setDataSearch] = useState<any>()
  const [dataTable, setDataTable] = useState()
  const [totalCustomer, setTotalCustomer] = useState<any>()
  const [reload, setReload] = useState<boolean>(false)

  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false)

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
      currentPage: pagination.currentPage,
      perPage: pagination.perPage,
    }
    const filteredValues = cleanObj(param)
    return await CustomerResourceApi.searchCustomerResource(
      filteredValues
    ).then((res) => {
      setPagination({
        ...pagination,
        totalRecord: res?.data?.paginate?.totalRecord,
        currentPage: res?.data?.paginate?.page,
        perPage: res?.data?.paginate?.size,
      })

      const totalCustomer = res?.data?.customerResource?.reduce(
        (accumulator: any, item: any) => {
          return accumulator + parseInt(item?.numCustomers)
        },
        0
      )
      setTotalCustomer(totalCustomer)
      setDataTable(res?.data?.customerResource)
    })
  }

  const { isLoading } = useQuery(
    [QUERY_KEY.GET_ALL_CUSTOMER_RESOURCE, reload, dataSearch],
    () => getDataTable()
  )

  const mutation = useMutation({
    mutationFn: (params: any) => {
      return CustomerResourceApi.createCustomerResource(params)
    },
    onSuccess: () => {
      toast.success(MESSAGE.SUCESS.CUSTOMER_RESOURCE.CREATE)
      setOpenModalAdd(false)
      setReload(!reload)
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)
    },
  })

  const handleChange = (value: any) => {
    setPagination({ ...pagination, perPage: value, currentPage: 1 })
    setReload(!reload)
  }

  const onSearch = (values: any) => {
    setDataSearch(values)
    setPagination({ ...pagination, currentPage: 1 })
    setReload(!reload)
  }

  const handleAdd = () => {
    setOpenModalAdd(true)
  }

  const handleChangePage = (values: any) => {
    setPagination({ ...pagination, currentPage: values })
    setReload(!reload)
  }

  const handleReload = () => {
    setReload(!reload)
  }

  const handleAddCustomerResource = (values: any) => {
    const newValue = {
      ...values,
      createdBy: decode?.username,
      updatedBy: '',
    }
    mutation.mutate(newValue)
  }

  return (
    <div className="px-6 pt-2 pb-4 overflow-auto h-full w-full">
      <h1>Quản lý nguồn khách hàng</h1>
      <FormSearchSourceCustomer onSearch={onSearch} />

      <div className={`flex justify-end my-4 ${styles.removeHoverBtnAntd}`}>
        <Button
          className="w-[180px] text-white bg-yellow-primary block font-medium h-10 text-sm"
          onClick={handleAdd}
        >
          Thêm nguồn KH mới
        </Button>
      </div>

      <div className="border border-solid rounded border-gray-primary py-4 px-[10px] bg-white">
        <div className="flex justify-between items-center mb-4">
          <DisplayRecord handleChange={handleChange} />

          <label className="font-bold text-[14px]">
            Tổng số khách hàng: {totalCustomer?.toLocaleString()}
          </label>
        </div>

        <TableListCustomerResource
          dataTable={dataTable}
          current={pagination?.currentPage}
          pageSize={pagination?.perPage}
          handleReload={handleReload}
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

        <ModalAddSourceCustomer
          isOpen={openModalAdd}
          setIsOpen={setOpenModalAdd}
          onSave={handleAddCustomerResource}
          action="add"
          header="Thêm nguồn KH mới"
        />
      </div>
    </div>
  )
}

export default ListCustomerResource
