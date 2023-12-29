import { Slider } from 'antd'
import React from 'react'

const SliderDB = () => {
  return (
    <>
      <Slider defaultValue={200} />
      <Slider range defaultValue={[1970, 2023]} />
      {/* Disabled: <Switch size="small" checked={disabled} onChange={onChange} /> */}
    </>
  )
}

export default SliderDB
