import { useState } from "react";
import { View, StyleSheet, TextInput, FlatList, Image } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../contexts/AppContext";
import { Ionicons } from "@expo/vector-icons";

const RestaurantScreen = () => {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>กูทำไม่เป็นนะ</Text>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,               // Take up the full screen
      justifyContent: 'center',  // Center content vertically
      alignItems: 'center',  // Center content horizontally
      backgroundColor: '#f0f0f0', // Light gray background color
    },
    text: {
      fontSize: 18,          // Font size of the text
      color: '#333',         // Text color (dark gray)
    },
});

export default RestaurantScreen