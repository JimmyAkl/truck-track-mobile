import React from 'react';
import { ScrollView,Image, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import addbtn from '../assets/Addbtn.png';
import profile from '../assets/profile.png';
import ShipmentDetails from './ShipmentDetails';

const Header = ({ navigation }) => {
    navigation.setOptions({
        headerLeft:() => (
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Image source={logo} style={{ width: 100, height: 50, resizeMode: 'stretch' }} />
          </TouchableOpacity>
        ),
        headerRight:() => (
            <TouchableOpacity>
                <Image source={addbtn} style={{ width: 50, height: 50, resizeMode: 'stretch' }} />
            </TouchableOpacity>
        ),
        headerTitle:() => (
            <TouchableOpacity>
                    <Image source={profile} style={{ width: 25, height: 25, resizeMode: 'stretch' }} />
            </TouchableOpacity>
        ),
        headerTitleContainerStyle: {
            paddingLeft: 250
        },
      headerLeftContainerStyle: {
          paddingLeft: 10
      }
      });
    return (
        <ScrollView showsVerticalScrollIndicator={false} style= {{backgroundColor: '#fff'}}> 
            <Text style={styles.lineStyle}>Current Shipments</Text>
            <ShipmentDetails/>
            <ShipmentDetails/>
        </ScrollView>
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
        paddingLeft: 150
    },
    item2: {
        paddingLeft: 20
    },
    lineStyle: {
        height: 50,
        paddingTop: 10,
        backgroundColor: '#0E0B6E',
        color: 'white',
        fontFamily: 'Cochin',
        fontSize: 25,
        fontWeight: '900',
        textAlign: 'center'
    }
});

export default Header;