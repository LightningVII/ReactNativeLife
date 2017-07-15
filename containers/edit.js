import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  Text
} from 'react-native'
// import Edit from '../pages/creation/edit'
import * as creationActions from '../actions/creation'

class EditContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      // <Edit {...this.props} />
      <Text>asdfasd</Text>
    )
  }
}

function mapStateToProps (state) {
  // const {
  //   user
  // } = state.get('app')

  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(creationActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)