import { contactInforApi } from '@/adapter'
import useToken from '@/hook/token'
import { MESSAGE, QUERY_KEY, URL } from '@/utils/constants'
import { Button, Col, Form, Input, Row } from 'antd'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const EditContactInfor = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const { id } = useParams()

  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const { refetch } = useQuery({
    queryKey: [QUERY_KEY.GET_CONTACT_INFOR_VIEW],
    queryFn: () =>
      contactInforApi.findById({ id }).then((res: any) =>
        form.setFieldsValue({
          nameKanji: res?.data?.nameKanji,
          nameHira: res?.data?.nameHira,
          nameKata: res?.data?.nameKata,
          nameCompanyKanji: res?.data?.nameCompanyKanji,
          nameCompanyHira: res?.data?.nameCompanyHira,
          nameCompanyKata: res?.data?.nameCompanyKata,
          addressKanji: res?.data?.addressKanji,
          addressHira: res?.data?.addressHira,
          addressKata: res?.data?.addressKata,
          positionKanji: res?.data?.positionKanji,
          positionHira: res?.data?.positionHira,
          positionKata: res?.data?.positionKata,
          mail: res?.data?.mail,
          url: res?.data?.url,
          positionName: res?.data?.positionName,
          postOfficeCode: res?.data?.postOfficeCode,
          phoneNumber: res?.data?.phoneNumber,
          field: res?.data?.field,
          title: res?.data?.title,
        })
      ),

    enabled: false,
  })

  useEffect(() => {
    if (id !== 'create') refetch()
  }, [id])

  const mutation = useMutation({
    mutationFn: (params: any) => {
      return contactInforApi.update(params)
    },
    onSuccess: () => {
      toast.success(MESSAGE.SUCESS.CONTACT_INFOR.UPDATE)
      navigate(URL.CONTACT_INFOR)
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)
    },
  })

  const handleEdit = () => {
    const myUuid = uuidv4()
    const dataForm = form.getFieldsValue()

    const newData = {
      id: id === 'create' ? myUuid : id,
      nameKanji: dataForm?.nameKanji ? dataForm.nameKanji : '',
      nameHira: dataForm?.nameHira ? dataForm.nameHira : '',
      nameKata: dataForm?.nameKata ? dataForm.nameKata : '',
      nameCompanyKanji: dataForm?.nameCompanyKanji
        ? dataForm.nameCompanyKanji
        : '',
      nameCompanyHira: dataForm?.nameCompanyHira
        ? dataForm.nameCompanyHira
        : '',
      nameCompanyKata: dataForm?.nameCompanyKata
        ? dataForm.nameCompanyKata
        : '',
      addressKanji: dataForm?.addressKanji ? dataForm.addressKanji : '',
      addressHira: dataForm?.addressHira ? dataForm.addressHira : '',
      addressKata: dataForm?.addressKata ? dataForm.addressKata : '',
      positionKanji: dataForm?.positionKanji ? dataForm.positionKanji : '',
      positionHira: dataForm?.positionHira ? dataForm.positionHira : '',
      positionKata: dataForm?.positionKata ? dataForm.positionKata : '',
      mail: dataForm?.mail ? dataForm.mail : '',
      url: dataForm?.url ? dataForm.url : '',
      positionName: dataForm?.positionName ? dataForm.positionName : '',
      postOfficeCode: dataForm?.postOfficeCode ? dataForm.postOfficeCode : '',
      phoneNumber: dataForm?.phoneNumber ? dataForm.phoneNumber : '',
      field: dataForm?.field ? dataForm.field : '',
      title: dataForm?.title ? dataForm.title : '',
      createdBy: decode?.username,
      updatedBy: decode?.username,
    }
    if (id === 'create') delete newData.updatedBy
    if (id !== 'create') delete newData.createdBy
    mutation.mutate(newData)
  }

  return (
    <div className="px-6 pt-2 pb-4 overflow-auto h-full w-full">
      <h1>Câp nhật thông tin liên hệ</h1>

      <Form form={form}>
        <div>
          <Row gutter={30}>
            {/* Tên */}
            <Col span={12}>
              <div className="w-full border border-solid border-gray-primary mb-6">
                <div className="bg-[#1a2c44] px-6 py-2 text-white font-bold text-[14px]">
                  Tên / 名前
                </div>
                <div className="px-8 py-6">
                  <Form.Item
                    {...formItemLayout}
                    className="w-full"
                    name="nameKanji"
                    label="Kanji"
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    className="w-full mt-4"
                    name="nameHira"
                    label="Hira"
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    className="w-full mt-4"
                    name="nameKata"
                    label="Kata"
                  >
                    <Input allowClear />
                  </Form.Item>
                </div>
              </div>
            </Col>

            {/* Địa chỉ */}
            <Col span={12}>
              <div className="w-full border border-solid border-gray-primary mb-6">
                <div className="bg-[#1a2c44] px-6 py-2 text-white font-bold text-[14px]">
                  Địa chỉ / 住所
                </div>
                <div className="px-8 py-6">
                  <Form.Item
                    {...formItemLayout}
                    className="w-full"
                    name="addressKanji"
                    label="Kanji"
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    className="w-full mt-4"
                    name="addressHira"
                    label="Hira"
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    className="w-full mt-4"
                    name="addressKata"
                    label="Kata"
                  >
                    <Input allowClear />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>

          <Row gutter={30}>
            {/* Tên công ty */}
            <Col span={12}>
              <div className="w-full border border-solid border-gray-primary mb-6">
                <div className="bg-[#1a2c44] px-6 py-2 text-white font-bold text-[14px]">
                  Tên công ty / 会社名
                </div>
                <div className="px-8 py-6">
                  <Form.Item
                    {...formItemLayout}
                    className="w-full"
                    name="nameCompanyKanji"
                    label="Kanji"
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    className="w-full mt-4"
                    name="nameCompanyHira"
                    label="Hira"
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    className="w-full mt-4"
                    name="nameCompanyKata"
                    label="Kata"
                  >
                    <Input allowClear />
                  </Form.Item>
                </div>
              </div>
            </Col>

            {/* Tên chức vụ */}
            <Col span={12}>
              <div className="w-full border border-solid border-gray-primary mb-6">
                <div className="bg-[#1a2c44] px-6 py-2 text-white font-bold text-[14px]">
                  Tên chức vụ / お役職名
                </div>
                <div className="px-8 py-6">
                  <Form.Item
                    {...formItemLayout}
                    className="w-full"
                    name="positionKanji"
                    label="Kanji"
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    className="w-full mt-4"
                    name="positionHira"
                    label="Hira"
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    className="w-full mt-4"
                    name="positionKata"
                    label="Kata"
                  >
                    <Input allowClear />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>

          {/* Các thông tin khác */}
          <div className="w-full border border-solid border-gray-primary mb-6">
            <div className="bg-[#1a2c44] px-6 py-2 text-white font-bold text-[14px]">
              Các thông tin khác
            </div>
            <Row gutter={40} className="px-8 py-6">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-full"
                  name="mail"
                  label="Mail"
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mt-4"
                  name="url"
                  label="Url"
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mt-4"
                  name="positionName"
                  label="Tên phòng ban"
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mt-4"
                  name="postOfficeCode"
                  label="Số bưu điện"
                >
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={12}>
                <div className="px-8">
                  <Form.Item
                    {...formItemLayout}
                    className="w-full"
                    name="phoneNumber"
                    label="Điện thoại"
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    className="w-full mt-4"
                    name="field"
                    label="Ngành/Lĩnh vực"
                  >
                    <Input allowClear />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    className="w-full mt-4"
                    name="title"
                    label="Title"
                  >
                    <Input allowClear />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Form>

      <div className={`w-full flex justify-center mt-8 mb-2 gap-40`}>
        <Button
          className={`bg-white text-black border-black w-[140px] h-[40px] text-[14px] font-medium `}
          onClick={() => navigate(-1)}
        >
          Hủy bỏ
        </Button>
        <Button
          className="bg-yellow-primary text-white w-[140px] h-[40px] text-[14px] font-medium"
          onClick={() => handleEdit()}
        >
          Lưu
        </Button>
      </div>
    </div>
  )
}

export default EditContactInfor
