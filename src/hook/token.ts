import jwt_decode from 'jwt-decode'

interface ITokenDecode {
  id: string
  name: string
  email: string
  username: string
  gender: string
  phoneNumber: number
  address: string
  role: number
}

const verifyToken = () => {
  const token = localStorage.getItem('token')

  const result: {
    error: null | string
    decode: null | ITokenDecode
  } = {
    error: null,
    decode: null,
  }

  if (!token) {
    result.error = 'not authorized'
    return result
  }

  result.decode = jwt_decode(token as string) as ITokenDecode

  return result
}

const useToken = () => {
  return {
    verifyToken,
  }
}

export default useToken
