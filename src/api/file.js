import {Axios as fetch} from 'Public';

/**
 * 获取地址
 * @param params
 */
const url = params => fetch('/yun/file/url', {params: params, type: 'GET'});

/**
 * 删除
 * @param data
 */
const del = data => fetch('/yun/file/del', {data: data, type: 'POST'});

/**
 * 修改
 * @param data
 */
const edit = data => fetch('/yun/file/edit', {data: data, type: 'POST'});

/**
 * 添加
 * @param data
 */
const add = data => fetch('/yun/file/add', {data: data, type: 'POST'});

/**
 * 列表
 * @param params
 */
const list = params => fetch('/yun/file/list', {params: params, type: 'GET'});

/**
 * 获取用户信息
 * @returns {*}
 */
const upload = (data, config) => fetch('/yun/file/upload', {data: data, type: 'POST', config: config});

export {
  url,
  del,
  edit,
  add,
  list,
  upload,
}
