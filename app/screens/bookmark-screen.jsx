import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useApp } from "../contexts/AppContext";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const BookmarkScreen = () => {
  const { bookmarkedRestaurants, foodMenu, theme } = useApp();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  // Filter the foodMenu to show only bookmarked restaurants
  const bookmarkedItems = foodMenu.filter(item => bookmarkedRestaurants.includes(item.id));

  const handleListPress = (itemName) => {
    navigation.navigate('RestaurantList', { listName: itemName }); 
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
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
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 2,
      padding: 8,
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
    bookmarkButton: {
      marginLeft: 8,
    },
  });

  return (
    <View style={styles.safeArea}>
      <SafeAreaView style={styles.header}>
      <Text variant="h1" style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 'bold' }}>
        คอลเล็กชั่นของฉัน
        </Text>
      </SafeAreaView>

      <View style={{ paddingHorizontal: 8, marginVertical: 12 }}>
        <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', marginBottom: 8 }]}>
          ทำไมฟ้อนต์ Header ไม่มาไม่รู้แต่จะระเบิดแล้วT T
        </Text>
      </View>

      <FlatList
        data={bookmarkedItems}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleListPress(item.name)}>
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
            <TouchableOpacity style={styles.bookmarkButton}>
              <Ionicons name="bookmark" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default BookmarkScreen;
