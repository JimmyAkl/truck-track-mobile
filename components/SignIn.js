import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import Footer from './Footer';
import logo from '../assets/logo.png';

const SignIn = ({ history }) => {
  return (
    <View behavior="position" >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => history.goBack()}>
          <Image source={logo} style={{ width: 100, height: 50, resizeMode: 'stretch' }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item1}>
          <Text style={styles.text}>about us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item2} onPress={() => history.push('/contactus')}>
          <Text style={styles.text}>contact us</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={styles.title}>Welcome Back!</Text>

      <TextInput
        label='Email'
        style={styles.email}
        theme={{ colors: { primary: "blue" } }}


      />
      <TextInput
        label='Password'
        secureTextEntry={true}
        style={styles.password}
        theme={{ colors: { primary: "blue" } }}
        underlineColorAndroid="transparent"

      />
      <Button onPress={() => history.push('/shipment')}
        mode="contained"
        style={styles.login}>
        Log In
      </Button>

      <Text
        style={styles.question}
      >New here?
      </Text>

      <TouchableOpacity onPress={() => history.push('/')}>
        <Text
          style={styles.create}
        >Create Account</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    paddingLeft: 20,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  item1: {
    paddingLeft: 110
  },
  item2: {
    paddingLeft: 20
  },
  text: {
    color: '#0E0B6E',
    fontFamily: 'Cochin',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  title: {
    color: "#0E0B6E",
    fontSize: 35,
    marginLeft: 90,
    marginTop: 90
  },
  email: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
    backgroundColor: "#EEF3FF",
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30
  },
  password: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
    backgroundColor: "#EEF3FF",
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30
  },
  login: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
    backgroundColor: '#FE7568',
    borderRadius: 27,
    borderWidth: 10
  },
  question: {
    fontSize: 15,
    paddingLeft: 120,
    marginTop: 50

  },
  create: {
    fontSize: 15,
    marginLeft: 200,
    color: '#FE7568',
    marginTop: -18
  }
});

export default SignIn;