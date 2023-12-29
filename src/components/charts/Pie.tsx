import { ConfigProvider, Row } from 'antd'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Empty } from 'antd'

import { memo } from 'react'

const PieDB = ({ viewVeryFew, viewFew, viewMuch, viewVeryMuch }: any) => {
  const COLORS = ['#B81D24', '#F86475', '#E68F96', '#F0A787']
  const data = [
    { name: '< 1k', value: Number(viewVeryFew) },
    { name: '1k - 10k', value: Number(viewFew) },
    { name: '10k - 100k', value: Number(viewMuch) },
    { name: '> 100k', value: Number(viewVeryMuch) },
  ]

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - 13) * 1.5

    const x1 = cx + radius * Math.cos(-midAngle * RADIAN)
    const y1 = cy + radius * Math.sin(-midAngle * RADIAN)

    const x2 = cx + radius * Math.cos(-midAngle * RADIAN)
    const y2 = cy + radius * Math.sin(-midAngle * RADIAN)

    // Tính toán tọa độ cho đầu mút đường
    const lineX1 = cx + outerRadius * Math.cos(-midAngle * RADIAN)
    const lineY1 = cy + outerRadius * Math.sin(-midAngle * RADIAN)

    // Tính toán tọa độ cho đầu mút đường
    const lineX2 =
      x2 < cx
        ? cx + radius * Math.cos(-midAngle * RADIAN) - 10
        : cx + radius * Math.cos(-midAngle * RADIAN) + 10
    const lineY2 = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <>
        <line
          x1={x1}
          y1={y1}
          x2={lineX1}
          y2={lineY1}
          stroke="white"
          strokeWidth="2"
        />
        <line
          x1={x2}
          y1={y2}
          x2={lineX2}
          y2={lineY2}
          stroke="white"
          strokeWidth="2"
        />
        <text
          x={x2 < cx ? x2 - 15 : x2 + 15}
          y={y2}
          fill="white"
          textAnchor={x2 > cx ? 'start' : 'end'}
          dominantBaseline="central"
          fontWeight={700}
          fontSize={13}
        >
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </>
    )
  }

  const renderLegend = ({ payload }: any) => {
    return (
      <ul
        style={{ listStyle: 'none', paddingLeft: 0, color: 'white' }}
        className="flex flex-wrap gap-3 justify-center top-0"
      >
        {payload.map((entry: any, index: any) => (
          <li
            key={`item-${index}`}
            style={{ marginBottom: '5px', fontWeight: '600' }}
          >
            <span
              className="rounded-[50%]"
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                backgroundColor: entry.color,
                marginRight: '5px',
              }}
            />
            {entry.value}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      style={{ boxShadow: '8px 10px 12px -7px rgba(0,0,0,0.67)' }}
      className="px-3 w-fit pb-5 bg-black-main border-0 border-solid rounded-[18px]"
    >
      <div className="flex justify-center pt-2 pb-1 text-[20px] text-[#d33035] font-semibold">
        Lượt xem
      </div>
      {!Number(viewVeryFew) &&
      !Number(viewFew) &&
      !Number(viewMuch) &&
      !Number(viewVeryMuch) ? (
        <ConfigProvider
          theme={{
            token: {
              colorText: 'white',
            },
          }}
        >
          <Empty className="w-[320px] h-[255px] flex flex-col justify-center " />
        </ConfigProvider>
      ) : (
        <Row justify={'center'} className=" w-[330px] ml-auto mr-auto">
          <div className="flex justify-start items-start flex-col w-full">
            <ResponsiveContainer width="100%" height={255}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  // innerRadius={'45%'}
                  outerRadius="80%"
                  //   fill="url(#color)"
                  paddingAngle={0}
                  //   labelLine={false}
                  cx="50%"
                  cy="50%"
                  label={renderCustomizedLabel}
                >
                  {data.map((_: any, index: any) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none" // Tắt viền
                      strokeWidth={0} // Độ rộng viền
                    />
                  ))}
                  {/* {data.map((entry, index) => (
                <Label
                  key={`label-${index}`}
                  value={entry.value}
                  position={<CustomLabel />}
                  fill="#fff" // Màu trắng cho nhãn
                  fontSize={14}
                />
              ))} */}
                </Pie>
                <Tooltip
                  contentStyle={{
                    color: 'white',
                    background: 'rgba(0, 0, 0, 0.8)',
                  }}
                  labelStyle={{ color: '#d33035' }}
                  itemStyle={{ color: 'white' }}
                />
                <Legend
                  content={renderLegend}
                  // wrapperStyle={{ color: 'white' }} // Màu văn bản của Legend
                  verticalAlign="top"
                  // iconType="circle"
                  // height={35}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Row>
      )}
    </div>
  )
}

export default memo(PieDB)
