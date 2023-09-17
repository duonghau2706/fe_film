import { useState, useEffect, useCallback } from 'react'
import { TableUSer } from '@/components/table'
import { Row, Pagination, Button } from 'antd'
import { QUERY_KEY, URL } from '@/utils/constants'
import { FormSearchUser } from '@/components/form'
import { useQuery } from 'react-query'
import { SelectLimitRecord } from '@/components/select'
import { userApi } from '@/adapter'
import { cleanObj } from '@/utils/helper'
import styles from '@/common.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { ShowingRecord } from '@/components/common'
import useToken from '@/hook/token'

const ListUsers = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const navigate = useNavigate()

  const { currentPage } = useParams()

  const [dataSource, setDataSource] = useState<any>([])

  const [perPage, setperPage] = useState(10)

  const [searchUser, setSearchUser] = useState()

  const onSearchUser = (value: any) => {
    navigate(`${URL.USER}/${1}`)
    setSearchUser(value)
  }

  const handleSelectPerPage = (value: number) => {
    navigate(`${URL.USER}/${1}`)
    setperPage(value)
  }

  const setCurrentPageCategory = useCallback((value: number) => {
    navigate(`${URL.USER}/${value}`)
  }, [])

  const { data: dataUser, isLoading } = useQuery(
    [QUERY_KEY.GET_ALL_USER, currentPage, perPage, searchUser],
    () => getAllWithPagination().then((res) => res.data)
  )

  useEffect(() => {
    setDataSource(dataUser?.element || [])
  }, [dataUser])

  const getAllWithPagination = async () => {
    const newParams = {
      ...cleanObj(searchUser),
      currentPage: +(currentPage as string) || 1,
      perPage: perPage,
    }

    return userApi.getAll(newParams)
  }

  const handleViewEffort = () => {
    navigate(`${URL.VIEW_ALL_EFFORT_MEMBER}`)
  }

  return (
    <div className="px-6 pt-2 pb-4">
      <h1>Quản lý người dùng</h1>

      <FormSearchUser onFinish={onSearchUser} />
      {decode?.role === 0 ? (
        <div
          className={`flex items-center justify-end gap-2 my-4 ${styles.removeHoverBtnAntd}`}
        >
          <Button
            className=" bg-yellow-primary text-white text-[14px] h-10 font-medium "
            onClick={handleViewEffort}
          >
            Xem effort làm việc
          </Button>
        </div>
      ) : (
        ''
      )}

      <div className="p-4 border border-solid border-gray-primary rounded-lg bg-white">
        <div className="mb-4 flex justify-between">
          <SelectLimitRecord handleChangeValue={handleSelectPerPage} />
        </div>
        <TableUSer
          dataSource={dataSource}
          perPage={perPage}
          loading={isLoading}
        />
        {dataSource?.length != 0 ? (
          <Row className="mt-4 flex justify-between items-center text-black">
            <ShowingRecord
              perPage={perPage}
              totalRecord={dataUser?.totalRecord}
              currentPage={+(currentPage as string) || 1}
              dataSource={dataSource}
            />
            <Pagination
              current={+(currentPage as string) || 1}
              defaultCurrent={1}
              total={dataUser?.totalRecord}
              pageSize={perPage}
              onChange={setCurrentPageCategory}
            />
          </Row>
        ) : null}
      </div>
    </div>
  )
}

export default ListUsers
