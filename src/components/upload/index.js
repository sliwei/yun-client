import React from 'react';
import css from './index.scss'
import {upload} from 'Api/file';

import {Progress, Icon, message, Alert} from 'antd'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      themeSta: true,
      showUp: false,
      upModelSta: false,
      fileList: [],
      thenFile: {},
      first: 0,
      moreFile: [],
    }
  }

  componentDidMount() {
    this.state.showUp = this.props.showUp;
    // 禁止浏览器内拖拽
    document.ondragstart = function () {
      return false;
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.showUp, this.props.showUp, this.state.showUp);
    if (nextProps.showUp !== this.props.showUp || this.props.showUp !== this.state.showUp) {
      this.setState({showUp: nextProps.showUp})
    }
    if (nextProps.file.length) {
      let fileList = this.state.fileList;
      let i = 1;
      nextProps.file.map(item => {
        item.index = fileList.length + i;
        i++;
      });
      this.setState({upModelSta: true, fileList: [...this.state.fileList, ...nextProps.file]}, () => {
        this.upFile(nextProps.file, 0);
      })
    }
  }

  // 拖拽进入退出
  upSta = (sta, e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(sta);
    this.props.upSta(sta)
    // this.setState({showUp: sta})
  };

  // 拖拽释放
  upDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let file = e.dataTransfer.files;
    this.setState({showUp: false});
    if (file) {
      let dat = [];
      for (let i = 0; i < file.length; i++) {
        dat.push({
          name: file[i].name,
          size: file[i].size,
          loading: 0,
          status: 'active',
          timeStamp: 0,
          data: file[i],
          index: this.state.fileList.length + 1 + i
        })
      }
      this.setState({fileList: [...this.state.fileList, ...dat], upModelSta: true}, () => {
        this.upFile(dat, 0);
      })
    }
  };

  // 上传
  upFile = (dat, n) => {
    this.state.first = n;
    let file = dat;
    if (dat.length) {
      this.state.moreFile = dat;
      file = dat[this.state.first]
    }
    if (file) {
      file.status = 'active';
      this.state.upIng = true;
      this.state.thenFile = file;
      let form = new FormData();
      form.append('file', file.data);

      upload(form, {
        onUploadProgress: this.progressFunction, // 进度
        onDownloadProgress: this.uploadComplete, // 完成
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          // message.success(`${file.name}上传成功!`)
        } else {
          message.error(res.message)
        }
      }).catch(this.uploadFailed);
    }
  };

  // 上传进度
  progressFunction = (evt) => {
    console.log(evt);
    let loading = Math.round(evt.loaded / evt.total * 100);
    let timeStamp = (evt.timeStamp).toFixed(2) + 'KB/s';
    let {thenFile, fileList} = this.state;
    fileList.map(item => {
      if (item.index === thenFile.index) {
        // if (timeStamp > (evt.total / 1024).toFixed(2)) {
        //     timeStamp = (evt.total / 1024).toFixed(2)
        // }
        item.loading = loading;
        item.timeStamp = timeStamp;
      }
    });
    this.setState({fileList: fileList})
  };

  // 上传成功
  uploadComplete = (evt) => {
    this.props.getCatalog('--Refresh')
    this.props.upSta(false);
    // console.log(evt);
    // 服务断接收完文件返回的结果
    // alert(evt.target.responseText);
    let {thenFile, fileList} = this.state;
    // console.log("上传成功！", thenFile);
    fileList.map(item => {
      if (item.index === thenFile.index) {
        item.status = 'success';
      }
    });
    this.setState({fileList: fileList, upIng: false}, () => {
      if (this.state.moreFile.length > 0 && this.state.first < this.state.moreFile.length) {
        this.state.first++;
        this.upFile(this.state.moreFile, this.state.first)
      }
    })
  };

  // 上传失败
  uploadFailed = (evt) => {
    console.log(evt);
    let {thenFile, fileList} = this.state;
    fileList.map(item => {
      if (item.index === thenFile.index) {
        item.status = 'exception';
      }
    });
    this.setState({fileList: fileList, upIng: false})
  };

  render() {
    const {showUp, upModelSta, fileList, upIng} = this.state;
    return <div>
      {showUp ?
        <div id="dropbox" className={css.up_box} onDrop={this.upDrop}
             onDragLeave={this.upSta.bind(this, false)}>
          <div className={css.up_box_sty}>
            <div>释放上传文件</div>
          </div>
          <input id="inputarea" className={css.up_file} type="file" name="file" multiple="multiple"/>
        </div> : null
      }
      <div className={css.file_model} style={{right: upModelSta ? '0px' : '-601px'}}>
        <div className={css.colse} onClick={() => {
          this.setState({upModelSta: !this.state.upModelSta})
        }}>
          <i className={css.colse_t}/>
          <Icon className={css.colse_i} style={{transform: upModelSta ? 'rotate(180deg)' : 'rotate(0deg)'}} type="up"/>
        </div>
        <div className={css.up_file_model}>
          <Alert className={css.alert} message="暂时支持2M及以下大小文件上传,支持批量上传" type="warning" showIcon/>
          <table>
            <thead>
            <tr>
              <th>序号</th>
              <th>文件名</th>
              <th>大小</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            {fileList.map((item, i) => {
              return <tr key={i}>
                <td>{i + 1}</td>
                <td><span title={item.name}>{item.name.substring(0, 10)}</span></td>
                <td>{(item.size / 1024).toFixed(2)}KB</td>
                <td><Progress percent={item.loading} status={item.status}/>{item.timeStamp}</td>
                <td>
                  {item.status === 'active' ? (upIng ?
                    <span><Icon type="loading"/>&nbsp;上传中...</span> :
                    <button className={css.info_btn} onClick={this.upFile.bind(this, item, this.state.first)}>
                      上传</button>) :
                    item.status === 'exception' ?
                      <button className={css.warn_btn}
                              onClick={this.upFile.bind(this, item, this.state.first)}>重试</button> :
                      <span className={css.success_hover}>上传成功！</span>}
                </td>
              </tr>
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  }
}
