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

const MyNavScreen = ({ navigation, banner }) => (
    <ScrollView>
        <SafeAreaView forceInset={{ horizontal: 'always' }}>
            <Text>{banner}</Text>
            <Button
                onPress={() =>
                    navigation.navigate('Profile', { name: 'Jordan' })
                }
                title="Open profile screen"
            />
            <Button
                onPress={() => navigation.navigate('NotifSettings')}
                title="Open notifications screen"
            />
            <Button
                onPress={() => navigation.navigate('SettingsTab')}
                title="Go to settings tab"
            />
            <Button onPress={() => navigation.goBack(null)} title="Go back" />
        </SafeAreaView>
    </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
    <MyNavScreen banner="Home Screen" navigation={navigation} />
);

const MyProfileScreen = ({ navigation }) => (
    <MyNavScreen
        banner={`${navigation.state.params.name}s Profile`}
        navigation={navigation}
    />
);

const MyNotificationsSettingsScreen = ({ navigation }) => (
    <MyNavScreen banner="Notifications Screen" navigation={navigation} />
);

const MySettingsScreen = ({ navigation }) => (
    <MyNavScreen banner="Settings Screen" navigation={navigation} />
);

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
            navigationOptions: {
                title: '我的',
                tabBarLabel: 'Account',
                tabBarIcon: ({ tintColor, focused }) => (
                    <Ionicons
                        name={focused ? 'ios-settings' : 'ios-settings-outline'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                )
            }
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
    NotifSettings: {
        screen: MyNotificationsSettingsScreen,
        navigationOptions: {
            title: 'Notifications'
        }
    },
    Profile: {
        screen: MyProfileScreen,
        path: '/people/:name',
        navigationOptions: ({ navigation }) => {
            title: `${navigation.state.params.name}'s Profile!`;
        }
    }
});

export default StacksOverTabs;
