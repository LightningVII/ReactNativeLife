import { Button, FormLabel, FormInput, SearchBar } from 'react-native-elements';
import request from '../../common/request';
import config from '../../common/config';
import Popup from '../../components/popup';

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

    _showVerifyCode() {
        this.setState({
            codeSent: true
        });
    }

    _countingDone() {
        this.setState({
            countingDone: true
        });
    }

    _sendVerifyCode() {
        this.input.blur();
        this.input.clearText();
        return;
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

        this._showVerifyCode();
    }

    _submit() {
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
    }

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
                onPress={()=>this.this.input.blur()}
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
                        ref={input => this.input = input}
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
                            <TextInput
                                placeholder="输入验证码"
                                underlineColorAndroid="transparent"
                                autoCaptialize={'none'}
                                autoCorrect={false}
                                keyboardType={'number-pad'}
                                style={[styles.inputField, styles.verifyField]}
                                onChangeText={text => {
                                    this.setState({
                                        verifyCode: text
                                    });
                                }}
                            />

                            <Button onPress={this._sendVerifyCode.bind(this)}>
                                获取验证码
                            </Button>
                        </View>
                    ) : null}

                    {this.state.codeSent ? (
                        <Button
                            style={{
                                marginBottom: 10,
                                width: '100%',
                                backgroundColor: '#fff'
                            }}
                            type="ghost"
                            onPress={this._submit.bind(this)}
                        >
                            登录
                        </Button>
                    ) : (
                        <Button
                            raised
                            containerViewStyle={{
                                borderRadius: 4,
                                marginTop: 20,
                                marginLeft: 20,
                                marginRight: 20
                                // width: '100%'
                            }}
                            buttonStyle={{ backgroundColor: 'orange' }}
                            onPress={this._sendVerifyCode.bind(this)}
                            title={'获取验证码'}
                        />
                    )}
                </View>

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
        // height: 40,
        // padding: 5,
        // color: '#666',
        // fontSize: 16,
        borderBottomWidth: 0,
        backgroundColor: 'rgba(255,255,255,0.8)',
        // marginLeft: 0,
        // flex: 1,
        // width: '100%',
        paddingLeft: 20,
        // borderColor: 'rgba(0,0,0,0.3)',
        borderRadius: 4
    },

    verifyField: {
        width: width - 140
    },

    verifyCodeBox: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    countBtn: {
        width: 110,
        height: 40,
        padding: 10,
        marginLeft: 8,
        backgroundColor: '#ee735c',
        borderColor: '#ee735c',
        color: '#fff',
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 15,
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
