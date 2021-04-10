import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import moment from 'moment';
import DatePicker from "react-native-modal-datetime-picker";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function AddShipment(props) {
  const [Tok, setToken] = useState('');
  const [ID, setID] = useState('');
  const [title, settitle] = useState('');
  const [supervisornumber, setsupervisornumber] = useState('');
  const [supervisoremail, setsupervisoremail] = useState('');
  const [clientemail, setclientemail] = useState('');
  const [clientnumber, setclientnumber] = useState('');
  const [startlocation, setstartloaction] = useState('mans');
  const [endlocation, setendlocation] = useState('zahle');
  const [DepDate, setDepDate] = useState('');
  const [ArrDate, setArrDate] = useState('');
  const [status, setstatus] = useState('');
  const [temperaturehighest, settemperaturehighest] = useState('');
  const [temperaturelowest, settemperaturelowest] = useState('');
  const [vibrationhighest, setvibrationhighest] = useState('');
  const [vibrationlowest, setvibrationlowest] = useState('');
  const [humidityhighest, sethumidityhighest] = useState('');
  const [humiditylowest, sethumiditylowest] = useState('');

  const [ArrOrDep, setArrOrDep] = useState('');
  const [chosenDate, setchosenDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    const token = AsyncStorage.getItem('token');
    token.then(function (value) { setToken(value) });
  }, []);

  const submit = () => {
    let data = {
      ID,
      title,
      supervisornumber,
      clientemail,
      clientnumber,
      startlocation,
      endlocation,
      DepDate,
      ArrDate,
      status,
      temperaturehighest,
      temperaturelowest,
      vibrationhighest,
      vibrationlowest,
      humidityhighest,
      humiditylowest
    };
    console.log(data);
    axios.post('https://trucktrackserver.herokuapp.com/shipments', data, { headers: { 'Authorization': `Bearer ${Tok}`, "Content-Type": "application/json" } })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      if(data) {
        setID('');
        settitle('');
        settemperaturehighest('');
        setvibrationhighest('');
        sethumidityhighest('');
        settemperaturelowest('');
        setvibrationlowest('');
        sethumiditylowest('');
        setclientemail('');
        setsupervisornumber('');
        setclientnumber('');
        setsupervisoremail('');
        setArrDate('');
        setDepDate('');
        props.setmodal(false);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const showDatePickerDep = () => {
    setArrOrDep('Dep');
    setDatePickerVisibility(true);
  };

  const showDatePickerArr = () => {
    setArrOrDep('Arr');
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setchosenDate(moment(date).toISOString());
    hideDatePicker();
  };

  useEffect(() => {
    if (ArrOrDep == 'Dep') setDepDate(chosenDate);
    if (ArrOrDep == 'Arr') {
      if(chosenDate > DepDate) setArrDate(chosenDate);
    }
  }, [chosenDate]);

  return (
    <SafeAreaView >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} >
        <View behavior="position">
        <DatePicker
          isVisible={isDatePickerVisible}
          mode={'datetime'}
          timeIntervals={30}
          minimumDate = {new Date()}
          timeCaption="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          
        />


          <TextInput
            label='Shipment ID'
            style={styles.id}
            underlineColorAndroid="transparent"
            theme={{ colors: { primary: "blue" } }} 
            value={ID || ''}
            onChangeText={(ID) => setID(ID)}/>

          <TextInput
            label='Shipment Title '
            style={styles.titleship}
            underlineColorAndroid="transparent"
            theme={{ colors: { primary: "blue" } }} 
            value={title || ''}
            onChangeText={(title) => settitle(title)}/>


          <View>
            <Text style={styles.departure}>
              Departure
            </Text>
            <TouchableOpacity style={styles.item1} onPress={showDatePickerDep}>
              <Text
                style={styles.depart}>Set departure info</Text>
            </TouchableOpacity>
            <Text style={styles.date}>
              {moment(DepDate).format('DD-MM-YYYY  HH:mm')}
            </Text>  
            <Text style={styles.arrival}>
              Arrival
            </Text>

            <TouchableOpacity style={styles.item2} onPress={showDatePickerArr}>
              <Text
                style={styles.arrive}>Set arrival info</Text>
            </TouchableOpacity>
            <Text style={styles.date}>
              {moment(ArrDate).format('DD-MM-YYYY  HH:mm')}
            </Text>
          </View>

          <View>
            <Text style={styles.normal}>
              Normal Value Ranges
          </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <Text style={styles.vibration}>
                  Vibration
          </Text>
                <View style={styles.vibcontain}>
                  <Text style={styles.lowest}>
                    Lowest:
          </Text>
                  <TextInput
                    label='mV/g'
                    style={styles.vibvalue}
                    underlineColorAndroid="transparent"
                    theme={{ colors: { primary: "blue" } }} 
                    value={vibrationlowest || ''}
                    onChangeText={(vibrationlowest) => setvibrationlowest(vibrationlowest)}/>
                  <View>
                    <Text style={styles.highest}>
                      Highest
          </Text>
                    <TextInput
                      label='mV/g'
                      style={styles.vibhigh}
                      underlineColorAndroid="transparent"
                      theme={{ colors: { primary: "blue" } }} 
                      value={vibrationhighest || ''}
                      onChangeText={(vibrationhighest) => setvibrationhighest(vibrationhighest)}/>

                  </View>

                </View>

              </View>
              <View>
                <Text style={styles.vibration}>
                  Temperature
          </Text>
                <View style={styles.vibcontain}>
                  <Text style={styles.lowest}>
                    Lowest:
          </Text>
                  <TextInput
                    label='°C'
                    style={styles.vibvalue}
                    underlineColorAndroid="transparent"
                    theme={{ colors: { primary: "blue" } }} 
                    value={temperaturelowest || ''}
                      onChangeText={(temperaturelowest) => settemperaturelowest(temperaturelowest)}/>
                  <View>
                    <Text style={styles.highest}>
                      Highest
          </Text>
                    <TextInput
                      label='°C'
                      style={styles.vibhigh}
                      underlineColorAndroid="transparent"
                      theme={{ colors: { primary: "blue" } }} 
                      value={temperaturehighest || ''}
                      onChangeText={(temperaturehighest) => settemperaturehighest(temperaturehighest)}/>

                  </View>

                </View>

              </View>
              <View>
                <Text style={styles.vibration}>
                  Humidity
          </Text>
                <View style={styles.vibcontain}>
                  <Text style={styles.lowest}>
                    Lowest:
          </Text>
                  <TextInput
                    label='%'
                    style={styles.vibvalue}
                    underlineColorAndroid="transparent"
                    theme={{ colors: { primary: "blue" } }} 
                    value={humiditylowest || ''}
                      onChangeText={(humiditylowest) => sethumiditylowest(humiditylowest)}/>
                  <View>
                    <Text style={styles.highest}>
                      Highest
          </Text>
                    <TextInput
                      label='%'
                      style={styles.vibhigh}
                      underlineColorAndroid="transparent"
                      theme={{ colors: { primary: "blue" } }} 
                      value={humidityhighest || ''}
                      onChangeText={(humidityhighest) => sethumidityhighest(humidityhighest)}/>

                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

        </View>
        <View>
          <Text style={styles.contact}>
            Contact Info
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <Text style={styles.supervisor}>
                Shipment Supervisor
             </Text>
              <TextInput
                label='Email'
                style={styles.email}
                underlineColorAndroid="transparent"
                theme={{ colors: { primary: "blue" } }}
                value={supervisoremail || ''}
                onChangeText={(supervisoremail) => setsupervisoremail(supervisoremail)}/>

              <TextInput
                label='Phone Number'
                style={styles.phone}
                underlineColorAndroid="transparent"
                theme={{ colors: { primary: "blue" } }} 
                value={supervisornumber || ''}
                onChangeText={(supervisornumber) => setsupervisornumber(supervisornumber)}/>
            </View>

            <View>
              <Text style={styles.supervisor}>
                Client
            </Text>
              <TextInput
                label='Email'
                style={styles.email}

                underlineColorAndroid="transparent"
                theme={{ colors: { primary: "blue" } }} 
                value={clientemail || ''}
                onChangeText={(clientemail) => setclientemail(clientemail)}/>
              <TextInput
                label='Phone Number'
                style={styles.phone}

                underlineColorAndroid="transparent"
                theme={{ colors: { primary: "blue" } }} 
                value={clientnumber || ''}
                onChangeText={(clientnumber) => setclientnumber(clientnumber)}/>
            </View>


          </ScrollView>

          <Button
            mode="contained"
            style={styles.submit}
            onPress={submit}>
            Submit Shipment
      </Button>


        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contact: {
    color: "#0E0B6E",
    fontSize: 18,
    marginLeft: 45,
    marginTop: 40,
    fontWeight: 'bold'
  },
  submit: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 25,
    backgroundColor: '#FE7568',
    borderRadius: 27,
    borderWidth: 10
  },
  cancel: {
    borderColor: '#FE7568',
    backgroundColor: 'white',

    marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
    borderRadius: 27,
    borderWidth: 3,
    height: 45

  },
  supervisor: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 42,
    marginTop: 10,
    fontWeight: 'bold',
  },
  email: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    width: 250,
    backgroundColor: "#EEF3FF",
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30

  },
  phone: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    backgroundColor: "#EEF3FF",
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30

  },
  item1: {
    paddingLeft: 105,
    marginTop: -20
  },
  item2: {
    paddingLeft: 80
  },

  vibvalue: {
    marginLeft: 100,
    width: 100,
    marginTop: -28,
    height: 50,
    backgroundColor: "#EEF3FF",
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
  },
  vibhigh: {
    marginLeft: 100,
    width: 100,
    height: 50,
    marginTop: -30,
    backgroundColor: "#EEF3FF",
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
  },
  normal: {
    color: "#0E0B6E",
    fontSize: 20,
    marginLeft: 42,
    marginTop: 38,
    fontWeight: 'bold',
  },
  vibration: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 42,
    marginTop: 20,
    fontWeight: 'bold',
  },
  lowest: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 42,
    marginTop: 20,

  },
  highest: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 40,
    marginTop: 20,
  },
  id: {

    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    backgroundColor: "#EEF3FF",
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30
  },
  titleship: {

    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    backgroundColor: "#EEF3FF",
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30
  },
  departure: {
    color: "#0E0B6E",
    fontSize: 20,
    marginLeft: 42,
    marginTop: 38,
    fontWeight: 'bold',

  },
  arrival: {
    color: "#0E0B6E",
    fontSize: 20,
    marginLeft: 42,
    marginTop: 26,
    fontWeight: 'bold'
  },
  depart: {
    color: '#FE7568',
    marginLeft: 40,
  },
  arrive: {
    color: '#FE7568',
    marginLeft: 64,
    marginTop: -20
  },
  scrollView: {
    marginBottom:50
  },
  date: {
    marginLeft: 42,
    marginTop: 5,
    fontStyle: 'italic'
  }
});