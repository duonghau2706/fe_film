import { statusTemplate } from '@/utils/constants'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import { useState } from 'react'
import styles from '@/common.module.scss'
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

interface IFormSearchSendMail {
  name?: string
  customerFileName?: string
}

const FormSearchSendEmail = ({ onSearch }: { onSearch?: any }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = (values: IFormSearchSendMail) => {
    const newValues = {
      ...values,
    }
    onSearch(newValues)

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 400)
  }

  return (
    <div className="border border-solid rounded border-gray-primary p-8">
      <Form
        form={form}
        className="w-full"
        name="formSearchSendEmail"
        onFinish={onFinish}
      >
        <Row gutter={80} className="mb-6">
          <Col span={12}>
            <Form.Item {...formItemLayout} name="name" label={'Tên khách hàng'}>
              <Input allowClear></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              name="customerFileName"
              label={'File khách hàng'}
            >
              <Select options={statusTemplate} allowClear></Select>
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

export default FormSearchSendEmail
