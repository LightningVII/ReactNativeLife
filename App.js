import React from 'react'
import { Provider } from 'react-redux'
// import AppContainer from './src/containers/app'
// import Robot from './src/pages/Robot'
import Dialog from './src/components/Dialog'

// import Player from './src/components/Player'
// import StickyHeaderExample from './src/components/StickyHeader/example'
import configureStore from './src/store'
import { StyleSheet, Platform, Dimensions, View } from 'react-native'
import { Asset, AppLoading } from 'expo'
const store = configureStore()

export default class App extends React.Component {
  constructor (params) {
    super(params)
    this.state = {
      isReady: false
    }
  }
  async _cacheResourcesAsync () {
    const images = [
      require('./assets/splash.png'),
      require('./assets/icon.png')
    ]

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })
    return Promise.all(cacheImages)
  }
  render () {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {/* <AppContainer /> */}
          {/* <Robot /> */}
          <Dialog />
          {/* <Player source={require('./src/static/movie.mp4')} /> */}
          {/* <StickyHeaderExample /> */}
        </View>
      </Provider>
    )
  }
}

const { width, height } = Dimensions.get('window')
const isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  )
}

const paddingTop = Platform.OS === 'ios' ? isIphoneX() ? 0 : 44 : 0

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop,
    backgroundColor: '#ccc',
    flexDirection: 'column'
  }
})
