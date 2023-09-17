import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URl,
})

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token') || ''

    config.headers.Authorization = `Bearer ${token}` as string
    return config
  },

  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

const sendGet = (url: string, params?: any) => instance.get(url, { params })

const sendPost = (url: string, params: any) => instance.post(url, params)

const sendPut = (url: string, params: any) => instance.put(url, params)

const sendDelete = (url: string, params: any) => instance.delete(url, params)

export { sendGet, sendPost, sendDelete, sendPut, instance }
//
