import { CustomerResourceApi } from '@/adapter'
import iconClose from '@/assets/image/iconClose.svg'
import styles from '@/common.module.scss'
import { QUERY_KEY, statusResponse } from '@/utils/constants'
import { cleanObj } from '@/utils/helper'
import { Button, Col, Form, Modal, Pagination, Row, Select } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { TableHistorySendMail } from '../table'
import { DisplayRecord } from '../select'

interface IDataView {
  customerId: string
  url: string
  name: string
  customerResource: string
  email: string
}

const ModalHistorySendMail = ({
  isOpen,
  setIsOpen,
  header,
  dataView,
  idCustomerResource,
  startDate,
  endDate,
}: {
  isOpen: boolean
  setIsOpen: any
  header: string
  dataView: IDataView
  idCustomerResource: string
  startDate?: any
  endDate?: any
}) => {
  const [dataTable, setDataTable] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  const [form] = Form.useForm()

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
    statusResponse: '',
  })

  const handleCancel = () => {
    form.resetFields()
    setPagination({ ...pagination, statusResponse: '' })
    setIsOpen(false)
  }

  const getDataTable = async () => {
    const param = {
      ...pagination,
      startDate: startDate,
      endDate: endDate,
      currentPage: pagination.currentPage,
      perPage: pagination.perPage,
      customerResourceId: idCustomerResource,
      customerId: dataView?.customerId,
    }
    delete param?.totalPage
    delete param?.totalRecord
    delete param?.showTotal
    const filteredValues = cleanObj(param)
    setLoading(true)
    return await CustomerResourceApi.getHistorySendMail(filteredValues).then(
      (res) => {
        setPagination({
          ...pagination,
          totalRecord: res?.data?.paginate?.totalRecord,
        })
        setDataTable(res?.data?.customerResource)
        setLoading(false)
      }
    )
  }

  useQuery({
    queryKey: [
      QUERY_KEY.GET_ALL_HISTORY_SEND_MAIL,
      pagination?.statusResponse,
      pagination?.currentPage,
      pagination?.perPage,
    ],
    queryFn: () => getDataTable(),
    enabled: isOpen,
  })

  const handleChangeStatus = (value: any) => {
    setPagination({ ...pagination, statusResponse: value, currentPage: 1 })
  }

  const handleChangePage = (values: any) => {
    setPagination({ ...pagination, currentPage: values })
  }

  const handleChange = (value: any) => {
    setPagination({ ...pagination, perPage: value, currentPage: 1 })
  }

  return (
    <Modal
      className={styles.paddingModal}
      open={isOpen}
      closable={false}
      centered
      width={'full'}
      title={
        <div className="flex p-4 border-b-4 shadow text-black pt-6">
          <h3 className="m-0 text-[20px] font-semibold">{header}</h3>
          <span className="ml-auto cursor-pointer" onClick={handleCancel}>
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={
        <div className="flex justify-center gap-10 pb-6">
          <Button
            className="text-white bg-yellow-primary w-[120px] h-10 text-[14px] font-bold"
            onClick={handleCancel}
          >
            Đóng
          </Button>
        </div>
      }
    >
      <div className="px-10 py-6 w-full max-h-[650px] overflow-auto">
        <Row justify={'space-between'} className="w-full mb-8">
          <Col span={12}>
            <Row>
              <Col span={6} className="text-[14px]">
                <label>Tên KH:</label>
              </Col>
              <Col span={18} className="text-[14px]">
                <label>{dataView?.name}</label>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={6} className="text-[14px]">
                <label>Nguồn:</label>
              </Col>
              <Col span={18} className="text-[14px]">
                <label>{dataView?.customerResource}</label>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row justify={'space-between'} className="mb-8 text-[14px] w-full">
          <Col span={12}>
            <Row>
              <Col span={6} className="text-[14px]">
                <label>URL:</label>
              </Col>
              <Col span={18} className="text-[14px]">
                <label>{dataView?.url}</label>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={6} className="text-[14px]">
                <label>Email:</label>
              </Col>
              <Col span={18} className="text-[14px]">
                <label>{dataView?.email}</label>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="h-[2px] bg-gray-200 mb-8"></div>

        <div className="mb-6 flex justify-between w-full pr-8">
          <DisplayRecord handleChange={handleChange} />
          <div>
            <Form form={form}>
              <Form.Item
                label="Trạng thái phản hồi"
                name="statusRes"
                className="w-[310px]"
              >
                <Select
                  className="ml-8"
                  onChange={handleChangeStatus}
                  options={statusResponse}
                  allowClear
                />
              </Form.Item>
            </Form>
          </div>
        </div>

        <TableHistorySendMail
          dataTable={dataTable}
          current={pagination?.currentPage}
          pageSize={pagination?.perPage}
          loading={loading}
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
      </div>
    </Modal>
  )
}

export default ModalHistorySendMail
