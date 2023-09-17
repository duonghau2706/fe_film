import { ContentApi } from '@/adapter'
import styles from '@/common.module.scss'
import { FormSearchContent } from '@/components/form'
import { DisplayRecord } from '@/components/select'
import { TableListTemplate } from '@/components/table'
import { QUERY_KEY, URL } from '@/utils/constants'
import { cleanObj } from '@/utils/helper'
import { Button, Pagination } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

const ListContents = () => {
  const navigate = useNavigate()

  const { currentPage } = useParams()

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
    perPage: 10,
    totalPage: 10,
    totalRecord: 10,
    showTotal: showTotal,
  })

  const getDataTable = async () => {
    const param = {
      ...dataSearch,
      currentPage,
      perPage: pagination.perPage,
    }
    const filteredValues = cleanObj(param)
    return await ContentApi.searchContent(filteredValues).then((res) => {
      setPagination({
        ...pagination,
        totalRecord: res?.data?.paginate?.totalRecord,
      })
      setDataTable(res?.data?.template)
    })
  }

  const { isLoading } = useQuery(
    [
      QUERY_KEY.GET_ALL_CONTENT,
      reload,
      dataSearch,
      currentPage,
      pagination?.perPage,
    ],
    () => getDataTable()
  )

  const onSearch = (values: any) => {
    setDataSearch(values)
    navigate(`${URL.TEMPLATE_MANAGEMENT}/1`)
  }

  const createTemplate = () => {
    navigate(URL.TEMPLATE.concat('/create'), {
      state: { action: 'add' },
    })
  }

  const handleReload = () => {
    setReload(!reload)
  }

  const handleChange = (value: any) => {
    setPagination({ ...pagination, perPage: value })
    navigate(`${URL.TEMPLATE_MANAGEMENT}/1`)
  }

  const handleChangePage = (values: any) => {
    navigate(`${URL.TEMPLATE_MANAGEMENT}/${values}`)
  }

  return (
    <div className="px-6 pt-2 pb-4 overflow-auto h-full">
      <h1>Quản lý template</h1>
      <FormSearchContent onSearch={onSearch} />

      <div className={`flex justify-end my-4 ${styles.removeHoverBtnAntd}`}>
        <Button
          className="w-[180px] text-white bg-yellow-primary block font-medium h-10 text-sm"
          onClick={createTemplate}
        >
          Thêm template mới
        </Button>
      </div>

      <div className="border border-solid rounded border-gray-primary py-4 px-[10px] bg-white">
        <div className="flex justify-between items-center mb-4">
          <DisplayRecord handleChange={handleChange} />
        </div>
        <TableListTemplate
          dataTable={dataTable}
          current={currentPage}
          pageSize={pagination?.perPage}
          handleReload={handleReload}
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

export default ListContents
