import React from 'react'
import { StyleSheet, ImageBackground, View, Dimensions } from 'react-native'
import { Button, FormInput } from 'react-native-elements'
import request from '../../common/request'
import config from '../../common/config'
import Popup from '../../components/popup'
import CountDown from '../../components/CountDown'

import style from '../../common/style'
const { width } = Dimensions.get('window')
export default class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      pop: null,
      verifyCode: '',
      phoneNumber: '',
      countingDone: false,
      text: 'Useless Placeholder',
      codeSent: false
    }
    this.showVerifyCode = this.showVerifyCode.bind(this)
    this.countingDone = this.countingDone.bind(this)
    this.sendVerifyCode = this.sendVerifyCode.bind(this)
    this.submit = this.submit.bind(this)
  }

  showVerifyCode () {
    this.setState({
      codeSent: true
    })
  }

  countingDone () {
    this.setState({
      countingDone: true
    })
  }

  async sendVerifyCode () {
    this.input.blur()
    const phoneNumber = this.state.phoneNumber

    if (!phoneNumber) {
      return this.props.popAlert('呜呜~', '手机号不能为空！')
    }

    let body = {
      phoneNumber: phoneNumber
    }

    const signupURL = config.api.signup
    this.setState({ countingDone: false })

    try {
      const data = await request.post(signupURL, body)
      if (data && data.success) {
        this.showVerifyCode()
      } else {
        this.props.popAlert('呜呜~', '获取验证码失败，请检查手机号是否正确')
      }
    } catch (error) {
      this.props.popAlert('呜呜~', '获取验证码失败，请检查网络是否良好')
    }
  }

  async submit () {
    const phoneNumber = this.state.phoneNumber
    const verifyCode = this.state.verifyCode

    if (!phoneNumber || !verifyCode) {
      return this.props.popAlert('呜呜~', '手机号或验证码不能为空！')
    }

    let body = {
      phoneNumber: phoneNumber,
      verifyCode: verifyCode
    }

    const verifyURL = config.api.verify
    try {
      const data = await request.post(verifyURL, body)
      if (data && data.success) {
        this.props.afterLogin(data.data)
      } else {
        this.props.popAlert('呜呜~', '获取验证码失败，请检查手机号是否正确')
      }
    } catch (error) {
      this.props.popAlert('呜呜~', '获取验证码失败，请检查网络是否良好')
    }
  }
  render () {
    const btnStyle = this.state.codeSent
      ? style.btn('登录', this.submit)
      : style.btn('获取验证码', this.sendVerifyCode)
    return (
      <ImageBackground
        source={require('../../static/images/WechatIMG21.jpeg')}
        style={styles.container}
        onPress={() => this.this.input.blur()}
      >
        <View style={{ width: '100%' }}>
          <FormInput
            containerStyle={styles.inputField}
            placeholder='输入手机号'
            ref={input => (this.input = input)}
            keyboardType={'number-pad'}
            onChangeText={text => {
              this.setState({
                phoneNumber: text
              })
            }}
          />

          {this.state.codeSent
            ? <View style={styles.verifyCodeBox}>
              <FormInput
                containerStyle={styles.verifyCodeInput}
                placeholder='请输入验证码'
                keyboardType={'number-pad'}
                onChangeText={text => {
                  this.setState({
                    verifyCode: text
                  })
                }}
                />
              {this.state.countingDone
                  ? <Button
                    {...style.btn('获取验证码', this.sendVerifyCode, {
                      width: 'auto',
                      marginLeft: 0,
                      marginRight: 0
                    })}
                    fontSize={14}
                    />
                  : <CountDown
                    buttonStyle={styles.countBtn}
                    afterEnd={this.countingDone} // 结束回调
                    time={5} // 正向计时 时间起点为0秒
                    text={sec => `剩余(${sec})秒`} // 定时的文本回调
                    />}
            </View>
            : null}
          <Button {...btnStyle} />
        </View>

        <Popup {...this.props} />
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    justifyContent: 'center'
  },
  inputField: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
    paddingLeft: 20,
    borderRadius: 4
  },
  verifyCodeInput: {
    width: width - 140,
    height: 38,
    borderBottomWidth: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingLeft: 20,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 4
  },
  verifyCodeBox: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  countBtn: {
    minWidth: 90,
    padding: 10,
    backgroundColor: '#999',
    borderRadius: 4
  }
})
