import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

export default function App() {
  
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <FontAwesome name="balance-scale" size={80} color="#CBCBCB" />
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
    borderRadius:150/2,
    borderColor: '#CBCBCB',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  }
});
