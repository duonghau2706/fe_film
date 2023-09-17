import React, { useEffect } from 'react'
import { Button, Modal, Form, Select, Input, Row, Col } from 'antd'
import styles from '@/common.module.scss'
import { ROLE } from '@/utils/constants'
import iconClose from '@/assets/image/iconClose.svg'

const { Option } = Select

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const ModalEditUser = ({
  isModalOpen,
  showModal,
  data,
  onFinish,
}: {
  isModalOpen: boolean
  showModal: any
  data: any
  onFinish: any
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        role: data.role,
      })
    }
  }, [data])

  return (
    <Modal
      className={styles.paddingModal}
      open={isModalOpen}
      closable={false}
      centered
      width={800}
      title={
        <div className="flex px-4 pt-6 pb-4 border-b-4 shadow text-black">
          <h3>Cập nhật thông tin người dùng</h3>
          <span
            className="ml-auto cursor-pointer"
            onClick={() => showModal(false)}
          >
            <img src={iconClose} width={14} height={14} />
          </span>
        </div>
      }
      footer={null}
    >
      <div className="py-3">
        <div className="px-6 py-4">
          <Form
            form={form}
            className="w-full mt-4"
            name="nest-messages"
            onFinish={(values) => onFinish(values, data.id)}
          >
            <Form.Item
              {...formItemLayout}
              className="w-full mb-6"
              name="name"
              label="Tên"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              className="w-full mb-6"
              name="email"
              label="Email"
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              className="w-full mb-14"
              name="role"
              label="Vai trò"
              {...formItemLayout}
            >
              <Select>
                {ROLE.map((item) => {
                  return (
                    <Option value={item.value} key={item.value}>
                      {item.label}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item className="w-full">
              <Row gutter={[40, 40]}>
                <Col>
                  <Button
                    className="w-[100px] h-10 text-sm font-medium block mx-auto border-black"
                    onClick={() => showModal(false)}
                  >
                    Hủy bỏ
                  </Button>
                </Col>
                <Col className={`${styles.removeHoverBtnAntd}`}>
                  <Button
                    htmlType="submit"
                    className="w-[100px] bg-yellow-primary text-white h-10 text-sm font-medium block mx-auto"
                  >
                    Lưu
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default ModalEditUser
