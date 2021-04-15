import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, Button, TouchableOpacity, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../assets/logo.png';
import addbtn from '../assets/Addbtn.png';
import logoutlogo from '../assets/logouticon.png';
import exit from '../assets/exit.png';
import axios from 'axios';
import ShipmentDetails from './ShipmentDetails';
import AddShipment from './AddShipment';

const Header = ({ navigation }) => {
    const [Tok, setToken] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [shipments, setshipments] = React.useState([]);

    React.useEffect(() => {
        const token = AsyncStorage.getItem('token');
        token.then(function (value) { 
            setToken(value);
            axios.get('https://trucktrackserver.herokuapp.com/shipments', { headers: { 'Authorization': `Bearer ${value}`, "Content-Type": "application/json" } })
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                setshipments(data);
            })
            .catch((error) => {
                console.error(error);
            });
        })
    }, [modalVisible]);

    const shipmentdetailArr = [];
    for (let i = 0; i < shipments.length; i++) {
        shipmentdetailArr.push(<ShipmentDetails {...shipments[i]} />);
    }

    const logout = async () => {
        axios.get('https://trucktrackserver.herokuapp.com/users/logout', { headers: { 'Authorization': `Bearer ${Tok}`, "Content-Type": "application/json" } })
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                AsyncStorage.removeItem('token');
                navigation.navigate('Welcome');
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
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image source={addbtn} style={{ width: 50, height: 50, resizeMode: 'stretch' }} />
                </TouchableOpacity>
            ),
            headerTitle: () => (
                <TouchableOpacity onPress={logout}>
                    <Image source={logoutlogo} style={{ width: 25, height: 25, resizeMode: 'stretch' }} />
                </TouchableOpacity>
            ),
            headerTitleContainerStyle: {
                paddingLeft: 250
            },
            headerLeftContainerStyle: {
                paddingLeft: 10
            }
        });
    }, 0);

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
            <Text style={styles.lineStyle}>Current Shipments</Text>
            {shipmentdetailArr}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>   
                            <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Image source={exit} style={{ width: 25, height: 25, resizeMode: 'stretch' }} />
                            </TouchableOpacity>
                            <Text style={styles.title}>
                                Add Shipment
                            </Text> 
                            <AddShipment setmodal={setModalVisible}/>
                        </View>
                    </View>
                </Modal>
            </View>
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
        fontSize: 25,
        fontWeight: '900',
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 30,
        height: 500,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        paddingLeft:300
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    name: {
        fontSize: 20,
        marginTop: -0,
        color: '#0E0B6E',
        fontWeight: "bold",
    },
    title: {
        color: "#0E0B6E",
        fontSize: 20,
        marginBottom: 10,
        textAlign: "center",
        fontWeight: 'bold'
      }
});

export default Header;