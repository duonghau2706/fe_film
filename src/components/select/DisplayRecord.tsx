import { displayOptions } from '@/utils/constants'
import { Select } from 'antd'

const DisplayRecord = ({ handleChange }: any) => {
  const handleChangeOption = (value: any) => {
    handleChange(value)
  }
  return (
    <div>
      <span className="text-sm">Hiển thị</span>
      <Select
        className="w-[80px] mx-2"
        defaultValue={displayOptions[0]}
        onChange={handleChangeOption}
        options={displayOptions}
      />
      <span className="text-sm">bản ghi</span>
    </div>
  )
}

export default DisplayRecord
