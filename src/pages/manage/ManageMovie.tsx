import { queryClient } from '@/App'
import movieApi from '@/adapter/movie'
import { ModalBase } from '@/components/modal'
import { DisplayRecord } from '@/components/select'
import TableListMovie from '@/components/table/TableListMovie'
import FormSearchMovie from '@/form/FormSearchMovie'
import { QUERY_KEY, URL } from '@/utils/constants'
import { Button, ConfigProvider, Pagination } from 'antd'
import { useCallback, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ManagaMovie = () => {
  const { currentPage } = useParams()

  const navigate = useNavigate()
  const [perPage, setPerPage] = useState(10)
  const [totalRecord, setTotalRecord] = useState(0)
  const [dataSearch, setDataSearch]: any = useState()
  const [openModalDeleteMovie, setOpenModalDeleteMovie] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  // call api get list movie
  const [listMovie, setListMovie]: any = useState()
  const { isLoading } = useQuery({
    queryKey: [
      QUERY_KEY.GET_ALL_MOVIE,
      currentPage,
      perPage,
      totalRecord,
      dataSearch,
    ],
    queryFn: () => {
      movieApi
        .getAllMovie({ perPage, currentPage: currentPage || 1, ...dataSearch })
        .then((res) => {
          setTotalRecord(res?.data?.data?.pagination?.total)
          setListMovie(res?.data?.data?.all)
        })
    },
  })

  const onSelectedChangeHandler = (value: any) => {
    setPerPage(value)
    navigate(URL.MANAGE_MOVIE)
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

  const setCurrentPageListMovie = useCallback((value: number) => {
    navigate(`${URL.MANAGE_MOVIE}/${value}`)
  }, [])

  const onSearchMovieHandler = (dataMovieSearch: any) => {
    setDataSearch(dataMovieSearch)
  }

  //---------- DELETE -------------//
  const mutationDeleteMovie = useMutation({
    mutationFn: (params: any) => movieApi.deleteMovie(params),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_ALL_MOVIE])
      toast.success('Xóa phim thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.MANAGE_MOVIE)
      }, 700)
    },
  })

  const deleteMovieHandler = () => {
    setOpenModalDeleteMovie(true)
  }

  const onSaveDeleteMovie = () => {
    if (selectedRowKeys?.length > 0) {
      const newArr = selectedRowKeys?.map((ele: any) => `'${ele}'`)
      const arrMutation = newArr?.join(', ')
      mutationDeleteMovie.mutate({ listId: arrMutation })

      setSelectedRowKeys([])
    } else {
      toast.error('Vui lòng chọn phim muốn xóa!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
    }
    setOpenModalDeleteMovie(false)
  }

  return (
    <div className="pt-[84px] px-10 pb-7 bg-[#e8e6e6] text-black-main flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-[30px]">Quản lý phim</h2>
        <FormSearchMovie
          // listMovie={listMovie}
          onSearchMovie={onSearchMovieHandler}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-red-delete text-white hover:bg-red-deleteHover"
          onClick={deleteMovieHandler}
        >
          Xóa phim
        </Button>
        <Button
          className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
          onClick={() => navigate(`${URL.MOVIE}/create`)}
        >
          Thêm phim mới
        </Button>
      </div>

      <div className="flex flex-col gap-5 px-5 py-5 bg-whiteForm border-[1px] border-solid rounded-[5px] border-gray-primary">
        <div className="flex justify-between items-center">
          <DisplayRecord handleChange={onSelectedChangeHandler} />
          <label className="font-bold text-[14px]">
            Tổng số phim: {(totalRecord || 0).toLocaleString()}
          </label>
        </div>

        <TableListMovie
          perPage={perPage}
          currentPage={currentPage || 1}
          listMovie={listMovie}
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
            onChange={setCurrentPageListMovie}
            showTotal={showTotal}
          />
        </ConfigProvider>

        <ModalBase
          isOpen={openModalDeleteMovie}
          setIsOpen={setOpenModalDeleteMovie}
          onSave={onSaveDeleteMovie}
          header={'Xác nhận'}
          content={'Bạn có chắc chắn muốn xóa phim không?'}
          footer={true}
        />
      </div>
    </div>
  )
}

export default ManagaMovie
