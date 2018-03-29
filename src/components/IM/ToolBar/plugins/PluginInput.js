import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import Button from '../../../Button'

export default class PluginInput extends Component {
  constructor (props) {
    super(props)
    this.input = null
    this.handleEvent = this.handleEvent.bind(this)
    this.state = {
      text: '写点啥'
    }
  }
  handleEvent (e) {
    this.props.event(this.state.text)
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
        <TextInput
          style={{ backgroundColor: '#CCC', padding: 5, flex: 1 }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button onPress={this.handleEvent}>
          发送
        </Button>
      </View>
    )
  }
}
