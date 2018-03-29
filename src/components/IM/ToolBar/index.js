import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

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
        {this.props.children}
      </View>
    )
  }
}

export * from './plugins'

ToolBar.defaultProps = {
  messages: []
}

ToolBar.propTypes = {
  messages: PropTypes.array
}
