import { ContentApi, userApi } from '@/adapter'
import styles from '@/common.module.scss'
import { DATE_DMY, QUERY_KEY } from '@/utils/constants'
import { Button, Col, DatePicker, Form, Row, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

interface Iprops {
  onSearch?: any
}
interface IFormSearchEmail {
  templateId?: string
  sendBy?: string
  sendDate?: any
}

const FormSearchEmail = ({ onSearch }: Iprops) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = (values: IFormSearchEmail) => {
    const newValues = {
      ...values,
      startDate: values?.sendDate?.[0].format('YYYY-MM-DD'),
      endDate: values?.sendDate?.[1].format('YYYY-MM-DD'),
    }
    delete newValues?.sendDate
    if (values?.sendBy === '0') delete newValues?.sendBy
    if (values?.templateId === '0') delete newValues?.templateId

    onSearch(newValues)

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 400)
  }

  const { data: template } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_TEMPLATE],
    queryFn: async () => {
      return await ContentApi.searchContent().then((res) => {
        const mapDataTemplate = res?.data?.template?.map((item: any) => {
          return { value: item.id, label: item.templateName }
        })
        mapDataTemplate?.unshift({ label: 'Tất cả', value: '0' })
        return mapDataTemplate
      })
    },
  })

  const { data: user } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_USER_MAIL],
    queryFn: async () => {
      return await userApi.getAll().then((res) => {
        const mapDataUser = res?.data?.element?.map((item: any) => {
          return { value: item.id, label: item.name }
        })
        mapDataUser?.unshift({ label: 'Tất cả', value: '0' })
        return mapDataUser
      })
    },
  })

  useEffect(() => {
    form.setFieldsValue({
      templateId: template?.[0].value,
      sendBy: user?.[0].value,
    })
  }, [template, user])

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
              name={'sendDate'}
              label="Thời gian thực hiện"
            >
              <RangePicker
                format={DATE_DMY}
                allowClear
                className="w-full"
                placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pl-6"
              name="templateId"
              label="Template"
            >
              <Select
                options={template}
                showSearch
                allowClear
                onSearch={onSearch}
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              ></Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={80} className="mb-6">
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              className="w-full pr-6"
              name="sendBy"
              label="Người gửi"
            >
              <Select
                options={user}
                showSearch
                allowClear
                onSearch={onSearch}
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              ></Select>
            </Form.Item>
          </Col>

          <Col span={12}></Col>
        </Row>

        <Form.Item className={`${styles.removeHoverBtnAntd}`}>
          <Button
            htmlType="submit"
            className="w-[150px] text-white bg-yellow-primary block mx-auto h-10 text-[14px] mt-6 font-medium"
            loading={loading}
          >
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormSearchEmail
