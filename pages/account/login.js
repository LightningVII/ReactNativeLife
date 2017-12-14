import { Button, FormLabel, FormInput, SearchBar } from 'react-native-elements';
import request from '../../common/request';
import config from '../../common/config';
import Popup from '../../components/popup';
import CountDown from '../../components/CountDown';

import React from 'react';
import {
    StyleSheet,
    ImageBackground,
    Text,
    Platform,
    View,
    TextInput,
    Dimensions,
    Alert,
    AsyncStorage
} from 'react-native';

const { width } = Dimensions.get('window');
export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pop: null,
            verifyCode: '',
            phoneNumber: '',
            countingDone: false,
            text: 'Useless Placeholder',
            codeSent: false
        };
    }

    _showVerifyCode = () => {
        this.setState({
            codeSent: true
        });
    };

    _countingDone = () => {
        this.setState({
            countingDone: true
        });
    };

    _sendVerifyCode = () => {
        this.input.blur();
        // return;
        let that = this;
        const phoneNumber = this.state.phoneNumber;

        if (!phoneNumber) {
            return that.props.popAlert('呜呜~', '手机号不能为空！');
        }

        let body = {
            phoneNumber: phoneNumber
        };

        const signupURL = config.api.signup;

        // request.post(signupURL, body)
        //   .then((data) => {
        //     if (data && data.success) {
        //       this._showVerifyCode()
        //     } else {
        //       this.props.popAlert('呜呜~', '获取验证码失败，请检查手机号是否正确')
        //     }
        //   })
        //   .catch((err) => {
        //     this.props.popAlert('呜呜~', '获取验证码失败，请检查网络是否良好')
        //   })

        this.setState({countingDone: false});

        this._showVerifyCode();
    };

    _submit = () => {
        let that = this;
        const phoneNumber = this.state.phoneNumber;
        const verifyCode = this.state.verifyCode;

        if (!phoneNumber || !verifyCode) {
            return that.props.popAlert('呜呜~', '手机号或验证码不能为空！');
        }

        let body = {
            phoneNumber: phoneNumber,
            verifyCode: verifyCode
        };

        const verifyURL = config.api.verify;

        // request.post(verifyURL, body)
        //   .then((data) => {
        //     if (data && data.success) {
        //       this.props.afterLogin(data.data)
        //     } else {
        //       this.props.popAlert('呜呜~', '获取验证码失败，请检查手机号是否正确')
        //     }
        //   })
        //   .catch((err) => {
        //     this.props.popAlert('呜呜~', '获取验证码失败，请检查网络是否良好')
        //   })

        this.props.afterLogin({ user: 'Ace' });
    };

    _alert(title, content) {
        var that = this;

        this.setState(
            {
                pop: {
                    title: title,
                    content: content
                }
            },
            function() {
                setTimeout(function() {
                    that.setState({
                        pop: null
                    });
                }, 1500);
            }
        );
    }

    render() {
        return (
            <ImageBackground
                source={require('../../static/images/WechatIMG21.jpeg')}
                style={styles.container}
                onPress={() => this.this.input.blur()}
            >
                <SearchBar
                    containerStyle={{ marginTop: 40 }}
                    round
                    lightTheme
                    // onChangeText={someMethod}
                    // onClearText={someMethod}
                    placeholder="Type Here..."
                />
                <View style={{ width: '100%' }}>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormInput
                        containerStyle={styles.inputField}
                        placeholder="输入手机号"
                        ref={input => (this.input = input)}
                        // autoCaptialize={'none'}
                        // autoCorrect={false}
                        keyboardType={'number-pad'}
                        onChangeText={text => {
                            this.setState({
                                phoneNumber: text
                            });
                        }}
                    />

                    {this.state.codeSent ? (
                        <View style={styles.verifyCodeBox}>
                            <FormInput
                                containerStyle={styles.verifyCodeInput}
                                placeholder="请输入验证码"
                                // ref={input => (this.input = input)}
                                keyboardType={'number-pad'}
                                onChangeText={text => {
                                    this.setState({
                                        verifyCode: text
                                    });
                                }}
                            />
                            {this.state.countingDone ? (
                                <Button
                                    buttonStyle={{
                                        borderRadius: 4
                                    }}
                                    containerViewStyle={{
                                        marginLeft: 0,
                                        marginRight: 0
                                    }}
                                    fontSize={14}
                                    onPress={this._sendVerifyCode}
                                    title={'获取验证码'}
                                />
                            ) : (
                                <CountDown
                                    buttonStyle={styles.countBtn}
                                    afterEnd={this._countingDone} // 结束回调
                                    time={20} // 正向计时 时间起点为0秒
                                    text={sec => `剩余(${sec})秒`} // 定时的文本回调
                                />
                            )}
                        </View>
                    ) : null}

                    {this.state.codeSent ? (
                        <Button
                            raised
                            containerViewStyle={{
                                marginTop: 20,
                                marginLeft: 20,
                                marginRight: 20
                            }}
                            buttonStyle={{
                                backgroundColor: 'orange',
                                borderRadius: 4
                            }}
                            onPress={this._submit}
                            title={'登录'}
                        />
                    ) : (
                        <Button
                            raised
                            containerViewStyle={{
                                borderRadius: 4,
                                marginTop: 20,
                                marginLeft: 20,
                                marginRight: 20
                            }}
                            buttonStyle={{
                                backgroundColor: 'orange',
                                borderRadius: 4
                            }}
                            onPress={this._sendVerifyCode}
                            title={'获取验证码'}
                        />
                    )}
                </View>

                {/* make flex layout convenience */}
                <View />
                <Popup {...this.props} />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        flex: 1,
        // padding: 10,
        // alignItems: 'stretch',
        justifyContent: 'space-between',
        height: null,
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        // resizeMode:ImageBackground.resizeMode.contain,
        //祛除内部元素的白色背景
        backgroundColor: 'rgba(0,0,0,0)'
    },
    signupBox: {
        marginTop: 130
    },
    inputField: {
        borderBottomWidth: 0,
        backgroundColor: 'rgba(255,255,255,0.8)',
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
    verifyField: {
        width: width - 140
    },
    verifyCodeBox: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
        // backgroundColor: '#CCC'
    },
    countBtn: {
        minWidth: 90,
        padding: 10,
        backgroundColor: '#ee735c',
        borderColor: '#ee735c',
        borderRadius: 2
    },
    btn: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'transparent',
        borderColor: '#ee735c',
        borderWidth: 1,
        ...Platform.select({
            ios: {
                borderRadius: 4
            },
            android: {
                borderRadius: 0
            }
        }),
        color: '#ee735c'
    }
});
