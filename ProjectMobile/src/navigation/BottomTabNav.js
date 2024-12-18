import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
    console.log('Bottom tab nav params:', route)
    const pr = route.params;

    return (
        <Tab.Navigator initialRouteName='HomeScreen' screenOptions={{ tabBarActiveTintColor: 'white', tabBarInactiveBackgroundColor: '#343541', tabBarActiveBackgroundColor: '#201A18', tabBarShowLabel: false, headerShown: false, }}>
            <Tab.Screen name='HomeScreen' component={HomeScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home" color={color} size={size} />)
            }} />

            <Tab.Screen name='SearchScreen' component={SearchScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="search" color={color} size={size} />)
            }} />
            <Tab.Screen name='SettingsScreen' initialParams={pr} component={SettingsScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <IonIcons name="settings" color={color} size={size} />)
            }} />

        </Tab.Navigator>
    )
}