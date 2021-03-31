import React from 'react';
import { Image, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import addbtn from '../assets/Addbtn.png';
import profile from '../assets/profile.png';

const HeaderUser = ({ navigation }) => {
  return (
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
  )
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
  }
});

export default HeaderUser;