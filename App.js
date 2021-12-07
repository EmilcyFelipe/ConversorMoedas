import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import BarInput from './src/components/barInput';
import { Ionicons, AntDesign } from '@expo/vector-icons';


export default function App() {
  const [currencyElements, setCurrencyElements] = useState([]);

  const currencyItems = currencyElements.map(()=>(<BarInput/>));

  function addCurrency(){
    setCurrencyElements([...currencyElements,'item'])
  }
  function subtract(){
    let items = Array.from(currencyElements);
    items.pop();
    setCurrencyElements(items);
  }
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <FontAwesome name="balance-scale" size={80} color="#CBCBCB" />
      </View>
      <View style={styles.elementsWrapper}>
        <BarInput/>
        {currencyItems}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.addItem} onPress={addCurrency}>
            <Ionicons name="add-circle-outline" size={50} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addItem} onPress={subtract}>
            <AntDesign name="minuscircleo" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
  },
  logoWrapper:{
    width: 150,
    height: 150,
    borderRadius: 150/2,
    borderColor: '#CBCBCB',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  elementsWrapper:{
    alignItems: 'flex-end',
    flex: 1,
  },
  actions:{
    flexDirection: 'row',
    alignItems: 'center'
  }
});
