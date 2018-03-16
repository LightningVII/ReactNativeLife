import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'

export default class StickyHeader extends React.Component {
  constructor () {
    super()
    this.state = {
      top: 0
    }
    this.topRef = null
    this.topWithProps = null
    this.flag = true
    this.sole = false
    this.onScroll = this.onScroll.bind(this)
    this.setTopRef = this.setTopRef.bind(this)
    this.setTop = this.setTop.bind(this)
    this.layoutInfo = this.layoutInfo.bind(this)
  }
  setTop (type) {
    this.topRef.setNativeProps({
      style: {
        display: type
      }
    })
  }
  setTopRef (ref) {
    this.topRef = ref
  }
  layoutInfo (e) {
    this.setState({ top: e.nativeEvent.layout.y })
  }

  onScroll (e) {
    const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent
    let y = contentOffset.y
    if (
      layoutMeasurement.height + y >= contentSize.height - 0.5 &&
      this.sole !== true
    ) {
      this.sole = true
      this.props.onAddItems()
      this.sole = false
      setTimeout(() => (this.sole = false), 100)
    }

    if (y > (this.props.top || this.state.top)) {
      if (this.flag === true) {
        this.setTop('flex')
        this.props.onSucked()
        this.flag = false
      }
    } else {
      if (this.flag !== true) {
        this.setTop('none')
        this.props.onSeparate()
        this.flag = true
      }
    }
  }
  render () {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      if (child.props.suctorial) {
        this.topWithProps = React.cloneElement(child, {
          style: [child.props.style, styles.suckedStyle],
          ref: this.setTopRef,
          suctorial: void 0
        })

        return this.props.top || this.props.top === 0
          ? child
          : React.cloneElement(child, {
            onLayout: this.layoutInfo
          })
      }
      return child
    })

    return (
      <View style={styles.container}>
        {this.topWithProps}
        <ScrollView
          bounces={false}
          scrollEventThrottle={20}
          onScroll={this.onScroll}
          setTop={this.setTop}
        >
          {childrenWithProps}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    flexDirection: 'column'
  },
  suckedStyle: {
    display: 'none',
    zIndex: 1,
    top: 0,
    position: 'absolute'
  }
})
