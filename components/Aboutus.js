import { setStatusBarHidden, StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { TouchableOpacity, KeyboardAvoidingView, SafeAreaView, ScrollView, Image } from 'react-native';

import aboutuspic from '../assets/about_us1.png';
import visionpic from '../assets/about_us2.png';
import logo from '../assets/logo.png';
import servicepic from '../assets/about_us3.png';

export default function Aboutus({ navigation }) {
    setTimeout(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                    <Image source={logo} style={{ width: 100, height: 50, resizeMode: 'stretch' }} />
                </TouchableOpacity>
            )
            , headerRight: () => (
                <TouchableOpacity>
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

        <SafeAreaView behavior="position" style={{ backgroundColor: '#fff', flex:1 }} >
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} >
                <Text
                    style={styles.title}>Truck Track</Text>

                <Text
                    style={styles.aboutus}
                > Is a supply chain tracking and monitoring system
                    that allows
                    supply chain managers to monitor in real-time
                    their cargo movement and inventory Our system allows real-time location-tracking, storage environment monitoring,
                    and predicting the transportation and the arrival of the product.
      </Text>

                <Image source={aboutuspic} style={styles.aboutpic} />

                <Text
                    style={styles.vision}>Vision</Text>

                <Text
                    style={styles.mission}
                > We are the Truck-Track supply chain team. We will provide best in class services that are innovative and strategically focused to the clients and the communities we serve. We will
                    accomplish our goals in a responsive and cost effective manner to ensure ongoing viability and success of our supply chain mission.
      </Text>

                <Image source={visionpic} style={styles.visionpic} />

                <Text
                    style={styles.customer}
                >Customer Service
      </Text>
                <Text
                    style={styles.service}>We are here to help!</Text>

                <Image source={servicepic} style={styles.servicepic} />
            </ScrollView>
        </SafeAreaView>


    );
};
const styles = StyleSheet.create({
    title: {
        color: "#0E0B6E",
        fontSize: 35,
        marginLeft: 30,
        marginTop: 40
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
    aboutus: {
        color: "#414667",
        fontSize: 15,
        marginLeft: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    aboutpic: {
        width: 190,
        height: 150,
        marginLeft: 120,
        marginTop: 20
    },
    vision: {
        color: "#0E0B6E",
        fontSize: 35,
        paddingLeft: 20

    },
    visionpic: {
        width: 190,
        height: 150,
        marginLeft: 30,
        marginTop: 20
    },
    mission: {
        color: "#414667",
        fontSize: 15,
        marginLeft: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    customer: {
        color: "#0E0B6E",
        fontSize: 25,
        paddingLeft: 20,
        marginTop: 30

    },
    servicepic: {
        width: 190,
        height: 150,
        marginLeft: 140,
        marginTop: 20
    },
    service: {
        color: "#414667",
        fontSize: 15,
        marginLeft: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }

});