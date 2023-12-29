import { useLocation } from 'react-router-dom'

const Watch = () => {
  const { state } = useLocation()

  return (
    // <div className="w-[100vw] h-[100vh] m-0 p-0 overflow-hidden">
    <div className="w-[100vw] h-[100vh] m-0 p-0">
      <iframe
        className="w-full h-full border-0"
        src={state}
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Watch
