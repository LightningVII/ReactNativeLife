import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Video } from 'expo'
import {
  PanGestureHandler,
  TapGestureHandler,
  State
} from 'react-native-gesture-handler'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import ProgressBar from './ProgressBar'
import Volume from './Volume'
import styles from './styles'
export default class Detail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showVolume: 0,
      // video loads
      videoOk: true,
      videoLoaded: false,
      playing: false,
      paused: false,
      videoTotal: 0.0,

      // video player
      rate: 1,
      muted: false,
      resizeMode: 'contain',
      volume: 20,
      repeat: false
    }
    this.volume = 20
    this.videoPlayer = null
    this.relativeY = 0
    this.statusUpdate = this.statusUpdate.bind(this)
    this.rePlay = this.rePlay.bind(this)
    this.playOrPause = this.playOrPause.bind(this)
    this.videoRef = this.videoRef.bind(this)
    this._onTapHandlerStateChange = this._onTapHandlerStateChange.bind(this)
    this._onPanGestureEvent = this._onPanGestureEvent.bind(this)
    this._onPanHandlerStateChange = this._onPanHandlerStateChange.bind(this)
    this.onLoad = this.onLoad.bind(this)
  }

  statusUpdate (status) {
    const { positionMillis, playableDurationMillis, isLoaded } = status
    if (isLoaded) {
      this.setState({
        duration: positionMillis / playableDurationMillis
      })
      if (status.didJustFinish) {
        this.setState({
          playing: false
        })
        this.videoPlayer.stopAsync()
      }
    }
  }

  onLoad (status) {
    this.setState(
      {
        videoLoaded: true,
        playing: true
      },
      _ => this.videoPlayer.playAsync()
    )
  }

  _onError () {
    this.setState({
      videoOk: false
    })
  }

  rePlay () {
    this.setState(
      {
        playing: true
      },
      _ => this.videoPlayer.playFromPositionAsync(0)
    )
  }

  playOrPause () {
    const player = this.videoPlayer
    const { paused, playing } = this.state
    if (!playing) return this.rePlay()
    paused
      ? this.setState({ paused: false }, _ => player.playAsync())
      : this.setState({ paused: true }, _ => player.pauseAsync())
  }

  videoRef (ref) {
    this.videoPlayer = ref
  }

  _onTapHandlerStateChange ({ nativeEvent }) {
    if (nativeEvent.state === State.BEGAN) {
      this.relativeY = nativeEvent.y
    }
    if (nativeEvent.oldState === State.ACTIVE) {
      // Once tap happened we set the position of the circle under the tapped spot
      this.playOrPause()
    }
  }

  _onPanGestureEvent ({ nativeEvent }) {
    let value = this.state.volume + (this.relativeY - nativeEvent.y) / 2
    this.relativeY = nativeEvent.y
    value = value < 0 ? 0 : value
    value = value > 100 ? 100 : value
    this.setState({
      showVolume: 0.8,
      volume: value
    })
  }

  _onPanHandlerStateChange ({ nativeEvent }) {
    if (nativeEvent.state === State.END) {
      this.setState({
        showVolume: 0
      })
    }
  }

  render () {
    const {
      videoOk,
      videoLoaded,
      playing,
      paused,
      volume,
      showVolume,
      duration
    } = this.state

    let status = null

    if (videoLoaded) {
      if (!playing) {
        status = (
          <TouchableOpacity style={styles.resumeIcon} onPress={this.rePlay}>
            <Icon
              name='ios-refresh'
              size={24}
              style={{ color: 'red', textAlign: 'center' }}
            />
          </TouchableOpacity>
        )
      } else if (paused) {
        status = (
          <TouchableOpacity
            onPress={this.playOrPause}
            style={styles.resumeIcon}
          >
            <Icon
              name='ios-play'
              size={24}
              style={{ color: '#DDD', textAlign: 'center' }}
            />
          </TouchableOpacity>
        )
      }
    } else {
      status = <ActivityIndicator color='#eee' style={styles.loading} />
    }
    if (!videoOk) status = <Text style={styles.failText}>视频出错了！很抱歉</Text>

    return (
      <View style={styles.container}>
        <View style={styles.videoBox}>
          <TapGestureHandler
            id='tap'
            waitFor='pan'
            onHandlerStateChange={this._onTapHandlerStateChange}
            shouldCancelWhenOutside
          >
            <PanGestureHandler
              id='pan'
              minOffsetY={10}
              minDeltaY={3}
              minDeltaX={10}
              onHandlerStateChange={this._onPanHandlerStateChange}
              onGestureEvent={this._onPanGestureEvent}
              shouldCancelWhenOutside
            >
              <Video
                ref={this.videoRef}
                source={this.props.source}
                rate={1.0}
                volume={this.state.volume}
                muted={false}
                resizeMode={'cover'}
                style={styles.video}
                onPlaybackStatusUpdate={this.statusUpdate}
                onLoad={this.onLoad}
                onError={this.onError}
              />
            </PanGestureHandler>
          </TapGestureHandler>
          {status}
          <ProgressBar duration={duration} />
          <Volume
            showVolume={showVolume}
            volume={volume}
            style={{
              opacity: showVolume,
              position: 'absolute',
              left: 100,
              alignSelf: 'center'
            }}
          />
        </View>
      </View>
    )
  }
}
