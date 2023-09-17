import { Select, Space } from 'antd'

interface IProps {
  // eslint-disable-next-line no-unused-vars
  handleChangeValue: (value: string) => void
}
const value = {
  week: 'week',
  month: 'month',
}

const selectOption = [
  { value: value.week, label: 'Tuần' },
  { value: value.month, label: 'Tháng' },
]

const SelectWeekMonth = ({ handleChangeValue }: IProps) => {
  const handleChange = (value: string) => {
    handleChangeValue(value)
  }

  return (
    <Space wrap>
      <Select
        defaultValue={value.week}
        style={{ width: 200 }}
        onChange={handleChange}
        options={selectOption}
      />
    </Space>
  )
}

export default SelectWeekMonth
