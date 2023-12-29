import {
  BarChart,
  Bar,
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

const StackedBar = ({
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}: any) => {
  const data = [
    {
      name: 'Thứ 2',
      Movies: Number(monday?.[1]?.sum),
      Series: Number(monday?.[0]?.sum),
    },
    {
      name: 'Thứ 3',
      Movies: Number(tuesday?.[1]?.sum),
      Series: Number(tuesday?.[0]?.sum),
    },
    {
      name: 'Thứ 4',
      Movies: Number(wednesday?.[1]?.sum),
      Series: Number(wednesday?.[0]?.sum),
    },
    {
      name: 'Thứ 5',
      Movies: Number(thursday?.[1]?.sum),
      Series: Number(thursday?.[0]?.sum),
    },
    {
      name: 'Thứ 6',
      Movies: Number(friday?.[1]?.sum),
      Series: Number(friday?.[0]?.sum),
    },
    {
      name: 'Thứ 7',
      Movies: Number(saturday?.[1]?.sum),
      Series: Number(saturday?.[0]?.sum),
    },
    {
      name: 'CN',
      Movies: Number(sunday?.[1]?.sum),
      Series: Number(sunday?.[0]?.sum),
    },
  ]

  return (
    <div
      style={{ boxShadow: '8px 10px 12px -7px rgba(0,0,0,0.67)' }}
      className="w-fit bg-black-main flex-col pl-4 pr-7 pt-3 pb-6 border-0 border-solid rounded-[18px] gap-5 "
    >
      <div className="flex justify-center font-semibold text-[#d33035] text-[20px]">
        Phim thịnh hành theo tuần
      </div>

      <BarChart
        width={440}
        height={250}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 5,
          bottom: 3,
        }}
        barCategoryGap={5}
        layout="vertical"
      >
        <XAxis
          type="number"
          stroke="white"
          tickLine={false} //moc tren truc
          axisLine={false} //truc
          padding={{ left: 0, right: 0 }}
          fontWeight={600}
          hide
        />
        <YAxis
          dataKey="name"
          type="category"
          stroke="white"
          fontWeight={600}
          fontSize={13}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{ color: 'white', background: 'rgba(0, 0, 0, 0.8)' }}
          itemStyle={{ color: 'white' }}
        />
        <CartesianGrid vertical={false} horizontal={false} />
        <Legend height={30} verticalAlign="top" content={renderLegend} />
        <Bar
          dataKey="Series"
          stackId="a"
          fill="#e50914"
          label={{
            position: 'insideRight',
            fill: 'white',
            fontSize: '13px',
            fontWeight: 600,
          }}
        />
        <Bar
          dataKey="Movies"
          stackId="a"
          fill="white"
          label={{
            position: 'insideLeft',
            fill: 'black',
            fontSize: '13px',
            fontWeight: 600,
          }}
        />
      </BarChart>
    </div>
  )
}

export default StackedBar
