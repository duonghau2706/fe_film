const CardItem: React.FC<{
  img: string
  description: string
  value: number
  valueColor: string
  percent: number | undefined
  sizeImg: number
}> = (props) => {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <img
        style={{ width: props.sizeImg, height: props.sizeImg }}
        src={props.img}
        alt={props.description}
      />
      <span className="mt-[15px] mb-[25px] text-[14px]">
        {props.description}
      </span>
      <div className="flex">
        <span
          style={{ color: props.valueColor, fontSize: 30, fontWeight: 'bold' }}
        >
          {props.value}
        </span>
        {props.value > 0 && props.percent && (
          <span
            style={{
              color: props.valueColor,
              fontSize: 18,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              padding: '25px 0 0 5px',
            }}
          >
            ({props.percent}%)
          </span>
        )}
      </div>
    </div>
  )
}

export default CardItem
