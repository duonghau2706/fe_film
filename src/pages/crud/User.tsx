import { userApi } from '@/adapter'
import useToken from '@/hook/token'
import { OPTIONS_BANKNAME, OPTIONS_SERVICE, URL } from '@/utils/constants'
import {
  addOneMonthToMoment,
  createTimeStampFromMoment,
  create_UUID,
  renderDateStringDay,
  renderService,
  reverseStringDay,
} from '@/utils/helper'
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from 'antd'
import dayjs from 'dayjs'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const User = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const [curUser, setCurUser]: any = useState()
  const [date, setDate]: any = useState(dayjs())
  const { type, id } = useParams()

  const optionsService = OPTIONS_SERVICE
  const optionsBankName = OPTIONS_BANKNAME
  const optionsTypeMember = [
    { label: 'Đã gia hạn', value: true },
    { label: 'Chưa gia hạn', value: false },
  ]

  const mutationUser = useMutation({
    mutationFn: (params: any) => userApi.getProfile(params),
    onSuccess: (res) => {
      form.setFieldValue('name', res?.data?.data?.[0]?.name)
      form.setFieldValue('email', res?.data?.data?.[0]?.email)
      form.setFieldValue('password', res?.data?.data?.[0]?.password)
      form.setFieldValue('phone', res?.data?.data?.[0]?.phone)
      form.setFieldValue('address', res?.data?.data?.[0]?.address)
      form.setFieldValue('is_member', res?.data?.data?.[0]?.is_member)
      form.setFieldValue(
        'service',
        renderService(res?.data?.data?.[0]?.service)
      )

      form.setFieldValue('money', res?.data?.data?.[0]?.money)
      form.setFieldValue('bank_name', res?.data?.data?.[0]?.bank_name)
      form.setFieldValue('bank_account', res?.data?.data?.[0]?.bank_account)
      form.setFieldValue('created_by', decode?.name)

      setCurUser(res?.data?.data?.[0])
      setDate(
        dayjs(
          `${reverseStringDay(
            renderDateStringDay(res?.data?.data?.[0]?.born, '/')
          )}T00:00:00.000Z`.replaceAll('/', '-')
        )
      )
    },
  })

  useEffect(() => {
    form.setFieldValue('created_by', decode?.name)

    if (type === 'edit' || type === 'view') {
      mutationUser.mutate({ userId: id })
    }
  }, [])

  useEffect(() => {
    if (curUser?.born?.length > 0) {
      setDate(
        dayjs(
          `${reverseStringDay(
            renderDateStringDay(curUser?.born, '/')
          )}T00:00:00.000Z`?.replaceAll('/', '-')
        )
      )
    }
  }, [curUser?.born])

  const dateChangeHandler: any = (_: any) => {
    setDate(dayjs(_.format('YYYY-MM-DD').concat('T00:00:00.000Z')))
  }

  const mutationCreateUser = useMutation({
    mutationFn: (params: any) => userApi.createUser(params),
    onSuccess: () => {
      toast.success('Thêm mới thành viên thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })

      setTimeout(() => {
        navigate(URL.MANAGE_USER)
      }, 2000)
    },

    onError: () => {
      toast.error('Vui lòng nhập đủ thông tin!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
    },
  })

  const mutationUpdateUser = useMutation({
    mutationFn: (params: any) => userApi.updateUser(params),
    onSuccess: () => {
      toast.success('Cập nhật thành viên thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.MANAGE_USER)
      }, 700)
    },
  })

  const onFinish = () => {
    const data = form.getFieldsValue()

    if (type === 'create') {
      mutationCreateUser.mutate({
        ...data,
        id: create_UUID(),
        born: date?.format('DD/MM/YYYY'),
        money: Number(data?.money),
        service: Number(data?.service),
        gender: 1,
        renewal_date:
          data?.service?.length > 0
            ? addOneMonthToMoment(moment())
            : createTimeStampFromMoment(moment()),
        created_by: decode?.name,
        created_at: createTimeStampFromMoment(moment()),
        updated_at: createTimeStampFromMoment(moment()),
      })
    } else if (type === 'edit') {
      const idxService =
        data?.service === 'Di động'
          ? 0
          : data?.service === 'Cơ bản'
          ? 1
          : data?.service === 'Tiêu chuẩn'
          ? 2
          : data?.service === 'Cao cấp'
          ? 3
          : Number(data?.service)

      mutationUpdateUser.mutate({
        ...data,
        id: curUser?.id,
        born: date?.format('DD/MM/YYYY'),
        money: Number(data?.money),
        service: idxService,
        gender: 1,
        renewal_date:
          data?.service?.length > 0
            ? addOneMonthToMoment(moment(curUser?.renewal_date)) <
              addOneMonthToMoment(moment())
              ? addOneMonthToMoment(moment())
              : addOneMonthToMoment(moment(curUser?.renewal_date))
            : curUser?.renewal_date,
        updated_at: createTimeStampFromMoment(moment()),
        update_by: decode?.name,
      })
    }
  }

  return (
    <div className="pt-[84px] px-10 bg-[#e8e6e6] pb-7">
      <ConfigProvider
        theme={{
          token: {
            controlOutline: 'rgba(5, 145, 255, 0.1)',
            controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
            colorPrimary: 'white',
            colorPrimaryHover: '#d9d9d9',
          },
          components: {
            Input: {
              activeBorderColor: '#1677ff',
              hoverBorderColor: '#4096ff',
              colorTextDisabled: 'gray',
            },
            Select: {
              colorTextDisabled: 'gray',
              controlOutline: '#4096ff',
              controlOutlineWidth: 1,
              optionSelectedBg: '#cde9ff',
              optionActiveBg: 'rgba(0, 0, 0, 0.04)',
            },
            Button: {
              // colorPrimary: 'white',
              colorPrimaryHover: 'white',
            },
            DatePicker: {
              colorTextDisabled: 'gray',
              addonBg: 'green',
              cellRangeBorderColor: 'green',
              cellActiveWithRangeBg: 'green',
              activeBorderColor: '4096ff',
              hoverBorderColor: '#4096ff',
            },
          },
        }}
      >
        <div className="mb-3 text-[30px] text-black-main font-semibold">
          {type === 'create'
            ? 'Thêm thành viên mới'
            : type === 'edit'
            ? 'Chỉnh sửa thông tin thành viên'
            : 'Chi tiết thông tin thành viên'}
        </div>

        <div className="w-full pb-5 pt-9 flex justify-center bg-white border border-solid rounded border-gray-primary text-black-primary">
          <Form
            initialValues={{ id: decode?.name }}
            form={form}
            onFinish={onFinish}
            className="w-full"
          >
            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="name"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Tên thành viên
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="born"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Ngày sinh
                    </label>
                  }
                >
                  <ConfigProvider
                    theme={{
                      token: {
                        controlOutline: 'rgba(5, 145, 255, 0.1)',
                        colorPrimary: 'red',
                      },
                    }}
                  >
                    <DatePicker
                      disabled={type === 'view'}
                      onChange={dateChangeHandler}
                      format={'DD/MM/YYYY'}
                      className="w-1/3"
                      placeholder={'Chọn ngày'}
                      value={date}
                    />
                  </ConfigProvider>
                </Form.Item>
              </Col>
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="email"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Email
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mb-3"
                  name="service"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Dịch vụ
                    </label>
                  }
                >
                  <Select
                    disabled={type === 'view' ? true : false}
                    style={{ width: '350px' }}
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

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <ConfigProvider
                  theme={{
                    token: {
                      controlOutline: 'rgba(5, 145, 255, 0.1)',
                      controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
                      colorPrimary: 'red',
                    },
                  }}
                >
                  <Form.Item
                    {...formItemLayout}
                    className="w-ful mb-3"
                    name="password"
                    label={
                      <label style={{ fontSize: '15x', width: '110px' }}>
                        Mật khẩu
                      </label>
                    }
                  >
                    <Input
                      allowClear
                      disabled={type === 'view'}
                      className="w-[350px]"
                    />
                  </Form.Item>
                </ConfigProvider>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="money"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Số dư tài khoản
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mb-3"
                  name="phone"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Số điện thoại
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-5"
                  name="bank_name"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Ngân hàng
                    </label>
                  }
                >
                  <Select
                    style={{ width: '350px' }}
                    disabled={type === 'view'}
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

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful h-full mb-3"
                  name="address"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Địa chỉ
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="bank_account"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Số tài khoản
                    </label>
                  }
                >
                  <Input
                    allowClear
                    disabled={type === 'view'}
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="is_member"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      TK thành viên
                    </label>
                  }
                >
                  <Select
                    style={{ width: '350px' }}
                    disabled={type === 'view' ? true : false}
                    allowClear
                    options={optionsTypeMember}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="created_by"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Người {type === 'edit' ? 'chỉnh sửa' : 'thêm'}
                    </label>
                  }
                >
                  <Input allowClear disabled className="w-[350px]" />
                </Form.Item>
              </Col>
            </Row>

            <div className="flex gap-2 justify-center mt-5">
              <Button
                className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-red-delete text-white hover:bg-red-deleteHover"
                onClick={() => navigate(-1)}
              >
                Quay lại
              </Button>

              {(type === 'edit' || type === 'create') && (
                <Button
                  htmlType="submit"
                  className="min-w-[83px] font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
                >
                  {type === 'edit' ? 'Lưu' : 'Thêm mới'}
                </Button>
              )}
            </div>
          </Form>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default User
