import { CustomerResourceApi } from '@/adapter'
import IconDownload from '@/assets/image/icon_download.svg'
import { Button, Space, Table } from 'antd'
import moment from 'moment'
import { memo, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { ModalBase } from '../modal'

import {
  renderCompanySize,
  renderFrequencyOfEmail,
  renderResonBlackList,
  renderTypeOfCustomer,
} from '@/utils/helper'
import * as XLSX from 'xlsx'

type EditableTableProps = Parameters<typeof Table>[0]

interface IProps {
  dataTable?: any
  pageSize?: any
  current?: any
  loading?: boolean
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const TableListImportHistoriesCustomer = ({
  dataTable,
  pageSize,
  current,
  loading,
}: IProps) => {
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)

  const [dataExport, setDataExport] = useState<any>()

  const mutationDetail = useMutation({
    mutationFn: (params: any) => {
      return CustomerResourceApi.getDetailImportHistoryCustomer(params)
    },
    onSuccess: (res: any) => {
      const newData = res?.data?.customerResourceSent
      setDataExport(newData)
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)
    },
  })

  const exportExcel = (record: any) => {
    const newData = { importCustomerHistoriesId: record?.id }
    mutationDetail.mutate(newData)
    setOpenModalConfirm(true)
  }

  const onExport = () => {
    const newDataExport = dataExport?.map((item: any) => {
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
    setOpenModalConfirm(false)
  }

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: 60,
      render: (_: any, record: any, row: any) => {
        return <div>{pageSize * (current - 1) + (row + 1)}</div>
      },
    },
    {
      title: 'Thời gian',
      dataIndex: 'importDate',
      key: 'importDate',
      align: 'center',
      width: 200,
      render: (text: any) => {
        return text ? moment(text).format('DD/MM/YYYY HH:mm:ss') : ''
      },
    },
    {
      title: 'Số KH import',
      dataIndex: 'customerNumber',
      key: 'customerNumber',
      align: 'center',
      width: 120,
      render: (_: any, record: any) => {
        return record?.customerNumber
          ? Number(record?.customerNumber)?.toLocaleString()
          : ''
      },
    },
    {
      title: 'Người thực hiện',
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: 'center',
      width: 200,
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 80,
      fixed: 'right',
      render: (text: string, record: any) => (
        <Space className="flex justify-center items-center">
          <Button
            className="flex items-center justify-center border-none"
            icon={<img src={IconDownload} width={28} height={24} />}
            onClick={() => exportExcel(record)}
          ></Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="flex gap-2 flex-col">
      <Table
        scroll={{ x: 1200 }}
        rowKey="id"
        bordered
        dataSource={dataTable}
        columns={columns as ColumnTypes}
        pagination={false}
        loading={loading}
      />

      <ModalBase
        isOpen={openModalConfirm}
        setIsOpen={setOpenModalConfirm}
        onSave={onExport}
        header="Xác nhận"
        content="Bạn có chắc chắn muốn export lịch sử import này?"
        footer={true}
      />
    </div>
  )
}

export default memo(TableListImportHistoriesCustomer)
