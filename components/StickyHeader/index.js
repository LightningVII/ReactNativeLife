import React from 'react'
import Scroll from './Scroll'
import { StyleSheet, View } from 'react-native'

export default class StickyHeader extends React.Component {
  constructor () {
    super()
    this.state = {
      top: 0
    }
    this.topRef = null
    this.topWithProps = null
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
  render () {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      if (child.props.suctorial) {
        this.topWithProps = React.cloneElement(child, {
          style: [child.props.style, styles.suckedStyle],
          ref: this.setTopRef,
          suctorial: void 0
        })

        return React.cloneElement(child, {
          onLayout: this.layoutInfo
        })
      }
      return child
    })

    return (
      <View style={styles.container}>
        {this.topWithProps}
        <Scroll
          top={this.state.top}
          setTop={this.setTop}
          sucked={this.props.onSucked}
          separate={this.props.onSeparate}
          addItems={this.props.onAddItem}
        >
          {childrenWithProps}
        </Scroll>
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
