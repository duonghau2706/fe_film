import { IDocument } from '@/interfaces'

import { FolderFilled, InfoCircleFilled } from '@ant-design/icons'

import iconEmpty from '@/assets/image/iconEmpty.png'
import iconExcel from '@/assets/image/iconExcel.png'
import iconPdf from '@/assets/image/iconPdf.png'
import iconPpt from '@/assets/image/iconPpt.png'
import iconTxt from '@/assets/image/iconTxt.png'
import iconWord from '@/assets/image/iconWord.png'

import { documentAPI } from '@/adapter'
import IconDelete from '@/assets/image/icon_delete_doc.svg'
import IconDownload from '@/assets/image/icon_download_doc.svg'
import IconEdit from '@/assets/image/icon_edit_doc.svg'
import IconClock from '@/assets/image/icon_history_doc.svg'
import { ModalBase, ModalHistoryDocument } from '@/components/modal'
import { MESSAGE, QUERY_KEY, URL, endpoint } from '@/utils/constants'
import { Button, Col, Row } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const DocumentItem = ({
  id,
  icon,
  title,
  fileType,
  fileName,
  typeSave,
  domain,
  subDomain,
  techUsed,
  languageDev,
  description,
  tags,
  timeUpdated,
  createdAt,
  createdBy,
  name,
  originId,
  sharepointId,
}: IDocument) => {
  const navigate = useNavigate()
  const client = useQueryClient()

  const [openModalDeleteDocument, setOpenModalDeleteDocument] = useState(false)
  const [openModalDownloadDocument, setModalDownloadDocument] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const mutationDelete = useMutation({
    mutationFn: (params: any) => {
      return documentAPI.deleteById(params)
    },
    onSuccess: () => {
      toast.success(MESSAGE.SUCESS.DOCUMENT.DELETE)
      client.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_DOCUMENT],
      })
      client.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_QUANTITY_BY_TYPE],
      })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)
    },
  })

  const handlerDeleteDocument = () => {
    setOpenModalDeleteDocument(true)
  }

  //Xóa document
  const onDeleteDocument = () => {
    mutationDelete.mutate({ id })
    setOpenModalDeleteDocument(false)
  }

  const onHandlerDownloadDocument = async () => {
    setModalDownloadDocument(true)
  }
  const onDownloadDocument = async () => {
    setLoading(true)
    return await fetch(
      `${import.meta.env.VITE_BASE_API_URl}${
        endpoint.download_document
      }?fileId=${sharepointId}`
    ).then((response: any) => {
      if (response.status === 404) {
        setLoading(false)
        setModalDownloadDocument(false)
        return toast.error(MESSAGE.ERROR.SHAREPOINT.DOWNLOAD)
      }
      response.blob().then((blob: any) => {
        const fileURL = window.URL.createObjectURL(blob)
        const alink = document.createElement('a')
        alink.href = fileURL
        alink.download = fileName
        alink.click()
      })
      setLoading(false)
      setModalDownloadDocument(false)
    })
  }

  const handleHistory = () => {
    setIsOpen(true)
  }

  const renderIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'xlsx':
        return (
          <img
            src={iconExcel}
            alt="Excel Icon"
            width={'100%'}
            height={'100%'}
          />
        )
      case 'xls':
        return (
          <img
            src={iconExcel}
            alt="Excel Icon"
            width={'100%'}
            height={'100%'}
          />
        )
      case 'docx':
        return (
          <img src={iconWord} alt="Docx Icon" width={'100%'} height={'100%'} />
        )
      case 'pptx':
        return (
          <img src={iconPpt} alt="PPT Icon" width={'100%'} height={'100%'} />
        )
      case 'pdf':
        return (
          <img src={iconPdf} alt="PDF Icon" width={'100%'} height={'100%'} />
        )
      case 'txt':
        return (
          <img src={iconTxt} alt="TXT Icon" width={'100%'} height={'100%'} />
        )
      default:
        return (
          <img src={iconEmpty} alt="TXT Icon" width={'100%'} height={'100%'} />
        )
    }
  }

  return (
    <div className="text-[13px] px-5 pt-2 pb-2 bg-[#FFFFFF] rounded-[10px] mb-2 w-full">
      <Row className="flex mb-2 w-full justify-between relative">
        <Col span={2}>
          <div className="w-[78px] h-[84px]">{renderIcon(icon)}</div>
        </Col>

        <Col
          span={22}
          className="absolute ml-[100px]"
          style={{ width: 'calc(100% - 100px)' }}
        >
          <div className="flex justify-between">
            <Col span={16} className="w-full">
              <span className="font-semibold block text-[rgb(2,125,180)] text-[14px]">
                {fileType}
              </span>
              <h3 className="block font-bold text-[18px] whitespace-nowrap overflow-hidden text-ellipsis">
                {title}
              </h3>
            </Col>

            <Col span={8} className="flex gap-3 items-center justify-end">
              <Button
                onClick={handleHistory}
                className="flex items-center p-[5px] rounded-[5px] border-brown-primary border-solid border-[1px] w-[30px] h-[30px] cursor-pointer"
              >
                <img
                  src={IconClock}
                  alt={title}
                  style={{ width: '100%', height: '100%' }}
                />
              </Button>
              <Button
                className="flex items-center p-[5px] rounded-[5px] border-brown-primary border-solid border-[1px] w-[30px] h-[30px] cursor-pointer"
                onClick={() => onHandlerDownloadDocument()}
              >
                <img
                  src={IconDownload}
                  alt={title}
                  style={{ width: '100%', height: '100%' }}
                />
              </Button>
              <Button
                className="flex items-center p-[5px] rounded-[5px] border-brown-primary border-solid border-[1px] w-[30px] h-[30px] cursor-pointer"
                onClick={() => navigate(URL.UPLOAD_DOCUMENT.concat(`/${id}`))}
              >
                <img
                  src={IconEdit}
                  alt={title}
                  style={{ width: '100%', height: '100%' }}
                />
              </Button>
              <Button
                className="flex items-center p-[5px] rounded-[5px] border-brown-primary border-solid border-[1px] w-[30px] h-[30px] cursor-pointer"
                onClick={handlerDeleteDocument}
              >
                <img
                  src={IconDelete}
                  alt={title}
                  style={{ width: '100%', height: '100%' }}
                />
              </Button>
            </Col>
          </div>

          <div className="text-brown-primary font-semibold flex gap-16">
            <div className="flex items-center gap-1">
              <FolderFilled style={{ fontSize: '17px' }} />
              <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                {typeSave}
              </div>
            </div>

            <div className="flex items-center gap-1 max-w-[500px]">
              <InfoCircleFilled style={{ fontSize: '15px' }} />
              <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                {domain} | {subDomain}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <div className="my-1">
        <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
          Công nghệ sử dụng: {techUsed}
        </span>
      </div>

      <div className="my-1">
        <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
          Ngôn ngữ phát triển: {languageDev}
        </span>
      </div>

      <div className="my-1">
        <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
          Mô tả: {description}
        </span>
      </div>

      <div className="my-1">
        <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
          Tag:
          <span className="text-[#027DB4] underline break-words ml-2">
            {tags?.map((item: any, index: number) => {
              return (
                <span className="mr-1 cursor-pointer" key={index + 1}>
                  <Link to={`?tag=${item}`}>{`#${item}`}</Link>
                </span>
              )
            })}
          </span>
        </span>
      </div>

      <div className="flex justify-end text-brown-primary font-medium w-full">
        <span className="block mr-0.5">
          Cập nhật gần nhất:&nbsp;
          {moment(timeUpdated).format('DD/MM/YYYY HH:mm:ss')
            ? moment(timeUpdated).format('DD/MM/YYYY HH:mm:ss')
            : createdAt}
        </span>
        <span className="ml-2">bởi {name ? name : createdBy}</span>
      </div>

      <ModalHistoryDocument
        originId={originId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></ModalHistoryDocument>

      <ModalBase
        isOpen={openModalDeleteDocument}
        setIsOpen={setOpenModalDeleteDocument}
        onSave={onDeleteDocument}
        header="Chú ý"
        content="Bạn có chắc muốn xóa tài liệu này?"
        footer={true}
      />
      <ModalBase
        isOpen={openModalDownloadDocument}
        setIsOpen={setModalDownloadDocument}
        onSave={onDownloadDocument}
        header="Chú ý"
        content="Bạn có chắc muốn tải về tài liệu này?"
        footer={true}
        loading={loading}
      />
    </div>
  )
}

export default DocumentItem
