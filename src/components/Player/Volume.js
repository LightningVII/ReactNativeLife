import React from 'react'
import ProgressBar from './ProgressBar'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
export const Volume = ({ volume, style = {} }) => {
  let volumeIcon = ''
  volumeIcon = volume > 50 ? 'ios-volume-up' : 'ios-volume-down'
  volumeIcon = volume === 0 ? 'ios-volume-off' : volumeIcon
  return (
    <View
      style={[
        {
          width: 40,
          alignItems: 'center'
        },
        style
      ]}
    >
      <ProgressBar
        style={{
          overflow: 'hidden',
          borderRadius: 5
        }}
        duration={volume / 100}
        height={100}
        width={10}
        horizontal={false}
      />
      <Icon
        name={volumeIcon}
        size={24}
        style={{
          color: '#DDD',
          textAlign: 'center',
          backgroundColor: 'transparent'
        }}
      />
    </View>
  )
}

export default Volume
