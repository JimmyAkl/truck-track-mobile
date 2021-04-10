import React, { Component } from 'react';
import { ScrollView, SafeAreaView, Text, View, StyleSheet, LayoutAnimation, Platform, UIManager, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import btn from '../assets/btn.png';
import map from '../assets/map.png';
import btn2 from '../assets/btn2.png';
import truck1 from '../assets/truck1.png';
import truck2 from '../assets/truck2.png';
import truck3 from '../assets/truck3.png';
import graph from '../assets/Graph.png';
import moment from 'moment';

const ShipmentDetails = (props) => {
  const [expanded, setexpanded] = React.useState(false)
  const [dropdown, setdropdown] = React.useState(false);

  const changeLayout = () => {
    setdropdown(!dropdown);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded(!expanded);
  }

    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} >
          <View style={styles.container}>


            <Text style={styles.title}>
              {props.title}
            </Text>

            <TouchableOpacity onPress={changeLayout}>
              <Image source={btn2} style={{width: 23, height: 15,marginLeft: 270,marginTop: -20,
                      transform: [{ rotate: dropdown? '180deg' : '0deg'}]}} />

            </TouchableOpacity>


            <Text style={styles.id}>
              ID
          </Text>
            <Text style={styles.inputid}>
              {props.ID}
          </Text>
            <Image source={map} style={{ width: 300, height: 170, resizeMode: 'stretch', marginLeft: 10, marginTop: 30 }} />


            <View style={{ height: expanded ? null : 0, overflow: 'hidden' }}>
              <Text style={styles.departure}>
                Departure
          </Text>
              <Text style={styles.date}>
                Date
          </Text>
              <Text style={styles.inputdate}>
                {moment(props.DepDate).format('DD-MM-YYYY')}
          </Text>
              <Text style={styles.date}>
                Time
          </Text>
              <Text style={styles.inputdate}>
                {moment(props.DepDate).format('HH:mm')}
          </Text>
              <Text style={styles.date}>
                Location
          </Text>
              <Text style={styles.inputdate}>
                {props.startlocation}
          </Text>
              <View>
                <Text style={styles.departure}>
                  Arrival
          </Text>
                <Text style={styles.date}>
                  Date
          </Text>
                <Text style={styles.inputdate}>
                  {moment(props.ArrDate).format('DD-MM-YYYY')}
          </Text>
                <Text style={styles.date}>
                  Time
          </Text>
                <Text style={styles.inputdate}>
                {moment(props.ArrDate).format('HH:mm')}
          </Text>
                <Text style={styles.date}>
                  Location
          </Text>
                <Text style={styles.inputdate}>
                  {props.endlocation}
          </Text>

              </View>
              <View style={styles.dateupdate}>

                <Text style={styles.update}>
                  Update values every
                  </Text>
                <Text style={styles.inputupdate}>
                  15 min
                  </Text>
                <TouchableOpacity>
                  <Image source={btn2} style={{ width: 10, height: 8, resizeMode: 'stretch', marginTop: -12, marginLeft: 225 }} />
                </TouchableOpacity>

              </View>
              <View style={styles.containtruck} >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                  <View>
                    <Image source={truck1} style={{ width: 80, height: 50, resizeMode: 'stretch', marginTop: 20, marginLeft: 30 }} />
                    <Text style={styles.id}>
                      ID
                    </Text>
                    <Text style={styles.inputid}>
                      2021037-1
                    </Text>
                    <Text style={styles.date}>
                      Vibrarion
                    </Text>
                    <Text style={styles.inputdate}>
                      100 mV/g
                    </Text>
                    <Text style={styles.date}>
                      Temperature
                    </Text>
                    <Text style={styles.inputdate}>
                      22 °C
                    </Text>
                    <Text style={styles.date}>
                      Humidity
                    </Text>
                    <Text style={styles.inputdate}>
                      32%
                    </Text>
                    <Text style={styles.geolocation}>
                      33° 49’ 47.7876’’
                    </Text>

                  </View>
                  <View>
                    <Image source={truck2} style={{ width: 80, height: 50, resizeMode: 'stretch', marginTop: 20, marginLeft: 30 }} />
                    <Text style={styles.id}>
                      ID
                    </Text>
                    <Text style={styles.inputid}>
                      2021037-2
                    </Text>
                    <Text style={styles.date}>
                      Vibrarion
                    </Text>
                    <Text style={styles.inputdate}>
                      100 mV/g
                    </Text>
                    <Text style={styles.date}>
                      Temperature
                    </Text>
                    <Text style={styles.inputdate}>
                      22 °C
                    </Text>
                    <Text style={styles.date}>
                      Humidity
                    </Text>
                    <Text style={styles.inputdate}>
                      32%
                    </Text>
                    <Text style={styles.geolocation}>
                      33° 49’ 47.7876’’
                    </Text>

                  </View>

                  <View>
                    <Image source={truck3} style={{ width: 80, height: 50, resizeMode: 'stretch', marginTop: 20, marginLeft: 30 }} />
                    <Text style={styles.id}>
                      ID
                    </Text>
                    <Text style={styles.inputid}>
                      2021037-3
                    </Text>
                    <Text style={styles.date}>
                      Vibration
                    </Text>
                    <Text style={styles.inputdate}>
                      100 mV/g
                    </Text>
                    <Text style={styles.date}>
                      Temperature
                    </Text>
                    <Text style={styles.inputdate}>
                      22 °C
                    </Text>
                    <Text style={styles.date}>
                      Humidity
                    </Text>
                    <Text style={styles.inputdate}>
                      32%
                    </Text>
                    <Text style={styles.geolocation}>
                      33° 49’ 47.7876’’
                    </Text>

                  </View>

                </ScrollView>
              </View>
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Image source={graph} style={{ width: 300, height: 200, resizeMode: 'stretch', marginLeft: 30, marginTop: 30 }} />
                </ScrollView>
              </View>
              <View>
                <Text style={styles.contactinfo}>
                  Contact Info
             </Text>
              </View>

              <View style={styles.containercontact}>
                <Text style={styles.client}>
                  Client:
              </Text>
                <Text style={styles.phonenumber}>
                  {props.clientnumber}
              </Text>
                <Text style={styles.emailclient}>
                  {props.clientemail}
              </Text>

              </View>
              <View style={styles.containercontact}>
                <Text style={styles.client}>
                  Supervisor:
              </Text>
                <Text style={styles.phonenumber}>
                  {props.supervisornumber}
              </Text>
                <Text style={styles.emailclient}>
                  {props.supervisoremail}
              </Text>

              </View>

              <Button mode="contained" style={styles.edit}> Edit Shipment Details </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {

    borderRadius: 21,
    width: 329,
    marginLeft: 20,
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,

  },




  id: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 30
  },
  departure: {
    color: "#0E0B6E",
    fontSize: 20,
    marginLeft: 30,
    marginTop: 30,
    fontWeight: 'bold'
  },
  date: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 30,
    marginTop: 5,
    fontWeight: 'bold'
  },
  inputdate: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 60,
    fontWeight: 'bold',
    paddingLeft: 65,
    marginTop: -17
  },
  inputid: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 50,
    marginTop: -18
  },
  text: {
    fontSize: 17,
    color: 'black',
    padding: 10
  },

  title: {
    color: "#0E0B6E",
    fontSize: 20,
    marginLeft: 30,
    marginTop: 40,
    fontWeight: 'bold'
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },
  containtruck: {
    marginTop: 10

  },
  title: {
    color: "#0E0B6E",
    fontSize: 20,
    marginLeft: 30,
    marginTop: 40,
    fontWeight: 'bold'
  },
  id: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 30
  },
  inputid: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 50,
    marginTop: -18
  },

  inputdate: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 60,
    fontWeight: 'bold',
    paddingLeft: 65,
    marginTop: -17
  },
  containercontact: {
    marginTop: 5
  }
  ,
  update: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 30,
    marginTop: -5


  },
  inputupdate: {
    fontSize: 15,
    marginLeft: 175,
    color: "#0E0B6E",
    fontWeight: 'bold',
    marginTop: -18
  },

  dateupdate: {
    marginTop: 30
  },
  geolocation: {
    color: '#FE7568',
    fontSize: 15,
    marginLeft: 30,
    marginTop: 10

  },
  contactinfo: {
    color: "#0E0B6E",
    fontSize: 20,
    marginLeft: 30,
    marginTop: 30,
    fontWeight: 'bold'
  },
  client: {
    color: '#414667',
    fontSize: 15,
    marginLeft: 30,
    marginTop: 10,
    fontWeight: 'bold'
  },
  phonenumber: {
    fontSize: 14,
    marginLeft: 30,
    marginTop: 5,
    color: "#0E0B6E",

  },
  emailclient: {
    fontSize: 14,
    marginLeft: 32,
    color: "#0E0B6E",

  },
  edit: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 35,
    backgroundColor: '#FE7568',
    borderRadius: 27,
    borderWidth: 5,

  }

});
export default ShipmentDetails;