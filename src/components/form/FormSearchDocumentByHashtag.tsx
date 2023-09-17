import { URL } from '@/utils/constants'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

const FormSearchDocumentByHashtag = ({ updatePaginationByHashtag }: any) => {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const onFinish = (values: any) => {
    values?.input
      ? navigate(`${URL.DOCUMENT}?tag=${values?.input}`)
      : navigate(`${URL.DOCUMENT}`)
    updatePaginationByHashtag()
  }

  return (
    <Form
      className="mb-5 mt-2 px-5 pt-3 pb-4 bg-[#FFFFFF] rounded-[10px]"
      form={form}
      onFinish={onFinish}
    >
      <span className="block font-bold pb-2 mb-2 text-[16px]">
        Tìm kiếm theo Hashtag
      </span>
      <Form.Item name={'input'}>
        <Input allowClear />
      </Form.Item>

      <div className="flex justify-center">
        <Button
          className="h-full py-2 px-5 rounded-[5px] border-[#FB8C0A] border-[2px] text-orange-secondary font-semibold w-full mt-4"
          htmlType="submit"
        >
          Tìm kiếm
        </Button>
      </div>
    </Form>
  )
}

export default FormSearchDocumentByHashtag
