import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import List from './creation'
import Detail from './detail'
import Comment from './comment'
import Edit from './edit'
import Account from './account'
import AccountUpdate from './accountUpdate'

import {
  Text,
  View,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button
} from 'react-native'
const {width} = Dimensions.get('window')

import {TabNavigator, StackNavigator} from 'react-navigation'

const headerStyle = {
  ios: {
    height: 52, 
    paddingTop: 14,
    width: width,
    backgroundColor: '#ee735c'
  },
  android: {
    height: 0,
    paddingTop: 0
  }
}

const ListTab = StackNavigator({
  List: {
    screen: List
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.rowData.author.nickname} 的创意`,
      headerStyle: headerStyle[Platform.OS],
      headerTintColor: '#fff',
      tabBarVisible: Platform.OS === 'android',
      tabBarIcon: ({tintColor, focused}) => (<Icon
        name={focused
        ? 'ios-videocam'
        : 'ios-videocam-outline'}
        color={tintColor}
        size={28}/>)
    })
  },
  Comment: {
    screen: Comment,
    navigationOptions: ({navigation}) => ({
      title: '评论',
      headerStyle: headerStyle[Platform.OS],
      headerTintColor: '#fff',
      tabBarVisible: Platform.OS === 'android',
      tabBarIcon: ({tintColor, focused}) => (<Icon
        name={focused
        ? 'ios-videocam'
        : 'ios-videocam-outline'}
        color={tintColor}
        size={28}/>)
    })
  }
})

const AccountTab = StackNavigator({
  Account: {
    screen: Account
  },
  AccountUpdate: {
    screen: AccountUpdate,
    navigationOptions: {
      headerTitle: '更新资料',
      headerStyle: headerStyle[Platform.OS],
      headerTintColor: '#fff',
      tabBarIcon: ({tintColor, focused}) => (<Icon
        name={focused
        ? 'ios-person'
        : 'ios-person-outline'}
        color={tintColor}
        size={28}/>),
      tabBarVisible: Platform.OS === 'android'
    }
  }
})

const barOptions = {
  ios: {
    tabBarPosition: 'bottom',
    lazyload: true,
    tabBarOptions: {
      width: width,
      height: 30,
      activeTintColor: '#ee735c',
      inactiveTintColor: '#666',
      showIcon: true,
      showLabel: true,
      labelStyle: {
        fontSize: 10
      },
      style: {
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
        backgroundColor: '#fff'
      }
    }
  },
  android: {
    tabBarPosition: 'top',
    lazyload: true,
    tabBarOptions: {
      activeTintColor: '#ee735c',
      inactiveTintColor: '#666',
      showIcon: true,
      showLabel: true,
      labelStyle: {
        fontSize: 16
      },
      indicatorStyle: {
        backgroundColor: '#ee735c'
      },
      style: {
        backgroundColor: '#fff'
      }
    }
  }
}

const Tabs = TabNavigator({
  ListTab: {
    screen: List,
    navigationOptions: {
      tabBarLabel: '狗狗说',
      headerTitle: '编辑视频',
      headerStyle: headerStyle[Platform.OS],
      headerTintColor: '#fff',
      tabBarIcon: ({tintColor, focused}) => (<Icon
        name={focused
        ? 'ios-videocam'
        : 'ios-videocam-outline'}
        color={tintColor}
        size={28}/>)
    }
  },
  EditTab: {
    screen: Edit,
    title: '理解狗狗，从配音开始',
    navigationOptions: {
      tabBarLabel: '来一段',
      headerTitle: '编辑视频',
      headerStyle: headerStyle[Platform.OS],
      headerTintColor: '#fff',
      tabBarIcon: ({tintColor, focused}) => (<Icon
        name={focused
        ? 'ios-mic'
        : 'ios-mic-outline'}
        color={tintColor}
        size={28}/>)
    }
  },
  AccountTab: {
    screen: AccountTab,
    navigationOptions: ({navigation}) => ({
      headerTitle: '狗狗账户',
      headerStyle: headerStyle[Platform.OS],
      headerTintColor: '#fff',
      tabBarLabel: '账户资料',
      tabBarIcon: ({tintColor, focused}) => (<Icon
        name={focused
        ? 'ios-person'
        : 'ios-person-outline'}
        color={tintColor}
        size={28}/>),
      headerRight: (
        <Text
          style={{
          color: '#fff',
          paddingRight: 10
        }}
          onPress={() => navigation.navigate('AccountUpdate')}>编辑</Text>
      )
    })
  }
}, barOptions[Platform.OS])

const SimpleApp = StackNavigator({
  Home: {
    screen: Tabs
  }
}, {
  headerMode: 'float',
});

export default SimpleApp