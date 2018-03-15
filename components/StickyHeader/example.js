import React from 'react'
import Ceiling from './index'
import { Text } from 'react-native'
export default class CeilingExample extends React.Component {
  constructor () {
    super()
    this.state = {
      text: 'suctorial',
      color: '#CCC',
      arr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
    this.count = 18
    this.sucked = this.sucked.bind(this)
    this.separate = this.separate.bind(this)
    this.addCount = this.addCount.bind(this)
  }
  sucked () {
    this.setState({
      text: 'sucked',
      color: '#FC4'
    })
  }
  separate () {
    this.setState({
      text: 'separate',
      color: '#CCC'
    })
  }
  componentDidMount () {
    const arr = []
    for (let i = 0; i < this.count; i++) {
      arr.push(i)
    }
    this.setState({
      arr
    })
  }
  addCount () {
    const arr = []
    this.count += 10
    for (let i = 0; i < this.count; i++) {
      arr.push(i)
    }
    this.setState({
      arr
    })
  }
  render () {
    return (
      <Ceiling
        onSucked={this.sucked}
        onSeparate={this.separate}
        onAddItem={this.addCount}
      >
        <Text style={{ height: 150, backgroundColor: '#c3b' }}>
          Hello World
        </Text>
        <Text
          suctorial
          style={{
            width: '100%',
            height: 40,
            zIndex: 1,
            top: 0,
            backgroundColor: this.state.color
          }}
        >
          {this.state.text}
        </Text>
        {this.state.arr.map(_ => (
          <Text
            key={_}
            style={{
              width: '100%',
              height: 40,
              marginTop: 10,
              backgroundColor: '#FFF'
            }}
          >
            {_}
          </Text>
        ))}
      </Ceiling>
    )
  }
}
