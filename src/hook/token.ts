import jwt_decode from 'jwt-decode'

interface ITokenDecode {
  id: string
  name: string
  email: string
  password: string
  gender: number
  born: string
  phone: string
  address: string
  money: number
  list_movie_id: string
  service: number
  renewal_date: string
  bank_name: string
  bank_account: string
  role: number
  is_member: boolean
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
