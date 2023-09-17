import { CustomerResourceApi } from '@/adapter'
import InquiryApi from '@/adapter/inquiry'
import { DisplayRecord } from '@/components/select'
import { TableViewInquiry } from '@/components/table'
import { QUERY_KEY } from '@/utils/constants'
import { cleanObj } from '@/utils/helper'
import { Button, Col, Form, Pagination, Row, Select } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const ViewInquiry = () => {
  const { state } = useLocation()
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const [customerResource, setCustomerResource] = useState<any>()

  const showTotal = (total: any, range: any) => {
    return (
      <label className="text-[14px]">
        {`Hiển thị ${range[0].toLocaleString()} ~ ${range[1].toLocaleString()} trên ${total.toLocaleString()} bản ghi `}
      </label>
    )
  }

  const [pagination, setPagination]: any = useState({
    currentPage: 1,
    perPage: 10,
    totalPage: 10,
    totalRecord: 10,
    showTotal: showTotal,
  })

  const handleChange = (value: any) => {
    setPagination({ ...pagination, perPage: value, currentPage: 1 })
  }

  const handleChangeCustomerResource = (value: any) => {
    setCustomerResource(value)
  }

  const handleChangePage = (values: any) => {
    setPagination({ ...pagination, currentPage: values })
  }

  const { data: dataCustomerResource = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CUSTOMER_RESOURCE_VIEW],
    queryFn: () =>
      CustomerResourceApi.getWithCustomerSent({
        sendDate: state?.data?.sendDate,
        pregnancyStatusSending: 2,
      }).then((res: any) => {
        const newData = res?.data?.customerResourceSent?.map((data: any) => {
          return {
            label:
              data?.name +
              ` (${
                data?.totalCustomer ? +data?.totalCustomer?.toLocaleString() : 0
              })`,
            value: data?.id,
          }
        })
        newData?.unshift({ label: 'Tất cả', value: 0 })

        form.setFieldValue('customerResourceId', newData?.[0])
        return newData
      }),
  })

  const getDataTable = async () => {
    const param = {
      ...pagination,
      sendDate: state?.data?.sendDate,
      customerResourceId: customerResource,
      currentPage: pagination.currentPage,
      perPage: pagination.perPage,
    }

    if (param?.customerResourceId === 0) delete param.customerResourceId

    delete param?.totalPage
    delete param?.totalRecord
    delete param?.showTotal

    const filteredValues = cleanObj(param)
    return await InquiryApi.getInquiryById(filteredValues).then((res) => {
      setPagination({
        ...pagination,
        totalRecord: res?.data?.paginate?.totalRecord,
      })
      return res?.data
    })
  }

  const { data: dataViewInquiry, isLoading } = useQuery(
    [
      QUERY_KEY.GET_BY_ID_INQUIRY,
      state?.data,
      pagination?.currentPage,
      pagination?.perPage,
      customerResource,
    ],
    () => getDataTable()
  )

  return (
    <div className="px-6 pt-2 pb-4">
      <h1>Chi tiết gửi inquiry</h1>
      <div className="border border-solid rounded border-gray-primary p-8 mt-4 w-full bg-white">
        <Row justify={'space-between'}>
          <Col span={12}>
            <label className="text-sm">Thời gian gửi:</label>
            <label className="ml-20 text-sm">
              {state?.data?.sendDate
                ? moment(state?.data?.sendDate).format('DD/MM/YYYY')
                : ''}
            </label>
          </Col>
          <Col span={12}>
            <label className="text-sm">Người gửi:</label>
            <label className="ml-20 text-sm">
              {state?.data?.sendBy ? state?.data?.sendBy : ''}
            </label>
          </Col>
        </Row>

        <Row justify={'space-between'} className="mt-6">
          <Col span={12}>
            <label className="text-sm">Tên template:</label>
            <label className="ml-20 text-sm">
              {state?.data?.templateName ? state?.data?.templateName : ''}
            </label>
          </Col>
          <Col span={12}></Col>
        </Row>
        <div className="mt-20">
          <label className="font-bold text-xl">
            Danh sách khách hàng đã gửi
            {` (${
              state?.data?.countCustomer
                ? state?.data?.countCustomer?.toLocaleString()
                : 0
            })`}
          </label>
        </div>
        <div className="h-[1px] bg-gray-primary my-6"></div>

        <div className="flex justify-between items-center mb-4">
          <DisplayRecord handleChange={handleChange} />

          <Form form={form} className="w-[300px]" name="formPurchaseRequest">
            <Form.Item
              {...formItemLayout}
              className="w-full"
              name="customerResourceId"
              label="Nguồn"
            >
              <Select
                className="w-full ml-2"
                onChange={handleChangeCustomerResource}
                options={dataCustomerResource}
                showSearch
                allowClear
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Form>
        </div>

        <TableViewInquiry
          dataTable={
            dataViewInquiry?.inquiryHistory
              ? dataViewInquiry?.inquiryHistory
              : []
          }
          current={pagination?.currentPage}
          pageSize={pagination?.perPage}
          loading={isLoading}
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

      <div className="w-full flex justify-center items-center">
        <Button
          className="my-10 w-[120px] bg-yellow-primary text-white"
          size="large"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>
      </div>
    </div>
  )
}

export default ViewInquiry
