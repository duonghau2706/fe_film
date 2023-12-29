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

const BarChartDB = ({ yearPublishSingle, yearPublishMovies }: any) => {
  const data = [
    {
      name: '2016',
      Movies: yearPublishSingle?.filter((item: any) =>
        item?.year_publish === '2016' ? Number(item?.year_publish_single) : 0
      )?.[0]?.year_publish_single,
      Series: yearPublishMovies?.filter((item: any) =>
        item?.year_publish === '2016' ? Number(item?.year_publish_series) : 0
      )?.[0]?.year_publish_series,
    },
    {
      name: '2017',
      Movies: yearPublishSingle?.filter((item: any) =>
        item?.year_publish === '2017' ? Number(item?.year_publish_single) : 0
      )?.[0]?.year_publish_single,
      Series: yearPublishMovies?.filter((item: any) =>
        item?.year_publish === '2017' ? Number(item?.year_publish_series) : 0
      )?.[0]?.year_publish_series,
    },
    {
      name: '2018',
      Movies: yearPublishSingle?.filter((item: any) =>
        item?.year_publish === '2018' ? Number(item?.year_publish_single) : 0
      )?.[0]?.year_publish_single,
      Series: yearPublishMovies?.filter((item: any) =>
        item?.year_publish === '2018' ? Number(item?.year_publish_series) : 0
      )?.[0]?.year_publish_series,
    },
    {
      name: '2019',
      Movies: yearPublishSingle?.filter((item: any) =>
        item?.year_publish === '2019' ? Number(item?.year_publish_single) : 0
      )?.[0]?.year_publish_single,
      Series: yearPublishMovies?.filter((item: any) =>
        item?.year_publish === '2019' ? Number(item?.year_publish_series) : 0
      )?.[0]?.year_publish_series,
    },
    {
      name: '2020',
      Movies: yearPublishSingle?.filter((item: any) =>
        item?.year_publish === '2020' ? Number(item?.year_publish_single) : 0
      )?.[0]?.year_publish_single,
      Series: yearPublishMovies?.filter((item: any) =>
        item?.year_publish === '2020' ? Number(item?.year_publish_series) : 0
      )?.[0]?.year_publish_series,
    },
    {
      name: '2021',
      Movies: yearPublishSingle?.filter((item: any) =>
        item?.year_publish === '2021' ? Number(item?.year_publish_single) : 0
      )?.[0]?.year_publish_single,
      Series: yearPublishMovies?.filter((item: any) =>
        item?.year_publish === '2021' ? Number(item?.year_publish_series) : 0
      )?.[0]?.year_publish_series,
    },
    {
      name: '2022',
      Movies: yearPublishSingle?.filter((item: any) =>
        item?.year_publish === '2022' ? Number(item?.year_publish_single) : 0
      )?.[0]?.year_publish_single,
      Series: yearPublishMovies?.filter((item: any) =>
        item?.year_publish === '2022' ? Number(item?.year_publish_series) : 0
      )?.[0]?.year_publish_series,
    },
    {
      name: '2023',
      Movies: yearPublishSingle?.filter((item: any) =>
        item?.year_publish === '2023' ? Number(item?.year_publish_single) : 0
      )?.[0]?.year_publish_single,
      Series: yearPublishMovies?.filter((item: any) =>
        item?.year_publish === '2023' ? Number(item?.year_publish_series) : 0
      )?.[0]?.year_publish_series,
    },
  ]

  return (
    <div
      style={{ boxShadow: '8px 10px 12px -7px rgba(0,0,0,0.67)' }}
      className="w-fit pl-0 pr-2 pb-2 pt-3 bg-black-main border-0 border-solid rounded-[18px]"
    >
      <div className="flex justify-center font-semibold text-[#d33035] text-[20px] mb-[2px]">
        Năm phát hành
      </div>
      <BarChart
        width={620}
        height={300}
        data={data}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        barGap={0} //gap 2 bar canh nhau
        barCategoryGap={2} //gap 2 nhom bar
      >
        <CartesianGrid vertical={false} strokeDasharray="1 6" />
        <XAxis
          width={500}
          dataKey="name"
          stroke="#e50914"
          tickLine={false} //moc tren truc
          axisLine={false} //truc
          padding={{ left: 0, right: 0 }}
          fontWeight={600}
          fontSize={13}
        />
        <YAxis
          stroke="#e50914"
          fontWeight={600}
          fontSize={13}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{ color: 'white', background: 'rgba(0, 0, 0, 0.8)' }}
          labelStyle={{ color: '#d33035' }}
          itemStyle={{ color: 'white' }}
        />
        {/* <Legend content={renderLegend} /> */}
        <Legend
          verticalAlign="top"
          // iconType="circle"
          height={45}
          content={renderLegend}
        />
        <Bar dataKey="Series" fill="#e50914" barSize={25} />
        <Bar dataKey="Movies" fill="#CBEEF3" barSize={25} />
      </BarChart>
    </div>
  )
}

export default BarChartDB
