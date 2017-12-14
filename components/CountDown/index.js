import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native';

export default class CountDown extends React.Component {
    setTimeout = GLOBAL.setTimeout;
    clearTimeout = GLOBAL.clearTimeout;
    time = this.props.time ? this.props.time : 60;
    countdownTimeout;
    state = {
        text: this.props.text ? this.props.text(this.time) : '',
        disabled: true
    };

    countdown = () => {
        const timer = () => {
            this.time -= 1;
            this.setState({ text: this.props.text(this.time) });
            if (this.time > 0) {
                this.countdownTimeout = this.setTimeout(timer, 1000);
            } else {
                this.time = this.props.time ? this.props.time : 60;
                this.setState({ disabled: false });
                this.setState({ text: this.props.text(this.time) });
                this.props.afterEnd && this.props.afterEnd();
            }
        };
        this.countdownTimeout = this.setTimeout(timer, 1000);
    };

    onPress = () => {
        if (this.state.disabled) {
            //nothing
        } else {
            this.setState({ disabled: true });
            this.countdown();
            if (this.props.onPress) {
                this.props.onPress();
            }
        }
    };

    componentDidMount() {
        this.countdown();
    }

    componentWillUnmount() {
        clearTimeout(this.countdownTimeout);
    }

    render() {
        const style = [styles.text];
        let component;
        const { disabled, text } = this.state;
        const { buttonStyle, textStyle } = this.props;

        if (this.state.disabled) {
            style.push(this.props.disabledTextStyle);
            component = (
                <View style={[styles.wrapper, this.props.buttonStyle]}>
                    <Text style={[style]}>{text}</Text>
                </View>
            );
        } else {
            component = (
                <TouchableHighlight
                    style={[styles.wrapper, buttonStyle]}
                    onPress={this.onPress}
                >
                    <Text style={[style, textStyle]}>{text}</Text>
                </TouchableHighlight>
            );
        }
        return component;
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center'
    },
    wrapper: {
        backgroundColor: '#e5e5e5'
    }
});
