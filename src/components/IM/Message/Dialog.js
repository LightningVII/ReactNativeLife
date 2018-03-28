import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import styles, { reverse } from './styles'

const triangleIcon = (wordStyle, dir = 'ltr') => {
  return (
    <View>
      <View style={[styles.triangleIcon, wordStyle]} />
      {wordStyle &&
        wordStyle.borderWidth > 0 && (
          <View
            style={[
              styles.triangleIcon,
              styles.triangleCoverBorder,
              reverse[dir].triangleCoverBorder
            ]}
          />
        )}
    </View>
  )
}

export default class Dialog extends Component {
  render () {
    const { wordStyle, textStyle, message, avatar, dir } = this.props

    return (
      <View style={[reverse[dir].wordContainer]}>
        <View style={[reverse[dir].avatorGroup]}>
          <View style={[reverse[dir].avatarContainer]}>
            <Image style={styles.avatar} source={avatar} />
          </View>
          {triangleIcon(wordStyle, dir)}
        </View>

        <View style={[reverse[dir].talkAboutContainer, wordStyle]}>
          <Text style={[reverse[dir].wordStyle, textStyle]}>
            {message}
          </Text>
        </View>
      </View>
    )
  }
}

Dialog.defaultProps = {
  dir: 'ltr',
  wordStyle: {
    // backgroundColor: "#fee",
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
