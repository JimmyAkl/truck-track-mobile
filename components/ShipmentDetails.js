import React, { Component } from 'react';
import { ScrollView, SafeAreaView, Text, View, StyleSheet, LayoutAnimation, Platform, UIManager, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import btn from '../assets/btn.png';
import map from '../assets/map.png';
import truck from '../assets/img7.png';
import btn2 from '../assets/btn2.png';
import truck1 from '../assets/truck1.png';
import truck2 from '../assets/truck2.png';
import truck3 from '../assets/truck3.png';
import graph from '../assets/Graph.png';
import moment from 'moment';
import warning from '../assets/warning.png';
import Chart from '../components/charts';

const ShipmentDetails = (props) => {
  const [duration, setduration] = React.useState('');
  const [late, setlate] = React.useState(false);
  const [expanded, setexpanded] = React.useState(false)
  const [dropdown, setdropdown] = React.useState(false);
  const [alert, setalert] = React.useState(false);
  var res = '';

  const changeLayout = () => {
    setdropdown(!dropdown);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded(!expanded);
  }

  const ETA = async () => {
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lastupdatecoord[0]},${lastupdatecoord[1]}&destinations=${props.latlngarr[0]},${props.latlngarr[1]}&departure_time=now&key=AIzaSyB3KTUmiBN2Us-YwmK0AAkCExMNP45iLN8`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      res = json.rows[0].elements[0].duration_in_traffic.text.split(' ');
      if (res.length == 2) {
        var date = new Date();
        date = new Date(date.getTime() + res[0] * 60000);
        setduration(date);
        setlate(date.getTime() >  new Date(props.ArrDate).getTime()); 
      }
      if (res.length == 4) {

      }
    } catch (err) {
      console.error(err);
    }
  }
  const updates = [];
  var lastupdatecoord = [0, 0];

  for (let i = 0; i < props.updates.length; i++) {
    lastupdatecoord = [parseFloat(props.updates[props.updates.length - 1].latitude), parseFloat(props.updates[props.updates.length - 1].longitude)];
    if (alert == false) {
      if ((props.updates[i].temperature < props.temperaturelowest) || (props.updates[i].temperature > props.temperaturehighest)) setalert(true);
      if ((props.updates[i].humidity < props.humiditylowest) || (props.updates[i].humidity > props.humidityhighest)) { setalert(true); }
    }
    updates.push(<View key={props.updates[i].Number}>
      <Image source={truck1} style={{ width: 80, height: 50, resizeMode: 'stretch', marginTop: 20, marginLeft: 30 }} />
      <Image source={warning} style={{ height: 0 }} />
      <Text style={styles.id}>
        ID
      </Text>
      <Text style={styles.inputid}>
        {props.updates[i].Number}
      </Text>
      <Text style={styles.date}>
        Vibrarion
      </Text>
      <Text style={styles.inputdate}>
        {props.updates[i].vibration}
      </Text>
      <Text style={styles.date}>
        Temperature
      </Text>
      <Text style={styles.inputdate}>
        {props.updates[i].temperature}
      </Text>
      <Image source={warning} style={[((props.updates[i].temperature < props.temperaturelowest) || (props.updates[i].temperature > props.temperaturehighest)) ? { marginTop: -17, marginLeft: 250 } : { height: 0 }]} />
      <Text style={styles.date}>
        Humidity
      </Text>
      <Text style={styles.inputdate}>
        {props.updates[i].humidity}%

      </Text>
      <Image source={warning} style={[((props.updates[i].humidity < props.humiditylowest) || (props.updates[i].humidity > props.humidityhighest)) ? { marginTop: -17, marginLeft: 250 } : { height: 0 }]} />
      <Text style={styles.geolocation}>
        lat: {props.updates[i].latitude} lng: {props.updates[i].longitude}
      </Text>

    </View>)
  }
    React.useEffect(() => {
      if (lastupdatecoord[0] != 0 && props.latlngdep != []) {
        ETA();
      }
    }, [props]);
 
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} >
        <View style={styles.container}>


          <Text style={styles.title}>
            {props.title}
          </Text>

          <TouchableOpacity onPress={changeLayout}>
            <Image source={btn2} style={{
              width: 23, height: 15, marginLeft: 270, marginTop: -20,
              transform: [{ rotate: dropdown ? '180deg' : '0deg' }]
            }} />

          </TouchableOpacity>

          <Image source={warning} style={[(alert) ? { marginTop: -20, marginLeft: 130 } : { height: 0 }]} />

          <Text style={styles.id}>
            ID
          </Text>

          <Text style={styles.inputid}>
            {props.ID}
          </Text>

          <MapView
            style={{ marginLeft: 20, width: 280, height: 120 }}
            provider={PROVIDER_GOOGLE}
            followsUserLocation={true}
            showsUserLocation={true}
            userInterfaceStyle='dark'
            showsTraffic={true}
            scrollEnabled={false}
            initialRegion={{
              latitude: props.latlngdep[0] || 33.87591643736262,
              longitude: props.latlngdep[1] || 35.53012076765299,
              latitudeDelta: .2,
              longitudeDelta: .2
            }}
          >
            {/* <Marker
              coordinate={{
                latitude: props.latlngdep[0],
                longitude: props.latlngdep[1],
              }}
              pinColor={'#0E0B6E'}
            />

            <Marker
              coordinate={{
                latitude: props.latlngarr[0],
                longitude: props.latlngarr[1],
              }}
              pinColor={'#0E0B6E'}
            /> */}
            <MapViewDirections
              apikey='AIzaSyB3KTUmiBN2Us-YwmK0AAkCExMNP45iLN8'
              origin={{
                latitude: props.latlngdep[0] || 33.87591643736262,
                longitude: props.latlngdep[1] || 35.53012076765299,
              }}

              destination={{
                latitude: lastupdatecoord[0] || 33.87591643736262,
                longitude: lastupdatecoord[1] || 35.53012076765299,
              }}
              strokeWidth={3}
              strokeColor={'#FE7568'}
              optimizeWaypoints
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={result => {
                console.log(`routing complete, distance is: ${result.distance}`);

              }}
              onError={(errorMessage) => {
                //console.log(`GOT AN ERROR: ${errorMessage}`);
              }}
            />

            <Marker
              coordinate={{
                latitude: lastupdatecoord[0],
                longitude: lastupdatecoord[1],
              }}
              pinColor={'#0E0B6E'}
            >
              <Image source={truck} style={{ width: 35, height: 30 }} />

            </Marker>
          </MapView>
          <Text style={{marginLeft: 32  , marginTop: 5}}>ETA:</Text>
          <Text style={{marginLeft: 70, marginTop: -17, fontStyle: 'italic', color: late ? 'red' : 'green' }}>{moment(duration).format('DD/MM/YYYY HH:mm')} </Text>


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
                {updates}
              </ScrollView>
            </View>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Chart {...props.updates} />
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
            <TouchableOpacity>
              <Text style={[(alert) ? {
                height: null, marginLeft: 100, marginTop: 20, color: '#FE7568',
                fontSize: 15
              } : { height: 0 }]}> File a complaint </Text>
            </TouchableOpacity>
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
    marginLeft: 65,
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
    marginTop: 10,
    marginBottom: 20
  },
  contactinfo: {
    color: "#0E0B6E",
    fontSize: 20,
    marginLeft: 30,
    marginTop: 30,
    fontWeight: 'bold',
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
    marginTop: 15,
    backgroundColor: '#FE7568',
    borderRadius: 27,
    borderWidth: 5,

  }

});
export default ShipmentDetails;