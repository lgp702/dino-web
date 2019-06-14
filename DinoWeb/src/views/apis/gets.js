import '@/plugins/axios'

export const formLoadData = (username) => {
  return axios
    .get(process.env.VUE_APP_SETVER + 'form03?username=' + username)
    .then(function(res) {
      return res.data
    })
    .catch(function(error) {
      console.log(error.message)
    })
}

export const testApi = () => {
  return axios
    .get('http://dinoapp.upygfeu9m2.ap-northeast-1.elasticbeanstalk.com/form03?name=Yi')
    // .get('http://9.112.39.67:3000/form01')
    .then(function(res) {
      return res.data
    })
    .catch(function(error) {
      console.log(error.message)
    })
}
