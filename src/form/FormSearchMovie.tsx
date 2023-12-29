/* eslint-disable no-unused-vars */
import movieApi from '@/adapter/movie'
import { QUERY_KEY, URL } from '@/utils/constants'
import { getUnique } from '@/utils/helper'
import { Button, Col, ConfigProvider, Form, Input, Row, Select } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

const FormSearchMovie = ({ onSearchMovie }: any) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const formItemLayout = {
    label: { span: 6 },
    wrapperCol: { span: 18 },
  }
  const [listMovie, setListMovie]: any = useState()
  useQuery({
    queryKey: [QUERY_KEY.GET_ALL_MOVIE],
    queryFn: async () => {
      return await movieApi.getAllMovie().then((res) => {
        setListMovie(res?.data?.data?.all)
      })
    },
  })

  const optionsName = listMovie?.map((movie: any) => {
    return {
      label: movie?.name,
      value: movie?.id,
    }
  })

  const tmpCountry: any = []
  listMovie?.map((movie: any) => {
    tmpCountry.push(movie?.country)
  })

  const optionsCountry = getUnique(tmpCountry)?.map(
    (country: any, idx: number) => {
      return { key: idx, label: country, value: country }
    }
  )

  //--------TYPE-----------
  const [disableEpisodeTotal, setDisableEpisodeTotal] = useState(false)

  const optionsType = [
    { label: 'Phim Lẻ', value: 'single' },
    { label: 'Phim Bộ', value: 'series' },
  ]

  const onTypeSelectedHandler = (value: any) => {
    if (value === 'single') {
      form.setFieldValue('episodeTotalMovie', 1)
      setDisableEpisodeTotal(true)
    } else {
      form.setFieldValue('episodeTotalMovie', '')
      setDisableEpisodeTotal(false)
    }
  }
  const searchMovieHandler = () => {
    onSearchMovie(form.getFieldsValue())
    form.resetFields()
    setDisableEpisodeTotal(false)
    navigate(URL.MANAGE_MOVIE)
  }

  return (
    <div className="px-8 bg-whiteForm border-[1px] border-solid rounded-[5px] border-gray-primary">
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: 'white',
            colorPrimary: 'white',
            colorPrimaryHover: '#d9d9d9',
            controlOutline: '#4096ff',
            controlOutlineWidth: 1,
            controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
          },
          components: {
            Input: {
              addonBg: 'red',
              // activeBg: 'red',
              //   activeBorderColor: '#1677ff',
              hoverBorderColor: '#4096ff',
              colorTextDisabled: 'black',
            },
            Select: {
              optionSelectedBg: '#cde9ff',
              optionActiveBg: 'rgba(0, 0, 0, 0.04)',
            },
            Button: {
              colorPrimaryHover: 'white',
            },
          },
        }}
      >
        <div className="w-full pb-5 pt-6">
          <Form form={form} className="flex flex-col gap-3">
            <Row gutter={50}>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="idMovie"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Tên phim
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsName}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  ></Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="countryMovie"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Quốc gia
                    </label>
                  }
                >
                  <Select
                    allowClear
                    showSearch
                    options={optionsCountry}
                    filterOption={(input: any, option: any) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  ></Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={50}>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="categoryMovie"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Thể loại
                    </label>
                  }
                >
                  <Input allowClear />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="typeMovie"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Loại phim
                    </label>
                  }
                >
                  <Select
                    allowClear
                    options={optionsType}
                    onSelect={onTypeSelectedHandler}
                  ></Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={50}>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="episodeTotalMovie"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Số tập
                    </label>
                  }
                >
                  <Input allowClear disabled={disableEpisodeTotal} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  name="timeMovie"
                  label={
                    <label style={{ fontSize: '15x', width: '110px' }}>
                      Thời lượng
                    </label>
                  }
                >
                  <Input allowClear />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="flex justify-center pt-1 pb-5">
          <Button
            className="font-semibold w-[120px] flex items-center justify-center rounded-[5px] py-3 h-[37px] bg-green-ok text-white hover:bg-green-okHover"
            onClick={searchMovieHandler}
          >
            Tìm kiếm
          </Button>
        </div>
      </ConfigProvider>
    </div>
  )
}

export default FormSearchMovie
