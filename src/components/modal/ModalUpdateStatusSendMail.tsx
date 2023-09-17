import { useState } from 'react'
import { ContentApi, userApi } from '@/adapter'
import {
  QUERY_KEY,
  STATUS_FEEDBACK,
  statusSend,
  typeOfSend,
} from '@/utils/constants'
import iconClose from '@/assets/image/iconClose.svg'
import {
  Button,
  Modal,
  Form,
  Select,
  Row,
  Col,
  Checkbox,
  DatePicker,
} from 'antd'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import useToken from '@/hook/token'

import styles from '@/common.module.scss'

const validateMessages = {
  required: '${label} is required!',
}

const formItemLayout = {
  //   labelCol: { span: 8 },
  //   wrapperCol: { span: 16 },
}

const ModalUpdateStatusSendMail = ({
  isOpen,
  setIsOpen,
  footer,
  onFinish,
  statusUpdateSending,
}: {
  // eslint-disable-next-line no-unused-vars
  isOpen: boolean
  setIsOpen: any
  footer?: any
  // eslint-disable-next-line no-unused-vars
  onFinish?: (value: any) => void
  statusUpdateSending?: boolean
}) => {
  const [form] = Form.useForm()

  const [isDisabled, setIsDiabled] = useState<boolean>(true)

  const [isDisabledResponse, setIsDiabledResponse] = useState<boolean>(true)

  const [isDisabledDateResponse, setIsDisabledDateResponse] =
    useState<boolean>(true)

  const [isDisabledStatusSendResponse, setStatusSendResponse] =
    useState<boolean>(true)

  const [dataTemplate, setDataTemplate] = useState<any>([])

  const [dataUser, setDataUser] = useState<any>([])

  const { verifyToken } = useToken()

  const { decode } = verifyToken()

  const handleCancel = () => {
    form.setFieldsValue({
      ...initialValues,
      statusMail: false,
      statusResponse: false,
      status: statusSend[0].value,
      userId: dataUser?.element?.find((item: any) => {
        if (decode) return item.id === decode.id
      })?.id,
      pregnancyStatusSending: '',
      templateId: '',
      sendDate: '',
      statusFeedback: '',
      feedbackDate: '',
    })
    setIsDiabled(true)
    setIsDiabledResponse(true)
    setIsDisabledDateResponse(true)
    setStatusSendResponse(true)
    setIsOpen(false)
  }

  const initialValues = {
    status: statusSend[0].value,
    userId: dataUser?.element?.find((item: any) => {
      if (decode) return item.id === decode.id
    })?.id,
  }

  const handleChangeStatusMail = (event: any) => {
    if (event.target.checked) {
      if (initialValues.status === 1) {
        form.setFieldsValue({
          ...initialValues,
          userId: '',
          sendDate: '',
        })
        setIsDisabledDateResponse(true)
        return setIsDiabled(false)
      }
      setStatusSendResponse(false)
      return setIsDiabled(false)
    }

    setIsDiabled(true)
    setStatusSendResponse(true)
    form.setFieldsValue({
      ...initialValues,
      pregnancyStatusSending: '',
      userId: '',
      templateId: '',
      sendDate: '',
      status: '',
    })
  }

  const handleChangeStatusResponse = (event: any) => {
    if (event.target.checked) {
      setIsDisabledDateResponse(false)
      setIsDiabledResponse(false)
      return
    }
    setIsDiabledResponse(true)

    form.setFieldsValue({
      ...initialValues,
      statusFeedback: '',
      feedbackDate: '',
    })
  }

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CONTENT],
    queryFn: async () => {
      return await ContentApi.searchContent({ status: true }).then((res) => {
        setDataTemplate(res?.data?.template)
      })
    },
    enabled: isOpen,
  })

  const { data: dataAllUser = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_USER],
    queryFn: () => userApi.getAll(),
  })

  useEffect(() => {
    setDataUser(dataAllUser?.data || [])
  }, [dataAllUser])

  useEffect(() => {
    if (statusUpdateSending) {
      form.setFieldsValue({
        ...initialValues,
        statusMail: false,
        statusResponse: false,
        status: statusSend[0].value,
        userId: dataUser?.element?.find((item: any) => {
          if (decode) return item.id === decode.id
        })?.id,
        pregnancyStatusSending: '',
        templateId: '',
        sendDate: '',
        statusFeedback: '',
        feedbackDate: '',
      })
      setIsDiabled(true)
      setIsDiabledResponse(true)
      setIsDisabledDateResponse(true)
      setStatusSendResponse(true)
    }
  }, [statusUpdateSending, isOpen])

  const onSelectStatusFeedback = (value: any) => {
    if (value === '0') {
      form.setFieldsValue({
        ...initialValues,
        feedbackDate: '',
      })
      return setIsDisabledDateResponse(true)
    }
    setIsDisabledDateResponse(false)
  }

  const onSelectStatusSend = (value: any) => {
    if (value === 1) {
      form.setFieldsValue({
        ...initialValues,
        userId: '',
        sendDate: '',
      })
      return setStatusSendResponse(true)
    }
    setStatusSendResponse(false)
  }

  return (
    <Modal
      className={styles.paddingModal}
      open={isOpen}
      closable={false}
      centered
      width={800}
      title={
        <div className="flex px-4 pt-6 pb-4 border-b-4 shadow text-black">
          <h3>Cập nhật trạng thái gửi mail/phản hồi</h3>
          <span className="ml-auto cursor-pointer" onClick={handleCancel}>
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={
        footer ? (
          <div className="flex justify-end gap-10 pb-4">
            <Button
              className="text-black bg-white w-[100px] h-10 text-sm border-black font-bold"
              onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
            <Button
              className="text-white bg-orange-primary w-[100px] h-10 text-sm font-bold"
              onClick={onFinish}
            >
              Lưu
            </Button>
          </div>
        ) : (
          false
        )
      }
    >
      <Form
        form={form}
        className="w-full px-6 py-4"
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={initialValues}
      >
        <Row gutter={40} className="mb-3">
          {isDisabled ? (
            <Col span={12}>
              <Form.Item
                className="w-full"
                name="statusMail"
                valuePropName="checked"
              >
                <Checkbox onChange={handleChangeStatusMail}>
                  Trạng thái gửi mail / Inquiry
                </Checkbox>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'pregnancyStatusSending'}
                label="Cách thức gửi"
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabled}
                >
                  {typeOfSend?.map((option: any) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'templateId'}
                label="Template được gửi"
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabled}
                >
                  {dataTemplate?.map((option: any) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.templateName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'status'}
                label="Trạng thái gửi"
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabled}
                >
                  {statusSend?.map((option: any) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'sendDate'}
                label="Thời gian gửi"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Thời gian gửi không được để trống',
                //   },
                // ]}
              >
                <DatePicker
                  disabled={isDisabledStatusSendResponse}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'userId'}
                label="Người gửi"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Người gửi không được để trống',
                //   },
                // ]}
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabledStatusSendResponse}
                >
                  {dataUser?.element?.map((option: any) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          ) : isDisabledStatusSendResponse ? (
            <Col span={12}>
              <Form.Item
                className="w-full"
                name="statusMail"
                valuePropName="checked"
              >
                <Checkbox onChange={handleChangeStatusMail}>
                  Trạng thái gửi mail / Inquiry
                </Checkbox>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'pregnancyStatusSending'}
                label="Cách thức gửi"
                rules={[
                  {
                    required: true,
                    message: 'Cách thức gửi không được để trống',
                  },
                ]}
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabled}
                >
                  {typeOfSend?.map((option: any) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'templateId'}
                label="Template được gửi"
                rules={[
                  {
                    required: true,
                    message: 'Template gửi không được để trống',
                  },
                ]}
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabled}
                >
                  {dataTemplate?.map((option: any) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.templateName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'status'}
                label="Trạng thái gửi"
                rules={[
                  {
                    required: true,
                    message: 'Trạng thái gửi không được để trống',
                  },
                ]}
              >
                <Select
                  onChange={onSelectStatusSend}
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabled}
                >
                  {statusSend?.map((option: any) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'sendDate'}
                label="Thời gian gửi"
              >
                <DatePicker
                  format={'DD/MM/YYYY'}
                  disabled={isDisabledStatusSendResponse}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'userId'}
                label="Người gửi"
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabledStatusSendResponse}
                >
                  {dataUser?.element?.map((option: any) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          ) : (
            <Col span={12}>
              <Form.Item
                className="w-full"
                name="statusMail"
                valuePropName="checked"
              >
                <Checkbox onChange={handleChangeStatusMail}>
                  Trạng thái gửi mail / Inquiry
                </Checkbox>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'pregnancyStatusSending'}
                label="Cách thức gửi"
                rules={[
                  {
                    required: true,
                    message: 'Cách thức gửi không được để trống',
                  },
                ]}
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabled}
                >
                  {typeOfSend?.map((option: any) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'templateId'}
                label="Template được gửi"
                rules={[
                  {
                    required: true,
                    message: 'Template gửi không được để trống',
                  },
                ]}
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabled}
                >
                  {dataTemplate?.map((option: any) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.templateName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'status'}
                label="Trạng thái gửi"
                rules={[
                  {
                    required: true,
                    message: 'Trạng thái gửi không được để trống',
                  },
                ]}
              >
                <Select
                  onChange={onSelectStatusSend}
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabled}
                >
                  {statusSend?.map((option: any) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'sendDate'}
                label="Thời gian gửi"
                rules={[
                  {
                    required: true,
                    message: 'Thời gian gửi không được để trống',
                  },
                ]}
              >
                <DatePicker
                  format={'DD/MM/YYYY'}
                  disabled={isDisabledStatusSendResponse}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'userId'}
                label="Người gửi"
                rules={[
                  {
                    required: true,
                    message: 'Người gửi không được để trống',
                  },
                ]}
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabledStatusSendResponse}
                >
                  {dataUser?.element?.map((option: any) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          {isDisabledResponse ? (
            <Col span={12}>
              <Form.Item
                className="w-full"
                name="statusResponse"
                valuePropName="checked"
              >
                <Checkbox onChange={handleChangeStatusResponse}>
                  Trạng thái phản hồi
                </Checkbox>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'statusFeedback'}
                label="Trạng thái  phản hồi"
              >
                <Select
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabledResponse}
                >
                  {STATUS_FEEDBACK?.map((option: any) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'feedbackDate'}
                label="Thời gian gửi"
              >
                <DatePicker
                  placeholder="Chọn thời gian phản hồi"
                  disabled={isDisabledResponse}
                  format={'DD/MM/YYYY'}
                  className="w-full"
                />
              </Form.Item>
            </Col>
          ) : isDisabledDateResponse ? (
            <Col span={12}>
              <Form.Item
                className="w-full"
                name="statusResponse"
                valuePropName="checked"
              >
                <Checkbox onChange={handleChangeStatusResponse}>
                  Trạng thái phản hồi
                </Checkbox>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'statusFeedback'}
                label="Trạng thái phản hồi"
                rules={[
                  {
                    required: true,
                    message: 'Trạng thái phản hồi không được để trống',
                  },
                ]}
              >
                <Select
                  onChange={onSelectStatusFeedback}
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabledResponse}
                >
                  {STATUS_FEEDBACK?.map((option: any) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'feedbackDate'}
                label="Thời gian gửi"
              >
                <DatePicker
                  placeholder="Chọn thời gian phản hồi"
                  disabled={isDisabledDateResponse}
                  format={'DD/MM/YYYY'}
                  className="w-full"
                />
              </Form.Item>
            </Col>
          ) : (
            <Col span={12}>
              <Form.Item
                className="w-full"
                name="statusResponse"
                valuePropName="checked"
              >
                <Checkbox onChange={handleChangeStatusResponse}>
                  Trạng thái phản hồi
                </Checkbox>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'statusFeedback'}
                label="Trạng thái phản hồi"
                rules={[
                  {
                    required: true,
                    message: 'Trạng thái phản hồi không được để trống',
                  },
                ]}
              >
                <Select
                  onChange={onSelectStatusFeedback}
                  style={{ color: 'black' }}
                  allowClear
                  disabled={isDisabledResponse}
                >
                  {STATUS_FEEDBACK?.map((option: any) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-2"
                name={'feedbackDate'}
                label="Thời gian gửi"
                rules={[
                  {
                    required: true,
                    message: 'Thời gian phản hồi không được để trống',
                  },
                ]}
              >
                <DatePicker
                  placeholder="Chọn thời gian phản hồi"
                  disabled={isDisabledDateResponse}
                  format={'DD/MM/YYYY'}
                  className="w-full"
                />
              </Form.Item>
            </Col>
          )}
        </Row>

        <Form.Item className="w-full mt-14">
          <div className="flex flex-row items-center justify-center gap-10 pb-4 w-full">
            <Button
              className="text-black bg-white w-[100px] h-10 text-sm border-black font-medium"
              onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
            <Button
              className="text-white bg-yellow-primary w-[100px] h-10 text-sm font-medium"
              htmlType="submit"
            >
              Lưu
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalUpdateStatusSendMail
