import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Dialog extends Component {
  render () {
    return (
      <View style={{ padding: 10 }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text>
            点我上课
          </Text>
          <Text>
            &gt;
          </Text>
        </View>
        <View style={{ height: 1, overflow: 'hidden' }}>
          <Text
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderStyle: 'dotted'
            }}
          />
        </View>
        <View>
          <Text>
            bulubulu
          </Text>
        </View>
      </View>
    )
  }
}
