import React from 'react';
import {Popup, Modal} from 'Public'
import css from './pop.scss'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sta: false,
      sta1: false,
      open: false,
      time: new Date()
    }
  }

  componentDidMount() {
    // setInterval(()=>{
    //     this.setState({time: new Date()})
    // }, 1000)
  }

  open = (name, sta) => {
    this.setState({[name]: sta})
  };

  closeAll = () => {
    this.setState({sta: false, sta1: false})
  }

  render() {
    const {sta, sta1, open, time} = this.state;
    return <div>
      <button className={css.info_btn} onClick={() => this.open('sta', true)}>open</button>
      <button className={css.info_btn} onClick={() => this.open('sta', false)}>close</button>
      <button className={css.info_btn} onClick={() => this.open('open', true)}>open</button>
      <button className={css.info_btn} onClick={() => this.open('open', false)}>open</button>

      <Popup close={() => this.open('sta', false)} sta={sta} data={{title: '1', size: [480]}}>
        <h1>1</h1>
        <button className={css.info_btn} onClick={() => this.open('sta1', true)}>open2</button>
      </Popup>
      <Popup close={() => this.open('sta1', false)} sta={sta1}
             data={{titleSta: false, closeTime: 2000, maskSta: false, title: '3', size: [240]}}>
        <div>
          <h1>正确 </h1>
        </div>
        <button className={css.info_btn} onClick={this.closeAll}>open2</button>
      </Popup>


      {/*<Modal open={open} close={()=>{this.setState({open: false})}}>*/}
      {/*{time.toLocaleString()}*/}
      {/*<h1>asaaaaaaaaaaa</h1>*/}
      {/*</Modal>*/}

    </div>
  }
}
