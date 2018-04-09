// import React from 'react'
import { Platform } from 'react-native'
import PickerIOS from './NativePicker.ios'
import PickerAndroid from './NativePicker.android'
const Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid
export default Picker
export { default as DatePicker } from './DatePicker'
export { default as MultiPicker } from './MultiPicker'
