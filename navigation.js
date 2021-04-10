import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Header from './components/Header';
import Contact from './components/Contactus';
import Welcome from './components/Welcome';
import About from './components/Aboutus';

import logo from './assets/logo.png';

const NavigatorStack = createStackNavigator();

const HomeScreen = () => {
    return (
        <NavigatorStack.Navigator
            screenOptions={{
                headerLeft: () => (
                    <TouchableOpacity>
                        <Image source={logo} style={{ width: 100, height: 50, resizeMode: 'stretch' }} />
                    </TouchableOpacity>
                ),
                headerLeftContainerStyle: {
                    paddingLeft: 10
                },
                headerTitle: null,
                headerStyle: {
                    backgroundColor: '#fff',
                    borderBottomWidth: 0,
                    shadowColor: 'transparent',
                    height: 200,
                }
            }}
        >
            <NavigatorStack.Screen name="SignIn" component={SignIn} options={{ gestureEnabled: false, swipeEnabled: false, animationEnabled: false, }} />
            <NavigatorStack.Screen name="Header" component={Header} options={{ gestureEnabled: false, swipeEnabled: false, animationEnabled: false, }} />
            <NavigatorStack.Screen name="Welcome" component={Welcome} options={{ gestureEnabled: false, swipeEnabled: false, animationEnabled: false, }} />
            <NavigatorStack.Screen name="SignUp" component={SignUp} options={{ gestureEnabled: false, swipeEnabled: false, animationEnabled: false, }} />
            <NavigatorStack.Screen name="Contact" component={Contact} options={{ gestureEnabled: false, swipeEnabled: false, animationEnabled: false, }} />
            <NavigatorStack.Screen name="About" component={About} options={{ gestureEnabled: false, swipeEnabled: false, animationEnabled: false, }} />
        </NavigatorStack.Navigator>
    );
}

export default () => (
    <NavigationContainer>
        <HomeScreen />
    </NavigationContainer>
);