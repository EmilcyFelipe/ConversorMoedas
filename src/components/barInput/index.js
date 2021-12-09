import React, { useEffect, useRef, useState } from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-ico-flags';


export default function BarInput({cList}){
    
    const [currency, setCurrency] = useState(cList);
    const [selectedCurrency, setSelectedCurrency] = useState();
    const pickerRef = useRef();
    const [ convertedCurrency, setConvertedCurrency ] = useState(null);

    useEffect(()=>{
        console.log(currency);
    },[]);
   
    const moedas = currency.map((item)=>(<Picker.Item  color='#cbcbcb' key={item.label} label={item.label} value={item.value}/>));
    return(
        <View style={styles.container}>
            {selectedCurrency==='Real' && <Icon name='slovenia'/>}
            <Icon name='slovenia'/>
            <Picker
            ref={pickerRef}
            selectedValue={selectedCurrency}
            style={{width: 120, height: 20, borderRadius: 20}}
            
            itemStyle={{color:"blue"}}
            onValueChange={(itemValue, itemIndex)=>
                setSelectedCurrency(itemValue)
            }
            >
                {moedas}
            </Picker>
            <TextInput keyboardType='numeric' value={convertedCurrency} style={styles.input}/>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '90%',
        height: 40,
        borderWidth: 2,
        borderColor: '#971A1A',
        borderRadius: 10,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        paddingHorizontal:10
    },
    input:{
        backgroundColor: 'red',
        flex: 1,
        fontSize: 16,
    }
});