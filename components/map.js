import React from 'react';
import { Image, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';



const map = () => {
    return (
        <View style={{ backgroundColor: '#fff' }}>
            <Text>MAPPP</Text>
            <MapView
                style={{ marginTop: 50 ,height: 200, width: '100%' }}
                provider={MapView.PROVIDER_GOOGLE}
                followsUserLocation={true}
                showsUserLocation={true}
                userInterfaceStyle='dark'
                showsTraffic={true}
            ></MapView>

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

export default map;