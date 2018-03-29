import React from 'react'
import { Button } from 'react-native-elements'
import util from '../../common/util'
import { StyleSheet, Text, Platform, View, Image } from 'react-native'

export default class Account extends React.Component {
  render () {
    const user = this.props.user || {}

    return (
      <View style={styles.container}>
        <View style={styles.fieldItem}>
          <Text style={styles.label}>头像</Text>
          <View style={styles.avatarBox}>
            <Image
              source={{ uri: util.avatar(user.avatar, 'image') }}
              style={styles.avatar}
            />
          </View>
        </View>
        <View style={styles.fieldItem}>
          <Text style={styles.label}>昵称</Text>
          <Text style={styles.content}>{user.nickname}</Text>
        </View>
        <View style={styles.fieldItem}>
          <Text style={styles.label}>品种</Text>
          <Text style={styles.content}>{user.breed}</Text>
        </View>
        <View style={styles.fieldItem}>
          <Text style={styles.label}>年龄</Text>
          <Text style={styles.content}>{user.age}</Text>
        </View>
        <View style={styles.fieldItem}>
          <Text style={styles.label}>性别</Text>
          {user.gender === 'male' && (
            <Text style={styles.content}>男</Text>
          )}
          {user.gender === 'female' && (
            <Text style={styles.content}>女</Text>
          )}
        </View>

        {Platform.OS === 'android' && (
          <Button
            raised
            containerViewStyle={{
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20
            }}
            buttonStyle={{
              backgroundColor: '#aaaaaa',
              borderRadius: 4
            }}
            onPress={() =>
              this.props.navigation.navigate('AccountUpdate')
            }
            title={'编辑资料'}
          />
        )}
        <Button
          raised
          containerViewStyle={{
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20
          }}
          buttonStyle={{
            backgroundColor: '#aaaaaa',
            borderRadius: 4
          }}
          onPress={() => this.props.logout()}
          title={'退出登录'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff'
  },

  avatarBox: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatar: {
    marginBottom: 15,
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderColor: '#f9f9f9',
    borderWidth: 1,
    borderRadius: 20
  },

  fieldItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '#eee',
    borderBottomWidth: 1
  },

  label: {
    textAlign: 'left',
    color: '#999',
    marginRight: 10
  },

  content: {
    textAlign: 'right',
    color: '#555'
  }
})
