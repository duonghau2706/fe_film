import { displayOptions } from '@/utils/constants'
import { ConfigProvider, Select } from 'antd'

const DisplayRecord = ({ handleChange }: any) => {
  const handleChangeOption = (value: any) => {
    handleChange(value)
  }
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'white',
            colorPrimaryHover: '#d9d9d9',
            controlOutline: '#4096ff',
            controlOutlineWidth: 1,
            controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
          },
          components: {
            Input: {
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
        <span className="text-sm">Hiển thị</span>
        <Select
          className="w-[80px] mx-2"
          defaultValue={displayOptions[0]}
          onChange={handleChangeOption}
          options={displayOptions}
        />
        <span className="text-sm">bản ghi</span>
      </ConfigProvider>
    </div>
  )
}

export default DisplayRecord
