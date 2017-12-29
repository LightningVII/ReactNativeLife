import Icon from 'react-native-vector-icons/Ionicons'
import { Circle } from 'react-native-progress'
import { Button } from 'react-native-elements'
import Popup from '../../components/popup'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as appActions from '../../actions/app'
import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Platform,
    ProgressViewIOS,
    TouchableOpacity,
    Modal,
    TextInput
} from 'react-native'
import { ImagePicker, Video, Audio, Permissions } from 'expo'

import request from '../../common/request'
import config from '../../common/config'

const ProgressBar = require('ProgressBarAndroid')
const { width, height } = Dimensions.get('window')

const StatusBar = ({ progress }) => {
  if (Platform.OS === 'ios') {
    return (
      <ProgressViewIOS
        style={styles.progressBar}
        progressTintColor='#333'
        progress={progress}
            />
    )
  } else {
    return (
      <ProgressBar
        styleAttr='Horizontal'
        indeterminate={false}
        color='#333'
        progress={progress}
            />
    )
  }
}

const ModalPublic = ({
    publishing,
    publishProgress,
    willPublish,
    title,
    setTitle,
    submit,
    triggerModal
}) => (
  <Modal
    onRequestClose={() => {
      console.log('closed')
    }}
    animationType={'slide'}
    visible
    >
    <View style={styles.modalContainer}>
      <Icon
        name='ios-close-outline'
        onPress={() => triggerModal(false)}
        style={styles.closeIcon}
            />

      {!publishing ? (
        <View style={styles.fieldBox}>
          <TextInput
            underlineColorAndroid='transparent'
            placeholder={'给狗狗一句宣言吧'}
            style={styles.inputField}
            autoCapitalize={'none'}
            autoCorrect={false}
            defaultValue={title}
            onChangeText={title => setTitle(title)}
                    />
          <Button
            raised
            containerViewStyle={{
              borderRadius: 4,
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20
            }}
            buttonStyle={{
              backgroundColor: '#aaaaaa',
              borderRadius: 4
            }}
            onPress={submit}
            title={'发布视频'}
                    />
        </View>
            ) : (
              <View style={styles.loadingBox}>
                <Text style={styles.loadingText}>
                        耐心等一下，拼命为您生成专属视频中...
                    </Text>
                {willPublish ? (
                  <Text style={styles.loadingText}>
                            正在合并视频音频...
                        </Text>
                    ) : null}
                {publishProgress > 0.3 ? (
                  <Text style={styles.loadingText}>开始上传喽！...</Text>
                    ) : null}
                <Circle
                  showsText
                  size={60}
                  color={'#eeeeee'}
                  progress={publishProgress}
                    />
              </View>
            )}
    </View>
  </Modal>
)

const defaultState = {
  previewVideo:
        // 'file:///Users/white/Downloads/WeChatSight22.mp4' ||
        null,

  videoId: '5a3cb1c0c78ef4059545b2f6' || null,
  audioId: null,

  title: '',
  modalVisible: false,
  publishing: false,
  willPublish: false,
  publishProgress: 0.2,

    // video upload
  videoUploaded: true || false,
  videoUploading: false,
  videoUploadedProgress: 0.14,

    // video loads
  videoProgress: 0.01,

    // count down
  countText: 3,
  counting: false,

    // audio
  audioPlaying: false,
  isLoading: false,
  isRecording: false,
  recordDone: false,
  hasPermission: false,
  audioPath: null, // || AudioUtils.DocumentDirectoryPath + '/gougou.aac',
  audioUploading: false,
  audioUploadedProgress: 0.14
}

class Edit extends React.Component {
  sound = null;
  audio = null;
  state = { ...defaultState };
  onProgress = async data => {
    this.setState({
      currentTime: data.currentTime
    })
  };

  statusUpdate = async status => {
    const { positionMillis, playableDurationMillis } = status
    const { isRecording, audioPlaying } = this.state
    this.setState({
      videoProgress: positionMillis / playableDurationMillis
    })

    if (status.didJustFinish) {
      let newState = {}
      console.log(isRecording)
      if (isRecording) {
        newState.recordDone = true
        newState.isRecording = false
        newState.paused = true
      } else if (audioPlaying) {
        newState.audioPlaying = false
        newState.paused = true
      } else {
        newState.videoUploaded = true
        newState.paused = true
      }

      this.setState(newState)
      this.audio && this.stopRecording()
    }
  };

  onError = e => console.warn(e);

  preview = async () => {
    this.setState({
      audioPlaying: true
    })
    try {
      await this.videoPlayer.playFromPositionAsync(0)
      this.sound.playAsync
                ? await this.sound.playAsync()
                : await this.sound.playFromPositionAsync(0)
    } catch (error) {
            // An error occurred!
    }
  };

  async beginRecording () {
    this.setState({
      isLoading: true
    })
    if (this.sound !== null) {
      await this.sound.unloadAsync()
      this.sound.setOnPlaybackStatusUpdate(null)
      this.sound = null
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    })
    if (this.audio !== null) {
      this.audio.setOnRecordingStatusUpdate(null)
      this.audio = null
    }

    const audio = new Audio.Recording()

    try {
      await audio.prepareToRecordAsync(
                Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
            )
      audio.setOnRecordingStatusUpdate(
                this._updateScreenForRecordingStatus
            )
    } catch (error) {
            // An error occurred!
    }

    this.audio = audio
    await this.videoPlayer.setPositionAsync(0)
    await this.videoPlayer.playFromPositionAsync(0)
    await this.audio.startAsync()
    this.setState({
      isLoading: false
    })
  }

  record = async () => {
    this.setState(
      {
        counting: false,
        recordDone: false,
        isRecording: true,
        paused: false
      },
            this.beginRecording
        )
  };

  tick = count => {
    this.setState({
      countText: count
    })
    if (count-- === 0) {
      this.record()
    } else {
      global.setTimeout(() => {
        this.tick(count)
      }, 1000)
    }
  };

  counting = () => {
    const { counting, isRecording, audioPlaying } = this.state
    if (!counting && !isRecording && !audioPlaying) {
      this.setState({
        counting: true
      })
      this.tick(3)
    }
  };

  getToken = body => {
    const signatureURL = config.api.signature

    body.accessToken = this.props.user.accessToken

    return request.post(signatureURL, body)
  };

  upload = (body, type) => {
    const {XMLHttpRequest} = window
    let xhr = new XMLHttpRequest()
    let url = config.qiniu.upload

        // if (type === 'audio') {
        //     url = config.cloudinary.video;
        // }

    let state = {}

    state[type + 'UploadedProgress'] = 1
    state[type + 'Uploading'] = true
    state[type + 'Uploaded'] = false

    this.setState(state)

    const errorPop = type => {
      if (type === 'video') {
        this.props.popAlert('呜呜~', '视频同步出错，请重新上传！')
      } else if (type === 'audio') {
        this.props.popAlert('呜呜~', '音频同步出错，请重新上传！')
      }
    }

    xhr.open('POST', url)

    xhr.ontimeout = () => {
      console.log('time xhr')
    }
    xhr.onerror = err => {
      console.log(err)
    }
    xhr.onload = async () => {
      console.log(xhr)
      if (xhr.status !== 200) {
        this.props.popAlert('呜呜~', '请求失败')
        return
      }

      if (!xhr.responseText) {
        this.props.popAlert('呜呜~', '未获得服务器响应')
        return
      }

      let response

      try {
        response = JSON.parse(xhr.response)
      } catch (e) {
        console.log(e)
        console.log('parse fails')
      }

      if (response) {
        let newState = {}

        newState[type] = response
        newState[type + 'Uploading'] = false
        newState[type + 'Uploaded'] = true

        this.setState(newState)
        console.log('newState', newState)

        const updateURL = config.api[type]
        const accessToken = this.props.user.accessToken
        let updateBody = {
          accessToken
        }

        updateBody[type] = response

        if (type === 'audio') {
          updateBody.videoId = this.state.videoId
        }

        try {
          const data = await request.post(updateURL, updateBody)
          console.log('upload_data', data)
          if (data && data.success) {
            let mediaState = {}

            mediaState[type + 'Id'] = data.data

            if (type === 'audio') {
              mediaState.modalVisible = true
              mediaState.willPublish = true
            }

            this.setState(mediaState)
          } else {
            errorPop(type)
          }
        } catch (error) {
          errorPop(type)
        }
      }
    }

    if (xhr.upload) {
      xhr.upload.onprogress = event => {
        if (event.lengthComputable) {
          let percent = Number(
                        (event.loaded / event.total).toFixed(2)
                    )
          let progressState = {}

          progressState[type + 'UploadedProgress'] = percent
          this.setState(progressState)
        }
      }
    }

    xhr.send(body)
  };

  pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: 'Videos',
      aspect: [4, 3]
    })

    if (!result.cancelled) {
      const uri = result.uri
      console.log('videouri', uri)
      const type = 'video'
      const state = {
        [type + 'UploadedProgress']: 0,
        [type + 'Uploading']: true,
        [type + 'Uploaded']: true,
        previewVideo: uri
      }

      this.setState(state)

      try {
        const data = await this.getToken({
          type: 'video',
          cloud: 'qiniu'
        })
        if (data && data.success) {
          const token = data.data.token
          const key = data.data.key
          const {FormData} = window
          let body = new FormData()

          body.append('token', token)
          body.append('key', key)
          body.append('file', {
            type: 'video/mp4',
            uri: uri,
            name: key
          })

          this.upload(body, 'video')
        }
      } catch (e) {
        this.props.popAlert('呜呜~', '上传出错')
      }
    }
  };

  uploadAudio = async () => {
        // const tags = 'app,audio';
        // const folder = 'audio';
    const timestamp = Date.now()

    try {
      const data = await this.getToken({
        type: 'audio',
        timestamp: timestamp,
        cloud: 'qiniu' || 'cloudinary'
      })

      if (data && data.success) {
                // data.data
        const token = data.data.token
        const key = data.data.key
        const {FormData} = window
        let body = new FormData()

        body.append('token', token)
        body.append('key', key)
        body.append('file', {
          type: 'audio/mp3',
          uri:
                        this.state.audioPath ||
                        'file:///Users/white/MyProject/MyGithub/ReactNativeLife/pages/creation/assets/sounds/lesson_16.mp3',
                    // this.state.audioPath,
          name: key
        })

                // body.append('folder', folder);
                // body.append('signature', signature);
                // body.append('tags', tags);
                // body.append('timestamp', timestamp);
                // body.append('api_key', config.cloudinary.api_key);
                // body.append('resource_type', 'video');
                // body.append('file', {
                //     type: 'video/mp4'
                // });

        this.upload(body, 'audio')
      }
    } catch (e) {
      console.log(e)
    }
  };

  triggerModal = bool =>
        this.setState({
          modalVisible: bool
        });

  submit = async () => {
    const { title, videoId, audioId } = this.state
    const { user, popAlert } = this.props
    let body = {
      title,
      videoId,
      audioId
    }
    const creationURL = config.api.creations

    if (user && user.accessToken) {
      body.accessToken = user.accessToken

      this.setState({
        publishing: true
      })

      try {
        const data = await request.post(creationURL, body)
        if (data && data.success) {
          this.triggerModal(false)
          popAlert('汪汪~', '视频发布成功')
          const state = { ...defaultState }

          this.setState(state)
        } else {
          this.setState({
            publishing: false
          })
          popAlert('呜呜~', '视频发布失败')
        }
      } catch (e) {
        popAlert('呜呜~', '视频发布失败，请稍后重试')
      }
    }
  };

  async stopRecording () {
    try {
      await this.videoPlayer.stopAsync()
      await this.audio.stopAndUnloadAsync()
    } catch (error) {
            // Do nothing -- we are already unloaded.
    }
    this.setState({
      audioPath: this.audio.getURI()
    })
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    })
    const { sound } = await this.audio.createNewLoadedSound(
      {
                // isLooping: true,
      },
            () => {}
        )
    this.sound = sound
  }

  _updateScreenForRecordingStatus = async status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording
      })
      console.log('======canRecord======', status)
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false
      })
      console.log('======isDoneRecording======', status)
      if (!this.state.isLoading) {
        this.stopRecording()
      }
    }
  };

  checkPermission = async () => {
    const { status } = await Permissions.askAsync(
            Permissions.AUDIO_RECORDING
        )
    this.setState({
      hasPermission: status === 'granted'
    })
    if (status !== 'granted') {
      const {alert} = window
      alert('Hey! You might want to enable notifications for my app, they are good.')
    }
  };

  componentDidMount () {
    this.checkPermission()
  }

  render () {
    const {
            audioPlaying,
            audioUploading,
            audioUploadedProgress,
            videoUploaded,
            videoUploading,
            videoUploadedProgress,
            videoProgress,
            previewVideo,
            counting,
            countText,
            modalVisible,
            isRecording,
            publishing,
            publishProgress,
            willPublish,
            title,
            recordDone
        } = this.state

    const modalProps = {
      publishing,
      publishProgress,
      willPublish,
      title,
      triggerModal: this.triggerModal,
      submit: this.submit,
      setTitle: title =>
                this.setState({
                  title
                })
    }
    return !this.state.hasPermission ? (
      <View style={styles.container}>
        <View />
        <Text style={styles.noPermissionsText}>
                    You must enable audio recording permissions in order to use
                    this app.
                </Text>
        <View />
      </View>
        ) : (
          <View style={styles.container}>
            {modalVisible && <ModalPublic {...modalProps} />}

            <View style={styles.toolbar}>
              <Text style={styles.toolbarTitle}>
                {previewVideo ? '点击按钮配音' : '理解狗狗，从配音开始'}
              </Text>
              {previewVideo && videoUploaded ? (
                <Text
                  style={styles.toolbarExtra}
                  onPress={this.pickVideo}
                        >
                            更换视频
                        </Text>
                    ) : null}
            </View>

            <View style={styles.page}>
              {previewVideo ? (
                <View style={styles.videoContainer}>
                  <View style={styles.videoBox}>
                    <Video
                      ref={ref => {
                        this.videoPlayer = ref
                      }}
                      source={{
                        uri: previewVideo
                      }}
                      rate={1.0}
                      volume={1.0}
                      muted={false}
                      resizeMode={'cover'}
                                    // shouldPlay
                      style={styles.video}
                      onPlaybackStatusUpdate={this.statusUpdate}
                      onError={this.onError}
                                />
                    {!videoUploaded && videoUploading ? (
                      <View style={styles.progressTipBox}>
                        <StatusBar progress={videoProgress} />
                        <Text style={styles.progressTip}>
                                            正在生成静音视频，已完成{(
                                                videoUploadedProgress * 100
                                            ).toFixed(2)}%
                                        </Text>
                      </View>
                                ) : null}

                    {isRecording || audioPlaying ? (
                      <View style={styles.progressTipBox}>
                        <StatusBar progress={videoProgress} />
                        {isRecording ? (
                          <Text style={styles.progressTip}>
                                                录制声音中
                                            </Text>
                                        ) : null}
                      </View>
                                ) : null}

                    {recordDone ? (
                      <View style={styles.previewBox}>
                        <Icon
                          name='ios-play'
                          style={styles.previewIcon}
                                        />
                        <Text
                          style={styles.previewText}
                          onPress={this.preview}
                                        >
                                            预览
                                        </Text>
                      </View>
                                ) : null}
                  </View>
                </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.uploadContainer}
                        onPress={this.pickVideo}
                        >
                        <View style={styles.uploadBox}>
                          <Image
                            source={require('../../static/images/record.png')}
                            style={styles.uploadIcon}
                                />
                          <Text style={styles.uploadTitle}>
                                    点我上传视频
                                </Text>
                          <Text style={styles.uploadDesc}>
                                    建议时长不超过 15 秒
                                </Text>
                        </View>
                      </TouchableOpacity>
                    )}

              {videoUploaded ? (
                <View style={styles.recordBox}>
                  <View
                    style={[
                      styles.recordIconBox,
                      (isRecording || audioPlaying) &&
                                        styles.recordOn
                    ]}
                            >
                    {counting && !isRecording ? (
                      <Text style={styles.countBtn}>
                        {countText}
                      </Text>
                                ) : (
                                  <TouchableOpacity onPress={this.counting}>
                                    <Icon
                                      name='ios-mic'
                                      style={styles.recordIcon}
                                        />
                                  </TouchableOpacity>
                                )}
                  </View>
                </View>
                    ) : null}

              {videoUploaded && recordDone ? (
                <View style={styles.uploadAudioBox}>
                  {!audioUploading ? (
                    <Text
                      style={styles.uploadAudioText}
                      onPress={this.uploadAudio}
                                >
                                    下一步
                                </Text>
                            ) : null}

                  {audioUploading ? (
                    <Circle
                      showsText
                      size={60}
                      color={'#eeeeee'}
                      progress={audioUploadedProgress}
                                />
                            ) : null}
                </View>
                    ) : null}
            </View>
            <Popup {...this.props} />
          </View>
        )
  }
}

function mapStateToProps (state) {
  return {
    popup: state.get('app').popup
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(appActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030'
  },

  toolbar: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12
  },

  toolbarTitle: {
    flex: 1,
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    fontWeight: '600'
  },

  toolbarExtra: {
    position: 'absolute',
    right: 10,
    top: 12,
    color: '#fff',
    textAlign: 'right',
    fontWeight: '600',
    fontSize: 14
  },

  page: {
    flex: 1,
    alignItems: 'center'
  },

  uploadContainer: {
    marginTop: 20,
    width: width - 40,
    height: 210,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#eeeeee',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#fff'
  },

  uploadTitle: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#000'
  },

  uploadDesc: {
    color: '#999',
    textAlign: 'center',
    fontSize: 12
  },

  uploadIcon: {
    width: 110,
    resizeMode: 'contain'
  },

  uploadBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  videoContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  videoBox: {
    width: width,
    height: height * 0.6
  },

  video: {
    width: width,
    height: height * 0.6,
    backgroundColor: '#aaa'
  },

  progressTipBox: {
    marginTop: 4,
    width: width,
    height: 30,
    backgroundColor: 'rgba(244,244,244,0.65)'
  },

  progressTip: {
    color: '#333',
    width: width - 10,
    padding: 5
  },

  progressBar: {
    width: width
  },

  recordBox: {
    width: width,
    height: 60,
    alignItems: 'center'
  },

  recordIconBox: {
    width: 68,
    height: 68,
    marginTop: -30,
    borderRadius: 34,
    backgroundColor: '#eeeeee',
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  recordIcon: {
    fontSize: 58,
    backgroundColor: 'transparent',
    color: '#fff'
  },

  countBtn: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff'
  },

  recordOn: {
    backgroundColor: '#ccc'
  },

  previewBox: {
    width: 80,
    height: 30,
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  previewIcon: {
    marginRight: 5,
    fontSize: 20,
    color: '#eeeeee',
    backgroundColor: 'transparent'
  },

  previewText: {
    fontSize: 20,
    color: '#eeeeee',
    backgroundColor: 'transparent'
  },

  uploadAudioBox: {
    width: width,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  uploadAudioText: {
    width: width - 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    color: '#ccc'
  },

  modalContainer: {
    width: width,
    height: height,
    paddingTop: 50,
    backgroundColor: '#fff'
  },

  closeIcon: {
    position: 'absolute',
    fontSize: 32,
    right: 20,
    top: 30,
    color: '#eeeeee'
  },

  loadingBox: {
    width: width,
    height: 50,
    marginTop: 10,
    padding: 15,
    alignItems: 'center'
  },

  loadingText: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#333'
  },

  fieldBox: {
    width: width - 40,
    height: 36,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea'
  },

  inputField: {
    height: 36,
    textAlign: 'center',
    color: '#666',
    fontSize: 14
  }
})
