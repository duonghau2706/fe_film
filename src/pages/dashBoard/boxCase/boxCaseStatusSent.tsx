import React from 'react'
import styled from 'styled-components'
interface BoxCaseProps {
  title: string
  number: number
  percent?: number
  color: string
  background?: string
  border: string
}
function BoxCase({
  title,
  number,
  percent,
  color,
  background,
  border,
}: BoxCaseProps) {
  return (
    <ComboBox color={color} background={background} border={border}>
      <div className="box">
        <span>{title}</span>
        <div className="title">
          <span>{number}</span>
          <span>{percent}</span>
        </div>
      </div>
    </ComboBox>
  )
}

export default BoxCase
const ComboBox: any = styled.div<BoxCaseProps>`
  width: 16%;
  height: 91px;
  border-radius: 10px;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  border: ${(props) => props.border};

  .box {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: nowrap;
    line-height: 0;
    width: 100%;
    height: 100%;
    //kich thuoc text
    font-family: 'Arial Bold', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    .title {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      span:nth-child(1) {
        font-size: 30px;
        font-weight: 700;
        line-height: 1.2;
        text-align: center;
      }
      span:nth-child(2) {
        font-size: 18px;
        padding-top: 5px;
        padding-left: 5px;
        font-weight: normal;
      }
    }
  }
`
