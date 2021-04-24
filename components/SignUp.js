import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { TouchableOpacity, KeyboardAvoidingView, Image, ActivityIndicator } from 'react-native';
import Footer from './Footer';
import logo from '../assets/logo.png';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const SignUp = ({ navigation }) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [admin, setadmin] = useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  const signup = () => {
    let data = {
      username,
      password,
      admin
    };
    console.log(data);
    axios.post('https://trucktrackserver.herokuapp.com/users/signup', data, { headers: { "Content-Type": "application/json" } })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        if (data.success) {
          setusername('');
          setpassword('');
          navigation.navigate('SignIn');
        }
        else {
          alert(res.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setTimeout(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Image source={logo} style={{ width: 100, height: 50, resizeMode: 'stretch' }} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.push('About')}>
          <Text style={styles.text}>about us</Text>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <TouchableOpacity onPress={() => navigation.push('Contact')}>
          <Text style={styles.text}>contact us</Text>
        </TouchableOpacity>
      ),
      headerRightContainerStyle: {
        paddingRight: 10
      },
      headerTitleContainerStyle: {
        paddingLeft: 140
      }
    });
  }, 0);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View behavior="position" style={{ backgroundColor: '#fff', flex: 1 }} >
      <Text
        style={styles.title}>Create Account</Text>

      <TextInput
        label='Email'
        style={styles.email}
        theme={{ colors: { primary: "blue" } }}
        value={username || ''}
        onChangeText={(username) => setusername(username)}
      />

      <TextInput
        label='Password'
        secureTextEntry={true}
        style={styles.password}
        theme={{ colors: { primary: "blue" } }}
        underlineColorAndroid="transparent"
        value={password || ''}
        onChangeText={(password) => setpassword(password)}
      />

      <Button
        mode="contained"
        style={styles.create}
        onPress={signup}>
        Create Account
      </Button>

      <Text
        style={styles.question}
      >Already have a account ?
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text
          style={styles.login}
        >Login</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
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
  create: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
    backgroundColor: '#FE7568',
    borderRadius: 27,
    borderWidth: 10
  },
  question: {
    fontSize: 15,
    paddingLeft: 105,
    marginTop: 50
  },
  login: {
    fontSize: 18,
    marginLeft: 280,
    color: '#FE7568',
    marginTop: -20
  },
  text: {
    color: '#0E0B6E',
    fontFamily: 'Cochin',
    fontSize: 13,
    textTransform: 'uppercase',
  }
});

export default SignUp;