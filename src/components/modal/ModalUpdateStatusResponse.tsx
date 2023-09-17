import { useEffect, memo, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import iconClose from '@/assets/image/iconClose.svg'
import { Button, DatePicker, Form, Modal, Select, notification } from 'antd'
import { QUERY_KEY, MESSAGE, STATUS_FEEDBACK } from '@/utils/constants'
import { customerApi } from '@/adapter'

import styles from '@/common.module.scss'

interface dataType {
  id: string
  name: string
  status?: boolean
  description?: string
  parentCategoryId?: string
  feedbackDate?: any
  statusFeedback?: any
}
const ModalUpdateStatusResponse = ({
  isOpen,
  closeModal,
  initialValues,
}: {
  isOpen: boolean
  // eslint-disable-next-line no-unused-vars
  closeModal: (value: boolean) => void
  initialValues?: dataType
}) => {
  const client = useQueryClient()

  const [form] = Form.useForm()

  const [statusDisabled, setStatusDisabled] = useState<boolean>(false)

  const onFinish = (values: any) => {
    const formData = {
      ...values,
      id: initialValues?.id,
      feedbackDate: values.statusFeedback === '0' ? null : values.feedbackDate,
    }
    return updateCategoryMutation.mutate(formData)
  }

  const updateCategoryMutation = useMutation({
    mutationFn: (params: any) => customerApi.updateStatusResponse(params),
    onSuccess: () => {
      notification['success']({
        message: `Cập nhật phản hồi thành công`,
      })
      handleCancel()
      client.invalidateQueries({
        queryKey: [QUERY_KEY.VIEW_HISTORY_BY_CUSTOMER],
      })
    },
    onError: ({ response }) => {
      if (response.data.status.code === 400)
        return notification['error']({
          message: response.data.status.message,
        })
      return notification['error']({
        message: MESSAGE.ERROR.COMMON,
      })
    },
  })

  const handleCancel = () => {
    form.resetFields()
    closeModal(false)
  }

  const onSelect = (value: any) => {
    if (value === '0') {
      form.setFieldsValue({
        feedbackDate: null,
      })
      return setStatusDisabled(true)
    }
    setStatusDisabled(false)
  }

  const validateMessages = {
    required: '${label} is required!',
  }
  useEffect(() => {
    initialValues &&
      form.setFieldsValue({
        ...initialValues,
      })
    if (initialValues && initialValues?.statusFeedback === '0')
      setStatusDisabled(true)
    else setStatusDisabled(false)
  }, [initialValues, isOpen])

  return (
    <Modal
      className={styles.paddingModal}
      open={isOpen}
      onCancel={handleCancel}
      closable={false}
      centered
      width={800}
      title={
        <div className="flex flex-row p-4 border-b-4 shadow text-black">
          <h3>Cập nhật phản hồi</h3>
          <span className="ml-auto cursor-pointer" onClick={handleCancel}>
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={false}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="w-full px-10 py-4"
        layout="horizontal"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={initialValues}
      >
        <Form.Item
          className="w-full mt-2"
          name={'statusFeedback'}
          label="Trạng thái phản hồi"
        >
          <Select onChange={onSelect} style={{ color: 'black' }} allowClear>
            {STATUS_FEEDBACK?.map((option: any) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          className="w-full mt-6"
          name={'feedbackDate'}
          label="Thời gian phản hồi"
          rules={[
            {
              required: statusDisabled ? false : true,
              message: 'Chọn thời gian phản hồi',
            },
          ]}
        >
          <DatePicker
            placeholder="Chọn thơi gian phản hồi"
            disabled={statusDisabled}
            format={'DD/MM/YYYY'}
            className="w-full"
          />
        </Form.Item>

        <Form.Item className="w-full mt-14">
          <div className="flex flex-row items-center justify-center gap-10 pb-4 w-full">
            <Button
              className="text-black bg-white w-[100px] h-10 text-sm border-black font-medium"
              onClick={handleCancel}
            >
              Hủy bỏ
            </Button>
            <Button
              className="text-white bg-yellow-primary w-[100px] h-10 text-sm font-bold"
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

export default memo(ModalUpdateStatusResponse)
