import iconClose from '@/assets/image/iconClose.svg'
import { Button, Modal, Form, Input, Row, Col } from 'antd'
import { useEffect } from 'react'

import styles from '@/common.module.scss'

// import moment from 'moment'

const validateMessages = {
  required: '${label} is required!',
}

const ModalRecordEffortMember = ({
  isOpen,
  setIsOpen,
  footer = false,
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

  const formatNumber = (event: any) => {
    const value = event.target.value
    event.target.value = value.replace(/[^\d\.]/g, '') // remove non-numeric characters
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
          <h3>Ghi nhận thời gian làm việc</h3>
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
        layout="horizontal"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={initialValues}
      >
        <Row>
          <Col span={4}>Tên nhân viên</Col>
          <Col span={20}>
            <span className="font-semibold text-sm">{initialValues?.name}</span>
          </Col>
        </Row>
        <Row className="mt-6">
          <Col span={4}>Ngày làm việc</Col>
          <Col span={20}>
            <span className="font-semibold text-sm">
              {initialValues?.workDate}
            </span>
          </Col>
        </Row>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          className="mt-6"
          name="numberWorkHours"
          label="Số giờ làm"
          rules={[
            {
              required: true,
              message: 'vui lòng chọn số giờ làm',
            },
          ]}
        >
          <Input
            step={0.01}
            onInput={formatNumber}
            maxLength={4}
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          className="mt-6 mb-2"
          name="note"
          label="Ghi chú"
        >
          <Input.TextArea
            className="h-[123px] resize-none"
            allowClear
            autoSize={false}
            style={{ resize: 'none' }}
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

export default ModalRecordEffortMember
