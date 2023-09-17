import { userApi } from '@/adapter'
import styles from '@/common.module.scss'
import { statusSending } from '@/utils/constants'
import { Button, Col, DatePicker, Form, Row, Select } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'

const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const FormSearchCustomerOfResource = ({ onSearch }: { onSearch?: any }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = (values: any) => {
    const newValues = {
      userId: values?.userId ? values?.userId : '',
      statusSend: values?.statusSend,
      startDate: values?.dateTime?.[0]
        ? values?.dateTime?.[0].format('YYYY-MM-DD')
        : '',
      endDate: values?.dateTime?.[1]
        ? values?.dateTime?.[1].format('YYYY-MM-DD')
        : '',
    }
    onSearch(newValues)

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 400)
  }

  const { data: dataUser } = useQuery([], () =>
    userApi.getAll().then((res: any) =>
      res?.data?.element?.map((item: any) => {
        return { label: item?.name, value: item?.id }
      })
    )
  )

  return (
    <div className="border border-solid rounded border-gray-primary p-8 bg-white">
      <Form
        form={form}
        className="w-full"
        name="formPurchaseRequest"
        onFinish={onFinish}
      >
        <Row gutter={80} className="mb-6">
          <Col xs={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pr-6"
              name="dateTime"
              label="Thời gian"
            >
              <RangePicker
                className="w-full"
                format={'DD/MM/YYYY'}
                placeholder={['Từ ngày', 'Đến ngày']}
              />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pl-6"
              name="statusSend"
              label="Trạng thái gửi"
            >
              <Select
                allowClear
                placeholder="Chọn trạng thái gửi"
                options={statusSending}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={80} className="mb-6">
          <Col xs={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pr-6"
              name="userId"
              label="Người phụ trách"
            >
              <Select
                className="w-[220px]"
                options={dataUser}
                showSearch
                allowClear
                placeholder="Chọn người phụ trách"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </Col>
          <Col xs={12}></Col>
        </Row>

        <Form.Item className={`${styles.removeHoverBtnAntd}`}>
          <Button
            htmlType="submit"
            className="w-[150px] text-white bg-yellow-primary block mx-auto mt-6 h-10 text-[14px] font-medium"
            loading={loading}
          >
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormSearchCustomerOfResource
