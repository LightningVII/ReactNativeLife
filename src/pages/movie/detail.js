import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Video } from 'expo'
import util from '../../common/util'
import CommentList from '../comment/list'

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native'

const { width } = Dimensions.get('window')

export default class Detail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      // video loads
      videoOk: true,
      videoLoaded: false,
      playing: false,
      paused: false,
      videoTotal: 0.0,
      currentTime: 0.0,

      // video player
      rate: 1,
      muted: false,
      resizeMode: 'contain',
      repeat: false
    }
    this.videoPlayer = null
    this.statusUpdate = this.statusUpdate.bind(this)
    this.rePlay = this.rePlay.bind(this)
    this.playOrPause = this.playOrPause.bind(this)
  }

  async statusUpdate (status) {
    const { positionMillis, playableDurationMillis, isLoaded } = status
    const { isRecording } = this.state
    if (isLoaded) {
      // console.log(status);
      this.setState({
        currentTime: positionMillis,
        duration: positionMillis / playableDurationMillis
      })
      if (positionMillis === 0) {
        this.setState({
          playing: false
        })
      } else {
        if (!this.state.videoLoaded) {
          this.setState({
            videoLoaded: true
          })
        }

        let newState = {}

        if (!this.state.videoLoaded) {
          newState.videoLoaded = true
        }

        if (!this.state.playing) {
          newState.playing = true
        }

        this.setState(newState)
      }

      if (status.didJustFinish) {
        console.log(this.videoPlayer)
        let newState = {}
        console.log(isRecording)
        if (isRecording) {
          newState.recordDone = true
          newState.isRecording = false
          newState.paused = true
        } else {
          newState.videoUploaded = true
          newState.paused = true
        }

        this.setState(newState)
        await this.videoPlayer.stopAsync()
      }
    }
  }

  _onEnd () {
    this.setState({
      currentTime: this.state.duration,
      playing: false
    })
  }

  _onError () {
    this.setState({
      videoOk: false
    })
  }

  rePlay () {
    this.setState({
      paused: false
    })
    this.videoPlayer.playFromPositionAsync(0)
  }

  playOrPause () {
    if (this.state.paused) {
      this.videoPlayer.playAsync()
      this.setState({
        paused: false
      })
    } else {
      this.videoPlayer.pauseAsync()
      this.setState({
        paused: true
      })
    }
  }

  render () {
    const data = this.props.rowData
    return (
      <View style={styles.container}>
        <View style={styles.videoBox}>
          <TouchableOpacity activeOpacity={1} onPress={this.playOrPause}>
            <Video
              ref={ref => (this.videoPlayer = ref)}
              source={{
                uri: util.video(data.video)
              }}
              rate={1.0}
              volume={1.0}
              muted={false}
              resizeMode={'cover'}
              shouldPlay
              style={styles.video}
              onPlaybackStatusUpdate={this.statusUpdate}
              onError={this.onError}
            />
          </TouchableOpacity>

          {!this.state.videoOk &&
            <Text style={styles.failText}>视频出错了！很抱歉</Text>}

          {!this.state.videoLoaded &&
            <ActivityIndicator color='#eeeeee' style={styles.loading} />}

          {this.state.videoLoaded && !this.state.playing
            ? <TouchableOpacity style={styles.resumeIcon} onPress={this.rePlay}>
              <Icon
                name='ios-play'
                size={24}
                style={{ color: '#DDD', textAlign: 'center' }}
              />
            </TouchableOpacity>
            : null}

          {this.state.videoLoaded && this.state.playing && this.state.paused
            ? <TouchableOpacity
              onPress={this.playOrPause}
              style={styles.resumeIcon}
            >
              <Icon
                name='ios-play'
                size={24}
                style={{ color: '#DDD', textAlign: 'center' }}
              />
            </TouchableOpacity>
            : null}

          <View style={styles.progressBox}>
            <View
              style={[
                styles.progressBar,
                { width: width * this.state.duration }
              ]}
            />
          </View>
        </View>
        <CommentList rowData={data} navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },

  videoBox: {
    width: width,
    height: width * 0.56,
    justifyContent: 'center',
    backgroundColor: '#000'
  },

  video: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#000'
  },

  failText: {
    position: 'absolute',
    left: 0,
    top: 90,
    width: width,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent'
  },

  loading: {
    position: 'absolute',
    left: 0,
    top: 80,
    width: width,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },

  progressBox: {
    width: width,
    height: 2,
    backgroundColor: '#ccc'
  },

  progressBar: {
    width: 1,
    height: 2,
    backgroundColor: '#ff6600'
  },

  resumeIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: '#DDD',
    borderWidth: 4,
    borderRadius: 20
  },

  pauseBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: width * 0.56
  },

  infoBox: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },

  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 30
  },

  descBox: {
    flex: 1
  },

  nickname: {
    fontSize: 18
  },

  title: {
    marginTop: 8,
    fontSize: 16,
    color: '#666'
  },

  replyBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10
  },

  replyAvatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20
  },

  replyNickname: {
    color: '#666'
  },

  replyContent: {
    marginTop: 4,
    color: '#666'
  },

  reply: {
    flex: 1
  },

  loadingMore: {
    marginVertical: 20
  },

  loadingText: {
    color: '#777',
    textAlign: 'center'
  },

  listHeader: {
    width: width,
    marginTop: 10
  },

  commentBox: {
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    width: width
  },

  content: {
    paddingLeft: 4,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    height: 80
  },

  commentArea: {
    width: width,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
})
