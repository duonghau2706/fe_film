import { Button, Form, Input, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
}

const ForgotPassword = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    const user = {
      ...values,
    }
    alert(user)
    navigate('')
  }
  return (
    <div className="w-full h-[100vh] flex justify-center">
      <div className="w-2/3 h-full bg-admin-login bg-no-repeat bg-center bg-cover"></div>
      <div className="w-1/3 flex flex-col justify-center  py-10 lg:gap-4 gap-2 lg:px-10 px-4  bg-gray-200">
        <div className="lg:w-[107px] w-20 h-8 bg-admin-logo bg-no-repeat bg-center bg-contain"></div>
        <h1 className="lg:mt-10 mt-2 lg:text-4xl text-black font-bold">
          Forgot Password
        </h1>
        <Form
          form={form}
          className="w-full mt-4"
          layout={'vertical'}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input allowClear className="h-12" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input allowClear className="h-12" />
          </Form.Item>

          <Form.Item className="mt-10">
            <Row justify={'center'}>
              <Button
                className="w-full bg-pink-600 text-white mt-10"
                size="large"
                htmlType="submit"
              >
                Send
              </Button>
            </Row>
          </Form.Item>
          <Row justify={'center'} className="mt-4">
            <Col>
              <Form.Item>
                <a onClick={handleGoBack} className="underline text-sm">
                  Back to Login
                </a>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}
export default ForgotPassword
