import '@/plugins/axios'

export const formSubmit = (data, self) => {
  return axios
    .post(process.env.VUE_APP_SETVER + 'form02/submit', data)
    .then(function(res) {
      return res.data
    })
    .catch(function(error) {
      self.isBtnLoading = false
      console.log(error.message)
    })
}

export const login = (data) => {
  return axios
    .post(process.env.VUE_APP_SETVER + 'form01/login', data)
    .then(function(res) {
      return res.data
    })
    .catch(function(error) {
      console.log(error.message)
    })
}

export const register = (data) => {
  return axios
    .post(process.env.VUE_APP_SETVER + 'form01/register', data)
    .then(function(res) {
      return res.data
    })
    .catch(function(error) {
      console.log(error.message)
    })
}
