import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native'

const systemButtonOpacity = 0.6
export default class Button extends Component {
  render () {
    let touchableProps = {
      activeOpacity: this._computeActiveOpacity()
    }
    let containerStyle = [
      this.props.containerStyle,
      this.props.disabled ? this.props.disabledContainerStyle : null
    ]

    if (!this.props.disabled) {
      touchableProps.onPress = this.props.onPress
      touchableProps.onPressIn = this.props.onPressIn
      touchableProps.onPressOut = this.props.onPressOut
      touchableProps.onLongPress = this.props.onLongPress
      touchableProps.delayPressIn = this.props.delayPressIn
      touchableProps.delayPressOut = this.props.delayPressOut
      touchableProps.delayLongPress = this.props.delayLongPress
    }
    let { disabled } = this.props
    let style = [
      styles.text,
      disabled ? styles.disabledText : null,
      this.props.style,
      disabled ? this.props.styleDisabled : null
    ]
    return (
      <TouchableOpacity
        {...touchableProps}
        style={containerStyle}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityTraits='button'
        accessibilityComponentType='button'>
        <Text style={style} allowFontScaling={this.props.allowFontScaling}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    )
  }

  _computeActiveOpacity () {
    if (this.props.disabled) {
      return 1
    }
    return this.props.activeOpacity != null
      ? this.props.activeOpacity
      : systemButtonOpacity
  }
};

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  accessibilityLabel: PropTypes.string,
  allowFontScaling: Text.propTypes.allowFontScaling,
  containerStyle: ViewPropTypes.style,
  disabledContainerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  style: Text.propTypes.style,
  styleDisabled: Text.propTypes.style
}

const styles = StyleSheet.create({
  text: {
    color: '#007aff',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center'
  },
  disabledText: {
    color: '#dcdcdc'
  }
})
