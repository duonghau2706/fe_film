import iconClose from '@/assets/image/iconClose.svg'
import styles from '@/common.module.scss'
import { Button, Form, Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const ModalAddSourceCustomer = ({
  isOpen,
  setIsOpen,
  onSave,
  header,
  action,
  dataEdit,
}: {
  isOpen: boolean
  setIsOpen: any
  onSave?: any
  action: string
  header: string
  dataEdit?: any
}) => {
  const [form] = Form.useForm<any>()

  const [loading, setLoading] = useState<boolean>(false)

  const handleCancel = () => {
    form.resetFields()
    setIsOpen(false)
  }
  const onFinish = async () => {
    await form.validateFields()

    const values = form.getFieldsValue()

    const newValues = {
      name: values?.name ? values?.name?.trim() : '',
      fieldName: values?.fieldName ? values?.fieldName?.trim() : '',
      url: values?.url ? values?.url?.trim() : '',
      note: values?.note ? values?.note?.trim() : '',
      id: dataEdit?.id,
    }
    onSave(newValues)

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 400)
  }

  useEffect(() => {
    if (action === 'edit') {
      form.setFieldsValue({
        name: dataEdit?.name,
        fieldName: dataEdit?.fieldName,
        url: dataEdit?.url,
        note: dataEdit?.note,
      })
      return
    }

    form.setFieldsValue({
      name: '',
      fieldName: '',
      url: '',
      note: '',
    })
  }, [isOpen, action])

  return (
    <Modal
      className={styles.paddingModal}
      open={isOpen}
      closable={false}
      centered
      width={700}
      title={
        <div className="flex p-4 border-b-4 shadow text-black pt-6">
          <h3>{header}</h3>
          <span className="ml-auto cursor-pointer" onClick={handleCancel}>
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={
        <div className={`flex justify-center gap-10 pb-6 `}>
          <Button
            className="text-black bg-white w-[100px] h-10 text-sm border-black font-semibold"
            onClick={handleCancel}
          >
            {action === 'add' ? 'Hủy bỏ' : 'Đóng'}
          </Button>
          <div className={`${styles.removeHoverBtnAntd}`}>
            <Button
              className="text-white bg-yellow-primary w-[100px] h-10 text-sm font-medium"
              onClick={onFinish}
              loading={loading}
            >
              Lưu
            </Button>
          </div>
        </div>
      }
    >
      <div className="p-10 flex justify-center text-[16px]">
        <Form form={form} className="w-full " name="formSendEmail">
          <Form.Item
            {...formItemLayout}
            name="name"
            label={'Tên nguồn'}
            rules={[{ required: true, message: 'Nhập tên nguồn KH' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="fieldName"
            label={'Lĩnh vực'}
            className="mt-6"
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="url"
            label={'URL'}
            className="mt-6"
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="note"
            label={'Ghi chú'}
            className="mt-6"
          >
            <TextArea allowClear rows={6} style={{ resize: 'none' }} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default ModalAddSourceCustomer
