import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { TouchableOpacity, KeyboardAvoidingView, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Footer from './Footer';
import logo from '../assets/logo.png';
import axios from 'axios';


const SignIn = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const token = AsyncStorage.getItem('token');
  token.then(function(value) {
    if (value != null) {
    navigation.navigate('Header');
    }
  });
  
  const login = async () => {
    setIsLoading(true);
    let data = {
      username,
      password
    };
    console.log(data);
    axios.post('https://trucktrackserver.herokuapp.com/users/login', data, {headers:{"Content-Type" : "application/json"}})
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      if (data.success) {
        setusername('');
        setpassword('');
        navigation.navigate('Header');
        AsyncStorage.setItem('token', data.token); 
      }
      else {
        alert(res.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
    setIsLoading(false); 
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    );
  }

  setTimeout(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Image source={logo} style={{ width: 100, height: 50, resizeMode: 'stretch' }} />
        </TouchableOpacity>
      ), headerRight: () => (
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

  return (
    <View behavior="position" style={{ backgroundColor: '#fff', flex:1 }} >
      <Text
        style={styles.title}>Welcome Back!</Text>

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
      <Button onPress={() => navigation.push('Header')}
        mode="contained"
        style={styles.login}
        onPress={login}
      >
        Log In
      </Button>

      <Text
        style={styles.question}
      >New here?
      </Text>

      <TouchableOpacity onPress={() => navigation.push('SignUp')}>
        <Text
          style={styles.create}
        >Create Account</Text>
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
  }, text: {
    color: '#0E0B6E',
    fontFamily: 'Cochin',
    fontSize: 13,
    textTransform: 'uppercase',
  }
});

export default SignIn;