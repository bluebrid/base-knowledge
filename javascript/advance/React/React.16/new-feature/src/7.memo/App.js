/* eslint-disable import/no-anonymous-default-export */
/**
 * https://www.jianshu.com/p/b3d07860b778
 * https://www.cnblogs.com/ldld/p/11107305.html
 */
import React from 'react';
import Child from './Child'
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     date: new Date()
    //   })
    // }, 1000)
  }

  render() {
    return (
      <div className="section" data-title="7 memo组件">
        <Child seconds={1} />
        <div>{this.state.date.toString()}</div>
      </div>
    )
  }
}