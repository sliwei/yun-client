import React from 'react';
import css from './main.scss'
import {Route, Link} from 'react-router-dom'
import {message, Modal} from 'antd'

import Bundle from '../../bundle';
import MinController from 'bundle-loader?lazy&name=min!../min'

const Min = (props) => <Bundle load={MinController}>{(A) => <A {...props}/>}</Bundle>;

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: undefined
    }
  }

  look = () => {

  }

  delToken = () => {
    window.localStorage.removeItem('token');
    message.success('localStorage已删除！')
  }

  open = () => {
    // window.close()
    window.open('#/about')
  };

  render() {
    const {token} = this.state;
    const name = '12';
    return <div>
      <p onClick={this.open}>this mains</p>
      {/*<a href="#/about" target="_blank">baidu</a>*/}
      <div>
        <button onClick={this.look}>模拟请求，无token跳转到主页，有则返回token用户信息11</button>
      </div>
      <div>
        <button onClick={this.delToken}>删除localStorage的token</button>
      </div>
      <div>
        {JSON.stringify(token)}
      </div>
      <p><Link to={`/main/min/${name}`}>Main 下面的 Min 子页面</Link></p>
      <div className={css.img}>
        ON IMG
      </div>
      {/*<Min/>*/}
      <Modal visible={1}></Modal>
      <Route path="/main/min/:name" component={Min}/>
    </div>;
  }
}
