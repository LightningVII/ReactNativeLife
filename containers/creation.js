import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreationList from '../pages/creation/index';
import * as creationActions from '../actions/creation';

class CreationContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCreations();
    }

    _onLoadItem(row) {
        this.props.navigation.navigate('Detail', {
            rowData: row
        });
    }

    render() {
        return (
            <CreationList
                onLoadItem={this._onLoadItem.bind(this)}
                {...this.props}
            />
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.get('app');

    return {
        ...state.get('creations'),
        user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(creationActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreationContainer);
