import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Button from '../Button'
// import PropTypes from 'prop-types'

import styles from './styles'

export default class WeekOption extends Component {
  constructor (props) {
    super(props)
    this.state = {week: ''}
    this.setDay = this.setDay.bind(this)
    this.endDay = this.endDay.bind(this)
    this.startDay = this.startDay.bind(this)
    this.setWeek = this.setWeek.bind(this)
    this.onPrevBtn = this.onPrevBtn.bind(this)
    this.onNextBtn = this.onNextBtn.bind(this)
  }

  setDay (date, day) {
    date.setDate(date.getDate() - date.getDay() + day)
    return this.formatDate(date)
  }

  startDay () {
    return this.setDay(this.date, 0)
  }

  endDay () {
    return this.setDay(this.date, 6)
  }

  formatDate (date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const patch = num => (num > 9 ? '' : '0') + num
    return patch(month) + '.' + patch(day)
  }

  setWeek (date) {
    this.date = new Date(date)
    const endDay = this.endDay()
    const startDay = this.startDay()

    this.setState({
      week: startDay + '-' + endDay
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log(nextProps)
    return true
  }

  componentWillMount () {}

  componentDidMount () {
    this.setWeek(new Date())
    // setInterval(() => {
    //   this.date = this.date.setDate(this.date.getDate() - this.date.getDay() + 7)
    //   this.setWeek(this.date)
    // }, 5000)
  }

  onPrevBtn () {
    console.log('==onPrevBtn===')
    this.props.onPrevBtn(this.date, this.setWeek)
  }

  onNextBtn () {
    console.log('==onNextBtn===')
    this.props.onNextBtn(this.date, this.setWeek)
  }

  render () {
    return (
      <View style={styles.container}>
        <Button style={[styles.flexGrow(1)]} onPress={this.onPrevBtn}>
          上一周
        </Button>
        <Text style={[styles.flexGrow(2), styles.title]}>
          {this.state.week}
        </Text>
        <Button style={[styles.flexGrow(1), styles.btn]} onPress={this.onNextBtn}>
          下一周
        </Button>
      </View>
    )
  }
}

WeekOption.propTypes = {

}
