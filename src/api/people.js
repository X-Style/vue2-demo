import axios from 'axios'

export const peopleList = (params) => {
  return axios.get('/getPeople', { params: params }).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}

export const addPeople = (params) => {
  return axios.get('/addPeople', { params: params }).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}

export const editPeople = (params) => {
  return axios.get('/editPeople', { params: params }).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}

export const deletePeople = (params) => {
  return axios.get('/deletePeople', { params: params }).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
}
