import React from 'react'
import { Provider } from 'react-redux'
// import AppContainer from './src/containers/app'
import Player from './src/components/Player'
// import StickyHeaderExample from './src/components/StickyHeader/example'
import configureStore from './src/store'
import { StyleSheet, View } from 'react-native'
const store = configureStore()
export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {/* <AppContainer /> */}
          <Player source={require('./src/static/movie.mp4')} />
          {/* <StickyHeaderExample /> */}
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
