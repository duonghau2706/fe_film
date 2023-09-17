import React from 'react'
import { Button, Form, Input, Row, Col, Modal } from 'antd'
import { URL } from '@/utils/constants'
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
}
/* eslint-enable no-template-curly-in-string */

const ModalChangePassword = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (value: boolean) => void
}) => {
  const [form] = Form.useForm()
  const handleCancel = () => {
    form.resetFields()
    setIsOpen(false)
  }
  const onFinish = (values: any) => {
    const user = {
      ...values,
    }
    alert(user)
  }

  return (
    <Modal onCancel={handleCancel} open={isOpen} footer={null} width="500px">
      <div className="w-full h-full py-4 flex items-center justify-center">
        <div className=" bg-white  w-full rounded-md flex items-center justify-center  px-8 py-4  flex-col">
          <p className="font-bold text-blue-600 text-2xl">Thay đổi mật khẩu</p>

          <Form
            form={form}
            className="w-full"
            layout={'vertical'}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={'username'}
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khâu cũ"
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
              name="newPassword"
              label="Mật khâu mới"
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
              label="Nhập lại mật khẩu mới"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
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
            <Form.Item>
              <a href={URL.LOGIN}>Quay lại đăng nhập</a>
            </Form.Item>
            <Form.Item>
              <Row justify={'center'} gutter={4}>
                <Col>
                  <Button
                    className="w-[120px] h-10 text-sm"
                    type="primary"
                    htmlType="submit"
                  >
                    Lưu
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

export default ModalChangePassword
