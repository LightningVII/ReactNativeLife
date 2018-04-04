import React from 'react'
import IM from '../../components/IM'
import socket from '../../components/socket.io'
import { View, Text, TouchableHighlight } from 'react-native'
import resolveAssetSource from 'resolveAssetSource'
// Replace this URL with your own, if you want to run the backend locally!
class Robot extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      component: 'PluginInput',
      data: [
        {
          type: 'text',
          data: '121212121212121212121212121212121212'
        },
        {
          type: 'pic',
          data: resolveAssetSource(require('../../static/images/WechatIMG21.jpeg'))
        },
        {
          type: 'text',
          dir: 'rtl',
          data: '121212121212121212121212121212121212'
        },
        {
          type: 'pic',
          dir: 'rtl',
          data: resolveAssetSource(require('../../static/images/WechatIMG21.jpeg'))
        },
        {
          type: 'plain',
          data: '课程定制成功'
        }
      ]
    }
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress (val) {
    console.log(val)
    this.props.socket.emit('listen event', val)
  }

  componentDidMount () {
    this.props.socket.on('ping', data => {
      if (data && data.data) {
        this.setState({
          data: [...this.state.data, data.data]
        })
      }
    })
  }

  componentDidUpdate () {
    if (
      this.props.status === 'disconnect' ||
      this.props.status === 'reconnect_error'
    ) {
      this.props.socket.setUri('https://cacabad5.ngrok.io')
    }
  }

  render () {
    const { data, component } = this.state
    console.log(component)
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginTop: 60,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <TouchableHighlight
            onPress={_ => this.setState({ component: 'PluginInput' })}
            style={{ backgroundColor: '#bbb' }}
          >
            <Text>input</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={_ => this.setState({ component: 'Confirm' })}
          >
            <Text>button</Text>
          </TouchableHighlight>
        </View>
        <IM
          handlePress={this.handlePress}
          message={data}
          component={component}
          socketUrl={this.props.uri}
          status={this.props.status}
        />
      </View>
    )
  }
}

const SocketEndpoint = 'http://a3eb085a.ngrok.io'
export default socket(Robot, SocketEndpoint)
