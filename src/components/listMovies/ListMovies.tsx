import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@material-ui/icons'
import { useRef, useState } from 'react'
import MovieItem from './MovieItem'
import './ListMovies.scss'
import { Skeleton } from 'antd'

export default function ListMovies({
  // type,
  // key,
  listMoviesByType,
  // totalMovies,
  listTitle,
  isLoading,
}: any) {
  const [isMoved, setIsMoved] = useState(false)
  const [slideNumber, setSlideNumber] = useState(0)
  const totalMovies = listMoviesByType?.length ?? 0

  const listRef: any = useRef()

  const handleClick = (direction: any) => {
    setIsMoved(true)
    // const distance = listRef.current.getBoundingClientRect().x - 40
    if (direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1)
      listRef.current.style.transform = `translateX(${
        (-225 - 5) * (slideNumber - 1)
      }px)`
    }
    if (direction === 'right' && slideNumber + 6 < totalMovies) {
      setSlideNumber(slideNumber + 1)
      listRef.current.style.transform = `translateX(${
        (-225 - 5) * (slideNumber + 1)
      }px)`
    } else if (direction === 'right' && slideNumber + 6 === totalMovies) {
      setSlideNumber(slideNumber + 1)
      listRef.current.style.transform = `translateX(${
        (-225 - 5) * slideNumber - 155
      }px)`
    }
  }
  return (
    <div className="list mt-[30px]">
      <span className="listTitle">{listTitle}</span>
      {!isLoading ? (
        <div className="wrapper">
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick('left')}
            style={{
              display: isMoved && slideNumber - 1 >= 0 ? 'block' : 'none',
            }}
          />
          <div
            className="container"
            ref={listRef}
            // style={{ transform: `translateX(${-40}px)` }}
          >
            {listMoviesByType?.map((movie: any, index: number) => {
              return (
                <MovieItem
                  key={index}
                  index={index}
                  movie={movie}
                  // srcMovie={movie.url}
                  // img={movie.poster_url}
                  // trailer={movie.trailer}
                />
              )
            })}
            {/* <MovieItem
            index={0}
            srcMovie="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          />
          <MovieItem
            index={1}
            srcMovie="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          />
          <MovieItem
            index={2}
            srcMovie="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          />
          <MovieItem
            index={3}
            srcMovie="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          />
          <MovieItem
            index={4}
            srcMovie="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          />
          <MovieItem
            index={5}
            srcMovie="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          />
          <MovieItem
            index={6}
            srcMovie="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          />
          <MovieItem
            index={7}
            srcMovie="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          />
          <MovieItem
            index={8}
            srcMovie="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          />
          <MovieItem
            index={9}
            srcMovie="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          /> */}
          </div>
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            style={{
              display: slideNumber + 6 <= totalMovies ? 'block' : 'none',
            }}
            onClick={() => handleClick('right')}
          />
        </div>
      ) : (
        <Skeleton active className="pl-10 pr-40 mt-10" />
      )}
    </div>
  )
}
