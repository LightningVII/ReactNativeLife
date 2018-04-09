import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { DatePicker as Picker } from '../../../NativePicker'
const minDate = new Date(1900, 0)
const maxDate = new Date()
let now = new Date()

const format = date => {
  let mday = date.getDate()
  let month = date.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  mday = mday < 10 ? `0${mday}` : mday
  return `${date.getFullYear()}-${month}-${mday} ${date.getHours()}:${date.getMinutes()}`
}

export default class DatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date(1980, 1, 31)
    }
  }

  onDateChange = date => {
    console.log('onChange', format(date))
    this.setState({
      date
    })
  }

  onValueChange = (values, index) => {
    console.log('onValueChange', values, index)
  }

  onScrollChange = (values, index) => {
    console.log('onScrollChange', values, index)
  }

  changeMode = e => {
    this.setState({
      mode: e.target.value
    })
  }

  render () {
    const { date } = this.state

    return (
      <View
        style={{
          // marginBottom: 160,
          backgroundColor: '#eee',
          // flexDirection: 'row',
          justifyContent: 'space-around'
        }}
      >
        <View>
          <Text>{(date && format(date)) || format(now)}</Text>
        </View>
        <Picker
          style={{ width: '100%' }}
          defaultDate={date || now}
          maxDate={maxDate}
          minDate={minDate}
          onDateChange={this.onDateChange}
          onValueChange={this.onValueChange}
          onScrollChange={this.onScrollChange}
        />
      </View>
    )
  }
}
