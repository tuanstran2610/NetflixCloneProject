import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigator from './BottomTabNav';
import MoviesVideoPlayer from '../screens/MoviesVideoPlayer';
import MovieDetails from '../screens/MovieDetails';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer> 
            <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
                <Stack.Screen name="MovieDetails" component={MovieDetails} />
                <Stack.Screen name="MoviesVideoPlayer" component={MoviesVideoPlayer} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}