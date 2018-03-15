import React, { Component } from 'react'
import { ScrollView } from 'react-native'

export default class Scroll extends Component {
  constructor () {
    super()
    this.top = 0
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
      this.props.addItems()
      setTimeout(() => (this.sole = false), 100)
    }
    if (y > this.top) {
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

  componentDidUpdate (prevProps, prevState) {
    this.top = this.top || this.props.top
  }

  render () {
    return (
      <ScrollView
        bounces={false}
        scrollEventThrottle={20}
        onScroll={this.onScroll}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}
