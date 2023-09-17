import { useEffect } from 'react'

const lOGIN_TYPE = {
  LOGIN: 'login',
  SUCCESS: 'success',
  FAILED: 'failed',
}

const Login = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    if (
      window.parent.origin === import.meta.env.VITE_WEB_URL &&
      urlParams.get('loginType') === lOGIN_TYPE.LOGIN
    ) {
      location.replace(
        `${import.meta.env.VITE_BASE_API_URl}/api/v1/ms-teams/auth/signin`
      )
    }
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)

    if (
      urlParams.get('token') &&
      urlParams.get('loginType') === lOGIN_TYPE.SUCCESS
    ) {
      window.close()
      window.opener.postMessage(
        { token: urlParams.get('token'), message: true },
        import.meta.env.VITE_WEB_URL
      )
      return
    }

    if (
      !urlParams.get('token') &&
      urlParams.get('loginType') === lOGIN_TYPE.FAILED
    ) {
      window.close()
      window.opener.postMessage(
        { token: '', message: false },
        import.meta.env.VITE_WEB_URL
      )
    }
  }, [])

  return (
    <div className="w-full h-[100vh] flex justify-center">
      <img src="/loading-cute.gif" />
    </div>
  )
}
export default Login
