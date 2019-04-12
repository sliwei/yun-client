import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const style = require('./popup.less'); // css 样式

class Html extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    const {children} = this.props;
    return <div>
      {/*<div className={style.mask}>&nbsp;</div>*/}
      <div className={style.container}>
        <div onClick={() => this.props.close()}>xxx</div>
        {children}
      </div>
    </div>
  }
}

export default class Modal extends Component {
  static defaultProps = {
    open: false
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let modal = <Html {...nextProps}/>;
    if (nextProps.open && !this.props.open) { // 从无到有
      this.node = document.createElement('div'); // 创建 DOM
      this.node.className = 'ReactModal'; // 给上 ClassName
      document.getElementsByTagName('body')[0].appendChild(this.node)
    }
    if (this.props.open && !nextProps.open) { // 从有到无
      ReactDOM.unmountComponentAtNode(this.node)
    } else {
      let allClass = document.getElementsByClassName('ReactModal');
      allClass.length && nextProps.open ?
        ReactDOM.render(modal, allClass[0]) : null
    }
  }

  render() {
    return null
  }
}
