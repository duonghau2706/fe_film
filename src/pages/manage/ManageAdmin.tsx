import { queryClient } from '@/App'
import { userApi } from '@/adapter'
import { ModalBase } from '@/components/modal'
import { DisplayRecord } from '@/components/select'
import TableListAdmin from '@/components/table/TableListAdmin'
import FormSearchAdmin from '@/form/FormSearchAdmin'
import { QUERY_KEY, URL } from '@/utils/constants'
import { Button, ConfigProvider, Pagination } from 'antd'
import { useCallback, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ManagaAdmin = () => {
  const { currentPage } = useParams()

  const navigate = useNavigate()
  const [perPage, setPerPage] = useState(10)
  const [totalRecord, setTotalRecord] = useState(0)
  const [dataSearch, setDataSearch]: any = useState()
  const [openModalDeleteUser, setOpenModalDeleteUser] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  // call api get list movie
  const [listUser, setListUser]: any = useState()
  const { isLoading } = useQuery({
    queryKey: [
      QUERY_KEY.GET_ALL_USER,
      currentPage,
      perPage,
      totalRecord,
      dataSearch,
    ],
    queryFn: () => {
      userApi
        .getUser({
          perPage,
          currentPage: currentPage || 1,
          ...dataSearch,
          gender: 0,
        })
        .then((res) => {
          setTotalRecord(res?.data?.data?.pagination?.total)
          setListUser(res?.data?.data?.listUser)
        })
    },
  })

  const onSelectedChangeHandler = (value: any) => {
    setPerPage(value)
    navigate(URL.MANAGE_ADMIN)
  }

  const showTotal = (total: any, range: any) => {
    return (
      <label className="text-[14px]">
        {`Hiển thị ${range[0]} ~ ${
          range[1]
        } trên ${total.toLocaleString()} bản ghi `}
      </label>
    )
  }

  const setCurrentPageListUser = useCallback((value: number) => {
    navigate(`${URL.MANAGE_ADMIN}/${value}`)
  }, [])

  const onSearchUserHandler = (dataUserSearch: any) => {
    setDataSearch(dataUserSearch)
  }

  //---------- DELETE -------------//
  const mutationDelete = useMutation({
    mutationFn: (params: any) => userApi.deleteUser(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_ALL_USER])
      toast.success('Xóa admin thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.MANAGE_ADMIN)
      }, 700)
    },
  })

  const deleteMovieHandler = () => {
    setOpenModalDeleteUser(true)
  }

  const onSaveDeleteMovie = () => {
    if (selectedRowKeys?.length > 0) {
      const newArr = selectedRowKeys?.map((ele: any) => `'${ele}'`)
      const arrMutation = newArr?.join(', ')
      mutationDelete.mutate({ listId: arrMutation })

      setSelectedRowKeys([])
    } else {
      toast.error('Vui lòng chọn admin muốn xóa!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
    }
    setOpenModalDeleteUser(false)
  }

  return (
    <div className="pt-[84px] px-10 pb-7 bg-[#e8e6e6] text-black-main flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-[30px]">Quản lý admin</h2>
        <FormSearchAdmin
          // listUser={listUser}
          onSearchAdmin={onSearchUserHandler}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-red-delete text-white hover:bg-red-deleteHover"
          onClick={deleteMovieHandler}
        >
          Xóa admin
        </Button>
        <Button
          className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
          onClick={() => navigate(`${URL.ADMIN}/create`)}
        >
          Thêm admin
        </Button>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5 bg-whiteForm border-[1px] border-solid rounded-[5px] border-gray-primary">
        <div className="flex justify-between items-center">
          <DisplayRecord handleChange={onSelectedChangeHandler} />
          <label className="font-bold text-[14px]">
            Tổng số admin: {(totalRecord || 0).toLocaleString()}
          </label>
        </div>

        <TableListAdmin
          perPage={perPage}
          currentPage={currentPage || 1}
          listUser={listUser}
          loading={isLoading}
          setSelectedRowKeys={setSelectedRowKeys}
          // refetch={refetch}
        />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'white',
            },
            components: {
              Pagination: {
                itemActiveBg: 'red',
              },
            },
          }}
        >
          <Pagination
            className="w-full flex"
            total={totalRecord}
            current={+(currentPage as string) || 1}
            pageSize={perPage || 10}
            onChange={setCurrentPageListUser}
            showTotal={showTotal}
          />
        </ConfigProvider>

        <ModalBase
          isOpen={openModalDeleteUser}
          setIsOpen={setOpenModalDeleteUser}
          onSave={onSaveDeleteMovie}
          header={'Xác nhận'}
          content={'Bạn có chắc chắn muốn xóa admin này không?'}
          footer={true}
        />
      </div>
    </div>
  )
}

export default ManagaAdmin
