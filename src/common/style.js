import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
exports.btn = (text, event, style) => ({
  onPress: event,
  title: text,
  raised: true,
  buttonStyle: {
    borderRadius: 4,
    backgroundColor: '#f2f2f2'
  },
  containerViewStyle: {
    borderRadius: 4,
    width: width - 40,
    marginLeft: 20,
    marginRight: 20,
    ...style
  },
  color: '#999',
  fontSize: 14
})
