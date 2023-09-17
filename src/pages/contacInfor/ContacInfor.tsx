import { contactInforApi } from '@/adapter'
import { QUERY_KEY, URL } from '@/utils/constants'
import { Button, Col, Row } from 'antd'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styles from '@/common.module.scss'

const renderData = ({ header, kanji, hira, kata }: any) => {
  return (
    <div className="w-full border border-solid border-gray-primary mb-6 bg-white">
      <div className="bg-[#1a2c44] px-6 py-2 text-white font-bold text-[14px]">
        {header}
      </div>
      <div className="px-8 py-6">
        <Row className="w-full justify-start" gutter={10}>
          <Col className="font-bold" span={6}>
            Kanji
          </Col>
          <Col className="w-full break-words" span={18}>
            {kanji ? kanji : ''}
          </Col>
        </Row>
        <Row className="w-full justify-start mt-6">
          <Col className="font-bold" span={6}>
            Hira
          </Col>
          <Col span={18} className="w-full break-words">
            {hira ? hira : ''}
          </Col>
        </Row>
        <Row className="w-full justify-start mt-6">
          <Col className="font-bold break-words" span={6}>
            Kata
          </Col>
          <Col className="w-full break-words" span={18}>
            {kata ? kata : ''}
          </Col>
        </Row>
      </div>
    </div>
  )
}

const ContactInfor = () => {
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_CONTACT_INFOR],
    queryFn: () =>
      contactInforApi.getAll().then((res: any) => res?.data?.contactInfor?.[0]),
  })

  const handleEdit = () => {
    if (data?.id) navigate(URL.CONTACT_INFOR.concat(`/${data?.id}`))
    else navigate(URL.CONTACT_INFOR_CREATE)
  }

  return (
    <div className="px-6 pt-2 pb-4 overflow-auto h-full w-full">
      <h1>Thông tin liên hệ</h1>

      <Row gutter={30}>
        <Col span={12}>
          {renderData({
            header: 'Tên / 名前',
            kanji: data?.nameKanji,
            hira: data?.nameHira,
            kata: data?.nameKata,
          })}
        </Col>
        <Col span={12}>
          {renderData({
            header: 'Địa chỉ / 住所',
            kanji: data?.addressKanji,
            hira: data?.addressHira,
            kata: data?.addressKata,
          })}
        </Col>
      </Row>

      <Row gutter={30}>
        <Col span={12}>
          {renderData({
            header: 'Tên công ty / 会社名',
            kanji: data?.nameCompanyKanji,
            hira: data?.nameCompanyHira,
            kata: data?.nameCompanyKata,
          })}
        </Col>
        <Col span={12}>
          {renderData({
            header: 'Tên chức vụ / お役職名',
            kanji: data?.positionKanji,
            hira: data?.positionHira,
            kata: data?.positionKata,
          })}
        </Col>
      </Row>

      <div className="w-full border border-solid border-gray-primary mb-6 bg-white">
        <div className="bg-[#1a2c44] px-6 py-2 text-white font-bold">
          Các thông tin khác
        </div>
        <Row gutter={40} className="px-8 py-6">
          <Col span={12}>
            <Row className="w-full justify-start">
              <Col className="font-bold" span={6}>
                Mail
              </Col>
              <Col className="w-full break-words" span={18}>
                {data?.mail ? data?.mail : ''}
              </Col>
            </Row>
            <Row className="w-full justify-start mt-6">
              <Col className="font-bold" span={6}>
                URL
              </Col>
              <Col className="w-full break-words" span={18}>
                {data?.url ? data?.url : ''}
              </Col>
            </Row>
            <Row className="w-full justify-start mt-6">
              <Col className="font-bold" span={6}>
                Tên phòng ban
              </Col>
              <Col className="w-full break-words" span={18}>
                {data?.positionName ? data?.positionName : ''}
              </Col>
            </Row>
            <Row className="w-full justify-start mt-6">
              <Col className="font-bold" span={6}>
                Số bưu điện
              </Col>
              <Col className="w-full break-words" span={18}>
                {data?.postOfficeCode ? data?.postOfficeCode : ''}
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <div className="px-8">
              <Row className="w-full justify-start">
                <Col className="font-bold" span={6}>
                  Điện thoại
                </Col>
                <Col className="w-full break-words" span={18}>
                  {data?.phoneNumber ? data?.phoneNumber : ''}
                </Col>
              </Row>
              <Row className="w-full justify-start mt-6">
                <Col className="font-bold" span={6}>
                  Ngành/Lĩnh vực
                </Col>
                <Col className="w-full break-words" span={18}>
                  {data?.field ? data?.field : ''}
                </Col>
              </Row>
              <Row className="w-full justify-start mt-6">
                <Col className="font-bold" span={6}>
                  Title
                </Col>
                <Col className="w-full break-words" span={18}>
                  {data?.title ? data?.title : ''}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      <div
        className={`w-full flex justify-center mt-8 mb-2 ${styles.removeHoverBtnAntd}`}
      >
        <Button
          className="bg-yellow-primary text-white w-[140px] h-[40px] text-[14px] font-medium"
          onClick={() => handleEdit()}
        >
          Chỉnh sửa
        </Button>
      </div>
    </div>
  )
}

export default ContactInfor
