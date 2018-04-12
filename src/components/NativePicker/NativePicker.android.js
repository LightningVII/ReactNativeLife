import React from 'react'
import { ScrollView, View, StyleSheet, Text } from 'react-native'
import PickerMixin from './PickerMixin'
import SnapToIntervalMixin from './SnapToIntervalMixin'

const SnapToIntervalScrollView = SnapToIntervalMixin(ScrollView)

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },

  scrollView: {
    height: 0
  },

  selectedItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  },

  itemText: {
    fontSize: 20,
    color: '#aaa',
    textAlign: 'center'
  }
})

const Mask = ({ indicatorRef }) => (
  <View pointerEvents={'none'} ref={indicatorRef} style={styles.indicator} />
)

class Picker extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      itemHeight: null
    }
    this.itemHeight = null
    this.itemWidth = null
    this.scrollBuffer = null
    this.scrollerRef = null
    this.contentRef = null
    this.indicatorRef = null
    this.indicatorRef2 = null
    this.scrollTo = this.scrollTo.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.fireValueChange = this.fireValueChange.bind(this)
    this.onItemLayout = this.onItemLayout.bind(this)
  }

  onItemLayout (e) {
    const { height, width } = e.nativeEvent.layout
    if (this.itemHeight !== height || this.itemWidth !== width) {
      this.itemWidth = width
      const indicatorStyle = [
        styles.indicator,
        {
          height: height * 3,
          width: width
        }
      ]
      this.indicatorRef.setNativeProps({
        style: [...indicatorStyle, { top: 0 }]
      })
      this.indicatorRef2.setNativeProps({
        style: [...indicatorStyle, { bottom: 0 }]
      })
    }
    if (this.itemHeight !== height) {
      this.itemHeight = height
      this.setState({
        itemHeight: height
      })
      this.scrollerRef.setNativeProps({
        style: {
          height: height * 7
        }
      })
      this.contentRef.setNativeProps({
        style: {
          paddingTop: height * 3,
          paddingBottom: height * 3
        }
      })
      // i do no know why!...
      setTimeout(() => {
        this.props.select(this.props.selectedValue, this.itemHeight)
      }, 0)
    }
  }

  componentDidUpdate () {
    this.props.select(this.props.selectedValue, this.itemHeight)
  }

  scrollTo (y) {
    this.scrollerRef.scrollTo({
      y
    })
  }

  fireValueChange (selectedValue, index) {
    for (let i = 0; i < 10; i++) {
      this[`item${i}`].setNativeProps({
        style: {
          fontWeight: 'normal',
          color: '#aaa'
        }
      })
    }
    this[`item${index}`].setNativeProps({
      style: {
        fontWeight: 'bold',
        color: 'red'
      }
    })
  }

  onScroll (e) {
    // const { contentOffset } = e.nativeEvent
    // const { y } = contentOffset
    // this.props.doScrollingComplete(y, this.itemHeight, this.fireValueChange)
  }

  render () {
    const { children, itemStyle, selectedValue, style } = this.props
    const items = React.Children.map(children, (item, index) => {
      const totalStyle = [styles.itemText]
      if (selectedValue === item.props.value) {
        totalStyle.push(styles.selectedItemText)
      }
      totalStyle.push(itemStyle)
      return (
        <View
          style={{ justifyContent: 'center' }}
          onLayout={index === 0 ? this.onItemLayout : undefined}
          key={item.key}
        >
          <Text
            value={item.props.value}
            ref={el => (this[`item${index}`] = el)}
            style={totalStyle}
            numberOfLines={1}
          >
            {item.props.label}
          </Text>
        </View>
      )
    })
    return (
      <View style={style}>
        <SnapToIntervalScrollView
          style={styles.scrollView}
          scrollRef={el => (this.scrollerRef = el)}
          snapToInterval={this.state.itemHeight}
          onScroll={this.onScroll}
          cb={this.fireValueChange}
        >
          <View ref={el => (this.contentRef = el)}>
            {items}
          </View>
        </SnapToIntervalScrollView>
        <Mask indicatorRef={el => (this.indicatorRef = el)} />
        <Mask indicatorRef={el => (this.indicatorRef2 = el)} />
      </View>
    )
  }
}

export default PickerMixin(Picker)
