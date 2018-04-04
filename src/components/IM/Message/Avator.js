import React, { PureComponent } from 'react'
import { View, Image } from 'react-native'
import styles, { reverse } from './styles'

export default class Avator extends PureComponent {
  render () {
    const { src, dir } = this.props
    return (
      <View style={[reverse[dir].avatarContainer]}>
        <Image style={styles.avatar} source={src} />
      </View>
    )
  }
}

Avator.defaultProps = {
  dir: 'ltr',
  src: require('../../../static/images/record.png')
}
