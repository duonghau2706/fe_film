import { SendMailApi, customerApi, userApi } from '@/adapter'
import styles from '@/common.module.scss'
import { FormSearchCustomer } from '@/components/form'
import {
  ModalAssignCustomer,
  ModalBase,
  ModalErrorSendMail,
  ModalSendEmailCustomer,
  ModalUpdateFrequencyEmail,
  ModalUpdateStatusSendMail,
  ModalUploadFile,
} from '@/components/modal'
import { SelectLimitRecord } from '@/components/select'
import { TableCustomer } from '@/components/table'
import { sendGet } from '@/hook/axios'
import { MESSAGE, QUERY_KEY, URL, endpoint } from '@/utils/constants'
import {
  cleanObj,
  handleCurrentPage,
  handleCurrentPageNew,
  renderCompanySize,
  renderFrequencyOfEmail,
  renderResonBlackList,
  renderTypeOfCustomer,
} from '@/utils/helper'
import { Button, Pagination, Row, notification } from 'antd'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'

interface IDataFiled {
  id: string
  name: string
}

const TABS = {
  NONE_ASSIGN: '1',
  ASSIGN: '2',
}

const getDataToSenMail = (rowKey: any, dataSource: any, value: any) => {
  const dataSendMail = rowKey.map((item: any) => {
    const data = dataSource.find((table: any) => table.id === item)
    return {
      customerId: data.id,
      customerName: data.name,
      templateId: value.frequencyOfEmail,
      customerEmail: data.email ? data.email : '',
      personInCharge: data.personInCharge || null,
      userId: data.userId || null,
    }
  })
  return dataSendMail
}

const ListCustomers = () => {
  const navigate = useNavigate()

  const client = useQueryClient()

  const [dataSource, setDataSource] = useState<any>([])

  const [perPage, setperPage] = useState(10)

  const [currentPage, setCurrentPage] = useState(1)

  const [totalRecord, setTotalRecord] = useState<any>()

  const [searchCustomer, setSearchCustomer] = useState({})

  const [openModalUpload, setOpenModalUpload] = useState<boolean>(false)

  const [openModalAssign, setOpenModalAssign] = useState<boolean>(false)

  const [dataField, setDataField] = useState<IDataFiled[]>([])

  const [tabKey, setTabKey] = useState<string>('1')

  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])

  const [initialValues, setInitialValues] = useState<any>()

  const [openModalFrequency, setOpenModalFrequency] = useState<boolean>(false)

  const [openModalSendMail, setOpenModalSendMail] = useState<boolean>(false)

  const [statusUpdateSending, setStatusUpdateSending] = useState<boolean>(false)

  const [openModalError, setOpenModalError] = useState<boolean>(false)

  const [contentWarning, setContentWarning] = useState<string>()

  const [openModalErrorSendMail, setOpenModalErrorSendMail] =
    useState<boolean>(false)

  const [dataErrorSendMail, setDataErrorSendmail] = useState<any>([])

  const [openModalSendMailCustomer, setOpenModalSendMailCustomer] =
    useState<boolean>(false)

  const [openModalDeleteCustomer, setOpenModalDeleteCustomer] =
    useState<boolean>(false)

  const [dataSendMail, setDataSendMail] = useState<any>([])

  const [disabledOnSave, setDisabledOnSave] = useState<boolean>(true)

  const [reload, setReload] = useState<boolean>(false)

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }, [])

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const onSearchCustomer = (values: any) => {
    setCurrentPage(1)
    const searchData = {
      ...values,
      size: values?.size === '4' ? undefined : values?.size,
      type: values?.type === '2' ? undefined : values?.type,
      typeCustomer:
        values?.typeCustomer === '0' ? undefined : values?.typeCustomer,
      typeOfSend: values?.typeOfSend === 0 ? undefined : values?.typeOfSend,
      statusSending:
        values?.statusSending === 3 ? undefined : values?.statusSending,
    }
    const newData = cleanObj(searchData)
    localStorage.setItem('dataSearch', JSON.stringify({ ...newData }))
    setSearchCustomer(newData)
  }

  const handleSelectPerPage = useCallback((value: number) => {
    setCurrentPage(1)
    setperPage(value)
  }, [])

  const setCurrentPageCategory = useCallback((value: number) => {
    setCurrentPage(value)
  }, [])

  const { data, isLoading } = useQuery(
    [QUERY_KEY.GET_ALL_CUSTOMER, currentPage, perPage, searchCustomer],
    () =>
      getAllWithPagination().then((res) => {
        return res
      })
  )

  const { data: dataFieldCustomer = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_USER],
    queryFn: () => userApi.getAll(),
    enabled: tabKey === TABS.ASSIGN,
  })

  useEffect(() => {
    const newData = dataFieldCustomer?.data?.element?.map((item: any) => {
      return { label: item.name, value: item.id }
    })
    setDataField(newData || [])
  }, [dataFieldCustomer])

  useEffect(() => {
    setDataSource(data?.data?.customers || [])
    setTotalRecord(data?.data?.paginate.totalRecord)
  }, [data])

  const getAllWithPagination = async () => {
    const dataLocalStorage: any = localStorage.getItem('dataSearch')
    const pasreDataStorage = JSON.parse(dataLocalStorage)

    const newParams = {
      ...cleanObj(searchCustomer),
      currentPage,
      perPage: perPage,
    }

    return await sendGet(
      `${endpoint.search_customer_by_elastic_search}`,
      dataLocalStorage
        ? { ...pasreDataStorage, currentPage, perPage: perPage }
        : newParams
    ).then((res: any) => res.data)
  }

  const handleAddNewCustomer = () => {
    navigate(`${URL.FORM_CUSTOMER}`, {
      state: { action: 'add' },
    })
  }

  const handleDeleteCustomer = () => {
    if (selectedRowKeys?.length === 0) {
      notification['error']({
        message: `${MESSAGE.ERROR.CUSTOMER.NOT_SELECT} `,
      })
      return
    }
    setOpenModalDeleteCustomer(true)
  }

  const onDeleteCustomer = () => {
    mutationDelete.mutate({ listId: selectedRowKeys })
  }

  const handleAssignCustomer = () => {
    if (selectedRowKeys.length === 0) {
      notification['error']({
        message: `${MESSAGE.ERROR.CUSTOMER.NOT_SELECT} `,
      })
      return
    }
    setTabKey(TABS.ASSIGN)
    setOpenModalAssign(true)
  }

  const handleOpenModalFrequency = () => {
    if (selectedRowKeys.length === 0) {
      notification['error']({
        message: `${MESSAGE.ERROR.CUSTOMER.NOT_SELECT} `,
      })
      return
    }
    setOpenModalFrequency(true)
  }

  const handleOpenModaSend = () => {
    if (selectedRowKeys.length === 0) {
      notification['error']({
        message: `${MESSAGE.ERROR.CUSTOMER.NOT_SELECT} `,
      })
      return
    }
    setOpenModalSendMail(true)
  }

  const handleOpenModalSendMail = () => {
    if (selectedRowKeys.length === 0) {
      notification['error']({
        message: `${MESSAGE.ERROR.CUSTOMER.NOT_SELECT} `,
      })
      return
    }
    setOpenModalSendMailCustomer(true)
  }

  const handleAllowToAssign = (value: any) => {
    const data = selectedRowKeys.map((item: any) => {
      const data = dataSource.find((table: any) => table.id === item)
      return {
        id: item,
        personInChargeId: value
          ? value.personInChargeId
          : data.personInChargeId,
      }
    })

    assignItemMutation.mutate({ data })
  }

  const handleAllowUpdateFrequency = (value: any) => {
    const data = selectedRowKeys.map((item: any) => {
      const data = dataSource.find((table: any) => table.id === item)
      return {
        id: item,
        frequencyOfEmail: value
          ? value.frequencyOfEmail
          : data.frequencyOfEmail,
      }
    })

    updateFrequencymutation.mutate({ data })
  }

  const handleUpdateSend = (value: any) => {
    const today = moment().format('YYYY-MM-DD')
    const dataValueUpdate = { ...value }
    const sendDate = value.sendDate
      ? dataValueUpdate?.sendDate?.format('YYYY-MM-DD')
      : ''
    const dateResponse = value.feedbackDate
      ? dataValueUpdate?.feedbackDate?.format('YYYY-MM-DD')
      : ''
    if (
      (dataValueUpdate.statusMail === false ||
        dataValueUpdate.statusMail === undefined) &&
      (dataValueUpdate.statusResponse === false ||
        dataValueUpdate.statusResponse === undefined)
    ) {
      return notification['error']({
        message: `Vui lòng chọn các thao tác để cập nhật`,
      })
    }

    if (sendDate && sendDate > today) {
      return notification['error']({
        message: `Ngày gửi không thể lớn hơn ngày hiện tại `,
      })
    }

    if (dateResponse && dateResponse > today) {
      return notification['error']({
        message: `Thời gian phản hồi không thể lớn hơn ngày hiện tại `,
      })
    }

    const data = selectedRowKeys
      .map((item: any) => {
        const data = dataSource.find((table: any) => table.id === item)
        return cleanObj({
          ...dataValueUpdate,
          customerId: data.id,
          pregnancyStatusSending: dataValueUpdate?.pregnancyStatusSending,
          sendDate: sendDate,
          feedbackDate: dateResponse,
          userId: dataValueUpdate.statusMail ? dataValueUpdate?.userId : null,
          statusFeedback: dataValueUpdate?.statusFeedback
            ? dataValueUpdate?.statusFeedback
            : '0',
          status: dataValueUpdate.statusMail ? dataValueUpdate?.status : null,
          templateId: dataValueUpdate.templateId,
        })
      })
      .map((item: any) => {
        delete item.statusMail
        delete item.statusResponse
        return item
      })

    updateStatusSending.mutate({ data })
  }

  const handleSendMail = (value: any) => {
    const isExistCustomerBlackList = selectedRowKeys.map((item: any) => {
      const data = dataSource.find((table: any) => table.id === item)
      return {
        customerId: data.id,
        typeOfCustomer: data?.typeOfCustomer,
      }
    })

    if (
      isExistCustomerBlackList &&
      isExistCustomerBlackList.some((item: any) => item.typeOfCustomer === '3')
    ) {
      setOpenModalError(true)
      setDisabledOnSave(false)
      setContentWarning(`Lỗi với danh sách KH đã chọn có chứa KH 'Special'`)
      return
    }
    if (
      isExistCustomerBlackList &&
      isExistCustomerBlackList.some((item: any) => item.typeOfCustomer === '2')
    ) {
      setOpenModalError(true)
      setDisabledOnSave(true)
      setContentWarning(
        `Danh sách KH đã chọn có chứa KH 'blacklist'. Bạn có muốn tiếp tục gửi mail không?`
      )
      setDataSendMail(getDataToSenMail(selectedRowKeys, dataSource, value))
      return
    }

    mutationSendMail.mutate({
      data: getDataToSenMail(selectedRowKeys, dataSource, value),
    })
  }

  useEffect(() => {
    if (openModalError === false) {
      handlecloseAfterSendMail()
    }
  }, [openModalError])

  const onAllowMutate = () => {
    mutationSendMail.mutate({
      data: dataSendMail,
    })
  }

  const assignItemMutation = useMutation({
    mutationFn: (params: any) => customerApi.assignCustomerByUser(params),
    onSuccess: () => {
      notification['success']({
        message: `${MESSAGE.SUCESS.CUSTOMER.ASSIGN_CUSTOMER} `,
      })
      setInitialValues({
        ...initialValues,
        personInChargeId: '',
      })
      setOpenModalAssign(false)
      setSelectedRowKeys([])

      client.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_CUSTOMER],
      })
      client.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_USER],
      })
    },
    onError: ({ response }) => {
      if (response.data.status.code === 400)
        return notification['error']({
          message: response.data.status.message,
        })
      return notification['error']({
        message: MESSAGE.ERROR.COMMON,
      })
    },
  })

  const updateFrequencymutation = useMutation({
    mutationFn: (params: any) => customerApi.updateFrequencyOfEmail(params),
    onSuccess: () => {
      notification['success']({
        message: `${MESSAGE.SUCESS.CUSTOMER.FREQUENCY_CUSTOMER} `,
      })
      setInitialValues({
        ...initialValues,
        frequencyOfEmail: '',
      })
      setOpenModalFrequency(false)
      setSelectedRowKeys([])

      client.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_CUSTOMER],
      })
    },
    onError: ({ response }) => {
      if (response.data.status.code === 400)
        return notification['error']({
          message: response.data.status.message,
        })
      return notification['error']({
        message: MESSAGE.ERROR.COMMON,
      })
    },
  })

  const updateStatusSending = useMutation({
    mutationFn: (params: any) =>
      customerApi.updatePregnancyStatusSending(params),
    onSuccess: () => {
      notification['success']({
        message: `Cập nhật trạng thái gửi mail thành công `,
      })
      setOpenModalSendMail(false)
      setStatusUpdateSending(true)
      setSelectedRowKeys([])

      client.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_CUSTOMER],
      })
    },
    onError: ({ response }) => {
      if (response.data.status.code === 400)
        return notification['error']({
          message: response.data.status.message,
        })
      return notification['error']({
        message: MESSAGE.ERROR.COMMON,
      })
    },
  })

  const handlecloseAfterSendMail = () => {
    setOpenModalSendMailCustomer(false)
    setOpenModalError(false)
    setSelectedRowKeys([])
    setInitialValues({
      ...initialValues,
      frequencyOfEmail: '',
    })
  }

  const mutationSendMail = useMutation({
    mutationFn: (params: any) => SendMailApi.sendMail(params),
    onSuccess: (success) => {
      if (
        success?.data?.dataSuccess.length === 0 ||
        success?.data?.dataError.length !== 0
      ) {
        setDataErrorSendmail(
          [...success?.data?.dataError, ...success?.data?.dataSuccess] || []
        )
        notification['error']({
          message: `Gửi email thất bại `,
        })
        setOpenModalErrorSendMail(true)
        handlecloseAfterSendMail()
        return
      }

      notification['success']({
        message: `Gửi email thành công `,
      })
      handlecloseAfterSendMail()

      client.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_CUSTOMER],
      })
    },
    onError: ({ response }) => {
      if (response.data.status.code === 400)
        return notification['error']({
          message: response.data.status.message,
        })
      return notification['error']({
        message: MESSAGE.ERROR.COMMON,
      })
    },
  })

  const mutationDelete = useMutation({
    mutationFn: async (params: any) => {
      await customerApi.deletebyId(params)
    },
    onSuccess: () => {
      notification['success']({
        message: MESSAGE.SUCESS.CUSTOMER.DELETE,
      })
      setOpenModalDeleteCustomer(false)
      client.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_CUSTOMER],
      })
      setSelectedRowKeys([])
    },
    onError: ({ response }) => {
      if (response.data.status.code === 400)
        return notification['error']({
          message: response.data.status.message,
        })
      return notification['error']({
        message: MESSAGE.ERROR.COMMON,
      })
    },
  })

  const exportToExcel = () => {
    if (selectedRowKeys?.length === 0) {
      notification['error']({
        message: `${MESSAGE.ERROR.CUSTOMER.NOT_SELECT} `,
      })
      return
    }

    const dataExport = dataSource?.map((item: any) => {
      const newItem = selectedRowKeys?.includes(item?.id)
      if (newItem) return item
      return
    })

    const cleanDataExport = cleanObj(dataExport)

    const arr = Object.values(cleanDataExport)
      .filter((value: any) => typeof value === 'object')
      .map((value) => {
        return value
      })

    const newDataExport = arr?.map((item: any) => {
      return {
        customerResourceName: item.customerResourceName,
        name: item.name,
        romajiName: item.romajiName,
        url: item.url,
        email: item.email,
        type: item.type === '0' ? 'IT' : item.type === '1' ? 'Non-IT' : '',
        fieldName: item.fieldName,
        address: item.address,
        revenue: item.revenue,
        investment: item.investment,
        size: renderCompanySize(item.size),
        typeOfCustomer: renderTypeOfCustomer(item.typeOfCustomer),
        reason: renderResonBlackList(item.reason),
        frequencyOfEmail: renderFrequencyOfEmail(item.frequencyOfEmail),
        note: item.note,
      }
    })

    const Heading = [
      [
        'Nguồn khách hàng (Code)*',
        'Tên khách hàng (JP)*',
        'Tên khách hàng (Romanji)',
        'URL (Không được trùng)',
        'Email',
        'Loại (0:NonIT, 1:IT)',
        'Domain/Lĩnh vực',
        'Office/Trụ sở',
        'Revenue/Doanh thu',
        'Capital/Vốn đầu tư',
        'Company size (0:nhỏ, 1:vừa, 2:to)',
        'Phân loại KH (1: Normal, 2: Blacklist, 3:Special)',
        'Lý do Blacklist',
        'Tần suất gửi mail',
        'Ghi chú',
      ],
    ]

    const workbook = XLSX.utils.book_new()
    const worksheet: any = XLSX.utils.json_to_sheet([])
    // Đặt chiều rộng cho các cột
    worksheet['!cols'] = [
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 20 },
      { width: 30 },
      { width: 20 },
      { width: 20 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
    ]

    XLSX.utils.sheet_add_aoa(worksheet, Heading, {
      origin: 'A2',
    })

    XLSX.utils.sheet_add_json(worksheet, newDataExport, {
      origin: 'A3', // bắt đầu ghi dữ liệu từ dòng thứ 2
      skipHeader: true,
    })

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'Telemail_Template_Export.xlsx')
  }

  return (
    <div className="px-6 pt-2 pb-4">
      <h1>Quản lý khách hàng</h1>

      <FormSearchCustomer onFinish={onSearchCustomer} />

      <div
        className={`flex items-center justify-end gap-2 mt-4 ${styles.removeHoverBtnAntd}`}
      >
        <Button
          className=" bg-blue-third text-white text-[14px] h-10 font-medium "
          onClick={handleOpenModalFrequency}
        >
          Cập nhật tần suất
        </Button>
        <Button
          className=" bg-blue-primary text-white text-[14px] h-10 font-medium "
          onClick={handleOpenModalSendMail}
        >
          Gửi mail
        </Button>
        <Button
          className=" bg-red-primary text-white text-[14px] h-10 font-medium "
          onClick={handleOpenModaSend}
        >
          Cập nhật trạng thái gửi
        </Button>
        <Button
          className="w-[121px] bg-violet-primary text-white text-[14px] h-10 font-medium "
          onClick={handleAssignCustomer}
        >
          Assign PIC
        </Button>
        <Button
          className="w-[121px] bg-green-primary text-white text-[14px] h-10 font-medium "
          onClick={() => setOpenModalUpload(true)}
        >
          Import
        </Button>
        <Button
          className="w-[121px] bg-gray-primary text-white text-[14px] h-10 font-medium "
          onClick={() => exportToExcel()}
        >
          Export KH
        </Button>
        <Button
          className=" bg-red-inactive text-white text-[14px] h-10 font-medium "
          onClick={handleDeleteCustomer}
        >
          Xóa KH
        </Button>
        <Button
          className=" bg-yellow-primary text-white text-[14px] h-10 font-medium "
          onClick={handleAddNewCustomer}
        >
          Thêm KH mới
        </Button>
      </div>

      <div className="p-4 border border-solid rounded-lg mt-4 border-gray-primary bg-white">
        <div className="mb-4 flex justify-between">
          <SelectLimitRecord handleChangeValue={handleSelectPerPage} />
        </div>
        <TableCustomer
          currentPage={currentPage}
          perPage={perPage}
          rowSelection={rowSelection}
          dataSource={dataSource}
          loading={isLoading}
        />
        {dataSource?.length != 0 ? (
          <Row className="mt-4 flex justify-between items-center text-black">
            <span className="text-[14px]">
              Hiển thị {handleCurrentPage(currentPage, perPage)}~
              {handleCurrentPageNew(totalRecord, currentPage, perPage)} trên{' '}
              {totalRecord?.toLocaleString()} bản ghi
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
      <ModalUploadFile
        isOpen={openModalUpload}
        setIsOpen={setOpenModalUpload}
        footer={true}
        setReload={setReload}
        reload={reload}
      ></ModalUploadFile>

      <ModalAssignCustomer
        initialValues={initialValues}
        isOpen={openModalAssign}
        dataField={dataField}
        setIsOpen={setOpenModalAssign}
        footer={false}
        onFinish={handleAllowToAssign}
      ></ModalAssignCustomer>

      <ModalUpdateFrequencyEmail
        initialValues={initialValues}
        isOpen={openModalFrequency}
        setIsOpen={setOpenModalFrequency}
        footer={false}
        onFinish={handleAllowUpdateFrequency}
      ></ModalUpdateFrequencyEmail>

      <ModalUpdateStatusSendMail
        // initialValues={initialValues}
        isOpen={openModalSendMail}
        setIsOpen={setOpenModalSendMail}
        footer={false}
        onFinish={handleUpdateSend}
        statusUpdateSending={statusUpdateSending}
      ></ModalUpdateStatusSendMail>

      <ModalSendEmailCustomer
        isOpen={openModalSendMailCustomer}
        setIsOpen={setOpenModalSendMailCustomer}
        footer={false}
        onFinish={handleSendMail}
        initialValues={initialValues}
      ></ModalSendEmailCustomer>

      <ModalErrorSendMail
        isOpen={openModalErrorSendMail}
        setIsOpen={setOpenModalErrorSendMail}
        footer={true}
        dataSource={dataErrorSendMail}
      ></ModalErrorSendMail>

      <ModalBase
        isOpen={openModalDeleteCustomer}
        setIsOpen={setOpenModalDeleteCustomer}
        onSave={onDeleteCustomer}
        header="Chú ý"
        content="Bạn có chắc muốn xóa khách hàng này?"
        footer={true}
      />

      <ModalBase
        isOpen={openModalError}
        setIsOpen={setOpenModalError}
        onSave={onAllowMutate}
        header="Chú ý"
        content={contentWarning}
        footer={true}
        disabledOnSave={disabledOnSave}
      />
    </div>
  )
}

export default ListCustomers
