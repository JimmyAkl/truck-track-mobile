import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Header from './components/Header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import ShipmentDetails from './components/ShipmentDetails';
import Contactus from './components/Contactus';
import HeaderUser from './components/HeaderUser';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

export default function App() {
  return (
    <NativeRouter>
      <View>
        <Switch>
          <Route exact path='/' component={SignUp}/>
          <Route exact path='/signin' component={SignIn}/>
          <Route exact path='/shipment' component={Header}/>
          <Route exact path='/contactus' component={Contactus}/>
        </Switch>
      </View>
    </NativeRouter>
  );
}