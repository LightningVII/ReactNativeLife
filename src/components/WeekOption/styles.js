import { StyleSheet, Dimensions } from 'react-native'

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center'
  },
  btn: {
    backgroundColor: 'transparent'
  }
})

styles.flexGrow = (num = 1) => StyleSheet.create({
  flexGrow: num
})

export default styles
