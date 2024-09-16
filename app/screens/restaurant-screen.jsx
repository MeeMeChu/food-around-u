import { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../contexts/AppContext";
import { Ionicons } from "@expo/vector-icons";

const foodMenu = [
  {
    id: '1',
    name: "ข้าวหมูเด้ง",
    description: "ปิ๊งป่อง",
    rating: 5.0,
    reviews: 15,
    image: require('./../../assets/images/image1.png'),
  },
  {   
    id: '2',
    name: "ข้าวกุ้งเด้ง",
    description: "ปิ๊งป่อง",
    rating: 5.0,
    reviews: 15,
    image: require('./../../assets/images/image2.png'),
  },
  {
    id: '3',
    name: "ข้าวปลาเด้ง",
    description: "ปิ๊งป่อง",
    rating: 5.0,
    reviews: 15,
    image: require('./../../assets/images/image3.png'),
  },
  {
    id: '4',
    name: "ข้าวไก่เด้ง",
    description: "ปิ๊งป่อง",
    rating: 5.0,
    reviews: 15,
    image: require('./../../assets/images/image4.png'),
  },
  {
    id: '5',
    name: "ข้าวสุดหล่อเด้ง",
    description: "ปิ๊งป่อง",
    rating: 5.0,
    reviews: 15,
    image: require('./../../assets/images/image5.jpg'),
  },
];

const RestaurantScreen = () => {
  const { theme } = useApp();
  const [search, setSearch] = useState("");
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
    },
    inputContainer: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 8,
    },
    textInput: {
      flex: 1,
      paddingVertical: 8,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      marginHorizontal: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 2, 
    },
    image: {
      width: 80,
      height: 80,
      marginRight: 8,
    },
    itemTextContainer: {
      flex: 1,
      padding: 8,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 8,
      borderRadius: 8,
    },
  });

  return (
    <View style={styles.safeArea}>
      <SafeAreaView style={styles.header}>
        <Text variant="h1" style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 'bold' }}>
          ร้านอาหาร
        </Text>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={24} color="gray" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="ค้นหาร้านอาหาร"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity>
            <Ionicons name="filter" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={{ paddingHorizontal: 8, marginVertical: 12 }}>
        <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', marginBottom: 8 }]}>
          เลือกร้านอาหารสำหรับคุณ
        </Text>
        <FlatList
          data={foodMenu} 
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{item.name}</Text>
                <Text style={[styles.text, { fontSize: 14, color: 'gray' }]}>{item.description}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="star" size={16} color="red" />
                  <Text style={[styles.text, { fontSize: 14, color: 'red', marginLeft: 4 }]}>{item.rating}</Text>
                  <Text style={[styles.text, { fontSize: 14, color: 'gray', marginLeft: 8 }]}>{item.reviews} รีวิว</Text>
                </View>
              </View>
              <TouchableOpacity style={{ marginRight: 8 }}>
                <Ionicons name="bookmark-outline" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};


export default RestaurantScreen