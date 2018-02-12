import { StyleSheet, Dimensions } from 'react-native'
export const { width: screenWidth } = Dimensions.get('window')
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },

  videoBox: {
    width: screenWidth,
    height: screenWidth * 0.56,
    justifyContent: 'center',
    backgroundColor: '#000'
  },

  video: {
    width: screenWidth,
    height: screenWidth * 0.56,
    backgroundColor: '#000'
  },

  failText: {
    position: 'absolute',
    left: 0,
    top: 90,
    width: screenWidth,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent'
  },

  loading: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },

  progressBox: {
    justifyContent: 'flex-end',
    width: screenWidth,
    backgroundColor: '#444'
  },

  progressBar: {
    width: 0,
    height: 5,
    backgroundColor: '#DDD'
  },

  resumeIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: '#DDD',
    borderWidth: 4,
    borderRadius: 20
  },

  pauseBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: screenWidth,
    height: screenWidth * 0.56
  },

  infoBox: {
    width: screenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },

  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 30
  },

  descBox: {
    flex: 1
  },

  nickname: {
    fontSize: 18
  },

  title: {
    marginTop: 8,
    fontSize: 16,
    color: '#666'
  },

  replyBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10
  },

  replyAvatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20
  },

  replyNickname: {
    color: '#666'
  },

  replyContent: {
    marginTop: 4,
    color: '#666'
  },

  reply: {
    flex: 1
  },

  loadingMore: {
    marginVertical: 20
  },

  loadingText: {
    color: '#777',
    textAlign: 'center'
  },

  listHeader: {
    width: screenWidth,
    marginTop: 10
  },

  commentBox: {
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    width: screenWidth
  },

  content: {
    paddingLeft: 4,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    height: 80
  },

  commentArea: {
    width: screenWidth,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
})
