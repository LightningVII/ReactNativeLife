import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import Dialog from './Dialog'

export default class Message extends Component {
  render () {
    const { messages } = this.props
    const reportsInfo = messages.length ? (
      messages.map((_, index) => {
        if (!isNaN(_)) return <Dialog key={index} message={_} />
        else return <Dialog dir={'rtl'} key={index} message={_} />
      })
    ) : (
      <Text>...</Text>
    )
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
