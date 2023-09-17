import React from 'react'
import { Button, Form, Input } from 'antd'
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
}
/* eslint-enable no-template-curly-in-string */

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    const user = {
      ...values,
    }
    alert(user)
  }

  return (
    <div className="px-16 h-[100vh] py-8 bg-gray-100 flex items-center justify-center relative">
      <div className="absolute top-0 left-4 w-[120px] h-[120px] bg-login-logo bg-no-repeat bg-center bg-contain"></div>
      <div>
        <label className="mx-auto block text-center text-[32px] font-bold text-[#333333] mb-6">
          Reset Password
        </label>
        <Form
          layout="vertical"
          form={form}
          className="block mx-auto w-[500px] font-bold"
          name="basic"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="password"
            label="Current Password"
            rules={[{ required: true }]}
          >
            <Input allowClear className="h-12" type="password" />
          </Form.Item>
          <Form.Item
            className="mt-8 mb-4"
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please input your New password!' },
              { min: 5, message: 'New password must be minimum 6 characters.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') !== value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      'The New passwords must be different Current Password'
                    )
                  )
                },
              }),
            ]}
          >
            <Input allowClear className="h-12" type="password" />
          </Form.Item>
          <Form.Item
            className="mt-8 mb-4"
            name="confirmNewPassword"
            label="Confirm New Password"
            rules={[
              {
                required: true,
                message: 'Please input your Confirm new password!',
              },
              {
                min: 5,
                message: 'Confirm new password must be minimum 6 characters.',
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
            <Input allowClear className="h-12" type="password" />
          </Form.Item>

          <Form.Item className="mt-4">
            <Button
              className="bg-pink-600 text-white mt-6 h-10 lg:w-[200px] w-[140px] lg:text-[18px] text-[14px] block mx-auto"
              htmlType="submit"
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ResetPassword
