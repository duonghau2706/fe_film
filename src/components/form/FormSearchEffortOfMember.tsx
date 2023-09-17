/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { QUERY_KEY, DATE_DMY } from '@/utils/constants'
import { Button, Form, Row, Col, Select, DatePicker } from 'antd'
import { userApi } from '@/adapter'
import styles from '@/common.module.scss'
import dayjs from 'dayjs'
import useToken from '@/hook/token'

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

const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const currentDate = dayjs() // Ngày hiện tại
const startOfMonth = currentDate.startOf('month') // Ngày đầu tháng
const endOfMonth = currentDate.endOf('month') // Ngày cuối tháng

const { verifyToken } = useToken()

const { decode } = verifyToken()

const FormSearchEffortOfMember = ({ onFinish }: Iprops) => {
  const [form] = Form.useForm<ISearchPaymentHistory>()

  const [dataAllUser, setdataUser] = useState<any>([])

  const { data: dataUser = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_USER],
    queryFn: () => userApi.getAll(),
  })

  useEffect(() => {
    setdataUser(dataUser?.data?.element || [])
  }, [dataUser])

  const initialValues = {
    userId: decode?.id,
    dateFilter: [startOfMonth, endOfMonth],
  }

  return (
    <div className="border border-solid rounded border-gray-primary px-10 py-6 bg-white">
      <Form
        form={form}
        className="w-full"
        name="nest-messages"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Row gutter={10} className="mb-3 items-center">
          {/* <Col span={2}>
            <span className="text-[16px]">Thời gian : </span>
          </Col> */}
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              className="w-full"
              name={'dateFilter'}
              label="Thời gian thực hiện"
            >
              <RangePicker
                format={DATE_DMY}
                allowClear
                className="w-[256px]"
                placeholder={['Từ ngày', 'Đến ngày']}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...formItemLayout}
              className="w-full"
              name="userId"
              label="Member"
            >
              <Select
                allowClear
                showSearch
                options={dataAllUser.map((item: any) => {
                  return {
                    label: item?.name,
                    value: item?.id,
                  }
                })}
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              ></Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item className={`${styles.removeHoverBtnAntd} `}>
              <Button
                htmlType="submit"
                className="w-[150px] bg-yellow-primary text-white h-10 text-[14px] font-medium block mx-auto"
              >
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default FormSearchEffortOfMember
