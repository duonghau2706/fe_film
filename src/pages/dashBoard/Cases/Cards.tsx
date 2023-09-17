import CardItem from './CardItem'

const Cards: React.FC<{
  cards: {
    img: string
    description: string
    value: number
    valueColor: string
    percent: number | undefined
    sizeImg: number
  }[]
}> = (props) => {
  return (
    <div className="max-w-[65%] px-[40px] py-[15px] flex grow-[6] border-r-[1px] border-t-0 border-b-0 border-l-0 border-solid border-[#AAAAAA]">
      {props.cards.map(
        (
          Card: {
            img: string
            description: string
            value: number
            valueColor: string
            percent: number | undefined
            sizeImg: number
          },
          index
        ) => {
          return (
            <CardItem
              key={index}
              img={Card.img}
              description={Card.description}
              value={Card.value}
              valueColor={Card.valueColor}
              percent={Card.percent}
              sizeImg={Card.sizeImg}
            />
          )
        }
      )}
    </div>
  )
}

export default Cards
