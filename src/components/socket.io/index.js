import React from 'react'
import SocketIOClient from 'socket.io-client'

const socket = (WrappedComponent, SocketEndpoint) => {
  return class WrappingComponent extends React.PureComponent {
    constructor (param) {
      super()
      this.state = {
        status: 'disconnect',
        uri: SocketEndpoint
      }
      this.socket = SocketIOClient(SocketEndpoint, {
        transports: ['websocket']
      })
      this.socket.setUri = this.setUri.bind(this)
    }

    setUri (uri) {
      this.socket.close()
      this.socket.io.uri = uri
      this.socket.open()
    }

    componentDidMount () {
      this.socket.on('connect', () => {
        this.setState({
          status: 'connected',
          uri: this.socket.io.uri
        })
        console.log('you have been connected')
      })

      this.socket.on('disconnect', () => {
        this.setState({
          status: 'disconnect'
        })
        console.log('you have been disconnected')
      })

      this.socket.on('reconnect', () => {
        this.setState({
          status: 'reconnect'
        })
        console.log('you have been reconnected')
      })

      this.socket.on('reconnect_error', () => {
        this.setState({
          status: 'reconnect_error'
        })
        console.log('attempt to reconnect has failed')
      })
    }
    render () {
      return (
        <WrappedComponent
          socket={this.socket}
          setUri={this.setUri}
          {...this.state}
          {...this.props}
        />
      )
    }
  }
}

export default socket
