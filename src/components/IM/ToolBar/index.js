import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Button from '../../Button'

export default class ToolBar extends Component {
  render () {
    return (
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          position: 'absolute',
          justifyContent: 'center',
          width: '100%',
          bottom: 0
        }}
      >
        <Button onPress={this.props.handleEvent} style={{ marginBottom: 60 }}>
          我是一个button
        </Button>
      </View>
    )
  }
}

ToolBar.defaultProps = {
  messages: []
}

ToolBar.propTypes = {
  messages: PropTypes.array
}
