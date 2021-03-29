import React from 'react';
import { Image, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import footer from '../assets/footer.png';

const Footer = () => {
  return (
    <View>
      <Image source={footer} style={styles.footer} />
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 120,
    bottom: 0,
    width: 490,
    height: 80,
    marginLeft: -26,
    resizeMode: 'stretch'
  }
});

export default Footer;