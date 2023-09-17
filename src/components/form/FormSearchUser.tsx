/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { QUERY_KEY, ROLE, getFolderCustomer } from '@/utils/constants'
import { customerApi } from '@/adapter'
import { Button, Form, Input, Row, Col, Select } from 'antd'
import styles from '@/common.module.scss'
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

const { Option } = Select

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const FormSearchUser = ({ onFinish }: Iprops) => {
  const [form] = Form.useForm<ISearchPaymentHistory>()

  return (
    <div className="border border-solid rounded border-gray-primary px-10 py-6 bg-white">
      <Form
        form={form}
        className="w-full"
        name="nest-messages"
        onFinish={onFinish}
      >
        <Row gutter={80} className="mb-6">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pr-4"
              name="name"
              label="Tên"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pl-4"
              name="email"
              label="Email"
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={80} className="mb-6">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pr-4"
              name="role"
              label="Vai trò"
            >
              <Select allowClear>
                {ROLE.map((item) => {
                  return (
                    <Option value={item.value} key={item.value}>
                      {item.label}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}></Col>
        </Row>
        <Form.Item className={`w-full ${styles.removeHoverBtnAntd}`}>
          <Button
            htmlType="submit"
            className="w-[150px] bg-yellow-primary text-white font-medium block mx-auto h-10 text-[14px]"
          >
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormSearchUser
