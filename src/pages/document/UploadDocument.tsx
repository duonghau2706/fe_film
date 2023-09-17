import { DocumentSalekitApi } from '@/adapter'
import imgexel from '@/assets/image/iconExcel.png'
import imgpdf from '@/assets/image/iconPdf.png'
import imgppt from '@/assets/image/iconPpt.png'
import imgtxt from '@/assets/image/iconTxt.png'
import imgdocx from '@/assets/image/iconWord.png'
import IconUpload from '@/assets/image/icon_upload.svg'
import iconEmpty from '@/assets/image/iconEmpty.png'
import styles from '@/common.module.scss'
import DropZone from '@/components/dropZone/DropZone'
import { MESSAGE, QUERY_KEY, URL } from '@/utils/constants'
import { Button, Form, Input, Radio, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const accept = ''
function UploadDocument() {
  const [form] = Form.useForm()
  const { id } = useParams()
  const [isLoadingBtnUpload, setLoadingBtnUpload] = useState<boolean>(false)

  const [selectedValue, setSelectedValue] = useState(0)
  const [disable, setDisable] = useState<boolean>(false)
  const [dataFileExcel, setDataFileExcel] = useState<File[]>([])
  const [fileType, setFileType] = useState<string>('')
  const navigate = useNavigate()

  const renderIcon = (fileType: string) => {
    switch (fileType) {
      case 'xlsx':
        return <img src={imgexel} alt="Excel Icon" width={40} height={45} />
      case 'docx':
        return <img src={imgdocx} alt="Docx Icon" width={40} height={40} />
      case 'pptx':
        return <img src={imgppt} alt="PPT Icon" width={40} height={40} />
      case 'pdf':
        return <img src={imgpdf} alt="PDF Icon" width={40} height={45} />
      case 'txt':
        return <img src={imgtxt} alt="TXT Icon" width={40} height={45} />
      case 'other':
        return <img src={iconEmpty} alt="TXT Icon" width={40} height={45} />
      default:
        return <img src={IconUpload} width={35} height={40} />
    }
  }
  // hàm xử lý thay đổi
  const onChange = (e: any) => {
    setSelectedValue(e.target.value)
  }
  //
  useEffect(() => {
    if (id) refetch()
    else form.setFieldValue('uploadType', 0)
  }, [])

  //api lấy chi tiết tài liệu
  const { refetch } = useQuery({
    queryKey: [QUERY_KEY.DOCUMENT_BY_ID],
    queryFn: () => async () => {
      return await DocumentSalekitApi.getDocumentById(id).then((res: any) => {
        //thêm dấu # vào mỗi phần tử tag cách nhau bởi khoảng trống
        const newHashtag = res?.data?.hashtag
          ?.map((item: any) => `#${item}`)
          ?.join(' ')
        form.setFieldsValue({
          fileName: res?.data?.fileName,
          fileType: res?.data?.fileType,
          uploadType: res?.data?.uploadType,
          originalDocumentId:
            res?.data?.uploadType === 0 ? '' : res?.data?.originalDocumentId,
          version: res?.data?.version,
          languageId: res?.data?.languageId,
          documentTypeId: res?.data?.documentTypeId,
          storageTypeId: res?.data?.storageTypeId,
          domainId: res?.data?.domainId,
          subDomain: res?.data?.subDomain,
          technologyUsed: res?.data?.technologyUsed,
          languageDevelopment: res?.data?.languageDevelopment,
          hashtag: newHashtag || [],
          description: res?.data?.description,
        })
        setSelectedValue(res?.data?.uploadType)
        setDisable(res?.data?.uploadType === 0 ? true : false)
      })
    },
    enabled: false,
  })

  //api lấy ra tài liệu nguồn
  const { data: DocumentResource = [] } = useQuery({
    queryKey: [QUERY_KEY.GET_DOCUMENT_RESOURCE],
    queryFn: () =>
      DocumentSalekitApi.getDocumentResource().then((res: any) => {
        const datadocumentResource = res?.data?.map((item: any) => {
          return {
            id: item.id,
            fileName: item.file_name,
            uploadType: item.upload_type,
          }
        })
        return datadocumentResource
      }),
  })
  // api lấy ra dữ liệu select option loại tài liệu
  const { data: dataDocumentResource = [] } = useQuery({
    queryKey: [QUERY_KEY.DOCUMENT_FILE_CATEGORIES],
    queryFn: () =>
      DocumentSalekitApi.documentCategories().then((res: any) => {
        const datadocument = res?.data?.data
        return datadocument
      }),
  })

  // Chọn file
  const onSetFile = (value: any) => {
    setDataFileExcel(value)
    form.setFieldValue('fileName', value?.[0]?.name)
    const valueArray = value?.[0]?.name.split('.')
    const valueType =
      valueArray.length > 1 ? valueArray[valueArray.length - 1] : ''
    form.setFieldValue('fileType', valueType.toUpperCase())
    const type: any = getFileType(value)
    setFileType(type)
  }
  // lấy ra ảnh cho từng file
  const getFileType = (file: any) => {
    const fileNameParts = file?.[0]?.name.split('.')
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase()

    if (
      fileExtension.toLowerCase() === 'xlsx' ||
      fileExtension.toLowerCase() === 'xls'
    ) {
      return 'xlsx'
    }
    if (fileExtension.toLowerCase() === 'docx') {
      return 'docx'
    }
    if (fileExtension.toLowerCase() === 'pdf') {
      return 'pdf'
    }
    if (fileExtension.toLowerCase() === 'pptx') {
      return 'pptx'
    }
    if (fileExtension.toLowerCase() === 'txt') {
      return 'txt'
    }
    return 'other'
  }
  //upload file lên sharepoint
  const handleUpload = async () => {
    const validateForm = await form.validateFields().catch(() => {
      return false
    })
    if (!validateForm) return

    if (!id) mutation.mutate(dataFileExcel?.[0])
    else mutationUpdate.mutate(id)
  }

  //upload file lên sharepoint
  const mutation = useMutation({
    mutationFn: (params: File) => {
      setLoadingBtnUpload(true)
      const formData = new FormData()
      formData.append('file', params, params?.name)

      return DocumentSalekitApi.uploadfile(formData)
    },
    onSuccess: async (values: any) => {
      mutationCreate.mutate(values?.data?.data)
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.status.message)
      setLoadingBtnUpload(false)
    },
  })

  // thêm tài liệu và database
  const mutationCreate = useMutation({
    mutationFn: (params?: any) => {
      const formdata = form.getFieldsValue()
      // Tách chuỗi thành mảng dựa trên khoảng trắng (#)
      const splitArray =
        formdata?.hashtag?.length !== 0 ? formdata?.hashtag?.split('#') : []

      // Lọc bỏ các chuỗi trống (nếu có)
      const filteredArray =
        splitArray?.length !== 0
          ? splitArray?.filter((item: any) => item.trim() !== '')
          : []

      // Mảng kết quả
      const resultArray = filteredArray?.map((item: any) => `#${item.trim()}`)

      const newValues: any = {
        fileName: formdata?.fileName ? formdata?.fileName?.trim() : null,
        fileType: formdata?.fileType ? formdata?.fileType : null,
        url: params?.fileName,
        sharepointId: params?.idSharepoint,
        uploadType: formdata?.uploadType ? selectedValue : selectedValue,
        originalDocumentId: formdata?.originalDocumentId
          ? formdata?.originalDocumentId
          : '',
        version: formdata?.version ? formdata?.version?.trim() : null,
        languageId: formdata?.languageId ? formdata?.languageId : null,
        documentTypeId: formdata?.documentTypeId
          ? formdata?.documentTypeId
          : null,
        storageTypeId: formdata?.storageTypeId ? formdata?.storageTypeId : null,
        domainId: formdata?.domainId ? formdata?.domainId : null,
        subDomain: formdata?.subDomain ? formdata?.subDomain?.trim() : null,
        technologyUsed: formdata?.technologyUsed
          ? formdata?.technologyUsed?.trim()
          : null,
        languageDevelopment: formdata?.languageDevelopment
          ? formdata?.languageDevelopment?.trim()
          : null,
        hashtag: formdata?.hashtag ? resultArray : [],
        description: formdata?.description
          ? formdata?.description?.trim()
          : null,
      }
      return DocumentSalekitApi.createfile(newValues)
    },
    onSuccess: async () => {
      toast.success(MESSAGE.SUCESS.DOCUMENT.CREATE)
      setLoadingBtnUpload(false)
      navigate(URL.DOCUMENT)
    },
    onError: (err: any) => {
      setLoadingBtnUpload(false)
      toast.error(err?.response?.data?.status.message)
    },
  })

  //cập nhật tài liệu vào sharepoint
  const mutationUpdate = useMutation({
    mutationFn: (params?: string) => {
      const formdata = form.getFieldsValue()
      // Tách chuỗi thành mảng dựa trên khoảng trắng (#)
      const splitArray =
        formdata?.hashtag?.length !== 0 ? formdata?.hashtag?.split('#') : []

      // Lọc bỏ các chuỗi trống (nếu có)
      const filteredArray =
        splitArray?.length !== 0
          ? splitArray?.filter((item: any) => item.trim() !== '')
          : []

      // Mảng kết quả
      const resultArray = filteredArray?.map((item: any) => `#${item.trim()}`)

      const newValues: any = {
        id: params ? params : '',
        fileName: formdata?.fileName ? formdata?.fileName?.trim() : null,
        uploadType: formdata?.uploadType ? selectedValue : selectedValue,
        originalDocumentId: formdata?.originalDocumentId
          ? formdata?.originalDocumentId
          : '',
        version: formdata?.version ? formdata?.version?.trim() : null,
        languageId: formdata?.languageId ? formdata?.languageId : null,
        documentTypeId: formdata?.documentTypeId
          ? formdata?.documentTypeId
          : null,
        storageTypeId: formdata?.storageTypeId ? formdata?.storageTypeId : null,
        domainId: formdata?.domainId ? formdata?.domainId : null,
        subDomain: formdata?.subDomain ? formdata?.subDomain?.trim() : null,
        technologyUsed: formdata?.technologyUsed
          ? formdata?.technologyUsed?.trim()
          : null,
        languageDevelopment: formdata?.languageDevelopment
          ? formdata?.languageDevelopment?.trim()
          : null,
        hashtag: formdata?.hashtag ? resultArray : [],
        description: formdata?.description
          ? formdata?.description?.trim()
          : null,
      }
      return DocumentSalekitApi.updateDocument(newValues)
    },
    onSuccess: async () => {
      toast.success(MESSAGE.SUCESS.DOCUMENT.UPDATE)
      setLoadingBtnUpload(false)
      navigate(URL.DOCUMENT)
    },
    onError: (err: any) => {
      setLoadingBtnUpload(false)
      toast.error(err?.response?.data?.status.message)
    },
  })

  return (
    <div className="px-6 pt-2 pb-4">
      <h1>{!id ? 'Upload tài liệu' : 'Chi tiết tài liệu'}</h1>
      <div className="w-full flex justify-center bg-white border border-solid rounded border-gray-primary">
        <Form
          form={form}
          className={`w-full ${styles.customLabelRequiredAntd}`}
        >
          <div className="w-full flex flex-row justify-between px-6 py-4 gap-10">
            <div className="w-full">
              <h2>{!id && 'Thông tin tải lên'}</h2>
              {!id && (
                <DropZone
                  multiple={false}
                  onSetFile={onSetFile}
                  accept={accept}
                  className="w-full text-sm rounded-md text-gray-400 h-[160px] border boder-solid bg-gray-100 flex items-center justify-center flex-col gap-2 cursor-pointer"
                  icon={renderIcon(fileType)}
                  buttonUpLoad={true}
                  titleUpload="hoặc kéo và thả file để upload"
                />
              )}
              <Form.Item
                {...formItemLayout}
                className="w-full mt-6"
                name="fileName"
                label="Tên file"
                rules={[{ required: true, message: 'Trường bắt buộc' }]}
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-6"
                name="fileType"
                label="Loại file"
              >
                <Input className="border border-none" disabled={true} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-6"
                name="uploadType"
                label="Loại upload"
              >
                <Radio.Group onChange={onChange} value={selectedValue}>
                  <Radio value={0} autoFocus>
                    Tạo tài liệu mới
                  </Radio>

                  <Radio value={1} disabled={disable}>
                    Cập nhập tài liệu
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-6"
                name="originalDocumentId"
                label="Tài liệu gốc"
                rules={
                  !selectedValue
                    ? []
                    : [{ required: true, message: 'Trường bắt buộc' }]
                }
              >
                <Select className="w-full" disabled={!selectedValue}>
                  {DocumentResource?.map((item: any, index: any) => (
                    <Select.Option key={index} value={item.id}>
                      {item.fileName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                className="w-full mt-6"
                name="version"
                label="Phiên bản"
              >
                <Input allowClear />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                className="w-full mt-6"
                name="languageId"
                label="Ngôn ngữ"
                rules={[{ required: true, message: 'Trường bắt buộc' }]}
              >
                <Select className="w-full">
                  {dataDocumentResource?.language?.map(
                    (item: any, index: any) => (
                      <Select.Option key={index} value={item.id}>
                        {item.name}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </div>

            <div className="w-full">
              <h2>{!id && 'Thông tin tài liệu'}</h2>
              <div className="w-full">
                <Form.Item
                  {...formItemLayout}
                  className="w-full mt-6"
                  name="documentTypeId"
                  label="Loại tài liệu"
                  rules={[{ required: true, message: 'Trường bắt buộc' }]}
                >
                  <Select className="w-full">
                    {dataDocumentResource?.documentType?.map(
                      (item: any, index: any) => (
                        <Select.Option key={index} value={item.id}>
                          {item.name}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mt-6"
                  name="storageTypeId"
                  label="Loại lưu trữ"
                  rules={[{ required: true, message: 'Trường bắt buộc' }]}
                >
                  <Select className="w-full">
                    {dataDocumentResource?.storageType?.map(
                      (item: any, index: any) => (
                        <Select.Option key={index} value={item.id}>
                          {item.name}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mt-6"
                  name="domainId"
                  label="Domain"
                  rules={[{ required: true, message: 'Trường bắt buộc' }]}
                >
                  <Select className="w-full">
                    {dataDocumentResource?.domain?.map(
                      (item: any, index: any) => (
                        <Select.Option key={index} value={item.id}>
                          {item.name}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mt-6"
                  name="subDomain"
                  label="Sub domain"
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mt-6"
                  name="technologyUsed"
                  label="Công nghệ sử dụng"
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mt-6"
                  name="languageDevelopment"
                  label="Ngôn ngữ phát triển"
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mt-6"
                  name="hashtag"
                  label="Hashtag"
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  className="w-full mt-6"
                  name="description"
                  label="Mô tả"
                >
                  <TextArea
                    allowClear
                    autoSize={false}
                    style={{ resize: 'none', height: '90px' }}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-10 my-10">
            <Button
              className="w-[150px] h-10 text-black text-[14px] font-medium"
              onClick={() => navigate(-1)}
            >
              Hủy bỏ
            </Button>
            <Button
              className="w-[150px] h-10 text-white text-[14px] font-medium bg-yellow-500"
              onClick={handleUpload}
              loading={isLoadingBtnUpload}
            >
              {!id ? 'Upload tài liệu' : 'Cập nhật'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
export default UploadDocument
