/**
 * Created by awei on 2017/9/20.
 *
 * title: '标题' type:string,
 * size: ['宽', '高'] type:int,
 * titleSta: 是否显示标题 false 不显示 type:boolean,
 * maskSta: 是否显示遮罩层 false 不显示 type:boolean,
 * closeTime: 自动关闭时间 格式int 毫秒 type:int,
 * index: 层级权重 type: int (如果一个页面有多个弹窗，而且需要层级响应，可根据先后设置indx的权重，越大层级越高)
 */
import React, {Component} from 'react'
import css from './popup.less'

class Popup extends Component {
  constructor() {
    super();
    this.state = {
      status: true,
      open: false,
      data: {},
      children: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.sta) {
      this.setState({status: false}, () => {
        setTimeout(() => {
          this.setState({open: false}, () => {
            this.state.status = true;
          })
        }, 350)
      });
    } else {
      this.state.open = nextProps.sta;
      this.state.data = nextProps.data;
      this.state.children = nextProps.children;
    }
  }

  handRemove = (e) => {
    const {title, pop} = this.refs;
    const s = pop.style;
    let x, y, p = 'onmousemove', d = document;
    title.style.cursor = 'move';
    e = e || event;
    x = e.clientX - pop.offsetLeft;
    y = e.clientY - pop.offsetTop;
    d[p] = function (e) {
      e = e || event;

      let left = e.clientX - x;
      let top = e.clientY - y;

      if (left <= 0) {
        left = 0;
      } else if (left >= d.documentElement.clientWidth - pop.offsetWidth) {
        left = d.documentElement.clientWidth - pop.offsetWidth;
      }
      if (top <= 0) {
        top = 0;
      } else if (top >= d.documentElement.clientHeight - pop.offsetHeight) {
        top = d.documentElement.clientHeight - pop.offsetHeight;
      }

      s.left = left + 'px';
      s.top = top + 'px'
    };
    d.onmouseup = function () {
      d[p] = null
      title.style.cursor = 'default';
    }
  };

  close = () => {
    this.props.close();
  };

  render() {
    const {status, open, children, data} = this.state;
    let pop = {
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
      box_w: 460,
      box_h: 220,
      closeName: undefined,
      title: '提示',
      titleSta: true,
      maskSta: true,
      closeTime: 0,
      boxHeight: {},
      autoHeight: '',
      index: 0
    };
    if (data) {
      'size' in data ? (pop.box_w = parseInt(data.size[0]), pop.box_h = parseInt(data.size[1])) : null;
      'closeName' in data ? pop.closeName = data.closeName : null;
      'title' in data && data.title ? pop.title = data.title : null;
      'titleSta' in data ? pop.titleSta = data.titleSta : null;
      'maskSta' in data ? pop.maskSta = data.maskSta : null;
      'closeTime' in data ? pop.closeTime = data.closeTime : null;
      'index' in data ? pop.index = data.index : null;
    }
    // TODO：延时关闭有BUG
    // let t = parseInt(pop.closeTime);
    // if (t > 0 && open) {
    //     setTimeout(() => {
    //         open ? this.close() : null
    //     }, t)
    // }
    pop.w = pop.w / 2 - pop.box_w / 2;
    if (pop.box_h) {
      pop.h = pop.h / 2 - pop.box_h / 2;
      if (pop.titleSta) {
        pop.boxHeight = {height: `${pop.box_h - 40}px`}
      } else {
        pop.boxHeight = {height: '100%'}
      }
      pop.autoHeight = {height: `${pop.box_h}px`}
    } else {
      pop.h = pop.h / 2 - 200;
    }
    let maskSty = {
      zIndex: 1000 + pop.index
    };
    let popSty = {
      zIndex: 1001 + pop.index,
      width: `${pop.box_w}px`,
      top: `${pop.h}px`,
      left: `${pop.w}px`,
      ...pop.autoHeight
    };
    let txtSty = {
      width: '100%',
      ...pop.boxHeight
    };
    return (
      open ? <div>
        {pop.maskSta && status ?
          <div style={maskSty} className={css.mask} onClick={this.close}>&nbsp;</div> : null}
        <div ref="pop" style={popSty} className={status ? css.popup_in : css.popup_out}>
          {pop.titleSta ?
            <div ref="title" className={css.title}
                 onMouseDown={this.handRemove.bind(this)}>{pop.title}</div> : null}
          {pop.titleSta ?
            <div className={css.close_box} onClick={this.close}><span className={css.close}>&nbsp;</span>
            </div> : null}
          <div style={txtSty}>
            {children}
          </div>
        </div>
      </div> : null
    )
  }
}

export default Popup
