import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from '@material-ui/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const MovieItem = ({ srcMovie }: any) => {
  // const [isHovered, setIsHovered] = useState(false)
  const [, setIsHovered] = useState(false)

  const trailer =
    'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761'

  return (
    <Link
      to={{ pathname: 'watch' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="bg-black-main cursor-pointer text-white "
        // style={{ left: isHovered ? index * 299 - 40 : 0 }}
      >
        {true ? (
          <div className="h-[600px] top-[-150px] absolutez z-[999]">
            <video
              src={trailer}
              autoPlay={true}
              loop
              className="relative z-[99999]"
              // style={{ width: '100%', height: '100%' }}
              // className="w-[325px] h-[140px]"
            />
            <div className="">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>1 hour 14 mins</span>
                <span className="limit">+16</span>
                <span>1999</span>
              </div>
              <div className="desc">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Praesentium hic rem eveniet error possimus, neque ex doloribus.
              </div>
              <div className="genre">Action</div>
            </div>
          </div>
        ) : (
          <img src={srcMovie} alt="movie item" className="z-[0] relative" />
        )}
      </div>
    </Link>
  )
}

export default MovieItem
