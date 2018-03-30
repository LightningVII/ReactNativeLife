import React from 'react'
import IM from '../../components/IM'
import socket from '../../components/socket.io'
// Replace this URL with your own, if you want to run the backend locally!
class Robot extends React.Component {
  constructor () {
    super()
    this.state = {
      component: 'PluginInput',
      data: ['121212121212121212121212121212121212']
    }
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress (val) {
    console.log(this.props)
    this.props.socket.emit('listen event', val)
  }

  componentDidMount () {
    this.props.socket.on('ping', data => {
      if (data && data.data) {
        data.data === 'Y' &&
          this.setState({
            component: 'PluginInput'
          })
        data.data === 'N' &&
          this.setState({
            component: 'Confirm'
          })
        this.setState({
          data: [...this.state.data, data.data]
        })
      }
    })
  }

  render () {
    console.log(this.props)
    const { data, component } = this.state
    return (
      <IM
        handlePress={this.handlePress}
        message={data}
        component={component}
        status={this.props.status}
      />
    )
  }
}

const SocketEndpoint = 'http://a3eb085a.ngrok.io'
export default socket(Robot, SocketEndpoint)
