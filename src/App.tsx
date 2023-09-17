import './App.css'

import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Root from '@/router'
import Authentication from '@/layout/Authentication/Authentication'
import { ForgotPassword, Login, LoginMsTeams } from '@/pages'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import { URL } from './utils/constants'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import dayjs from 'dayjs'

dayjs.extend(weekday)
dayjs.extend(localeData)
/**
 *Tắt gọi Api khi focus
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
})

function App() {
  return (
    <div>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path={URL.LOGIN} element={<Login />} />
              <Route path={URL.FORGOT_PASSWORD} element={<ForgotPassword />} />
              <Route path={URL.lOGIN_MS_TEAMS} element={<LoginMsTeams />} />
              <Route element={<Authentication />}>
                <Route path="/*" element={<Root />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
