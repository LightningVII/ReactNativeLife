import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import rule from './rule'

export default class Message extends Component {
  render () {
    const { messages } = this.props
    const reportsInfo = messages.length
      ? messages.map((_, index) => {
        const Msg = rule(_.type)
        return <Msg dir={_.dir} key={index} message={_.data} />
      })
      : <Text>...</Text>

    return (
      <ScrollView
        ref={this.props.getScroll}
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          flex: 1
        }}
      >
        {reportsInfo}
        <View style={{ height: 100 }} />
        <View style={{ height: 100 }} />
      </ScrollView>
    )
  }
}
Message.defaultProps = {
  messages: []
}

Message.propTypes = {
  messages: PropTypes.array
}
