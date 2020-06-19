
import { reqLogin } from "@api/acl/login";
import { reqMobileLogin } from "@api/acl/oauth";

import { LOGIN, LOGOUT } from "../constants/login";

//手机号密码登录
export const mobileLogin=(mobile,code)=>{
  return(dispatch)=>{
    return reqMobileLogin(mobile,code).then(({token})=>{
      dispatch(loginSync(token))
      return token
    })
  }
}
// 账户名密码登录
export const login = (username, password) => {
  return (dispatch) => {
    return reqLogin(username, password).then(({token}) => {
      dispatch(loginSync(token));
      return token;
    });
  };
};
export const loginSync=(token)=>({
  type:LOGIN,
  data:token
})
// 删除token
export const removeToken = () => ({
  // type: REMOVE_TOKEN
});

// 登出
export const logout = () => ({
  type:LOGOUT
})
