import {Axios as fetch} from 'Public';

/**
 * 获取地址
 * @param params
 */
const url = params => fetch('/yun1/file/url', {params: params, type: 'GET'});

/**
 * 删除
 * @param data
 */
const del = data => fetch('/yun1/file/del', {data: data, type: 'POST'});

/**
 * 修改
 * @param data
 */
const edit = data => fetch('/yun1/file/edit', {data: data, type: 'POST'});

/**
 * 添加
 * @param data
 */
const add = data => fetch('/yun1/file/add', {data: data, type: 'POST'});

/**
 * 列表
 * @param params
 */
const list = params => fetch('/yun1/file/list', {params: params, type: 'GET'});

/**
 * 获取用户信息
 * @returns {*}
 */
const upload = (data, config) => fetch('/yun1/file/upload', {data: data, type: 'POST', config: config});

export {
  url,
  del,
  edit,
  add,
  list,
  upload,
}
