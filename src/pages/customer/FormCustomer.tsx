/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  MESSAGE,
  NOTE,
  QUERY_KEY,
  frequencyOfCustomer,
  getFolderCustomer,
} from '@/utils/constants'
import { customerApi, userApi, CustomerResourceApi } from '@/adapter'
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  InputNumber,
  notification,
} from 'antd'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import styles from '@/common.module.scss'
interface ISearchPaymentHistory {
  time: string[]
  request_code: string
  po_code: string
  status: string
  payment_request_code: string
  supplier_name: string
}

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const type = [
  { value: '1', label: 'IT' },
  { value: '0', label: 'Non-IT' },
]

const sizeCompany = [
  { value: '0', label: 'Nhỏ' },
  { value: '1', label: 'Trung bình' },
  { value: '2', label: 'To' },
]

const typeCustomer = [
  { value: '1', label: 'Normal' },
  { value: '2', label: 'Black list' },
  { value: '3', label: 'Special' },
]

const typeOfSend = [
  { value: 1, label: 'Gửi mail' },
  { value: 2, label: 'Gửi Inquiry' },
]

const FormCustomer = () => {
  const navigate = useNavigate()

  const client = useQueryClient()

  const { id } = useParams()

  const { state } = useLocation()

  const { action } = state

  const [dataCustomerResource, setdataCustomerResource] = useState([])

  const [statusTypeCustomer, setStatusCustomer] = useState<string>()

  const [form] = Form.useForm<ISearchPaymentHistory>()

  const [dataAllUser, setdataUser] = useState([])

  const onFinish = (values: any) => {
    if (id && detailCustomer) {
      const formData = {
        ...values,
        type: values?.type === undefined ? '' : values?.type,
        id: detailCustomer?.id,
      }
      return updateCustomerMutation.mutate(formData)
    }
    return createCustomerMutation.mutate(values)
  }

  const createCustomerMutation = useMutation({
    mutationFn: async (params: any) => await customerApi.create(params),
    onSuccess: (data) => {
      notification['success']({
        message: `${MESSAGE.SUCESS.CUSTOMER.CREATE} ${data.data.name}`,
      })
      handleCancel()
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

  const updateCustomerMutation = useMutation({
    mutationFn: (params: any) => customerApi.update(params),
    onSuccess: (data) => {
      notification['success']({
        message: `${MESSAGE.SUCESS.CUSTOMER.UPDATE} ${data.data.name}`,
      })
      handleCancel()
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

  const { data: detailCustomer, refetch: refetchCustomerDetail } = useQuery({
    queryKey: [QUERY_KEY.GET_CUSTOMER_BY_ID],
    queryFn: () => customerApi.getById({ id }).then((res) => res?.data),
    enabled: false,
  })

  useEffect(() => {
    if (id) {
      refetchCustomerDetail()
    }
  }, [id])

  useEffect(() => {
    if (id && detailCustomer) {
      form.setFieldsValue({
        ...detailCustomer,
      })
      setStatusCustomer(detailCustomer?.typeOfCustomer)
    }
  }, [detailCustomer])

  const { data: dataUser = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_USER],
    queryFn: () => userApi.getAll(),
  })

  const { data: dataFolderCustomer = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CUSTOMER_RESOURCE],
    queryFn: () => CustomerResourceApi.searchCustomerResource(),
  })

  useEffect(() => {
    const newData = dataFolderCustomer?.data?.customerResource?.map(
      (item: any) => {
        return { label: item?.name, value: item?.id }
      }
    )
    setdataCustomerResource(newData || [])
  }, [dataFolderCustomer])

  useEffect(() => {
    const newData = dataUser?.data?.element?.map((item: any) => {
      return { label: item?.name, value: item?.id }
    })
    setdataUser(newData || [])
  }, [dataUser])

  const initialValues: any = {
    foler_customer: getFolderCustomer[0].value,
    typeOfSend: typeOfSend[1].value,
  }

  const handleCancel = useCallback(() => {
    form.resetFields()
    navigate(-1)
  }, [])

  const onSelectTypeCustomer = (value: string) => {
    setStatusCustomer(value)
  }

  const handleValueOfEmail = (event: any) => {
    if (event.target.value) {
      form.setFieldsValue({
        ...initialValues,
        typeOfSend: typeOfSend[0].value,
      })
      return
    }
    form.setFieldsValue({
      ...initialValues,
      typeOfSend: typeOfSend[1].value,
    })
  }

  return (
    <div className="px-6 py-2">
      <h1>
        {id && action === 'view'
          ? 'Xem thông tin chi tiết khách hàng'
          : id && action === 'edit'
          ? 'Sửa khách hàng'
          : 'Thêm mới khách hàng'}
      </h1>

      <div className="p-4 rounded-md bg-white border-gray-primary border-solid border-[1px]">
        <Form
          disabled={id && action === 'view' ? true : false}
          form={form}
          className={`${styles.textNotDisabled} w-full`}
          name="nest-messages"
          onFinish={onFinish}
          initialValues={initialValues}
        >
          <Row gutter={80} className="mb-6">
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className="w-full pr-6"
                name="name"
                label="Tên khách hàng (JP)"
                rules={[
                  {
                    required: true,
                    message: 'Tên khách hàng không được để trống',
                  },
                ]}
              >
                <Input style={{ color: 'black' }} placeholder="Nhập tên KH" />
              </Form.Item>
            </Col>
            <Col span={12} className="pl-6">
              <Form.Item
                {...formItemLayout}
                className="w-full pl-6"
                name="romajiName"
                label="Tên khách hàng (Romanji)"
              >
                <Input style={{ color: 'black' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={80} className="mb-6">
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className="w-full pr-6"
                name="customerResourceId"
                label="Nguồn khách hàng"
                rules={[
                  {
                    required: true,
                    message: 'Nguồn khách hàng không được để trống',
                  },
                ]}
              >
                <Select
                  style={{ color: 'black' }}
                  showSearch
                  placeholder="Chọn nguồn khách hàng"
                  allowClear
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={dataCustomerResource}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className="w-full pl-6"
                name="url"
                label="URL"
                rules={[
                  { type: 'url', message: 'Vui lòng nhập đúng định dạng url' },
                ]}
              >
                <Input style={{ color: 'black' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={80} className="mb-6">
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className="w-full pr-6"
                name="email"
                label="Email"
                rules={[
                  {
                    type: 'email',
                    message: 'Vui lòng nhập đúng định dạng email',
                  },
                ]}
              >
                <Input
                  onChange={handleValueOfEmail}
                  style={{ color: 'black' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className="w-full pl-6"
                name="type"
                label="Loại"
              >
                <Select style={{ color: 'black' }} allowClear>
                  {type?.map((option: any) => (
                    <Select.Option
                      key={option.value}
                      value={option.value}
                      disabled={option.value === '2'}
                    >
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={80} className="mb-6">
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className="w-full pr-6"
                name="size"
                label="Size công ty"
              >
                <Select className={`${styles.textNotDisabled}`} allowClear>
                  {sizeCompany?.map((option: any) => (
                    <Select.Option
                      key={option.value}
                      value={option.value}
                      disabled={option.value === '4'}
                    >
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="w-full pl-6"
                name="address"
                label="Trụ sở"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input style={{ color: 'black' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={80} className="mb-6">
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className="w-full pr-6"
                name="revenue"
                label="Doanh thu"
              >
                <InputNumber
                  style={{ color: 'black' }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')} // type="number"
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className="w-full pl-6"
                name="investment"
                label="Vốn đầu tư"
              >
                <InputNumber
                  style={{ color: 'black' }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')} // type="number"
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={80} className="mb-6">
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                name={'fieldName'}
                label="Lĩnh vực (Domain)"
                className={`${styles.textAreaNotDisabled} w-full pr-6`}
              >
                <Input.TextArea
                  style={{ color: 'black' }}
                  autoSize={{ minRows: 4, maxRows: 4 }}
                  rows={5}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className="w-full mb-6 pl-6 mt-[6px]"
                name="personInChargeId"
                label="Người phụ trách"
              >
                <Select
                  style={{ color: 'black' }}
                  showSearch
                  placeholder="Chọn người phụ trách"
                  allowClear
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={dataAllUser}
                ></Select>
              </Form.Item>
              <Form.Item
                className="w-full pl-6"
                name="typeOfCustomer"
                label="Phân loại KH "
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Select
                  style={{ color: 'black' }}
                  onSelect={onSelectTypeCustomer}
                  allowClear
                >
                  {typeCustomer?.map((option: any) => (
                    <Select.Option
                      key={option.value}
                      value={option.value}
                      disabled={option.value === '0'}
                    >
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={80} className="mb-6">
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                className="w-full pr-6"
                name="frequencyOfEmail"
                label="Tần suất gửi mail"
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  options={frequencyOfCustomer}
                ></Select>
              </Form.Item>
            </Col>

            {statusTypeCustomer === '2' ? (
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-full pl-6"
                  name="reason"
                  label="Lý do"
                  rules={[
                    {
                      required: true,
                      message: 'Lý do không được để trống',
                    },
                  ]}
                >
                  <Select style={{ color: 'black' }} allowClear>
                    {NOTE?.map((option: any) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ) : (
              <Col span={12}></Col>
            )}
          </Row>

          <Row gutter={80} className="mb-6">
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                name={'typeOfSend'}
                label="Cách thức gửi"
                className={`${styles.textAreaNotDisabled} w-full pr-6`}
              >
                <Select style={{ color: 'black' }} allowClear disabled>
                  {typeOfSend?.map((option: any) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>

          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            name="note"
            label="Ghi chú"
            className={`${styles.textAreaNotDisabled} w-full`}
          >
            <Input.TextArea
              className="ml-[-20px]"
              autoSize={{ minRows: 6, maxRows: 6 }}
              rows={5}
              allowClear
            />
          </Form.Item>

          <Form.Item className="w-full mt-12">
            {id && action === 'view' ? (
              <div>
                <Button
                  disabled={false}
                  className="text-white bg-yellow-primary w-[150px] font-semibold mx-auto block h-10 text-sm"
                  onClick={handleCancel}
                >
                  Quay lại
                </Button>
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center gap-20 pb-2 w-full">
                <Button
                  disabled={false}
                  className="text-black border-black bg-white w-[150px] font-semibold h-10 text-sm"
                  onClick={handleCancel}
                >
                  Hủy bỏ
                </Button>
                <div className={`${styles.removeHoverBtnAntd}`}>
                  <Button
                    className="text-white bg-yellow-primary w-[150px] font-semibold h-10 text-sm"
                    htmlType="submit"
                  >
                    Lưu
                  </Button>
                </div>
              </div>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default FormCustomer
