import { userApi } from '@/adapter'
import styles from '@/common.module.scss'
import { DATE_DMY, QUERY_KEY } from '@/utils/constants'
import { Button, Col, DatePicker, Form, Row, Select } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'

const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const FormSearchImportHistoriesCustomer = ({
  onSearch,
}: {
  onSearch?: any
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const { data: dataUser = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_USER_CUSTOMER],
    queryFn: () =>
      userApi.getAll().then((item: any) => {
        const newData = item?.data?.element?.map((item: any) => {
          return { label: item?.name, value: item?.id }
        })
        return newData
      }),
  })

  const onFinish = (values: any) => {
    const newValues = {
      startDate: values?.dateTime?.[0]
        ? values?.dateTime?.[0].format('YYYY-MM-DD')
        : '',
      endDate: values?.dateTime?.[1]
        ? values?.dateTime?.[1].format('YYYY-MM-DD')
        : '',
      createdBy: values?.createdBy ? values?.createdBy : '',
    }
    onSearch(newValues)

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 400)
  }

  return (
    <div className="border border-solid rounded border-gray-primary p-8 bg-white">
      <Form
        form={form}
        className="w-full"
        name="formSearchSourceCustomer"
        onFinish={onFinish}
      >
        <Row gutter={80} className="mb-6">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pr-6"
              name="dateTime"
              label="Thời gian"
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
              name="createdBy"
              label="Người thực hiện"
            >
              <Select allowClear options={dataUser}></Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className={`${styles.removeHoverBtnAntd}`}>
          <Button
            htmlType="submit"
            className="w-[150px] text-white bg-yellow-primary block mx-auto mt-6 font-medium h-10 text-[14px]"
            loading={loading}
          >
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormSearchImportHistoriesCustomer
