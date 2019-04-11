import {Axios as fetch} from 'Public';

/**
 * lw 生成数字字母验证码
 * @param size
 * @param w
 * @param h
 */
const code = params => fetch('/yun1/verification/code', {params: params, type: 'GET'});

export {
  code,
}
