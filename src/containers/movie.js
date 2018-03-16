import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Movies from '../pages/movie/index'
import * as Actions from '../actions/movie'

class MovieContainer extends React.Component {
  constructor (props) {
    super(props)
    this.onLoadItem = this.onLoadItem.bind(this)
  }

  componentDidMount () {
    this.props.fetchMovies()
  }

  onLoadItem (row) {
    this.props.navigation.navigate('MovieDetail', {
      rowData: row
    })
  }

  render () {
    return <Movies onLoadItem={this.onLoadItem} {...this.props} />
  }
}

function mapStateToProps (state) {
  const { user } = state.get('app')

  return {
    ...state.get('movies'),
    user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer)
