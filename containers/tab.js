/**
 * @flow
 */

import React from 'react';
import { Text, Button, ScrollView } from 'react-native';
import { SafeAreaView, StackNavigator, TabNavigator } from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

import List from './creation';
import Detail from './detail';
import Comment from './comment';
import Edit from './edit';
import Account from './account';
import AccountUpdate from './accountUpdate';

/* Account: {
    screen: Account,
    navigationOptions: ({ navigation }) => ({
        headerTitle: '狗狗的账户',
        headerStyle: headerStyle[Platform.OS],
        headerTintColor: '#fff',
        headerRight: (
            <Text
                style={{ color: '#fff', paddingRight: 10 }}
                onPress={() => navigation.navigate('AccountUpdate')}
            >
                编辑
            </Text>
        ),
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
                name={focused ? 'ios-person' : 'ios-person-outline'}
                color={tintColor}
                size={28}
            />
        )
    })
}, */

const TabNav = TabNavigator(
    {
        MainTab: {
            screen: List,
            path: '/',
            navigationOptions: {
                title: '狗狗说',
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-home' : 'ios-home-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        },
        EditTab: {
            screen: Edit,
            path: '/',
            navigationOptions: {
                title: '理解狗狗，从配音开始',
                headerTitle: '编辑视频',
                tabBarLabel: '来一段',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-mic' : 'ios-mic-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
        },
        SettingsTab: {
            screen: Account,
            path: '/settings',
            navigationOptions: ({ navigation, screenProps }) => ({
                title: '我的',
                tabBarLabel: 'Account',
                headerRight: (
                    <Text
                        style={{ color: '#ee735c', paddingRight: 10 }}
                        onPress={() => navigation.navigate('AccountUpdate')}
                    >
                        编辑
                    </Text>
                ),
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-settings' : 'ios-settings-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            })
        }
    },
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#ee735c'
        },
        animationEnabled: false,
        swipeEnabled: false
    }
);

const StacksOverTabs = StackNavigator({
    Root: {
        screen: TabNav
    },
    AccountUpdate: {
        screen: AccountUpdate,
        navigationOptions: {
            title: '更新资料'
        }
    }
    // ,
    // NotifSettings: {
    //     screen: MyNotificationsSettingsScreen,
    //     navigationOptions: {
    //         title: 'Notifications'
    //     }
    // },
    // Profile: {
    //     screen: MyProfileScreen,
    //     path: '/people/:name',
    //     navigationOptions: ({ navigation }) => {
    //         title: `${navigation.state.params.name}'s Profile!`;
    //     }
    // }
});

export default StacksOverTabs;
