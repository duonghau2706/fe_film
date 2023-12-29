import ContainerBody from '@/layout/Container'
// import ContainerRegister from '@/layout/Container/Register'
import Home from '@/pages/Home'
import Account from '@/pages/account/Account'
import ChangePlan from '@/pages/account/ChangePlan'
import SetupRecharge from '@/pages/account/SetupRecharge'
import DashBoard from '@/pages/dashBoard/DashBoard'
import DetailMovie from '@/pages/detailMovie/DetailMovie'
import ManagaAdmin from '@/pages/manage/ManageAdmin'
import ManagaMovie from '@/pages/manage/ManageMovie'
import ManagaUser from '@/pages/manage/ManageUser'
import SeriesMovie from '@/pages/seriesMovie/SeriesMovie'
import Settings from '@/pages/settings/Settings'
import SingleMovie from '@/pages/singleMovie/SingleMovie'
import Movie from '@/pages/crud/Movie'
import UserListMovie from '@/pages/userListMovie/UserListMovie'
import Watch from '@/pages/watch/Watch'
import { URL } from '@/utils/constants'
import { Route, Routes } from 'react-router-dom'
import User from '@/pages/crud/User'
import Admin from '@/pages/crud/Admin'

const Root = () => {
  return (
    <Routes>
      <Route element={<ContainerBody />}>
        <Route path={URL.HOME} element={<Home />} />
        <Route path={URL.SERIES_MOVIE} element={<SeriesMovie />} />
        <Route path={URL.SINGLE_MOVIE} element={<SingleMovie />} />
        <Route path={`${URL.DETAIL_MOVIE}/:id`} element={<DetailMovie />} />
        <Route path={URL.USER_LIST_MOVIE} element={<UserListMovie />} />
        <Route path={`${URL.USER}/:type`} element={<User />} />
        <Route path={`${URL.USER}/:type/:id`} element={<User />} />
        <Route path={`${URL.MOVIE}/:type`} element={<Movie />} />
        <Route path={`${URL.MOVIE}/:type/:id`} element={<Movie />} />
        <Route path={`${URL.ADMIN}/:type`} element={<Admin />} />
        <Route path={`${URL.ADMIN}/:type/:id`} element={<Admin />} />
        <Route path={URL.ACCOUNT} element={<Account />} />
        <Route path={URL.DASH_BOARD} element={<DashBoard />} />
        <Route path={URL.MANAGE_MOVIE} element={<ManagaMovie />} />
        <Route
          path={`${URL.MANAGE_MOVIE}/:currentPage`}
          element={<ManagaMovie />}
        />
        <Route path={URL.MANAGE_USER} element={<ManagaUser />} />
        <Route path={URL.MANAGE_ADMIN} element={<ManagaAdmin />} />
      </Route>
      <Route path={URL.CHANGE_PLAN} element={<ChangePlan />} />
      <Route path={URL.SETUP_RECHARGE} element={<SetupRecharge />} />
      <Route path={`${URL.WATCH}/:id`} element={<Watch />} />
      <Route path={`${URL.WATCH}/:id/:episode`} element={<Watch />} />
      <Route path={URL.MANAGE} element={<Settings />} />

      {/* <Route element={<ContainerRegister />}> */}
      {/* <Route path={URL.REGISTER} element={<Register />} /> */}
      {/* </Route> */}
      {/* <Route path={URL.LOGIN} element={<Login />} /> */}

      {/* <Route path={URL.RESET_PASSWORD} element={<ResetPassword />} /> */}
    </Routes>
  )
}
export default Root
