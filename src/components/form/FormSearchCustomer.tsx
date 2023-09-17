/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import {
  QUERY_KEY,
  type,
  sizeCompany,
  typeCustomer,
  NOTE,
} from '@/utils/constants'
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  InputNumber,
  AutoComplete,
} from 'antd'
import { CustomerResourceApi, customerApi, userApi } from '@/adapter'
import styles from '@/common.module.scss'
import { cleanObject } from '@/utils/helper'
interface ISearchPaymentHistory {
  time: string[]
  request_code: string
  po_code: string
  status: string
  payment_request_code: string
  supplier_name: string
}

interface Iprops {
  // eslint-disable-next-line no-unused-vars
  onFinish: (value: any) => void
}

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 20 },
}

const responsiveLayout = {
  labelCol: {
    xs: { span: 8, offset: 0 },
    sm: { span: 5, offset: 0 },
  },
  wrapperCol: {
    xs: { span: 16, offset: 0 },
    sm: { span: 20, offset: 0 },
  },
}

const typeOfSend = [
  { value: 0, label: 'Tất cả' },
  { value: 1, label: 'Gửi mail' },
  { value: 2, label: 'Gửi Inquiry' },
]

const statusSending = [
  { value: 3, label: 'Tất cả' },
  { value: 0, label: 'Đã gửi' },
  { value: 1, label: 'Chưa gửi' },
  { value: 2, label: 'Gửi lỗi' },
]

const handleGetValueSearch = () => {
  const dataLocalStorage: any = localStorage.getItem('dataSearch')
  if (dataLocalStorage) return JSON.parse(dataLocalStorage)
  return null
}

const FormSearchCustomer = ({ onFinish }: Iprops) => {
  const [form] = Form.useForm<ISearchPaymentHistory>()

  const [dataCustomerFolder, setdataCustomerFolder] = useState([])
  const [listName, setListName] = useState<any>()
  const [listAddress, setListAddress] = useState<any>()
  const [listField, setListField] = useState<any>()

  const [dataAllUser, setdataUser] = useState([])

  const { data: dataFolderCustomer = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CUSTOMER_RESOURCE],
    queryFn: () => CustomerResourceApi.searchCustomerResource(),
  })

  const { data: dataUser = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_USER],
    queryFn: () => userApi.getAll(),
  })

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CUSTOMER],
    queryFn: () =>
      customerApi.getAll().then((res: any) => {
        const listName = res?.data?.customers?.map((item: any) => {
          return { label: item?.name, value: item?.name }
        })

        const listField = res?.data?.customers?.map((item: any) => {
          return { label: item?.fieldName, value: item?.fieldName }
        })

        const listAddress = res?.data?.customers?.map((item: any) => {
          return { label: item?.address, value: item?.address }
        })

        //xóa đi những bản ghi trùng nhau và null và ""
        const newListName = cleanObject(listName)
        const newListField = cleanObject(listField)
        const newListAddress = cleanObject(listAddress)

        setListName(newListName)
        setListField(newListField)
        setListAddress(newListAddress)
      }),
  })

  const initialValues = {
    type: handleGetValueSearch()?.type
      ? handleGetValueSearch()?.type
      : type[0].value,
    size: handleGetValueSearch()?.size
      ? handleGetValueSearch()?.size
      : sizeCompany[0].value,
    typeCustomer: handleGetValueSearch()?.typeCustomer
      ? handleGetValueSearch()?.typeCustomer
      : typeCustomer[0].value,
    typeOfSend: handleGetValueSearch()?.typeOfSend
      ? handleGetValueSearch()?.typeOfSend
      : typeOfSend[0].value,
    resourceId:
      handleGetValueSearch()?.resourceId &&
      handleGetValueSearch()?.resourceId !== ''
        ? handleGetValueSearch().resourceId
        : null,
    name: handleGetValueSearch()?.name ? handleGetValueSearch().name : null,
    fieldName: handleGetValueSearch()?.fieldName
      ? handleGetValueSearch().fieldName
      : null,
    url: handleGetValueSearch()?.url ? handleGetValueSearch().url : null,
    investment: handleGetValueSearch()?.investment
      ? handleGetValueSearch().investment
      : null,
    personInChargeId:
      handleGetValueSearch()?.personInChargeId &&
      handleGetValueSearch()?.personInChargeId !== ''
        ? handleGetValueSearch().personInChargeId
        : null,
    reason: handleGetValueSearch()?.reason
      ? handleGetValueSearch().reason
      : null,
    address: handleGetValueSearch()?.address
      ? handleGetValueSearch().address
      : null,
    statusSending: handleGetValueSearch()?.statusSending
      ? handleGetValueSearch()?.statusSending
      : statusSending[0].value,
  }

  useEffect(() => {
    const newData = dataFolderCustomer?.data?.customerResource?.map(
      (item: any) => {
        return { label: item?.name, value: item?.id }
      }
    )
    setdataCustomerFolder(newData || [])
  }, [dataFolderCustomer])

  useEffect(() => {
    /*Lấy ra tất cả user */
    const newData = dataUser?.data?.element?.map((item: any) => {
      return { label: item?.name, value: item?.id }
    })

    newData?.unshift({ label: 'Không có người phụ trách', value: 0 })

    // /**Lấy ra các id có tồn tại trong customer  , id đó lưu vào trường person_in_charge_id */
    // const personInCharge = dataUser?.data?.personInCharge
    // const data: any = [
    //   {
    //     label: 'Không  phụ trách',
    //     value: 0,
    //     children:
    //       personInCharge?.length > 0
    //         ? newData.filter(
    //             (objA: any) =>
    //               !personInCharge.some((objB: any) => objA.value === objB.value)
    //           )
    //         : [],
    //   },
    //   {
    //     label: 'Đã  phụ trách',
    //     value: 1,
    //     children: personInCharge?.length > 0 ? personInCharge : [],
    //   },
    // ]

    setdataUser(newData || [])
  }, [dataUser])

  return (
    <div className="border border-solid rounded border-gray-primary px-10 py-6 bg-white text-sm">
      <Form
        form={form}
        className="w-full text-sm"
        name="nest-messages"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Row gutter={120} className="mb-3">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full text-sm"
              name="resourceId"
              label="Nguồn"
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
                options={dataCustomerFolder}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full text-sm"
              name={'name'}
              label="Tên KH (JP)"
            >
              <AutoComplete
                options={listName}
                allowClear
                placeholder="Nhập tên KH"
                filterOption={(inputValue, option: any) =>
                  option?.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={120} className="mb-3">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full text-sm"
              name="type"
              label="Loại"
            >
              <Select allowClear options={type}></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full text-sm"
              name="size"
              label="Size công ty"
            >
              <Select allowClear options={sizeCompany}></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={120} className="mb-3">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full text-sm"
              name="fieldName"
              label="Lĩnh vực"
            >
              <AutoComplete
                options={listField}
                allowClear
                placeholder="Nhập lĩnh vực"
                filterOption={(inputValue, option: any) =>
                  option?.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              className="w-full text-sm"
              name="address"
              label="Trụ sở"
              {...formItemLayout}
              {...responsiveLayout}
            >
              <AutoComplete
                options={listAddress}
                allowClear
                placeholder="Nhập trụ sở"
                filterOption={(inputValue, option: any) =>
                  option?.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={120} className="mb-3">
          <Col span={12}>
            <Form.Item
              className="w-full text-sm"
              name="url"
              label="Url"
              {...formItemLayout}
              {...responsiveLayout}
            >
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full text-sm"
              name="investment"
              label="Vốn đầu tư"
            >
              <InputNumber
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')} // type="number"
                className="w-full text-sm"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={120} className="mb-3">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full text-sm"
              name="typeCustomer"
              label="Phân loại KH"
            >
              <Select allowClear options={typeCustomer}></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full text-sm"
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
          </Col>
        </Row>

        <Row gutter={120} className="mb-3">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full text-sm"
              name="typeOfSend"
              label="Cách thức gửi"
            >
              <Select allowClear>
                {typeOfSend?.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full text-sm"
              name="reason"
              label="Lý do"
            >
              <Select allowClear>
                {NOTE?.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={120} className="mb-3">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full text-sm"
              name="statusSending"
              label="Trạng thái gửi"
            >
              <Select allowClear>
                {statusSending?.map((option: any) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}></Col>
        </Row>

        <Form.Item className={`${styles.removeHoverBtnAntd} mt-6`}>
          <Button
            htmlType="submit"
            className="w-[150px] bg-yellow-primary text-white font-medium h-10 text-[14px] block mx-auto"
          >
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormSearchCustomer
