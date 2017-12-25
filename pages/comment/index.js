import React, { Component } from 'react';
import { Button } from 'react-native-elements';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../../actions/app';

import Popup from '../../components/popup';

import {
    StyleSheet,
    View,
    Dimensions,
    TextInput
} from 'react-native';

const { width } = Dimensions.get('window');

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        };
    }

    submit = () => {
        if (!this.state.content) {
            return this.props.popAlert('呜呜~', '留言不能为空');
        }

        this.props.submit(this.state.content);
    };

    render() {
        return (
            <View style={styles.commentContainer}>
                <View style={styles.commentBox}>
                    <View style={styles.comment}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="敢不敢评论一个..."
                            style={styles.content}
                            multiline
                            defaultValue={this.state.content}
                            onChangeText={text => {
                                this.setState({
                                    content: text
                                });
                            }}
                        />
                    </View>
                </View>
                <Button
                    raised
                    containerViewStyle={{
                        borderRadius: 4,
                        marginTop: 20,
                        marginLeft: 20,
                        marginRight: 20
                    }}
                    buttonStyle={{
                        backgroundColor: '#ccc',
                        borderRadius: 4
                    }}
                    onPress={this.submit}
                    title={'评论'}
                />
                <Popup {...this.props} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        popup: state.get('app').popup
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(appActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

const styles = StyleSheet.create({
    commentContainer: {
        flex: 1,
        backgroundColor: '#fff'
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
    }
});
