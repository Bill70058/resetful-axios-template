const Api = {
  login: '/vue-admin-template/user/login',
  getInfo: '/vue-admin-template/user/info',
  logout: '/vue-admin-template/user/logout'
}

// 根据不同环境切换api地址
const env = process.env.NODE_ENV === 'development' ? '' : ''
for(let i in Api) {
  Api[i] = env + Api[i]
}

export default Api