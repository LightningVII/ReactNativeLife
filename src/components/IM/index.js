import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import socket from './socket.io'
import Message from './Message'
import ToolBar from './ToolBar'

// Replace this URL with your own, if you want to run the backend locally!
const SocketEndpoint = 'http://2e6abe4e.ngrok.io'

class IM extends React.Component {
  constructor () {
    super()
    this.state = {
      isConnected: false,
      data: ['121212121212121212121212121212121212']
    }
    this.scroll = null
    this.handlePress = this.handlePress.bind(this)
    this.getScroll = this.getScroll.bind(this)
  }

  getScroll (ref) {
    this.scroll = ref
  }

  componentDidMount () {
    this.props.socket.on('ping', data => {
      data &&
        data.data &&
        this.setState(
          {
            data: [...this.state.data, data.data]
          },
          _ => this.scroll.scrollToEnd({ animated: true })
        )
    })
  }

  handlePress () {
    console.log(this.props)
    this.props.socket.emit('listen event', 'press button')
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>connected: {this.props.status}</Text>
        <Message getScroll={this.getScroll} messages={this.state.data} />
        <ToolBar handleEvent={this.handlePress} />
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

export default socket(IM, SocketEndpoint)
