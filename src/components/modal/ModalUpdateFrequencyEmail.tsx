import iconClose from '@/assets/image/iconClose.svg'
import { frequencyOfCustomer } from '@/utils/constants'
import { Button, Modal, Form, Select } from 'antd'
import { useEffect } from 'react'
import styles from '@/common.module.scss'

const validateMessages = {
  required: '${label} is required!',
}

const ModalUpdateFrequencyEmail = ({
  isOpen,
  setIsOpen,
  footer,
  onFinish,
  initialValues,
}: {
  // eslint-disable-next-line no-unused-vars
  isOpen: boolean
  setIsOpen: any
  footer?: any
  initialValues: any
  // eslint-disable-next-line no-unused-vars
  onFinish?: (value: any) => void
}) => {
  const [form] = Form.useForm()

  const handleCancel = () => {
    form.resetFields()
    setIsOpen(false)
  }

  useEffect(() => {
    initialValues &&
      form.setFieldsValue({
        ...initialValues,
      })
  }, [initialValues])
  return (
    <Modal
      className={styles.paddingModal}
      open={isOpen}
      closable={false}
      centered
      width={650}
      title={
        <div className="flex px-4 pt-6 pb-4 border-b-4 shadow text-black">
          <h3>Cập nhật tần suất gửi</h3>
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
        className="w-full p-6"
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={initialValues}
      >
        <Form.Item
          name="frequencyOfEmail"
          label="Chọn 1 tần suất gửi"
          rules={[
            {
              required: true,
              message: 'Tần suất gửi không được để trống',
            },
          ]}
        >
          <Select allowClear>
            {frequencyOfCustomer?.map((option: any) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
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

export default ModalUpdateFrequencyEmail
