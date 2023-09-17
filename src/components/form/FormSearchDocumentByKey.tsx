import { Button, Col, Input, Row, Select, Form } from 'antd'

import { useEffect } from 'react'

const FormSearchDocumentByKey = ({ onSearch, updatePaginationByKey }: any) => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    onSearch({ typeSearch: values.name, inputSearch: values.inputSearch })
    updatePaginationByKey()
  }

  const typeOfDocument = [
    { label: 'Tất cả', value: 'searchAll' },
    { label: 'Tên file', value: 'fileName' },
    { label: 'Công nghệ sử dụng', value: 'technologyUsed' },
    { label: 'Ngôn ngữ phát triển', value: 'languageDevelopment' },
    { label: 'Mô tả', value: 'description' },
  ]

  useEffect(() => {
    form.setFieldValue('name', typeOfDocument?.[0]?.value)
  }, [])

  return (
    <div className="mr-3 mb-2 px-5 pt-2 pb-3 bg-[#FFFFFF] rounded-[10px]">
      <span className="block font-bold pb-2 text-[16px]">
        Tìm kiếm theo từ khóa
      </span>
      <Form className="flex justify-between" form={form} onFinish={onFinish}>
        <Col span={21}>
          <div className="w-full pr-4">
            <Row gutter={10}>
              <Col span={6}>
                <Form.Item name={'name'}>
                  <Select className="w-full" options={typeOfDocument} />
                </Form.Item>
              </Col>

              <Col span={18}>
                <Form.Item name={'inputSearch'}>
                  <Input
                    placeholder="Vui lòng nhập từ khóa"
                    className="w-full"
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Col>

        <Col span={3}>
          <Form.Item>
            <Button
              className="h-full items-center py-1 px-5 rounded-[5px] border-orange-secondary text-orange-secondary border-[2px] font-semibold flex justify-center w-full"
              htmlType="submit"
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </div>
  )
}

export default FormSearchDocumentByKey
