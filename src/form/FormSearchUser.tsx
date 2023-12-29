import { userApi } from '@/adapter'
import {
  OPTIONS_BANKNAME,
  OPTIONS_SERVICE,
  QUERY_KEY,
  URL,
} from '@/utils/constants'
import { Button, Col, ConfigProvider, Form, Input, Row, Select } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

const FormSearchUser = ({ onSearchUser }: any) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }
  const [listUser, setListUser]: any = useState()
  useQuery({
    queryKey: [QUERY_KEY.GET_PROFILE_USER],
    queryFn: async () => {
      return await userApi.getUser().then((res) => {
        setListUser(res?.data?.data?.listUser)
      })
    },
  })

  const optionsName = listUser?.map((user: any) => {
    return {
      label: user?.name,
      value: user?.name,
    }
  })

  const optionsService = OPTIONS_SERVICE
  const optionsTypeMember = [
    { label: 'Đã gia hạn', value: true },
    { label: 'Chưa gia hạn', value: false },
  ]

  const optionsBankName = OPTIONS_BANKNAME

  const searchUserHandler = () => {
    onSearchUser(form.getFieldsValue())
    form.resetFields()
    navigate(URL.MANAGE_USER)
  }

  return (
    <div className="px-8 bg-whiteForm border-[1px] border-solid rounded-[5px] border-gray-primary">
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: 'white',
            colorPrimary: 'white',
            colorPrimaryHover: '#d9d9d9',
            controlOutline: '#4096ff',
            controlOutlineWidth: 1,
            controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
          },
          components: {
            Input: {
              addonBg: 'red',
              hoverBorderColor: '#4096ff',
              colorTextDisabled: 'black',
            },
            Select: {
              optionSelectedBg: '#cde9ff',
              optionActiveBg: 'rgba(0, 0, 0, 0.04)',
            },
            Button: {
              colorPrimaryHover: 'white',
            },
          },
        }}
      >
        <div className="w-full pb-5 pt-6">
          <Form form={form} className="flex flex-col gap-3">
            <Row gutter={50}>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="name"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Tên thành viên
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsName}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="service"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Dịch vụ
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsService}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={50}>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="email"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Email
                    </label>
                  }
                >
                  <Input allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="bank_name"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Ngân hàng
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsBankName}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={50}>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="phone"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Số điện thoại
                    </label>
                  }
                >
                  <Input allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="is_member"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      TK thành viên
                    </label>
                  }
                >
                  <Select allowClear options={optionsTypeMember} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="flex justify-center pt-1 pb-5">
          <Button
            className="font-semibold w-[120px] flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
            onClick={searchUserHandler}
          >
            Tìm kiếm
          </Button>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default FormSearchUser
