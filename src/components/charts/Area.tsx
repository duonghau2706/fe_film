import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const renderLegend = ({ payload }: any) => {
  return (
    <ul
      style={{ listStyle: 'none', paddingLeft: 0, color: 'white' }}
      className="flex gap-3 justify-center top-0"
    >
      {payload.map((entry: any, index: any) => (
        <li
          key={`item-${index}`}
          style={{ marginBottom: '5px', fontWeight: '600', fontSize: '13px' }}
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

const AreaDB = ({
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
}: any) => {
  const data = [
    {
      name: 'T1',
      Movies: Number(one?.[1]?.sum),
      Series: Number(one?.[0]?.sum),
    },
    {
      name: 'T2',
      Movies: Number(two?.[1]?.sum),
      Series: Number(two?.[0]?.sum),
    },
    {
      name: 'T3',
      Movies: Number(three?.[1]?.sum),
      Series: Number(three?.[0]?.sum),
    },
    {
      name: 'T4',
      Movies: Number(four?.[1]?.sum),
      Series: Number(four?.[0]?.sum),
    },
    {
      name: 'T5',
      Movies: Number(five?.[1]?.sum),
      Series: Number(five?.[0]?.sum),
    },
    {
      name: 'T6',
      Movies: Number(six?.[1]?.sum),
      Series: Number(six?.[0]?.sum),
    },
    {
      name: 'T7',
      Movies: Number(seven?.[1]?.sum),
      Series: Number(seven?.[0]?.sum),
    },
    {
      name: 'T8',
      Movies: Number(eight?.[1]?.sum),
      Series: Number(eight?.[0]?.sum),
    },
    {
      name: 'T9',
      Movies: Number(nine?.[1]?.sum),
      Series: Number(nine?.[0]?.sum),
    },
    {
      name: 'T10',
      Movies: Number(ten?.[1]?.sum),
      Series: Number(ten?.[0]?.sum),
    },
    {
      name: 'T11',
      Movies: Number(eleven?.[1]?.sum),
      Series: Number(eleven?.[0]?.sum),
    },
    {
      name: 'T12',
      Movies: Number(twelve?.[1]?.sum),
      Series: Number(twelve?.[0]?.sum),
    },
  ]

  return (
    <div
      style={{ boxShadow: '8px 10px 12px -7px rgba(0,0,0,0.67)' }}
      className="w-fit bg-black-main flex-col pl-4 pr-7 pt-3 pb-2 border-0 border-solid rounded-[18px] gap-5 "
    >
      <div className="flex justify-center font-semibold text-[#d33035] text-[20px]">
        Phim thịnh hành theo tháng
      </div>
      <AreaChart
        width={530}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 30,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="name"
          stroke="white"
          tickLine={false} //moc tren truc
          axisLine={false} //truc
          padding={{ left: 0, right: 0 }}
          fontWeight={600}
          fontSize={13}
        />
        <YAxis
          stroke="white"
          fontWeight={600}
          tickLine={false}
          axisLine={false}
          hide
        />
        <Tooltip
          contentStyle={{ color: 'white', background: 'rgba(0, 0, 0, 0.8)' }}
          itemStyle={{ color: 'white' }}
        />
        <CartesianGrid vertical={false} horizontal={false} />
        <Legend height={30} verticalAlign="top" content={renderLegend} />
        <Area
          type="linear"
          dataKey="Series"
          stackId="1"
          stroke="#E50914"
          strokeWidth={3}
          fill="#E50914"
          label={{
            position: 'bottom',
            fill: 'white',
            offset: 10,
            fontSize: 13,
          }}
        />
        <Area
          type="linear"
          dataKey="Movies"
          stackId="1"
          stroke="white"
          strokeWidth={3}
          fill="white"
          label={{ position: 'top', fill: 'white', offset: 10, fontSize: 13 }}
        />
      </AreaChart>
    </div>
  )
}

export default AreaDB
