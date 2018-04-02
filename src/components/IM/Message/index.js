import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import Dialog from './Dialog'
import PicDialog from './PicDialog'

// if (!isNaN(_)) return <Dialog key={index} message={_} />
//         else return <Dialog dir={'rtl'} key={index} message={_} />
export default class Message extends Component {
  render () {
    const { messages } = this.props
    const reportsInfo = messages.length ? (
      messages.map((_, index) => {
        if (_.type === 'pic') return <PicDialog key={index} message={_.data} />
        if (_.type === 'text') return <Dialog dir={_.dir ? 'rtl' : 'ltr'} key={index} message={_.data} />
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
