import movieApi from '@/adapter/movie'
import useToken from '@/hook/token'
import { URL } from '@/utils/constants'
import {
  createTimeStampFromMoment,
  create_UUID,
  renderDateStringDay,
  reverseStringDay,
} from '@/utils/helper'
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Movie = () => {
  const { verifyToken } = useToken()
  const { decode } = verifyToken()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }

  const [typeMove, setTypeMovie] = useState('')
  const [curMovie, setCurMovie]: any = useState()
  const [date, setDate]: any = useState(dayjs('1970-01-01T00:00:00.000Z'))
  const { type, id } = useParams()

  const mutationMovie = useMutation({
    mutationFn: (params: any) => movieApi.getInforMovieByMovieId(params),
    onSuccess: (res) => {
      form.setFieldValue('actor', res?.data?.data?.[0]?.actor)
      form.setFieldValue('category', res?.data?.data?.[0]?.category)
      form.setFieldValue('content', res?.data?.data?.[0]?.content)
      form.setFieldValue('country', res?.data?.data?.[0]?.country)
      form.setFieldValue('episode', res?.data?.data?.[0]?.episode)
      form.setFieldValue('episode_total', res?.data?.data?.[0]?.episode_total)
      form.setFieldValue('id', decode?.name)
      form.setFieldValue('name', res?.data?.data?.[0]?.name)

      form.setFieldValue('time', res?.data?.data?.[0]?.time)
      form.setFieldValue('type', res?.data?.data?.[0]?.type)
      form.setFieldValue('url', res?.data?.data?.[0]?.url)
      form.setFieldValue('poster_url', res?.data?.data?.[0]?.poster_url)

      setCurMovie(res?.data?.data?.[0])
      setDate(
        dayjs(
          `${reverseStringDay(
            renderDateStringDay(res?.data?.data?.[0]?.publish, '/')
          )}T00:00:00.000Z`.replaceAll('/', '-')
        )
      )
    },
  })

  useEffect(() => {
    if (type === 'edit' || type === 'view') {
      mutationMovie.mutate({ movieId: id })
    }
  }, [])

  useEffect(() => {
    if (curMovie?.publish?.length > 0) {
      setDate(
        dayjs(
          `${reverseStringDay(
            renderDateStringDay(curMovie?.publish, '/')
          )}T00:00:00.000Z`?.replaceAll('/', '-')
        )
      )
    }
  }, [curMovie?.publish])

  if (type === 'edit') {
  } else if (type === 'view') {
  }

  const onChangeTypeMovieHandler = (value: any) => {
    setTypeMovie(value)

    if (value === 'single') {
      form.setFieldValue('episode', 1)
      form.setFieldValue('episode_total', 1)
    } else {
      form.resetFields(['episode'])
      form.resetFields(['episode_total'])
    }
  }

  const dateChangeHandler: any = (_: any) => {
    setDate(dayjs(_.format('YYYY-MM-DD').concat('T00:00:00.000Z')))
  }

  const mutationCreateMovie = useMutation({
    mutationFn: (params: any) => movieApi.createMovie(params),
    onSuccess: () => {
      toast.success('Upload phim thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.MANAGE_MOVIE)
      }, 2000)
    },
  })

  const mutationUpdateMovie = useMutation({
    mutationFn: (params: any) => movieApi.updateMovie(params),
    onSuccess: () => {
      toast.success('Update phim thành công!', {
        autoClose: 2000,
        style: { marginTop: '50px' },
      })
      setTimeout(() => {
        navigate(URL.MANAGE_MOVIE)
      }, 700)
    },
  })

  const onFinish = () => {
    const data = form.getFieldsValue()

    if (type === 'create') {
      mutationCreateMovie.mutate({
        ...data,
        epidode: Number(data?.epidode),
        episode_total: Number(data?.episode_total),
        time: Number(data?.time),
        id: create_UUID(),
        admin_id: decode?.id,
        created_by: decode?.name,
        publish: data?.publish?.format('DD/MM/YYYY'),
        created_at: createTimeStampFromMoment(moment()),
        updated_at: createTimeStampFromMoment(moment()),
      })
    } else if (type === 'edit') {
      mutationUpdateMovie.mutate({
        ...data,
        id: curMovie?.id,
        epidode: Number(data?.epidode),
        episode_total: Number(data?.episode_total),
        time: Number(data?.time),
        admin_id: decode?.id,
        publish: date.format('DD/MM/YYYY'),
        updated_at: createTimeStampFromMoment(moment()),
        update_by: decode?.name,
      })
    }
  }

  return (
    <div className="pt-[84px] px-10 bg-[#e8e6e6] pb-7">
      <ConfigProvider
        theme={{
          token: {
            controlOutline: 'rgba(5, 145, 255, 0.1)',
            //   // controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
            colorPrimary: 'white',
          },
          components: {
            Input: {
              activeBorderColor: '#1677ff',
              hoverBorderColor: '#4096ff',
              colorTextDisabled: 'gray',
            },
            Select: {
              colorTextDisabled: 'gray',
              controlOutline: '#4096ff',
              controlOutlineWidth: 1,
              optionSelectedBg: '#cde9ff',
              optionActiveBg: 'rgba(0, 0, 0, 0.04)',
            },
            Button: {
              // colorPrimary: 'white',
              colorPrimaryHover: 'white',
            },
            DatePicker: {
              colorTextDisabled: 'gray',
              addonBg: 'green',
              cellRangeBorderColor: 'green',
              cellActiveWithRangeBg: 'green',
              activeBorderColor: '4096ff',
              hoverBorderColor: '#4096ff',
            },
          },
        }}
      >
        <div className="mb-3 text-[30px] text-black-main font-semibold">
          {type === 'create'
            ? 'Upload phim'
            : type === 'edit'
            ? 'Chỉnh sửa phim'
            : 'Chi tiết phim'}
        </div>

        <div className="w-full pb-5 pt-9 flex justify-center bg-white border border-solid rounded border-gray-primary text-black-primary">
          <Form
            initialValues={{ id: decode?.name }}
            form={form}
            onFinish={onFinish}
            className="w-full"
          >
            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="name"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Tên phim
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="type"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Loại phim
                    </label>
                  }
                >
                  <Select
                    style={{ width: '350px' }}
                    options={[
                      { label: 'Phim Lẻ', value: 'single' },
                      { label: 'Phim Bộ', value: 'series' },
                    ]}
                    disabled={type === 'view'}
                    onChange={onChangeTypeMovieHandler}
                  ></Select>
                </Form.Item>
              </Col>
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="url"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Link phim
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="category"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Thể loại
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="poster_url"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Link poster
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="country"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Quốc gia
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="time"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Thời lượng
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="actor"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Diễn viên
                    </label>
                  }
                >
                  <Input
                    disabled={type === 'view' ? true : false}
                    allowClear
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="episode"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Tập
                    </label>
                  }
                >
                  <Input
                    allowClear
                    disabled={typeMove === 'single' || type === 'view'}
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="episode_total"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Số tập
                    </label>
                  }
                >
                  <Input
                    allowClear
                    disabled={typeMove === 'single' || type === 'view'}
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="mb-1 mx-10">
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="publish"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Ngày phát hành
                    </label>
                  }
                >
                  <ConfigProvider
                    theme={{
                      token: {
                        controlOutline: 'rgba(5, 145, 255, 0.1)',
                        //   // controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
                        colorPrimary: 'red',
                      },
                    }}
                  >
                    <DatePicker
                      disabled={type === 'view'}
                      onChange={dateChangeHandler}
                      format={'DD/MM/YYYY'}
                      className="w-1/3"
                      placeholder={'Chọn ngày'}
                      value={date}
                    />
                  </ConfigProvider>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  className="w-ful mb-3"
                  name="id"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Người {type === 'edit' ? 'chỉnh sửa' : 'upload'}
                    </label>
                  }
                >
                  <Input
                    allowClear
                    // defaultValue={decode?.name}
                    disabled={true || type === 'view'}
                    className="w-[350px]"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              {...formItemLayout}
              className="w-ful mb-3 relative left-[-40px]"
              name="content"
              label={
                <label style={{ fontSize: '15x', width: '110px' }}>
                  Nội dung
                </label>
              }
            >
              <TextArea
                allowClear
                autoSize={false}
                disabled={type === 'view'}
                style={{
                  resize: 'none',
                  height: '150px',
                  width: '900px',
                }}
                className="w-full"
              />
            </Form.Item>

            <div className="flex gap-2 justify-center mt-5">
              <Button
                className="font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-red-delete text-white hover:bg-red-deleteHover"
                onClick={() => navigate(-1)}
              >
                Quay lại
              </Button>

              {(type === 'edit' || type === 'create') && (
                <Button
                  htmlType="submit"
                  className="min-w-[83px] font-semibold flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
                >
                  {type === 'edit' ? 'Lưu' : 'Upload'}
                </Button>
              )}
            </div>
          </Form>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default Movie
