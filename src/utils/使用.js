import { RESTFUL,API } from "./index";

function login() {
  const loginForm = {
    username: 'admin',
    password: '123'
  }
  RESTFUL.post(API.login, {data: loginForm}).then(res => {
    
  })
}