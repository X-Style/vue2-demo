import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {loginUser, peopleList, success} from './json'
let _peopleList = peopleList

export default {
  bootstrap() {
    let mock = new MockAdapter(axios)

    mock.onPost('/login').reply((config) => {
      let {name, password} = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (name === 'admin' && password === 'admin') {
            resolve([200, loginUser])
          } else {
            resolve([200, {success: false, message: '用户名或密码错误！'}])
          }
        }, 1000)
      })
    })

    mock.onGet('/getPeople').reply((config) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, _peopleList])
        }, 1000)
      })
    })

    mock.onGet('/addPeople').reply((config) => {
      let {name, date, address} = config.params
      _peopleList.content.push({
        name,
        date,
        address
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, success])
        }, 1000)
      })
    })

    mock.onGet('/editPeople').reply((config) => {
      let {index, row} = config.params
      _peopleList.content.splice(index, 1, row)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, success])
        }, 1000)
      })
    })

    mock.onGet('/deletePeople').reply((config) => {
      let {index} = config.params
      _peopleList.content.splice(index, 1)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, success])
        }, 1000)
      })
    })
  }
}
