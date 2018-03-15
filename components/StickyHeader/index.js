import React from 'react'
// import AppContainer from './containers/app'
// import Player from './components/Player'
import Scroll from './Scroll'
import { StyleSheet, View } from 'react-native'
export default class App extends React.Component {
  constructor () {
    super()
    this.topRef = null
    this.setTopRef = this.setTopRef.bind(this)
    this.setTop = this.setTop.bind(this)
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
  render () {
    const childrenWithProps = React.Children.map(
      this.props.children,
      child =>
        (child.props.suctorial
          ? React.cloneElement(child, {
            style: {
              ...child.props.style,
              ...{
                display: 'none',
                zIndex: 1,
                top: 0,
                position: 'absolute'
              }
            },
            ref: this.setTopRef
          })
          : null)
    )

    return (
      <View style={styles.container}>
        {childrenWithProps}
        <Scroll
          setTop={this.setTop}
          sucked={this.props.onSucked}
          separate={this.props.onSeparate}
          addItems={this.props.onAddItem}
        >
          {this.props.children}
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
  }
})
