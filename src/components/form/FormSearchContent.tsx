import styles from '@/common.module.scss'
import { Button, Col, Form, Input, Row } from 'antd'
import { useState } from 'react'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const FormSearchContent = ({ onSearch }: { onSearch?: any }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = (values: any) => {
    const newValues = {
      templateName: values?.templateName ? values?.templateName?.trim() : '',
      title: values?.title ? values?.title?.trim() : '',
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
        name="formPurchaseRequest"
        onFinish={onFinish}
      >
        <Row gutter={80} className="mb-6">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pr-6"
              name="templateName"
              label="Tên template"
            >
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pl-6"
              name="title"
              label="Tiêu đề"
            >
              <Input allowClear />
            </Form.Item>
          </Col>
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

export default FormSearchContent
