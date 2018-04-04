import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Message from './Message'
import ToolBar, { Plugins } from './ToolBar'
// Replace this URL with your own, if you want to run the backend locally!
class IM extends React.Component {
  constructor () {
    super()
    this.scroll = null
    this.getScroll = this.getScroll.bind(this)
    this.directive = this.directive.bind(this)
  }

  getScroll (ref) {
    this.scroll = ref
  }

  directive (component) {
    return Plugins.get(Plugins[component], this.props.handlePress)
  }

  componentDidUpdate () {
    this.scroll.scrollToEnd({ animated: true })
  }

  render () {
    const Plugins = this.directive(this.props.component)
    return (
      <View style={styles.container}>
        <Text>connected: {this.props.status} || socketUrl: {this.props.socketUrl}</Text>
        <Message getScroll={this.getScroll} messages={this.props.message} />
        <ToolBar>
          <Plugins />
        </ToolBar>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
})

export default IM
