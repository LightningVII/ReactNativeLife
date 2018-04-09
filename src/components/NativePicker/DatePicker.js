import React from 'react'
import MultiPicker from './MultiPicker'
import Picker from './index'
// import defaultLocale from './locale/en_US'
const defaultLocale = {
  year: '年',
  month: '月',
  day: '日',
  am: '上午',
  pm: '下午'
}

function getDaysInMonth (date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function cloneDate (date) {
  return new Date(+date)
}

function setMonth (date, month) {
  date.setDate(
    Math.min(
      date.getDate(),
      getDaysInMonth(new Date(date.getFullYear(), month))
    )
  )
  date.setMonth(month)
}

const DATE = 'date'
const MONTH = 'month'
const YEAR = 'year'
const ONE_DAY = 24 * 60 * 60 * 1000

class DatePicker extends React.Component {
  static defaultProps = {
    locale: defaultLocale,
    mode: DATE,
    disabled: false,
    onDateChange () {}
  }

  state = {
    date: this.props.date || this.props.defaultDate
  }

  defaultMinDate
  defaultMaxDate

  componentWillReceiveProps (nextProps) {
    if ('date' in nextProps) {
      this.setState({
        date: nextProps.date || nextProps.defaultDate
      })
    }
  }

  getNewDate = (values, index) => {
    const value = parseInt(values[index], 10)
    const props = this.props
    const { mode } = props
    let newValue = cloneDate(this.getDate())
    if (mode === DATE || mode === YEAR || mode === MONTH) {
      switch (index) {
        case 0:
          newValue.setFullYear(value)
          break
        case 1:
          setMonth(newValue, value)
          break
        case 2:
          newValue.setDate(value)
          break
        default:
          break
      }
    }
    return this.clipDate(newValue)
  }

  onValueChange = (values, index) => {
    const props = this.props
    const newValue = this.getNewDate(values, index)
    if (!('date' in props)) {
      this.setState({
        date: newValue
      })
    }
    if (props.onDateChange) {
      props.onDateChange(newValue)
    }
    if (props.onValueChange) {
      props.onValueChange(values, index)
    }
  }

  onScrollChange = (values, index) => {
    const props = this.props
    if (props.onScrollChange) {
      const newValue = this.getNewDate(values, index)
      props.onScrollChange(newValue, values, index)
    }
  }

  getDefaultMinDate () {
    if (!this.defaultMinDate) {
      this.defaultMinDate = this.getGregorianCalendar([2000, 1, 1, 0, 0, 0])
    }
    return this.defaultMinDate
  }

  getDefaultMaxDate () {
    if (!this.defaultMaxDate) {
      this.defaultMaxDate = this.getGregorianCalendar([2030, 1, 1, 23, 59, 59])
    }
    return this.defaultMaxDate
  }

  getDate () {
    return this.clipDate(this.state.date || this.getDefaultMinDate())
  }

  getMinYear () {
    return this.getMinDate().getFullYear()
  }

  getMaxYear () {
    return this.getMaxDate().getFullYear()
  }

  getMinMonth () {
    return this.getMinDate().getMonth()
  }

  getMaxMonth () {
    return this.getMaxDate().getMonth()
  }

  getMinDay () {
    return this.getMinDate().getDate()
  }

  getMaxDay () {
    return this.getMaxDate().getDate()
  }

  getMinDate () {
    return this.props.minDate || this.getDefaultMinDate()
  }

  getMaxDate () {
    return this.props.maxDate || this.getDefaultMaxDate()
  }

  getDateData () {
    const { locale, formatMonth, formatDay, mode } = this.props
    const date = this.getDate()
    const selYear = date.getFullYear()
    const selMonth = date.getMonth()
    const minDateYear = this.getMinYear()
    const maxDateYear = this.getMaxYear()
    const minDateMonth = this.getMinMonth()
    const maxDateMonth = this.getMaxMonth()
    const minDateDay = this.getMinDay()
    const maxDateDay = this.getMaxDay()
    const years = []
    for (let i = minDateYear; i <= maxDateYear; i++) {
      years.push({
        value: i + '',
        label: i + locale.year + ''
      })
    }
    const yearCol = { key: 'year', props: { children: years } }
    if (mode === YEAR) {
      return [yearCol]
    }

    const months = []
    let minMonth = 0
    let maxMonth = 11
    if (minDateYear === selYear) {
      minMonth = minDateMonth
    }
    if (maxDateYear === selYear) {
      maxMonth = maxDateMonth
    }
    for (let i = minMonth; i <= maxMonth; i++) {
      const label = formatMonth
        ? formatMonth(i, date)
        : i + 1 + locale.month + ''
      months.push({
        value: i + '',
        label
      })
    }
    const monthCol = { key: 'month', props: { children: months } }
    if (mode === MONTH) {
      return [yearCol, monthCol]
    }

    const days = []
    let minDay = 1
    let maxDay = getDaysInMonth(date)

    if (minDateYear === selYear && minDateMonth === selMonth) {
      minDay = minDateDay
    }
    if (maxDateYear === selYear && maxDateMonth === selMonth) {
      maxDay = maxDateDay
    }
    for (let i = minDay; i <= maxDay; i++) {
      const label = formatDay ? formatDay(i, date) : i + locale.day + ''
      days.push({
        value: i + '',
        label
      })
    }
    return [yearCol, monthCol, { key: 'day', props: { children: days } }]
  }

  getGregorianCalendar (arg) {
    return new Date(...arg)
  }

  clipDate (date) {
    const { mode } = this.props
    const minDate = this.getMinDate()
    const maxDate = this.getMaxDate()
    if (mode === DATE) {
      if (+date + ONE_DAY <= minDate) {
        return cloneDate(minDate)
      }
      if (date >= +maxDate + ONE_DAY) {
        return cloneDate(maxDate)
      }
    }
    return date
  }

  getValueCols () {
    const { mode } = this.props
    const date = this.getDate()
    let cols = []
    let value = []

    if (mode === YEAR) {
      return {
        cols: this.getDateData(),
        value: [date.getFullYear() + '']
      }
    }

    if (mode === MONTH) {
      return {
        cols: this.getDateData(),
        value: [date.getFullYear() + '', date.getMonth() + '']
      }
    }

    if (mode === DATE) {
      cols = this.getDateData()
      value = [
        date.getFullYear() + '',
        date.getMonth() + '',
        date.getDate() + ''
      ]
    }

    return {
      value,
      cols
    }
  }

  render () {
    const { value, cols } = this.getValueCols()
    const {
      disabled,
      rootNativeProps,
      className,
      style,
      itemStyle
    } = this.props
    const multiStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      ...style
    }
    return (
      <MultiPicker
        style={multiStyle}
        rootNativeProps={rootNativeProps}
        className={className}
        selectedValue={value}
        onValueChange={this.onValueChange}
        onScrollChange={this.onScrollChange}
      >
        {cols.map(p => (
          <Picker
            style={{ flex: 1 }}
            key={p.key}
            disabled={disabled}
            itemStyle={itemStyle}
          >
            {p.props.children.map(item => (
              <Picker.Item
                label={item.label}
                key={item.value}
                value={item.value}
              />
            ))}
          </Picker>
        ))}
      </MultiPicker>
    )
  }
}

export default DatePicker
