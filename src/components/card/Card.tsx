const Card = ({ icon, title, value }: any) => {
  return (
    <div
      style={{ boxShadow: '8px 10px 12px -7px rgba(0,0,0,0.67)' }}
      className="min-w-[220px] w-fit bg-black-main flex pl-4 pr-7 pt-3 pb-6 border-0 border-solid rounded-[9px] gap-5"
    >
      <div className="w-[59px] h-[59px] my-auto">
        <img className="w-full h-full" src={icon} alt="imdb" />
      </div>
      <div className="flex flex-col justify-center items-center mx-auto leading-[35px]">
        <h3 className="text-red-main mb-0 pb-0">{title}</h3>
        <div className="text-[33px] font-bold text-white mt-0 pt-0">
          {value}
        </div>
      </div>
    </div>
  )
}

export default Card
