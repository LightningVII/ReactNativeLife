import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class PlainMsg extends Component {
  render () {
    const { message } = this.props

    return (
      <View
        style={{
          backgroundColor: '#eee',
          borderRadius: 5,
          padding: 8,
          marginTop: 20,
          marginBottom: 20,
          alignSelf: 'center'
        }}
      >
        <Text style={{ backgroundColor: 'transparent', textAlign: 'center' }}>
          {message}
        </Text>
      </View>
    )
  }
}
