import React from 'react'
import { Text } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Movie from './movie'
import Chart from './chart'
import Detail from './detail'
import MovieDetail from './movieDetail'
import Comment from './comment'
import Edit from './edit'
import Account from './account'
import AccountUpdate from './accountUpdate'

const addNewProps = (WrappedComponent, newProps) => {
  return class WrappingComponent extends React.Component {
    render () {
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}

const TabBarIcon = ({ tintColor, focused, defaultIcon, focusedIcon }) => (
  <Ionicons
    name={focused ? defaultIcon : focusedIcon}
    size={26}
    style={{ color: tintColor }}
  />
)

const tabBarIcon = (d, f) => ({ tintColor, focused }) => {
  const Hoc = addNewProps(TabBarIcon, { tintColor, focused })
  return <Hoc defaultIcon={d} focusedIcon={f} />
}

const headerAttr = {
  headerStyle: {
    backgroundColor: '#777'
  },
  headerTitleStyle: {
    color: '#eee'
  }
}

const TabNav = TabNavigator(
  {
    MainTab: {
      screen: Movie,
      path: '/',
      navigationOptions: {
        title: '爱看广告',
        tabBarLabel: 'Home',
        ...headerAttr,
        tabBarIcon: tabBarIcon('ios-home', 'ios-home-outline')
      }
    },
    ChartTab: {
      screen: Chart,
      path: '/',
      navigationOptions: {
        title: '图表',
        tabBarLabel: 'Chart',
        ...headerAttr,
        tabBarIcon: tabBarIcon('ios-stats', 'ios-stats-outline')
      }
    },
    EditTab: {
      screen: Edit,
      path: '/',
      navigationOptions: {
        title: '理解狗狗，从配音开始',
        headerTitle: '编辑视频',
        tabBarLabel: '来一段',
        ...headerAttr,
        tabBarIcon: tabBarIcon('ios-mic', 'ios-mic-outline')
      }
    },
    SettingsTab: {
      screen: Account,
      path: '/settings',
      navigationOptions: ({ navigation }) => ({
        title: '我的',
        tabBarLabel: 'Account',
        ...headerAttr,
        headerRight: (
          <Text
            style={{ color: '#eeeeee', paddingRight: 10 }}
            onPress={() => navigation.navigate('AccountUpdate')}
          >
            编辑
          </Text>
        ),
        tabBarIcon: tabBarIcon('ios-settings', 'ios-settings-outline')
      })
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      inactiveTintColor: '#aaa',
      activeTintColor: '#eee',
      style: {
        backgroundColor: '#777'
      }
    },
    animationEnabled: false,
    swipeEnabled: false
  }
)

const StacksOverTabs = StackNavigator({
  Root: {
    screen: TabNav
  },
  AccountUpdate: {
    screen: AccountUpdate,
    navigationOptions: {
      title: '更新资料'
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.rowData.author.nickname} 的创意`
    })
  },
  MovieDetail: {
    screen: MovieDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.rowData.author.nickname} 的广告`
    })
  },
  Comment: {
    screen: Comment,
    navigationOptions: {
      title: '评论'
    }
  }
})

export default StacksOverTabs
