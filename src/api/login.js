import {Axios as fetch} from 'Public';

/**
 * lw 验证信息
 * @param Authorization token
 */
const info = params => fetch('/yun1/login/info', {params: params, type: 'GET'});
/**
 * lw 登录
 * @param user 账号
 * @param password 密码
 * @param code 验证码
 */
const login = data => fetch('/yun1/login/login', {data: data, type: 'POST'});
/**
 * lw 注册
 * @param name 昵称
 * @param user 账号
 * @param rpassword 密码
 * @param code 验证码
 */
const register = data => fetch('/yun1/login/register', {data: data, type: 'POST'});

export {
  info,
  login,
  register,
}
