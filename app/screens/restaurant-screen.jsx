import { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { db } from '../configs/firebase-config';
import { collection, getDocs } from "firebase/firestore"; 
import { useApp } from "../contexts/AppContext"; 

const RestaurantScreen = () => {
  const { theme, bookmarkedRestaurants, toggleBookmark } = useApp(); //bookmark toggle
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "restaurants")); 
        const restaurantList = [];
        querySnapshot.forEach((doc) => {
          restaurantList.push({ id: doc.id, ...doc.data() });
        });
        setRestaurants(restaurantList); 
      } catch (error) {
        console.error("Error fetching restaurants: ", error);
      }
    };

    fetchData();
  }, []); 

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
          data={restaurants} // Use Firestore data
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <View style={styles.itemTextContainer}>
                <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{item.title}</Text>
                <Text style={[styles.text, { fontSize: 14, color: 'gray' }]}>{item.description}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="star" size={16} color="red" />
                  <Text style={[styles.text, { fontSize: 14, color: 'red', marginLeft: 4 }]}>{item.rating || 5.0}</Text>
                  <Text style={[styles.text, { fontSize: 14, color: 'gray', marginLeft: 8 }]}>
                    {item.reviews || 15} รีวิว
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                style={{ marginRight: 8 }} 
                onPress={() => toggleBookmark(item.id)} 
              >
                <Ionicons 
                  name={bookmarkedRestaurants.includes(item.id) ? "bookmark" : "bookmark-outline"} 
                  size={24} 
                  color={theme.colors.primary} 
                />
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

export default RestaurantScreen;
