import React from 'react'
import { View } from 'react-native'
import MultiPickerMixin from './MultiPickerMixin'

const MultiPicker = props => {
  const { children, style } = props
  const selectedValue = props.getValue()
  const colElements = React.Children.map(children, (col, i) => {
    return React.cloneElement(col, {
      selectedValue: selectedValue[i],
      onValueChange: (...args) => props.onValueChange(i, ...args)
    })
  })
  return (
    <View style={style}>
      {colElements}
    </View>
  )
}

export default MultiPickerMixin(MultiPicker)
