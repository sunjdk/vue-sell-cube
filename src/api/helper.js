import axios from 'axios'

// const ERR_OK = 0
export function get (url) {
  return function (params) {
    return axios.get(url, {
      params
    }).then((res) => {
      return res
    }).catch((err) => {
      alert(err)
    })
  }
}
