import React, { Component } from 'react'
import { ScrollView, Alert } from 'react-native'

export default class Scroll extends Component {
  constructor () {
    super()
    this.flag = false
    this.sole = false
    this.onScroll = this.onScroll.bind(this)
  }

  onScroll (e) {
    const ne = e.nativeEvent
    let y = ne.contentOffset.y
    if (
      ne.layoutMeasurement.height + y >= ne.contentSize.height &&
      this.sole !== true
    ) {
      this.sole = true
      Alert.alert('Alert Title', null, [
        {
          text: 'Foo',
          onPress: () => {
            this.props.addItems()
            this.sole = false
          }
        }
      ])
    }

    if (y > 150) {
      if (this.flag === true) {
        this.props.setTop('flex')
        this.props.sucked()
        this.flag = false
      }
    } else {
      if (this.flag !== true) {
        this.props.setTop('none')
        this.props.separate()
        this.flag = true
      }
    }
  }

  render () {
    return (
      <ScrollView
        scrollEventThrottle={20}
        style={{ flex: 1 }}
        onScroll={this.onScroll}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}
