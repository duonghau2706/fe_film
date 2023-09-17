import { userApi } from '@/adapter'
import styles from '@/common.module.scss'

interface ISearchPaymentHistory {
  dateFilter: string[]
}

import {
  DATE_DMY,
  QUERY_KEY,
  STATUS_FEEDBACK,
  typeOfSend,
} from '@/utils/constants'
import { Button, Col, DatePicker, Form, Row, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

interface Iprops {
  // eslint-disable-next-line no-unused-vars
  onFinish: (value: any) => void
}

const FormSearchViewDetailHistory = ({ onFinish }: Iprops) => {
  const [form] = Form.useForm<ISearchPaymentHistory>()

  const [dataAllUser, setdataUser] = useState([])

  const { data: dataUser = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_USER],
    queryFn: () => userApi.getAll(),
  })

  useEffect(() => {
    setdataUser(dataUser?.data?.element || [])
  }, [dataUser])

  return (
    <div className="border border-solid rounded border-gray-primary p-8 bg-white">
      <Form
        form={form}
        className="w-full"
        name="formSearchEmail"
        onFinish={onFinish}
      >
        <Row gutter={80} className="mb-6">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pr-6"
              name={'dateFilter'}
              label="Thời gian thực hiện"
            >
              <RangePicker
                format={DATE_DMY}
                allowClear
                className="w-full"
                placeholder={['Từ ngày', 'Đến ngày']}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pl-6"
              name="userId"
              label="Người gửi"
            >
              <Select allowClear>
                {dataAllUser?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={80} className="mb-6">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pr-6"
              name="pregnancyStatusSending"
              label="Cách thức gửi"
            >
              <Select options={typeOfSend} allowClear></Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pl-6"
              name="statusFeedback"
              label="Trạng thái phản hồi"
            >
              <Select options={STATUS_FEEDBACK} allowClear></Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className={`${styles.removeHoverBtnAntd}`}>
          <Button
            htmlType="submit"
            className="w-[150px] text-white bg-yellow-primary block mx-auto mt-6 h-10 text-[14px]"
          >
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormSearchViewDetailHistory
