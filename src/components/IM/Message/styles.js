import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  wordContainer: {
    marginBottom: 20,
    flexDirection: 'row'
  },
  avatorGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    zIndex: 1
  },
  avatarContainer: {
    borderWidth: 0,
    borderRadius: 20,
    marginRight: 10
  },
  avatar: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 20
  },
  triangleIcon: {
    borderColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }]
  },
  talkAboutContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    maxWidth: 260,
    borderRadius: 8,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingTop: Platform.OS === 'android' ? 10 : 15
  },
  triangleCoverBorder: {
    borderWidth: 0,
    position: 'absolute'
  },
  wordStyle: {
    textAlign: 'justify',
    lineHeight: Platform.OS === 'android' ? 24 : 20
  }
})

const rtl = StyleSheet.create({
  wordContainer: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end'
  },
  avatorGroup: { flexDirection: 'row-reverse' },
  avatarContainer: { marginLeft: 10 },
  talkAboutContainer: { marginRight: -4, backgroundColor: '#1890ff' },
  wordStyle: { color: '#FFF' },
  triangleCoverBorder: { right: 2, backgroundColor: '#1890ff' }
})

const ltr = StyleSheet.create({
  wordContainer: {
    flexDirection: 'row'
  },
  avatorGroup: { flexDirection: 'row' },
  avatarContainer: { marginRight: 10 },
  talkAboutContainer: { marginLeft: -4, backgroundColor: '#fff' },
  triangleCoverBorder: { left: 2, backgroundColor: '#fff' }
})

const merge = (arr, dir) => {
  let style = {}
  for (const s of arr) {
    style[s] = [styles[s], dir[s]]
  }
  return style
}

const reverseArr = [
  'wordContainer',
  'avatorGroup',
  'talkAboutContainer',
  'avatarContainer',
  'triangleCoverBorder'
]

export const reverse = {
  rtl: merge([...reverseArr, 'wordStyle'], rtl),
  ltr: merge(reverseArr, ltr)
}

export default styles
