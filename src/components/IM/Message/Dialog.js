import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Avator from './Avator'
import PropTypes from 'prop-types'
import { reverse } from './styles'
// import Card from './Card'

const triangleIcon = (wordStyle, dir = 'ltr') => {
  const distance = dir === 'ltr'
    ? { left: 1, position: 'absolute' }
    : { right: 1, position: 'absolute' }
  return (
    <View style={{ position: 'relative', zIndex: 1 }}>
      <View style={[reverse[dir].triangleCoverBorder, wordStyle]} />
      <View style={[reverse[dir].triangleCoverBorder, distance]} />
    </View>
  )
}

export default class Dialog extends Component {
  render () {
    const { wordStyle, textStyle, message, avatar, dir } = this.props
    return (
      <View style={[reverse[dir].wordContainer]}>
        <Avator dir={dir} src={avatar} />
        <TouchableOpacity activeOpacity={0.6}>
          <View style={reverse[dir].avatorGroup}>
            {triangleIcon(wordStyle, dir)}
            <View
              style={[reverse[dir].talkAboutContainer, wordStyle, { right: 5 }]}
            >
              <View style={{ padding: 10 }}>
                <Text style={[reverse[dir].wordStyle, textStyle]}>
                  {message}
                </Text>
              </View>
              {/* <Card /> */}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

Dialog.defaultProps = {
  dir: 'ltr',
  wordStyle: {
    borderColor: '#ccc',
    borderWidth: 1
  },
  textStyle: {
    backgroundColor: 'transparent'
  },
  message: 'asdas',
  avatar: require('../../../static/images/record.png')
}

Dialog.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wordStyle: PropTypes.object,
  textStyle: PropTypes.object,
  avatar: PropTypes.number
}
