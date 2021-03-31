import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import wlc from '../assets/wlc.png';
import { Button } from 'react-native-paper';


const Welcome = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: '#fff' }}>
            <Text style={styles.truck} > Welcome To Truck Track</Text>
            <Text style={styles.slogan} >Delivering happiness to you </Text>
            <Image source={wlc} style={styles.wlc} />
            <Button onPress={() => navigation.navigate('SignUp')}
                mode="contained"
                style={styles.create}>
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

        </View>
    )
}

const styles = StyleSheet.create({
    wlc: {
        marginTop: 80,
        bottom: 0,
        width: '90%',
        height: '40%',
        marginLeft: 20,
        resizeMode: 'stretch'
    },
    truck: {
        color: "#0E0B6E",
        fontSize: 25,
        marginLeft: 48,
        marginTop: 10,
        fontWeight: 'bold'
    },
    slogan: {
        color: "#0E0B6E",
        fontSize: 10,
        marginLeft: 125,
        marginTop: 3,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    create: {
        marginLeft: 18,
        marginRight: 18,
        marginTop: 28,
        backgroundColor: '#FE7568',
        borderRadius: 27,
        borderWidth: 10
    },
    login: {
        fontSize: 18,
        marginLeft: 250,
        color: '#FE7568',
        marginTop: -20
    },
    question: {
        fontSize: 15,
        paddingLeft: 70,
        marginTop: 60

    },

});

export default Welcome;