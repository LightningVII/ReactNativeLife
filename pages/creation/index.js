import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Popup from '../../components/popup';
import NoMore from '../../components/nomore';
import Loading from '../../components/loading';
import Detail from './detail';
import Item from './item';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../../actions/app';

import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    Dimensions,
    RefreshControl
} from 'react-native';

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    popup(title, content) {
        this.props.popAlert(title, content);
    }

    renderRow(row) {
        return (
            <Item
                key={row._id}
                user={this.props.user}
                popAlert={this.popup.bind(this)}
                onSelect={() => this.props.onLoadItem(row)}
                row={row}
            />
        );
    }

    hasMore() {
        const { videoList, videoTotal } = this.props;

        return videoList.length < videoTotal;
    }

    fetchMoreData() {
        const { isLoadingTail, videoList, fetchCreations } = this.props;

        if (this.hasMore() && !isLoadingTail) {
            fetchCreations();
        }
    }

    onRefresh() {
        this.props.fetchCreations('recent');
    }

    renderFooter() {
        const { videoTotal, isLoadingTail } = this.props;

        if (!this.hasMore() && videoTotal !== 0) {
            return <NoMore />;
        }

        if (isLoadingTail) {
            return <Loading />;
        }

        return null;
    }

    render() {
        const {
            videoList,
            fetchCreations,
            isRefreshing,
            onRefresh
        } = this.props;

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        let dataSource = ds.cloneWithRows(videoList);

        return (
            <View style={styles.container}>
                <ListView
                    dataSource={dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderFooter={this.renderFooter.bind(this)}
                    onEndReached={this.fetchMoreData.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    onEndReachedThreshold={20}
                    enableEmptySections
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(List);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
