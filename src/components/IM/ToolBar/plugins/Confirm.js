import React, { Component } from 'react'
import { View } from 'react-native'
import Button from '../../../Button'

export default class Confirm extends Component {
  constructor (props) {
    super(props)
    this.handleYEvent = this.handleYEvent.bind(this)
    this.handleNEvent = this.handleNEvent.bind(this)
  }
  handleYEvent (e) {
    this.props.event('Y')
  }
  handleNEvent (e) {
    this.props.event('N')
  }
  render () {
    return (
      <View
        style={{
          marginBottom: 60,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}
      >
        <Button onPress={this.handleYEvent}>
          是
        </Button>
        <Button onPress={this.handleNEvent}>
          否
        </Button>
      </View>
    )
  }
}
