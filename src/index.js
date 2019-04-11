import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, HashRouter} from 'react-router-dom'
import './public/css/nprogress.css'
import {Icon, Modal} from 'antd'
import Bundle from './bundle';
import css from './index.scss'

import Index from './components/index'
import LoginController from 'bundle-loader?lazy&name=login!./components/login'
import RegisterController from 'bundle-loader?lazy&name=register!./components/register'
import FzfController from 'bundle-loader?lazy&name=fzf!./components/fzf'

const Login = (props) => <Bundle load={LoginController}>{(A) => <A {...props}/>}</Bundle>;
const Register = (props) => <Bundle load={RegisterController}>{(A) => <A {...props}/>}</Bundle>;
const Fzf = (props) => <Bundle load={FzfController}>{(A) => <A {...props}/>}</Bundle>;

let indexLoading = document.querySelector('.indexLoading');
indexLoading.style.opacity = 0;
setTimeout(() => {
  indexLoading.style.display = 'none';
}, 300);

ReactDOM.render(
  <HashRouter>
    <div>
      <div className={css.statement} onClick={() => {
        Modal.warning({
          title: '网站声明',
          content: (
            <div>
              <p>本网站是采用react框架模仿百度云盘的学习项目</p>
              <p>本网站不用于商业用途，仅供交流与学习</p>
              <a href="https://yun.baidu.com" target="_back">前往百度云官网</a>
            </div>
          ),
          onOk() {
          },
        });
      }}>
        <Icon type="exclamation-circle"/> 网站声明
      </div>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/404" component={Fzf}/>
        <Route path="/" component={Index}/>
      </Switch>
    </div>
  </HashRouter>, document.getElementById("app")
);
