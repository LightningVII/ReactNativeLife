import React from 'react'
import { View } from 'react-native'
import styles, { screenWidth } from './styles'
export default class ProgressBar extends React.Component {
  render () {
    const {
      duration,
      horizontal = true,
      height = 5,
      width = screenWidth,
      style = {}
    } = this.props

    const type = horizontal ? 'width' : 'height'
    return (
      <View
        style={[
          styles.progressBox,
          {
            height
          },
          style
        ]}
      >
        <View
          style={[
            {
              width: horizontal ? 0 : width,
              height,
              backgroundColor: '#EEE'
            },
            { [type]: (horizontal ? width : height) * duration }
          ]}
        />
      </View>
    )
  }
}
