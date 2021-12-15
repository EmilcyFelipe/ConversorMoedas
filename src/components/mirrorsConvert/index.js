import React, { useEffect, useRef, useState } from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons'; 


export default function MirrorsConvert({cList, realValue}){
    //Array with response objects
    const [currency, setCurrency] = useState(cList);

    //Value of Currency in Real
    const [valueCurrency, setValueCurrency] = useState();


    const pickerRef = useRef();

    //Converted value
    const [ convertedCurrency, setConvertedCurrency ] = useState(null);
    
    useEffect(()=>{ 
        setValueCurrency(cList[0].value);
    },[])

    useEffect(()=>{
        let va = (realValue/valueCurrency).toFixed(2);
        setConvertedCurrency(va>0?`${va}`:'');
    },[realValue, valueCurrency]);
   
    const moedas = currency.map((item)=>(<Picker.Item  color='#cbcbcb' key={item.label} label={item.label} value={item.value}/>));


    
    return(
        <View style={styles.container}>
            <FontAwesome5 name="coins" size={24} color="#fff" />
            <Picker
            ref={pickerRef}
            selectedValue={valueCurrency}
            style={{width: 120, height: 20, borderRadius: 20}}
            dropdownIconColor='#fff'
            onValueChange={(itemValue, itemIndex)=>
                setValueCurrency(itemValue)
            }
            >
                {moedas}
            </Picker>
            <Text style={styles.output}>{convertedCurrency}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 40,
        borderWidth: 2,
        borderColor: '#1A971F',
        borderRadius: 10,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        paddingHorizontal:10
    },
    output:{
        fontSize: 16,
        color: '#fff'
    }
});