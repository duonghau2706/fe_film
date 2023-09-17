import React, { useState, useCallback } from 'react'
import { Button, Form, Input, Row, Col, Select, Modal, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import ModalChangePassword from './ModalChangePassword'

/* eslint-disable no-template-curly-in-string */
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

const ModalEditView = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (value: boolean) => void
}) => {
  const [form] = Form.useForm()

  const [isOpenCHangeModal, setOpenChangeModal] = useState(false)

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

  const handleOpenChangePassword = useCallback((value: boolean) => {
    setOpenChangeModal(value)
  }, [])

  return (
    <Modal onCancel={handleCancel} open={isOpen} footer={null} width="800px">
      <div className="w-full h-full py-4 flex items-center justify-center">
        <div className=" bg-white  w-full rounded-md flex items-center justify-center  px-8 py-4  flex-col">
          <Form
            form={form}
            layout={'vertical'}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Row className="w-full" gutter={16}>
              <Col className="w-1/2 ">
                <span className="text-2xl font-semibold mb-4">
                  Thông tin người dùng
                </span>
                <Form.Item
                  name={'name'}
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Row justify={'space-between'} gutter={4}>
                  <Col className="w-full">
                    <Form.Item
                      name={'email'}
                      label="Email"
                      rules={[{ required: true }, { type: 'email' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col className="w-full">
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
                  name="role"
                  label="Role"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Select.Option value="ADMIN">Amin</Select.Option>
                    <Select.Option value="USER">User</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col className="w-1/2 ">
                <span className="text-2xl font-semibold">
                  Thông tin mật khẩu
                </span>
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
                <Form.Item>
                  <Button
                    className="h-10 text-sm"
                    onClick={() => handleOpenChangePassword(true)}
                    type="primary"
                    htmlType="button"
                  >
                    Thay đổi mật khẩu
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Row justify={'center'} gutter={4}>
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-10 text-sm"
                  >
                    Lưu
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="bg-slate-500 text-white h-10 text-sm"
                    htmlType="button"
                    onClick={onReset}
                  >
                    Xóa
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ModalChangePassword
        isOpen={isOpenCHangeModal}
        setIsOpen={setOpenChangeModal}
      />
    </Modal>
  )
}

export default ModalEditView
