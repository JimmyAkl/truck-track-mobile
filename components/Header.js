import React from 'react';
import { ScrollView, Image, StyleSheet, LayoutAnimation,Text, View, Button, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../assets/logo.png';
import addbtn from '../assets/Addbtn.png';
import logoutlogo from '../assets/logouticon.png';
import exit from '../assets/exit.png';
import axios from 'axios';
import ShipmentDetails from './ShipmentDetails';
import AddShipment from './AddShipment';
import moment from 'moment';

const Header = ({ navigation }) => {
    const [Tok, setToken] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
    const [shipments, setshipments] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [expanded, setexpanded] = React.useState(false);
    const [dropdown, setdropdown] = React.useState(false);
    const [selectedcategory, setselectedcategory] = React.useState("Current Shipments");
    const [complaint, setcomplaint] = React.useState(false);

    const changeLayout = () => {
        setdropdown(!dropdown);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setexpanded(!expanded);
    }

    React.useEffect(() => {
        setIsLoading(true);
        const token = AsyncStorage.getItem('token');
        token.then(function (value) { 
            setToken(value);
            axios.get('https://trucktrackserver.herokuapp.com/shipments', { headers: { 'Authorization': `Bearer ${value}`, "Content-Type": "application/json" } })
            .then((res) => res.data)
            .then((data) => {
                setshipments(data);
            })
            .catch((error) => {
                console.error(error);
            });
        });
        setIsLoading(false);
    }, [modalVisible, selectedcategory]);

    var shipmentdetailArr = [];
    const shipmentPrevious = [];
    const shipmentCurrent = [];
    const shipmentUpcoming =[];

    for (let i = 0; i < shipments.length; i++) {
        if (moment(shipments[i].DepDate).format('DD-MM-YYYY') < moment(new Date()).format('DD-MM-YYYY'))
            shipmentPrevious.push(<ShipmentDetails key = {shipments[i].ID} {...shipments[i]} />);
        if (moment(shipments[i].DepDate).format('DD-MM-YYYY') > moment(new Date()).format('DD-MM-YYYY'))
            shipmentUpcoming.push(<ShipmentDetails key = {shipments[i].ID} {...shipments[i]} />);
        if (moment(shipments[i].DepDate).format('DD-MM-YYYY') == moment(new Date()).format('DD-MM-YYYY'))
            shipmentCurrent.push(<ShipmentDetails key = {shipments[i].ID} {...shipments[i]} />);
    }

    if (selectedcategory == "Previous Shipments") shipmentdetailArr = shipmentPrevious;
    if (selectedcategory == "Upcoming Shipments") shipmentdetailArr = shipmentUpcoming;
    if (selectedcategory == "Current Shipments") shipmentdetailArr = shipmentCurrent;


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

    React.useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      }, []);

    if (isLoading) {
        return(
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size='large'/>
          </View>
        );
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
            
            <TouchableOpacity onPress={changeLayout}>
                <Text style={styles.lineStyle}>{selectedcategory}</Text>
                {/* <Image source={btn2} style={{width: 23, height: 15,marginLeft: 320,marginTop: -20,
                      transform: [{ rotate: dropdown? '180deg' : '0deg'}]}} /> */}

            </TouchableOpacity>
            <View style={{ height: expanded ? null : 0, overflow: 'hidden' }}>
                <TouchableOpacity 
                    onPress={() => {setselectedcategory("Previous Shipments");changeLayout();}}
                >
                    <Text 
                        style={[selectedcategory == "Previous Shipments" ? styles.lineStylePressed : styles.lineStyle]}
                    >
                        Previous Shipments
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {setselectedcategory("Current Shipments");changeLayout();}}
                >
                        <Text 
                            style={[selectedcategory == "Current Shipments" ? styles.lineStylePressed : styles.lineStyle]}
                        >
                            Current Shipments
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {setselectedcategory("Upcoming Shipments");changeLayout();}}
                >
                    <Text 
                        style= {[selectedcategory == "Upcoming Shipments" ? styles.lineStylePressed : styles.lineStyle]}
                    >
                        Upcoming Shipments
                    </Text>
                </TouchableOpacity>
            </View>
            
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
    lineStylePressed: {
        height: 50,
        paddingTop: 10,
        backgroundColor: '#6864de',
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