import { StatusBar } from 'expo-status-bar';
import React from 'react';
import btn2 from '../assets/btn2.png';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, LayoutAnimation, Image} from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLegend, VictoryTheme } from 'victory-native';

const Charts = (props) => {
  const [dropdown, setdropdown] = React.useState(false);
  const [expanded, setexpanded] = React.useState(false);
  const [selectedcategory, setselectedcategory] = React.useState('Humididty');
  
  var planned = [];
  var result = [];
  if (Object.keys(props).length != 0) {
    result = Object.keys(props).map(key => (props[key]));
    for (let i = 0; i < result.length; i++) {
      if (selectedcategory == 'Temperature') {
        planned.push({ x: i, y: result[i].temperature });
      }
      if (selectedcategory == 'Humidity') {
        planned.push({ x: i, y: result[i].humidity });

      }
      if (selectedcategory == 'Vibration') {
        planned = [];
      }
    }
  }
  const data = {
    planned,
  };

  const changeLayout = () => {
    setdropdown(!dropdown);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setexpanded(!expanded);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeLayout}>
        <Text style = {styles.lineStyle}>{selectedcategory}</Text>
        <Image source={btn2} style={{width: 18, height: 12,marginLeft: 90,marginTop: -13,
                      transform: [{ rotate: dropdown? '180deg' : '0deg'}]}} />
      </TouchableOpacity>
      <View style={{ height: expanded ? null : 0, overflow: 'hidden' }}>
                <TouchableOpacity 
                    onPress={() => {setselectedcategory("Temperature");changeLayout();}}
                >
                    <Text 
                        style={[selectedcategory == "Temperature" ? styles.lineStylePressed : styles.lineStyle]}
                    >
                        Temperature
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {setselectedcategory("Humidity");changeLayout();}}
                >
                        <Text 
                            style={[selectedcategory == "Humidity" ? styles.lineStylePressed : styles.lineStyle]}
                        >
                            Humidity
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {setselectedcategory("Vibration");changeLayout();}}
                >
                    <Text 
                        style= {[selectedcategory == "Vibration" ? styles.lineStylePressed : styles.lineStyle]}
                    >
                        Vibration
                    </Text>
                </TouchableOpacity>
            </View>
            

      <VictoryChart theme={VictoryTheme.material} >
        <VictoryAxis label= {selectedcategory == 'Temperature' ? "Degre" : "%"} />
        <VictoryAxis dependentAxis label= {selectedcategory}
          style={{
            axisLabel: { padding: 35 },
          }} />
        <VictoryGroup offset={20}>
          <VictoryBar barWidth={({ index }) => index * 2 + 20} data={data.planned}
            style={{ data: { fill: '#FE7568' }, }} />
        </VictoryGroup>
        <VictoryLegend
          x={Dimensions.get('screen').width / 2 - 100}
          orientation="horizontal"
          data={
            [
              {
                name: selectedcategory,
                symbol: {
                  fill: '#FE7568',
                },
              },
            ]
          } />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineStyle: {
    marginRight: 300,
    paddingTop: 10,
    color: '#0E0B6E',
    textAlign: 'center'
},
lineStylePressed: {
    marginRight: 300,
    paddingTop: 10,
    color: '#6864de',
    textAlign: 'center'
}
});

export default Charts;