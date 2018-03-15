import React from 'react'
import StickyHeader from './index'
import { StyleSheet, Text } from 'react-native'

export default class StickyHeaderExample extends React.Component {
  constructor () {
    super()
    this.state = {
      text: 'suctorial',
      color: '#ddd',
      listItems: []
    }
    this.count = 0
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
      color: '#ddd'
    })
  }
  componentDidMount () {
    this.addCount(0, 8)
  }
  addCount (increment, defaultVal) {
    this.count = defaultVal || this.count
    this.count += increment || 5
    const listItems = []
    for (let i = 0; i < this.count; i++) {
      listItems.push(i)
    }
    this.setState({
      listItems
    })
  }
  render () {
    return (
      <StickyHeader
        onSucked={this.sucked}
        onSeparate={this.separate}
        onAddItem={this.addCount}
        top={120}
      >
        <Text
          style={{ height: 150, marginBottom: 20, backgroundColor: '#c3b' }}
        >
          Hello World
        </Text>
        <Text
          suctorial
          style={[
            styles.suckedItem,
            {
              backgroundColor: this.state.color
            }
          ]}
        >
          {this.state.text}
        </Text>
        {this.state.listItems.map(_ => (
          <Text key={_} style={styles.listItem}>
            {_}
          </Text>
        ))}
      </StickyHeader>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: 40,
    marginTop: 10,
    backgroundColor: '#FFF'
  },
  suckedItem: {
    width: '100%',
    height: 40
  }
})
