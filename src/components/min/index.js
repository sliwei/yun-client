import React from 'react';
import axios from 'axios';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      a: 1
    }
  }

  get = () => {
    axios.get()

  }

  render() {
    let {list} = this.state;
    return <div>
      {this.props.match.params.name}
      {list.map(item => {
        return <li>
          {item.name}
        </li>
      })}
    </div>;
  }
}
