import iconDownload from '@/assets/iconDownloadHistory.svg'
import { MESSAGE, endpoint } from '@/utils/constants'
import { Table } from 'antd'
import moment from 'moment'
import { useState, memo } from 'react'
import { toast } from 'react-toastify'
import { ModalBase } from '../modal'

type EditableTableProps = Parameters<typeof Table>[0]

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>
const TableHistoryDocument = ({ dataHistory }: any) => {
  const [openModalDownloadDocument, setModalDownloadDocument] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectDownload, setSelectDownload] = useState<any>()

  const handleDownload = (sharepointId: string, fileName: string) => {
    setModalDownloadDocument(true)
    setSelectDownload({ sharepointId, fileName })
  }
  const onDownloadDocument = async () => {
    setLoading(true)
    return await fetch(
      `${import.meta.env.VITE_BASE_API_URl}${
        endpoint.download_document
      }?fileId=${selectDownload?.sharepointId}`
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
        alink.download = selectDownload?.fileName
        alink.click()
      })
      setLoading(false)
      setModalDownloadDocument(false)
    })
  }
  const columns: any = [
    {
      title: 'Phiên bản',
      dataIndex: 'version',
      key: 'version',
      align: 'center',
      width: 100,
    },
    {
      title: 'Thời gian thay đổi',
      dataIndex: 'formattedDatetime',
      key: 'formattedDatetime',
      width: 170,
      align: 'center',
      render: (_: any, record: any) => {
        return record?.formattedDatetime
          ? moment(record?.formattedDatetime)
              .local()
              .format('DD/MM/YYYY HH:mm:ss')
          : ''
      },
    },
    {
      title: 'Người thay đổi',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 180,
      align: 'center',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      width: 400,
      render: (text: string) => <div>{text}</div>,
    },
    {
      title: ' ',
      dataIndex: 'feedbackDate',
      key: 'feedbackDate',
      align: 'center',
      width: 60,
      render: (_: any, record: any) => {
        return (
          <img
            onClick={() => handleDownload(record.sharepointId, record.fileName)}
            height={24}
            width={24}
            style={{ cursor: 'pointer' }}
            id="u198_img"
            className="img"
            src={iconDownload}
            alt="Image"
          />
        )
      },
    },
  ]

  const tableContainerStyle = {
    maxHeight: '400px',
    overflow: dataHistory?.length > 0 ? 'auto' : 'hidden',
  }

  return (
    <div style={tableContainerStyle}>
      <Table
        columns={columns as ColumnTypes}
        dataSource={dataHistory}
        pagination={false}
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

export default memo(TableHistoryDocument)
