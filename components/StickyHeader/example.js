import React from 'react'
import StickyHeader from './index'
import { StyleSheet, Text, View } from 'react-native'

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
        onAddItems={this.addCount}
      >
        <View style={{ height: 150, backgroundColor: '#ec4' }} />
        <View
          suctorial
          style={[
            styles.suckedItem,
            {
              backgroundColor: this.state.color
            }
          ]}
        >
          <Text>{this.state.text}</Text>
        </View>
        {this.state.listItems.map(_ => (
          <View key={_} style={styles.listItem}>
            <Text>{_}</Text>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  suckedItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40
  }
})
