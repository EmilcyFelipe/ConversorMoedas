import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome5 } from "@expo/vector-icons";

export default function BarInput({ cList, realValue, modifyRealValue }) {
  //Array with response objects
  const [currency, setCurrency] = useState(cList);

  //Value of Currency in Real
  const [valueCurrency, setValueCurrency] = useState();

  const pickerRef = useRef();

  const inputRef = useRef();

  //Converted value
  const [convertedCurrency, setConvertedCurrency] = useState(null);

  useEffect(() => {
    setValueCurrency(cList[0].value);
  }, []);

  const moedas = currency.map((item) => (
    <Picker.Item
      color="#cbcbcb"
      key={item.label}
      label={item.label}
      value={item.value}
    />
  ));

  function convert(value) {
    modifyRealValue(parseFloat(value) * valueCurrency);
  }

  useEffect(() => {
    modifyRealValue(parseFloat(inputRef.current.value) * valueCurrency);
    convert(convertedCurrency);
  }, [valueCurrency]);

  return (
    <View style={styles.container}>
      <FontAwesome5 name="coins" size={24} color="#fff" />
      <Picker
        ref={pickerRef}
        selectedValue={valueCurrency}
        style={{ width: 120, height: 20, borderRadius: 20 }}
        itemStyle={{ color: "blue" }}
        dropdownIconColor='#fff'
        onValueChange={(itemValue, itemIndex) => {
          setValueCurrency(itemValue);
        }}
      >
        {moedas}
      </Picker>
      <TextInput
        autoFocus={true}
        keyboardType="numeric"
        ref={inputRef}
        onChangeText={(text) => {
          setConvertedCurrency(text);
          convert(text);
        }}
        value={convertedCurrency}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 40,
    borderWidth: 2,
    borderColor: "#971A1A",
    borderRadius: 10,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff'
  },
});
