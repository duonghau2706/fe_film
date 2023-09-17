import iconClose from '@/assets/image/iconClose.svg'
import { QUERY_KEY } from '@/utils/constants'
import { Button, Modal, Form, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ContentApi } from '@/adapter'
import styles from '@/common.module.scss'

const validateMessages = {
  required: '${label} is required!',
}

const ModalSendMail = ({
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

  const [dataTemplate, setDataTemplate] = useState<any>([])

  const [detailTemplate, setDataDetailTemplate] = useState<any>({})

  const handleCancel = () => {
    form.resetFields()
    setDataDetailTemplate({})
    setIsOpen(false)
  }

  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_CONTENT],
    queryFn: async () => {
      return await ContentApi.searchContent({ status: true }).then((res) => {
        const newData = res?.data?.template?.map((item: any) => {
          return { label: item.templateName, value: item.id }
        })
        setDataTemplate(newData)
      })
    },
    enabled: isOpen,
  })

  useEffect(() => {
    initialValues &&
      form.setFieldsValue({
        ...initialValues,
      })
    setDataDetailTemplate({})
  }, [initialValues])

  const handleSelect = async (value: any) => {
    return await ContentApi.findContent({ id: value }).then((res: any) => {
      setDataDetailTemplate(res?.data || {})
    })
  }

  return (
    <Modal
      className={styles.paddingModal}
      open={isOpen}
      closable={false}
      centered
      width={1000}
      title={
        <div className="flex px-4 pt-6 pb-4 border-b-4 shadow text-black">
          <h3>Gửi mail</h3>
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
        <Form.Item
          name="frequencyOfEmail"
          label="Chọn template cần gửi"
          rules={[
            {
              required: true,
              message: 'vui lòng chọn template cần gửi',
            },
          ]}
        >
          {/* <Select onSelect={handleSelect} style={{ color: 'black' }} allowClear>
            {dataTemplate?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.templateName}
              </Select.Option>
            ))}
          </Select> */}

          <Select
            style={{ color: 'black' }}
            onSelect={handleSelect}
            showSearch
            placeholder="Chọn template"
            allowClear
            filterOption={(input: any, option: any) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={dataTemplate}
          ></Select>
        </Form.Item>

        <div className="flex w-full items-center gap-8 mt-6 mb-2 ">
          <span className="text-sm">Title</span>
          <span className="font-semibold text-sm ml-16">
            {detailTemplate?.title}
          </span>
        </div>

        <div className="flex w-full items-center gap-8 mt-6 mb-2 ">
          <span className="text-sm w-[100px]">Nội dung</span>
          <div className="w-full h-[400px] overflow-x-auto border border-solid border-gray-primary rounded-md p-4 ">
            <div
              dangerouslySetInnerHTML={{ __html: detailTemplate?.content }}
              className="w-full h-full"
            />
            <style>{detailTemplate?.styles}</style>
          </div>
        </div>

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
              Gửi mail
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalSendMail
