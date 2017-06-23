import axios from 'axios'

export const login = (params) => {
  return axios.post('/login', params).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}
