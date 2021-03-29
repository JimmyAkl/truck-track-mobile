import { setStatusBarHidden, StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView, ScrollView, Image } from 'react-native';
import phone from '../assets/phone.png';
import email from '../assets/email.png';
import location from '../assets/location.png';
import footer from '../assets/footer.png';

const Contactus = () => {
  return (

    <SafeAreaView behavior="position" >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} >

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


        <Image source={footer} style={styles.footer} />

      </ScrollView>
    </SafeAreaView>


  );
};
const styles = StyleSheet.create({
  title: {
    color: "#0E0B6E",
    fontSize: 35,
    marginLeft: 30,
    marginTop: 190
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,

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
  }
  ,
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