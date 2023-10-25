import ContainerBody from '@/layout/Container'
// import ContainerRegister from '@/layout/Container/Register'
import { Login, ResetPassword } from '@/pages'
import Home from '@/pages/Home'
import Register from '@/pages/common/Register'
import { URL } from '@/utils/constants'
import { Route, Routes } from 'react-router-dom'

const Root = () => {
  return (
    <Routes>
      <Route element={<ContainerBody />}>
        <Route path={URL.HOME} element={<Home />} />
      </Route>
      {/* <Route element={<ContainerRegister />}> */}
      <Route path={URL.REGISTER} element={<Register />} />
      {/* </Route> */}
      <Route path={URL.LOGIN} element={<Login />} />

      <Route path={URL.RESET_PASSWORD} element={<ResetPassword />} />
    </Routes>
  )
}
export default Root
