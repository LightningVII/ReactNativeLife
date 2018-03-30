import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import * as Plugins from './plugins'

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

ToolBar.defaultProps = {
  messages: []
}

ToolBar.propTypes = {
  messages: PropTypes.array
}

Plugins.get = (WrappedComponent, event) => {
  console.log(event)
  return class WrappingComponent extends React.Component {
    constructor (param) {
      super()
    }

    render () {
      return <WrappedComponent event={event} {...this.props} />
    }
  }
}
export {Plugins}
// export const Plugins;
