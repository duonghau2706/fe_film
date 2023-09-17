import { Row } from 'antd'
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import { memo } from 'react'

const DonutChart = ({ data, color, type, responsed, totalCases }: any) => {
  const COLORS = color ? color : ['#0090CE', '#D7D7D7']

  return (
    <Row justify={'center'} className="mb-10 w-[500px] ml-auto mr-auto">
      <div className="flex justify-start items-start flex-col w-[500px]">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius={type === 'case' ? '40%' : '50%'}
              outerRadius="80%"
              fill="url(#color)"
              paddingAngle={0}
              labelLine={false}
              cx="50%"
              cy="50%"
            >
              {data.map((_: any, index: any) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              {/* ko type, có số ở giữa = data[0], có legend, có title tỉ lệ phẩn hồi */}
              {!type ? (
                <Label
                  value={`${data[0].value}%`}
                  position="center"
                  fontSize={40}
                />
              ) : (
                <Label
                  value={type === 'res' ? `${responsed}%` : ``}
                  position="center"
                  fontSize={40}
                />
              )}
            </Pie>
            {((totalCases > 0 && type === 'case') ||
              !type ||
              type == 'res') && (
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value) => (
                  <span style={{ color: '#000000' }}>{value}</span>
                )}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
        {!type && (
          <label className="ml-[136px] font-bold text-[#636262] text-[18px] ">
            Tỉ lệ phản hồi
          </label>
        )}{' '}
        :
        {type === 'res' && (
          <label className="ml-[120px] font-bold text-[#636262] text-[18px] ">
            Tỉ lệ phản hồi
          </label>
        )}
      </div>
    </Row>
  )
}

export default memo(DonutChart)
