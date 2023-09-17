import { useEffect, useState } from 'react'

import { ContentApi } from '@/adapter'
import useToken from '@/hook/token'
import { MESSAGE, QUERY_KEY, URL } from '@/utils/constants'
import { Button, Form, Input, InputNumber } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactQuillEditor } from './ReactQuillEditor'

import IconWarning from '@/assets/image/warning_black.svg'
import styles from '@/common.module.scss'
import { ModalGuide, ModalPeviewTemplate } from '@/components/modal'
import CreateStyles from './CreateStyles'
import TextArea from 'antd/es/input/TextArea'

const Content = () => {
  const navigate = useNavigate()
  const { verifyToken } = useToken()
  const { decode } = verifyToken()

  const [form] = Form.useForm()
  const { state } = useLocation()

  const [editorHtmlValue, setEditorHtmlValue] = useState('')
  const [content, setContent] = useState<string>('')
  const [styledData, setStyledData] = useState<string>('')
  const [numberChar, setNumberChar] = useState<number>(0)
  const [openModalGuide, setOpenModalGuide] = useState<boolean>(false)
  const [openModalPreview, setOpenModalPreview] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  const { data: dataTemplate, refetch: refetchDataContent } = useQuery({
    queryKey: [QUERY_KEY.GET_CONTENT_BY_ID],
    queryFn: async () => {
      return await ContentApi.findContent(state?.data).then((res: any) => {
        return res?.data
      })
    },
    enabled: false,
  })

  useEffect(() => {
    if (state?.action === 'edit') {
      refetchDataContent()
    }
  }, [state?.action])

  useEffect(() => {
    if (state?.action === 'edit') {
      form.setFieldsValue({
        templateName: dataTemplate?.templateName,
        title: dataTemplate?.title,
        content: dataTemplate?.content,
        numberOfCharacters: dataTemplate?.numberOfCharacters,
        note: dataTemplate?.note,
      })
      setEditorHtmlValue(dataTemplate?.content)
      setContent(dataTemplate?.content)
      setStyledData(dataTemplate?.styles)
      setNumberChar(dataTemplate?.numberOfCharacters)
    }
  }, [dataTemplate])

  const mutationCreate = useMutation({
    mutationFn: (params: any) => {
      delete params.id
      setLoading(true)
      return ContentApi.createContent(params)
    },
    onSuccess: () => {
      setLoading(false)
      toast.success(MESSAGE.SUCESS.CONTENT.CREATE)
      navigate(URL.TEMPLATE_MANAGEMENT.concat('/1'))
    },
    onError: (err: any) => {
      setLoading(false)
      toast.error(err?.response?.data?.status.message)
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: (params: any) => {
      setLoading(true)
      return ContentApi.updateContent(params)
    },
    onSuccess: () => {
      setLoading(false)
      toast.success(MESSAGE.SUCESS.CONTENT.UPDATE)
      navigate(URL.TEMPLATE_MANAGEMENT.concat('/1'))
    },
    onError: (err: any) => {
      setLoading(false)
      toast.error(err?.response?.data?.status.message)
    },
  })

  const handleSave = async () => {
    await form.validateFields()

    const dataForm = form.getFieldsValue()

    const { styledData, newHtmlString } = CreateStyles(editorHtmlValue)

    const dataAdd = {
      id: 1,
      templateName: dataForm?.templateName
        ? dataForm?.templateName?.trim()
        : '',
      title: dataForm?.title ? dataForm?.title?.trim() : '',
      numberOfCharacters: numberChar ? numberChar : 0,
      createdBy: decode?.username,
      updatedBy: decode?.username,
      content: newHtmlString,
      styles: styledData,
      note: dataForm?.note ? dataForm?.note?.trim() : '',
    }

    if (state?.action === 'add') {
      mutationCreate.mutate(dataAdd)
    } else {
      delete dataAdd.createdBy
      dataAdd.id = state?.data?.id
      mutationUpdate.mutate(dataAdd)
    }
  }

  const onEditorContentChanged = (content: any) => {
    setEditorHtmlValue(content)

    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')

    const elements = doc.body.children
    const contents = Array.from(elements).map((el) => el.textContent)

    const totalLength = contents.reduce(
      (acc: any, curr: any) => acc + curr.length,
      0
    )
    setNumberChar(totalLength)

    form.setFieldValue('numberOfCharacters', totalLength)
    if (content === '<p><br></p>') form.setFieldValue('content', '')

    const { styledData, newHtmlString } = CreateStyles(content)
    setContent(newHtmlString)
    setStyledData(styledData)
  }

  const renderLabel = () => {
    return (
      <div className="flex flex-col justify-center items-start mt-4 ">
        <label className="mb-[4px]">Nội dung (Body)</label>
        <img
          src={IconWarning}
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => setOpenModalGuide(true)}
        />
      </div>
    )
  }

  const formatter = (value: any) => {
    // Định dạng giá trị nhập vào thành một chuỗi được hiển thị theo định dạng số
    return ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="px-6 pt-2 pb-6 overflow-auto h-full">
      <h1>
        {state?.action === 'add' ? 'Thêm template mới' : 'Cập nhật template'}
      </h1>

      <div className="border border-solid rounded-md pt-6 pb-4 border-gray-primary bg-white">
        <Form
          form={form}
          className="w-full px-8 mb-8"
          name="formPurchaseRequest"
        >
          <Form.Item
            className="mb-4"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            name="templateName"
            label={'Tên template'}
            rules={[{ required: true, message: 'Nhập tên template' }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            className="mb-4"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            name="title"
            label={'Tiêu đề'}
            rules={[{ required: true, message: 'Nhập tiêu đề' }]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            className="mb-4"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            name="content"
            label={renderLabel()}
            rules={[{ required: true, message: 'Nhập nội dung' }]}
          >
            <ReactQuillEditor
              onChange={onEditorContentChanged}
              value={editorHtmlValue}
              openModalPreview={() => setOpenModalPreview(true)}
            />
          </Form.Item>
          <Form.Item
            className="mb-4"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            name="numberOfCharacters"
            label={'Số ký tự nội dung'}
          >
            <InputNumber
              readOnly
              className="w-[120px] cursor-not-allowed"
              formatter={formatter}
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            name="note"
            label={'Ghi chú'}
          >
            <TextArea
              className="w-full"
              rows={4}
              autoSize={{ minRows: 4, maxRows: 4 }}
            />
          </Form.Item>
        </Form>

        <div className="flex justify-center gap-10 w-full">
          <Button
            className="w-[160px] text-black border-black font-medium h-10 text-sm"
            onClick={() => navigate(-1)}
          >
            Hủy bỏ
          </Button>

          <div className={`${styles.removeHoverBtnAntd}`}>
            <Button
              onClick={handleSave}
              className="w-[160px] bg-yellow-primary text-white font-medium h-10 text-sm"
              loading={loading}
            >
              Lưu
            </Button>
          </div>
        </div>
      </div>

      <ModalGuide
        isOpen={openModalGuide}
        setIsOpen={setOpenModalGuide}
      ></ModalGuide>

      <ModalPeviewTemplate
        isOpen={openModalPreview}
        setIsOpen={setOpenModalPreview}
        content={content}
        styledData={styledData}
      ></ModalPeviewTemplate>
    </div>
  )
}

export default Content
