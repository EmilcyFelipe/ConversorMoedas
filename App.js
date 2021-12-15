import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  TouchableOpacity,
  View, 
  StatusBar, 
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import BarInput from './src/components/barInput';
import MirrorsConvert from './src/components/mirrorsConvert'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import api from './src/services/api'


export default function App() {
  
  const [currencyElementsActive, setCurrencyElementsActive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ currencyList, setCurrencyList ] = useState([]);
  const [ realValue, setRealValue ] = useState(null);

  useEffect(()=>{
    async function loadCurrency(){
      const response = await api.get('all');
      let listCurrency = [];
      Object.keys(response.data).map((key)=>{
        listCurrency.push({
          key: key,
          label: key,
          value: response.data[key].ask,
        })
      });
      listCurrency.push({
        key: 'BRL',
        label: 'BRL',
        value: 1,
      })
      listCurrency.sort(function(a,b){
        return(a.key>b.key)? 1 : ((b.key > a.key)? -1 : 0);
      })
      setCurrencyList(listCurrency);
    }
    loadCurrency();
    setCurrencyElementsActive([...currencyElementsActive,'item'])
    setLoading(false);
  },[]);

  const currencyItems = currencyElementsActive.map((item, index)=>(
  <MirrorsConvert key={index} cList={currencyList} realValue={realValue} modifyRealValue={setRealValue}/>
  ));
  
  function addCurrency(){
    setCurrencyElementsActive([...currencyElementsActive,'item'])
  }
  function subtract(){
    let items = Array.from(currencyElementsActive);
    items.pop();
    setCurrencyElementsActive(items);
  }

  if(loading){
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
         <ActivityIndicator size="large" color="#00ff00" />
      </View>
    )
  }else{
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <View style={styles.logoWrapper}>
          <FontAwesome name="balance-scale" size={80} color="#CBCBCB" />
        </View>
         { currencyList.length>0 && <BarInput cList={currencyList} realValue={realValue} modifyRealValue={setRealValue}/>}
        <ScrollView contentContainerStyle={{alignItems: 'flex-end'}}  style={styles.elementsWrapper}>
          {currencyList.length>0 && currencyItems}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.addItem} onPress={addCurrency}>
              <Ionicons name="add-circle-outline" size={50} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addItem} onPress={subtract}>
              <AntDesign name="minuscircleo" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
 
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
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  
  },
  actions:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  addItem:{
    margin: 5
  }

});
