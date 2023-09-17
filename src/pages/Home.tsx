import Cases from './dashBoard/Cases/Cases'
import Responses from './dashBoard/Responses/Responses'

import '@/index.css'
import BoxCase from './dashBoard/boxCase/box'
import ChartMid from '../components/charts/Chart'
import GroupPerform from '../components/charts/GroupPerform'
const Home = () => {
  return (
    <div className="px-6 pt-2 pb-4 overflow-auto h-full w-full">
      <BoxCase />
      <ChartMid />
      <GroupPerform />
      <Cases />
      <Responses />
    </div>
  )
}

export default Home
