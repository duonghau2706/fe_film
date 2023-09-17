/* eslint-disable no-unused-vars */
import React, { memo, useState } from 'react'
import { Button, Form, Input, Row, Col, Select, Modal, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

const ModalAddUser = ({
  isOpen,
  setIsOpen,
  data,
}: {
  isOpen: boolean
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (value: boolean) => void
  data: object
}) => {
  const [statusAction] = useState(true)
  const [form] = Form.useForm()

  const [valueGender, setValue] = useState('MALE')

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  const onFinish = (values: any) => {
    const user = {
      ...values,
      gender: valueGender,
    }
    handleCancel()
    alert(user)
  }
  const onReset = () => {
    form.resetFields()
  }

  return (
    <Modal onCancel={handleCancel} open={isOpen} footer={null}>
      <div className="w-full h-full py-4 flex items-center justify-center">
        <div className=" bg-white  rounded-md flex items-center justify-center w-[500px] px-8 py-4  flex-col">
          {statusAction ? (
            <p className="font-bold text-lg">Add New User</p>
          ) : (
            <p className="font-bold text-lg">Edit User</p>
          )}
          <Form
            form={form}
            className="w-full"
            layout={'vertical'}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item name={'name'} label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Row justify={'space-between'} gutter={4}>
              <Col className="w-1/2">
                <Form.Item
                  name={'email'}
                  label="Email"
                  rules={[{ required: true }, { type: 'email' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col className="w-1/2">
                <Form.Item
                  rules={[{ required: true }]}
                  name={'phoneNumber'}
                  label="Phone Number"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              rules={[{ required: true }]}
              name={'username'}
              label="Username"
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Row gutter={16} align={'middle'}>
                <Col>
                  <Radio.Group
                    name="gender"
                    onChange={onChange}
                    value={valueGender}
                  >
                    <Radio value={'MALE'}> Male </Radio>
                    <Radio value={'FEMALE'}> Female </Radio>
                    <Radio value={'OTHER'}> Other </Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    )
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="ADMIN">Amin</Select.Option>
                <Select.Option value="USER">User</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Row justify={'center'} gutter={4}>
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-10 text-sm"
                  >
                    Submit
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="bg-slate-500 text-white h-10 text-sm"
                    htmlType="button"
                    onClick={onReset}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default memo(ModalAddUser)
