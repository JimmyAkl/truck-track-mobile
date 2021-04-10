import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Footer from './Footer';
import { SafeAreaView, ScrollView, Image } from 'react-native';

import phone from '../assets/phone.png';
import email from '../assets/email.png';
import location from '../assets/location.png';
import logo from '../assets/logo.png';

const Contactus = ({ navigation }) => {
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
        <TouchableOpacity>
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
    <View style={{ backgroundColor: '#fff', flex:1 }} >
      <View style={styles.scrollView} >

        <Text
          style={styles.title}>Let's Get In Touch</Text>

        <Text
          style={styles.contact}
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultrices pharetra lorem et scelerisque.
      </Text>

        <Text style={styles.number}>+961 1 234 567</Text>
        <Image source={phone} style={styles.phonepic} />

        <Text style={styles.email}>info@trucktrack.com</Text>
        <Image source={email} style={styles.emailpic} />

        <Text style={styles.location}>Hazmieh,Beirut Lebanon</Text>
        <Image source={location} style={styles.locationpic} />
      </View>
      <Footer/>
    </View>

  );
};
const styles = StyleSheet.create({
  title: {
    color: "#0E0B6E",
    fontSize: 35,
    marginLeft: 30,
    marginTop: 60
  },
  scrollView: {
    backgroundColor: 'white',
  },
  text: {
    color: '#0E0B6E',
    fontFamily: 'Cochin',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  contact: {
    color: "#414667",
    fontSize: 15,
    marginLeft: 30,
    marginTop: 20
  }
  ,
  footer: {
    width: 400,
    height: 60,
    marginTop: 90,
    marginLeft: -23,
    resizeMode: 'stretch'
  },
  phonepic: {
    width: 50, height: 50,
    marginTop: -40,
    resizeMode: 'stretch',
    marginLeft: 30,
  },
  number: {
    color: '#0E0B6E',
    fontSize: 20,
    marginLeft: 100,
    marginTop: 35
  },
  email: {
    color: '#0E0B6E',
    fontSize: 20,
    marginLeft: 100,
    marginTop: 40
  },
  location: {
    color: '#0E0B6E',
    fontSize: 20,
    marginLeft: 100,
    marginTop: 40

  },
  emailpic: {
    width: 50, height: 50,
    resizeMode: 'stretch',
    marginLeft: 30,
    marginTop: -40
  },
  locationpic: {
    width: 50, height: 50,
    resizeMode: 'stretch',
    marginLeft: 30,
    marginTop: -40
  },
});

export default Contactus;