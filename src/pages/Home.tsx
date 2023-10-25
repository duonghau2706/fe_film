// import Featured from '../../components/featured/Featured'
// import List from '../../components/list/List'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ListMovies from '@/components/listMovies/ListMovies'
import { Button, ConfigProvider } from 'antd'
// import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  //SKIP----scrollnavbar
  // const dispatch = useDispatch()
  // const isScrolled = useSelector((state) => state.isScrolled)
  // window.onscroll = () => {
  //   if (window.pageYOffset === 0) {
  //     dispatch('SCROLLL')
  //   }
  //   return () => (window.onscroll = null)
  // }

  return (
    <div className="bg-black-primary">
      <div className="bg-auto overflow-hidden relative">
        <img
          src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABShKtg2FR_6CVnfmTH5GArybgjBJy1ImISc1_87n0nAI6GZrZ2G-PDTPWM9ZBEeMpBetP_GkVvuZtgpG4-N-HK_BgcgW7iRdiuAu.webp?r=219"
          alt="img film home"
          width={1280}
          style={{
            background: 'linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)',
          }}
          // height={650}
        />
        <div
          className="absolute bottom-0 left-0 top-0 right-[50%]"
          style={{
            background: 'linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)',
          }}
        ></div>
        <div className="left-10 absolute z-[99] top-[10%] w-[35%]">
          <span className="inline-block text-[80px] text-center font-home text-[#FBF2A7] font-extrabold [word-spacing: 10px]">
            AN LẠC TRUYỆN
          </span>
          <h3 className="font-bold text-[25px] mb-3">
            Xem ngay kết thúc của mùa
          </h3>
          <p className="text-[18px] font-semibold">
            Từ kẻ gan góc sống ngoài vòng pháp luật trở thành phi tần, nữ nhân
            nọ tìm kiếm công lý cho gia đình mình đối mặt với cơn bão khủng
            hoảng giữa cảnh cung đấu ngập tràn hiểm nguy.
          </p>
          <div className="flex gap-2">
            <ConfigProvider
              theme={{
                token: {
                  colorBgContainerDisabled: 'red',
                  colorPrimaryHover: 'black',
                },
              }}
            >
              <Button className="flex h-full border-none hover:opacity-[0.7]">
                <PlayArrowIcon className="my-auto mr-1" />
                <div className="text-[20px] font-semibold">Phát</div>
              </Button>
            </ConfigProvider>
            <Button className="flex h-full bg-[#6d6d6eb3] border-none text-white hover:bg-[#525253]">
              <InfoOutlinedIcon className="my-auto mr-1" />
              <div className="text-[20px] font-semibold">Thông tin khác</div>
            </Button>
          </div>
        </div>
        <div className="pl-10 absolute w-full bottom-0">
          <ListMovies />
        </div>
      </div>
      <div className="pl-10">
        <ListMovies />
        <ListMovies />
        <ListMovies />
        <ListMovies />
        <ListMovies />
        <ListMovies />
      </div>
      <div className=" bg-red-500 top-16"></div>
      {/* <Featured type={type} />
      <List />
      <List />
      <List />
      <List /> */}
    </div>
  )
}

export default Home
