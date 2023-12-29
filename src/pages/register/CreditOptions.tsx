import bankHdb from '@/assets/image/bank_Hdb.jpg'
import bankMbb from '@/assets/image/bank_Mbb.png'
import bankAgrb from '@/assets/image/bank_agrb.jpg'
import bankBidv from '@/assets/image/bank_bidv.jpg'
import bankGpb from '@/assets/image/bank_gpb.png'
import bankLvpb from '@/assets/image/bank_lvpb.jpg'
import bankScb from '@/assets/image/bank_scb.jpg'
import bankShb from '@/assets/image/bank_shb.png'
import bankTcb from '@/assets/image/bank_tcb.png'
import bankTpb from '@/assets/image/bank_tpb.jpg'
import bankVcb from '@/assets/image/bank_vcb.png'
import bankVib from '@/assets/image/bank_vib.png'
import bankVpb from '@/assets/image/bank_vpb.png'
import bankVtb from '@/assets/image/bank_vtb.jpg'
import logoSANSAN from '@/assets/image/logoSANSAN.png'
import selectedBank from '@/assets/image/selected_bank.jpg'

import { URL } from '@/utils/constants'
import { CreditCardOutlined } from '@ant-design/icons'

import { Button, ConfigProvider } from 'antd'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const CreditOptions = () => {
  const { state } = useLocation()
  const { serviceSelected, recharge } = state
  const navigate = useNavigate()
  const [index, setIndex]: any = useState()
  // const [isNextStep, setIsNextStep] = useState(false)
  const [selected, setSelected]: any = useState({
    idx0: false,
    idx1: false,
    idx2: false,
    idx3: false,
    idx4: false,
    idx5: false,
    idx6: false,
    idx7: false,
    idx8: false,
    idx9: false,
    idx10: false,
    idx11: false,
    idx12: false,
    idx13: false,
  })

  // useEffect(() => {
  //   setSelected({ ...selected })
  // }, [selected])

  const handleItemClick = (index: any) => {
    setIndex(index)
    setSelected((prevSelected: any) => {
      // Tạo một bản sao mới của trạng thái trước đó
      const newSelected = { ...prevSelected }

      // Đặt giá trị mới cho chỉ mục được click, và đặt tất cả các giá trị khác thành false
      Object.keys(newSelected).forEach((key) => {
        newSelected[key] = key === `idx${index}`
      })

      return newSelected
    })
  }

  const onFinishCreditOptionHandler = () => {
    !recharge
      ? navigate(URL.SETUP_PAYMENT, {
          state: { index, serviceSelected },
        })
      : navigate(URL.SETUP_RECHARGE, {
          state: { index },
        })
  }

  return (
    <div className="bg-[#ffffff] pl-10 pt-5 pr-10 pb-[30px] text-black-primary">
      <div
        style={{ borderBottom: '1px solid #e6e6e6' }}
        className="relative pb-5"
      >
        <img className="h-[40px]" src={logoSANSAN} alt="logo netflix" />
        <Link
          to={URL.LOGIN}
          className="text-[19px] text-black-main font-semibold absolute right-0"
        >
          Đăng xuất
        </Link>
      </div>
      <div className="pl-[10px] pr-[10px]">
        <div className="text-black-primary font-bold text-[30px]">
          <div className="my-5 mb-[18px]">Thiết lập thông tin thanh toán</div>
        </div>

        <div style={{ border: '2px solid #e6e6e684' }} className="pb-3 rounded">
          <div
            style={{ borderBottom: '2px solid #e6e6e684' }}
            className="flex pl-5 py-3 gap-2 bg-[#e6e6e684]"
          >
            <CreditCardOutlined />
            <div className=" font-bold">Thẻ ATM</div>
          </div>

          <div className="bg-white px-5 pt-[28px] pb-10 flex flex-wrap gap-[10px]">
            <div
              style={{
                border: selected.idx0
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-6 py-6 rounded"
              onClick={() => handleItemClick(0)}
            >
              <img className="w-full h-full" src={bankVcb} alt="vcb" />
              {selected.idx0 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx1
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] py-1 rounded"
              onClick={() => handleItemClick(1)}
            >
              <img className="w-full h-full" src={bankTcb} alt="vcb" />
              {selected.idx1 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx2
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-4 py-8 rounded"
              onClick={() => handleItemClick(2)}
            >
              <img className="w-full h-full" src={bankTpb} alt="vcb" />
              {selected.idx2 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx3
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-4 py-8 rounded"
              onClick={() => handleItemClick(3)}
            >
              <img className="w-full h-full" src={bankVtb} alt="vcb" />
              {selected.idx3 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx4
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-4 py-8 rounded"
              onClick={() => handleItemClick(4)}
            >
              <img className="w-full h-full" src={bankVib} alt="vcb" />
              {selected.idx4 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx5
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-6 py-6 rounded"
              onClick={() => handleItemClick(5)}
            >
              <img className="w-full h-full" src={bankHdb} alt="vcb" />
              {selected.idx5 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx6
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-4 py-2 rounded"
              onClick={() => handleItemClick(6)}
            >
              <img className="w-full h-full" src={bankAgrb} alt="vcb" />
              {selected.idx6 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx7
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] rounded"
              onClick={() => handleItemClick(7)}
            >
              <img className="w-full h-full" src={bankBidv} alt="vcb" />
              {selected.idx7 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx8
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-6 py-6 rounded"
              onClick={() => handleItemClick(8)}
            >
              <img className="w-full h-full" src={bankMbb} alt="vcb" />
              {selected.idx8 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx9
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-6 rounded"
              onClick={() => handleItemClick(9)}
            >
              <img className="w-full h-full" src={bankScb} alt="vcb" />
              {selected.idx9 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx10
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-6 py-6 rounded"
              onClick={() => handleItemClick(10)}
            >
              <img className="w-full h-full" src={bankShb} alt="vcb" />
              {selected.idx10 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx11
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-6 pt-6 pb-8 rounded"
              onClick={() => handleItemClick(11)}
            >
              <img className="w-full h-full" src={bankVpb} alt="vcb" />
              {selected.idx11 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx12
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-2 py-2 rounded"
              onClick={() => handleItemClick(12)}
            >
              <img className="w-full h-full" src={bankLvpb} alt="vcb" />
              {selected.idx12 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>

            <div
              style={{
                border: selected.idx13
                  ? '2px solid #139E1C'
                  : '1px solid #b3b3b3ba',
              }}
              className="relative w-[215px] h-[120px] px-6 pt-6 pb-8 rounded"
              onClick={() => handleItemClick(13)}
            >
              <img className="w-full h-full" src={bankGpb} alt="vcb" />
              {selected.idx13 && (
                <img
                  className="absolute top-[-10px] right-[-10px] w-[40px] h-[40px]"
                  src={selectedBank}
                  alt="selectedBank"
                />
              )}
            </div>
          </div>

          <div className="flex w-full justify-center gap-3 mb-2">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: 'white',
                },
              }}
            >
              <Button
                style={{ border: '2px solid #A7A9AA' }}
                className="w-[200px] bg-white justify-center text-[#A7A9AA] border-none text-[15px] px-[30px] py-[22px] rounded-[4px] font-bold cursor-pointer flex items-center hover:bg-[#f04135]"
                onClick={() => navigate(-1)}
              >
                HỦY BỎ
              </Button>
            </ConfigProvider>

            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: 'white',
                },
              }}
            >
              <Button
                className="w-[200px] bg-[#0B783D] justify-center text-white border-none text-[15px] px-[30px] py-[22px] rounded-[4px] font-bold cursor-pointer flex items-center hover:bg-[#0b8d48]"
                onClick={onFinishCreditOptionHandler}
              >
                TIẾP TỤC
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditOptions
