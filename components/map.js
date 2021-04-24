import React, { useState, useRef } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Button, TextInput } from 'react-native-paper';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import _ from 'lodash';
import exit from '../assets/exit.png';

const map = (props) => {
    const _map = React.useRef(null);
    const [turn, setturn] = React.useState(true);
    const [long1, setlong1] = React.useState(0);
    const [lat1, setlat1] = React.useState(0);
    const [long2, setlong2] = React.useState(0);
    const [lat2, setlat2] = React.useState(0);
    const [destination, setdestination] = React.useState();
    const [predictions, setpredictions] = React.useState([]);

    const placeMarker = (e) => {
        console.log(JSON.stringify(e.nativeEvent.coordinate));
        if (turn) {
            setlong1(e.nativeEvent.coordinate.longitude);
            setlat1(e.nativeEvent.coordinate.latitude);
            setturn(!turn);
        }
        else {
            setlong2(e.nativeEvent.coordinate.longitude);
            setlat2(e.nativeEvent.coordinate.latitude);
            setturn(!turn);
        }
    }


    const onChangeDestination = async (destination) => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyB3KTUmiBN2Us-YwmK0AAkCExMNP45iLN8
        &input=${destination}&location=33.87591643736262,35.53012076765299&radius=500`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            setpredictions(json.predictions);
        } catch (err) {
            console.error(err);
        }
    }

    const set = async (prediction) => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=name,geometry,rating,formatted_phone_number&key=AIzaSyB3KTUmiBN2Us-YwmK0AAkCExMNP45iLN8`;
        try {
            const res = await fetch(apiUrl);
            const json = await res.json();
            console.log(json);
            _map.current.animateToRegion(
                {
                    latitude: json.result.geometry.location.lat,
                    longitude: json.result.geometry.location.lng,
                    latitudeDelta: .01,
                    longitudeDelta: .01
                },
                350
            )
            setpredictions([]);
            setdestination('');
        } catch (err) {
            console.log(err);
        }
    }

    const confirm = async () => {
        props.setModalVisible(false);
        props.setlatlngdep([lat1, long1]);
        props.setlatlngarr([lat2, long2]);
        const apiUrl1 = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat1},${long1}&key=AIzaSyB3KTUmiBN2Us-YwmK0AAkCExMNP45iLN8`;
        const apiUrl2 = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat2},${long2}&key=AIzaSyB3KTUmiBN2Us-YwmK0AAkCExMNP45iLN8`;
        try {
            const res1 = await fetch(apiUrl1);
            const res2 = await fetch(apiUrl2);
            const json1 = await res1.json();
            const json2 = await res2.json();

            props.setstartlocation(json1.results[0].address_components[0].long_name);
            props.setendlocation(json2.results[0].address_components[0].long_name);
        } catch (err) {
            console.log(err);
        }
    }

    const predlist = [];
    for (let i = 0; i < predictions.length; i++) {
        predlist.push(<TouchableOpacity key={predictions[i].id} onPress={() => { set(predictions[i]) }}><Text key={predictions[i].id} style={styles.suggestions}> {predictions[i].description} </Text></TouchableOpacity>);
    }

    return (

        <View style={styles.container}>
            <MapView
                ref={_map}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                followsUserLocation={true}
                showsUserLocation={true}
                userInterfaceStyle='dark'
                showsTraffic={true}
                initialRegion={{
                    latitude: 33.87591643736262,
                    longitude: 35.53012076765299,
                    latitudeDelta: .2,
                    longitudeDelta: .2
                }}
                onLongPress={placeMarker}
            >
                <Marker
                    coordinate={{
                        latitude: lat1,
                        longitude: long1,
                    }}
                    pinColor={'#0E0B6E'}
                />
                <Marker
                    coordinate={{
                        latitude: lat2,
                        longitude: long2,
                    }}
                    pinColor={'#FE7568'}
                />
                <MapViewDirections
                    apikey='AIzaSyB3KTUmiBN2Us-YwmK0AAkCExMNP45iLN8'
                    origin={{
                        latitude: lat1,
                        longitude: long1,
                    }}

                    destination={{
                        latitude: lat2 || lat1,
                        longitude: long2 || long1,
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
            </MapView>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {props.setModalVisible(false)}}
            >
                <Image source={exit} style={{ width: 25, height: 25, resizeMode: 'stretch' }} />
            </TouchableOpacity>
            <TextInput
                placeholder="Search"
                style={styles.textInput}
                value={destination}
                onChangeText={(destination) => { setdestination(destination); onChangeDestination(destination); }}
            />
            {predlist}
            <Button
                onPress={confirm}
                mode="contained"
                style={styles.confirm}
            >
                Confirm
            </Button>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        position: 'absolute',
        top: -1,
        left: -1,
        bottom: -1,
        right: -1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18
    },
    modalView: {
        margin: 30,
        height: 700,
        width: 400,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    textInput: {
        marginLeft: 18,
        marginRight: 18,
        marginTop: 20,
        backgroundColor: "#EEF3FF",
        borderRadius: 30,
        borderTopEndRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30
    },
    suggestions: {
        backgroundColor: "#EEF3FF",
        padding: 5,
        fontSize: 15,
        borderWidth: 0.3
    },
    confirm: {
        color: "white",
        marginLeft: 130,
        marginTop: 650,
        backgroundColor: '#FE7568',
        borderRadius: 27,
        borderWidth: 10,
        justifyContent: 'center',
        position: 'absolute',
    },
    button: {
    }
});

export default map;