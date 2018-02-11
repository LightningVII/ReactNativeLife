import React from 'react'
import Popup from '../../components/popup'
import NoMore from '../../components/nomore'
import Loading from '../../components/loading'
// import Detail from './detail'
import Item from './item'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as appActions from '../../actions/app'

import { StyleSheet, View, FlatList, RefreshControl } from 'react-native'

class List extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
  }

  _popup (title, content) {
    this.props.popAlert(title, content)
  }

  renderRow ({ item: row }) {
    return (
      <Item
        user={this.props.user}
        popAlert={this._popup.bind(this)}
        onSelect={() => this.props.onLoadItem(row)}
        row={row}
      />
    )
  }

  _hasMore () {
    const { movieList, movieTotal } = this.props

    return movieList.length < movieTotal
  }

  _fetchMoreData () {
    const { isLoadingTail, fetchCreations } = this.props

    if (this._hasMore() && !isLoadingTail) {
      fetchCreations()
    }
  }

  _onRefresh () {
    this.props.fetchCreations('recent')
  }

  renderFooter () {
    const { movieTotal, isLoadingTail } = this.props

    if (!this._hasMore() && movieTotal !== 0) {
      return <NoMore />
    }

    if (isLoadingTail) {
      return <Loading />
    }

    return null
  }

  render () {
    const { movieList, isRefreshing } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          data={movieList}
          keyExtractor={item => item._id}
          renderItem={this.renderRow}
          ListFooterComponent={this.renderFooter}
          onEndReached={this._fetchMoreData.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          onEndReachedThreshold={20}
          enableEmptySections
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(List)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
