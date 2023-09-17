import React, { memo, useCallback } from 'react'
import { Select, Space } from 'antd'

interface IProps {
  // eslint-disable-next-line no-unused-vars
  handleChangeValue: (value: number) => void
}

const selectOption = [
  { value: 10, label: '10' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 200, label: '200' },
  { value: 300, label: '300' },
  { value: 400, label: '400' },
  { value: 500, label: '500' },
  { value: 600, label: '600' },
  { value: 700, label: '700' },
  { value: 800, label: '800' },
  { value: 900, label: '900' },
  { value: 1000, label: '1000' },
]

const SelectLimitRecord = ({ handleChangeValue }: IProps) => {
  const handleChange = useCallback((value: number) => {
    handleChangeValue(value)
  }, [])

  return (
    <Space wrap>
      <div className="flex items-center gap-1.5 text-[14px]">
        <span>Hiển thị</span>
        <Select
          defaultValue={selectOption[0].value}
          style={{ width: 80 }}
          onChange={handleChange}
          options={selectOption}
        />
        <span>bản ghi</span>
      </div>
    </Space>
  )
}

export default memo(SelectLimitRecord)
