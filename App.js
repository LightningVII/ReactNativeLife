import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './containers/app';
import configureStore from './store';
import { StyleSheet, Text, View } from 'react-native';
const store = configureStore();
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <AppContainer />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        flexDirection: 'column'
    }
});
