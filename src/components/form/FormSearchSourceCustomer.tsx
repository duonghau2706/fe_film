import { CustomerResourceApi } from '@/adapter'
import styles from '@/common.module.scss'
import { QUERY_KEY } from '@/utils/constants'
import { cleanObject } from '@/utils/helper'
import { AutoComplete, Button, Col, Form, Row } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
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

const FormSearchSourceCustomer = ({ onSearch }: { onSearch?: any }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [resourceName, setResourceName] = useState<any>()
  const [field, setField] = useState<any>()

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CUSTOMER_RESOURCE],
    queryFn: () =>
      CustomerResourceApi.searchCustomerResource().then((response: any) => {
        const resourceName = response?.data?.customerResource?.map(
          (item: any) => {
            return { label: item?.name, value: item?.name }
          }
        )
        const fieldName = response?.data?.customerResource?.map((item: any) => {
          return { label: item?.fieldName, value: item?.fieldName }
        })

        const newFieldName = cleanObject(fieldName)

        setResourceName(resourceName)
        setField(newFieldName)
      }),
  })

  const onFinish = (values: any) => {
    const newValues = {
      name: values?.name ? values?.name?.trim() : '',
      fieldName: values?.fieldName ? values?.fieldName?.trim() : '',
    }
    onSearch(newValues)

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 400)
  }

  return (
    <div className="border border-solid rounded border-gray-primary p-8 bg-white">
      <Form
        form={form}
        className="w-full"
        name="formSearchSourceCustomer"
        onFinish={onFinish}
      >
        <Row gutter={100} className="mb-6">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full pr-4"
              name="name"
              label="Tên nguồn"
            >
              <AutoComplete
                options={resourceName}
                allowClear
                placeholder="Nhập tên nguồn"
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
              {...formItemLayout}
              {...responsiveLayout}
              className="w-full pl-4"
              name="fieldName"
              label="Lĩnh vực"
            >
              <AutoComplete
                options={field}
                allowClear
                placeholder="Nhập tên lĩnh vực"
                filterOption={(inputValue, option: any) =>
                  option?.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className={`${styles.removeHoverBtnAntd}`}>
          <Button
            htmlType="submit"
            className="w-[150px] text-white bg-yellow-primary block mx-auto mt-6 font-medium h-10 text-[14px]"
            loading={loading}
          >
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormSearchSourceCustomer
