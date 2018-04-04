import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
  wordContainer: {
    marginBottom: 20
  },
  avatorGroup: {
    flexDirection: 'row'
  },
  avatarContainer: {
    borderWidth: 0,
    borderRadius: 20
  },
  avatar: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 20
  },
  talkAboutContainer: {
    borderColor: '#ccc',
    maxWidth: 240,
    borderRadius: 8
  },
  triangleCoverBorder: {
    top: 16,
    zIndex: 1,
    width: 8,
    height: 8,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }]
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
  talkAboutContainer: { backgroundColor: '#1890ff' },
  wordStyle: { color: '#FFF' },
  triangleCoverBorder: { backgroundColor: '#1890ff' }
})

const ltr = StyleSheet.create({
  wordContainer: {
    flexDirection: 'row'
  },
  avatorGroup: { flexDirection: 'row' },
  avatarContainer: { marginRight: 10 },
  talkAboutContainer: { backgroundColor: '#fff' },
  triangleCoverBorder: { backgroundColor: '#fff' }
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
