import { useEffect, useState } from 'react'
import iconClose from '@/assets/image/iconClose.svg'
import { Button, Modal, notification } from 'antd'
import DropZone from '@/components/dropZone/DropZone'
import { UploadOutlined } from '@ant-design/icons'
import readXlsxFile from 'read-excel-file'
import { TableCustomerUploadFile } from '@/components/table'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { customerApi, CustomerResourceApi } from '@/adapter'
import { MESSAGE, QUERY_KEY } from '@/utils/constants'
import { Link } from 'react-router-dom'
import * as XLSX from 'xlsx'

import styles from '@/common.module.scss'

const accept = {
  'excel/*': ['.xlsx', '.xls'],
}

const ModalUploadFile = ({
  isOpen,
  setIsOpen,
  footer,
}: {
  // eslint-disable-next-line no-unused-vars
  isOpen: boolean
  setIsOpen: any
  footer?: any
  onSave?: any
  setReload?: any
  reload?: boolean
}) => {
  const client = useQueryClient()

  const [dataSource, setDataSource] = useState<any[]>([])

  const [dataField, setDataField] = useState<any>([])

  const [dataFileExcel, setDataFileExcel] = useState<File[]>([])

  const [statusAction, setStatusAction] = useState(false)

  const [isLoading, setIsloading] = useState<boolean>(false)

  const { data } = useQuery([QUERY_KEY.GET_ALL_CUSTOMER_RESOURCE], () =>
    CustomerResourceApi.searchCustomerResource()
  )

  useEffect(() => {
    setDataField(data?.data?.customerResource || [])
  }, [data])

  const handleCancel = () => {
    setStatusAction(false)
    setDataSource([])
    setIsOpen(false)
    client.invalidateQueries({
      queryKey: [QUERY_KEY.GET_ALL_CUSTOMER],
    })
  }

  const onCheckName = () => {
    if (dataSource.length !== 0) {
      setIsloading(true)
      mutationCheckName.mutate({
        data: [...dataSource].map((item: any) => {
          return {
            name: item.name,
          }
        }),
      })

      return
    }
    notification['error']({
      message: 'Vui lòng  chọn file Excel',
    })
  }

  const onFinish = async () => {
    if (dataSource.length !== 0) {
      setIsloading(true)

      const chunkSize = 500 // Kích thước mỗi mảng con
      // Chia mảng thành các mảng con
      const chunks = dataSource.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize)

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)
        return resultArray
      }, [])

      const newData: any[] = []

      for (let index = 0; index < chunks.length; index++) {
        const elementItem = chunks[index]

        await mutation
          .mutateAsync({
            data: [...elementItem].map((item: any) => {
              return {
                id: item.id,
                customerResourceId: item.customerResourceId,
                name: item.name,
                romajiName: item.romajiName,
                url: item.url,
                email: item.email,
                type: item.type,
                fieldName: item.fieldName,
                address: item.address,
                revenue: item.revenue,
                investment: item.investment,
                typeOfCustomer: item.typeOfCustomer,
                reason: item.reason,
                frequencyOfEmail: item.frequencyOfEmail,
                size: item.size,
                note: item.note,
              }
            }),
          })
          .then((res) => {
            newData.push(...res?.data)
          })
      }

      setIsloading(false)
      setStatusAction(true)
      setDataSource(
        newData
          .sort((a: any, b: any) => +a.oldId - +b.oldId)
          .map((item: any, index: number) => {
            return {
              ...item,
              no: index + 1,
              customerResourceName: dataSource.find(
                (element: any) => element.id === item.oldId
              )?.customerResourceName,
            }
          })
      )
      return
    }
    notification['error']({
      message: 'Vui lòng  chọn file Excel',
    })
  }

  // console.log(progress)

  const getIdResopurce: any = (filedName: any) => {
    const data = dataField?.filter((item: any) => item?.code === filedName)
    return data ? data[0]?.id : false
  }

  const onSetFile = (value: File[]) => {
    if (value.length === 0) {
      notification['error']({
        message: 'Vui lòng chỉ chọn file Excel',
      })
      return
    }

    setDataFileExcel(value)

    readXlsxFile(value[0]).then((rows) => {
      if (rows[1].length != 15 || !rows[1].every((value) => value !== null)) {
        return notification['error']({
          message: 'Vui lòng kiểm tra lại đủ số cột trong file excel',
        })
      }
      const data = rows
        .slice(2)
        .filter((item) => {
          return !item.slice(0, 15).every((value) => value === null)
        })

        .map((item, index: number) => {
          return {
            id: `${index + 1}`,
            no: `${index + 1}`,
            customerResourceName: item[0],
            customerResourceId: getIdResopurce(item[0]),
            name:
              item[1] === null || item[1] === undefined
                ? ''
                : item[1].toString(),
            romajiName:
              item[2] === null || item[2] === undefined
                ? ''
                : item[2].toString(),
            url:
              item[3] === null || item[3] === undefined
                ? ''
                : item[3].toString(),
            email:
              item[4] === null || item[4] === undefined
                ? ''
                : item[4].toString(),
            type: item[5] === 0 || item[5] === 1 ? item[5].toString() : item[5],
            fieldName:
              item[6] === null || item[6] === undefined
                ? ''
                : item[6].toString(),
            address:
              item[7] === null || item[7] === undefined
                ? ''
                : item[7].toString(),
            revenue: item[8],
            investment: item[9],
            size:
              item[10] === 0 || item[10] === 1 || item[10] === 2
                ? item[10].toString()
                : item[10],

            typeOfCustomer:
              item[11] === 1 || item[11] === 2 || item[11] === 3
                ? item[11].toString()
                : item[11],
            reason:
              item[12] === 1 ||
              item[12] === 2 ||
              item[12] === 3 ||
              item[12] === 4 ||
              item[12] === 5 ||
              item[12] === 6
                ? item[12].toString()
                : item[12],
            frequencyOfEmail:
              item[13] === 1 ||
              item[13] === 2 ||
              item[13] === 3 ||
              item[13] === 4 ||
              item[13] === 5
                ? item[13].toString()
                : item[13],
            note:
              item[14] === null || item[14] === undefined
                ? ''
                : item[14].toString(),
          }
        })

      if (data.length !== 0) {
        setDataSource(data)
        return
      }
      return notification['error']({
        message: 'Vui lòng Nhập dữ liệu trong file Excel',
      })
    })
  }

  const mutation = useMutation({
    mutationFn: async (params: any) => await customerApi.createByExcel(params),

    onError: ({ response }) => {
      setStatusAction(true)
      setIsloading(false)
      if (response.data.status.code === 400) {
        return notification['error']({
          message: response.data.status.message,
        })
      }

      return notification['error']({
        message: MESSAGE.ERROR.COMMON,
      })
    },
  })

  const mutationCheckName = useMutation({
    mutationFn: async (params: any) =>
      await customerApi.checkNameCustomer(params),
    onSuccess: (data) => {
      setStatusAction(true)
      setDataSource(data?.data?.dataCheckExinsted || [])
      setIsloading(false)
      notification['success']({
        message: `Kiểm tra tên khách hàng thành công`,
      })
      client.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_CUSTOMER],
      })
    },
    onError: ({ response }) => {
      setStatusAction(true)
      setIsloading(false)
      if (response.data.status.code === 400) {
        return notification['error']({
          message: response.data.status.message,
        })
      }

      return notification['error']({
        message: MESSAGE.ERROR.COMMON,
      })
    },
  })

  const _exportToExcel = () => {
    const Heading = [
      [
        'Nguồn khách hàng *',
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
        'Nguyên nhân',
        'Trạng thái Import',
      ],
    ]

    const dataExport = dataSource.map((item: any) => {
      return {
        customerResourceName: item.customerResourceName,
        name: item.name,
        romajiName: item.romajiName,
        url: item.url,
        email: item.email,
        type: item.type,
        size: item.size,
        fieldName: item.fieldName,
        address: item.address,
        revenue: item.revenue,
        investment: item.investment,
        typeOfCustomer: item.typeOfCustomer,
        reason: item.reason,
        frequencyOfEmail: item.frequencyOfEmail,
        note: item.note,
        errMsg: item.errMsg,
        stauts: item.oldId ? (item.errMsg ? 'Thất bại' : 'Thành công') : '',
      }
    })

    const wb = XLSX.utils.book_new()
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([])

    XLSX.utils.sheet_add_aoa(ws, Heading, {
      origin: 'A2',
    })
    XLSX.utils.sheet_add_json(ws, dataExport, {
      origin: 'A3',
      skipHeader: true,
    })

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, 'TelemailDataExport.xlsx')
  }

  return (
    <Modal
      className={styles.paddingModal}
      open={isOpen}
      closable={false}
      centered
      width={1200}
      title={
        <div className="flex px-4 pt-6 pb-4 border-b-4 shadow text-black">
          <h3>Tải dữ liệu lên</h3>
          <span className="ml-auto cursor-pointer" onClick={handleCancel}>
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={
        footer ? (
          <div>
            {dataSource.length !== 0 ? (
              !statusAction ? (
                <div className="flex justify-center gap-10 py-4 px-6">
                  <Button
                    className="text-black border border-black bg-white w-[100px] h-10 text-sm font-medium"
                    onClick={() => setDataSource([])}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    loading={isLoading}
                    className="text-white bg-yellow-primary h-10 text-sm font-medium"
                    onClick={onCheckName}
                  >
                    Kiểm tra trùng tên
                  </Button>
                  <Button
                    loading={isLoading}
                    className="text-white bg-yellow-primary w-[120px] h-10 text-sm font-medium"
                    onClick={onFinish}
                  >
                    Upload file
                  </Button>
                </div>
              ) : (
                <div className="flex justify-center gap-10 py-4 font-medium">
                  <Button
                    className="text-yellow-primary border-2 border-yellow-primary bg-white font-bold h-10 text-sm"
                    onClick={_exportToExcel}
                  >
                    Export kết quả upload
                  </Button>
                  <Button
                    className="text-white bg-yellow-primary w-[100px] h-10 text-sm font-medium"
                    onClick={() => handleCancel()}
                  >
                    Đóng
                  </Button>
                </div>
              )
            ) : (
              <div className="flex justify-between gap-10 py-4 px-6">
                <Link
                  className=" bg-white h-[40px] w-[150px] leading-[34px] border-2 border-solid font-semibold border-blue-sixth text-blue-sixth rounded-md text-center"
                  to="/Telemail_Template_Import_updated.xlsx"
                  target="_blank"
                  download
                >
                  Download template
                </Link>
              </div>
            )}
          </div>
        ) : (
          false
        )
      }
    >
      {dataSource.length === 0 ? (
        <DropZone
          multiple={false}
          onSetFile={onSetFile}
          accept={accept}
          className="w-full text-sm rounded-md text-gray-400 h-[180px] border boder-solid bg-gray-100 flex items-center justify-center flex-col gap-2 cursor-pointer"
          icon={
            <UploadOutlined
              style={{
                color: 'black',
                fontSize: '60px',
                marginRight: '16px',
              }}
            />
          }
          buttonUpLoad={true}
          titleUpload="hoặc kéo và thả file để upload"
        />
      ) : (
        ''
      )}

      {dataSource.length !== 0 ? (
        <div className="px-6">
          <div className="flex my-4 text-sm">
            <span className="w-[100px]">Tên file: </span>
            <span>{dataFileExcel[0]?.name}</span>
          </div>
          <div className="mb-2 text-sm">Chi tiết:</div>
          <TableCustomerUploadFile
            loading={isLoading}
            dataSource={dataSource}
          />
        </div>
      ) : (
        ''
      )}
      {/* <Progress type="circle" percent={progress} /> */}
    </Modal>
  )
}

export default ModalUploadFile
