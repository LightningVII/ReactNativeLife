import React from 'react'
import { Provider } from 'react-redux'
// import AppContainer from './containers/app'
import Player from './components/Player'
import configureStore from './store'
import { StyleSheet, View } from 'react-native'
const store = configureStore()
export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Player source={require('./static/movie.mp4')} />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: '#ccc',
    flexDirection: 'column'
  }
})
