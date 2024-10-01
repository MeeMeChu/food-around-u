import React, { useEffect, useState } from 'react'
import { 
    SafeAreaView, 
    TextInput, 
    View, 
    TouchableOpacity, 
    FlatList, 
    Image, 
    ScrollView,
    RefreshControl, 
} from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';

import createRestaurantStyles from './styles/restaurant-style';
import { useApp } from '../contexts/AppContext';
import { db } from '../configs/firebase-config';
import { useAuth } from '../contexts/AuthContext';
import { addBookmark, checkIfBookmarked, removeBookmark } from '../utils/bookmark';

const RestaurantScreen = ({ navigation }) => {

    const auth = useAuth();
    const { theme } = useApp();
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState('');
    const [restaurantsList ,setRestaurantsList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด'); // เก็บหมวดหมู่ที่เลือก
    const [loading, setLoading] = useState(true);


    const categories = ['ทั้งหมด','บุฟเฟต์', 'ก๋วยเตี๋ยว', 'ของหวาน', 'อาหารตามสั่ง'];

    const filteredRestaurants = restaurantsList.filter(item =>
        (selectedCategory === 'ทั้งหมด' || item.category === selectedCategory) &&
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const fetchRestaurants = async () => {
        try {   
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, 'restaurants'));
            const docsData = await Promise.all(querySnapshot.docs.map(async doc => {
                const restaurantData = {
                    id: doc.id,
                    ...doc.data(),
                    created_at: doc.data().created_at ? dayjs(doc.data().created_at.toDate()).format('DD/MM/YYYY') : null,
                    updated_at: doc.data().updated_at ? dayjs(doc.data().updated_at.toDate()).format('DD/MM/YYYY') : null
                };
                
                // Check if the restaurant is bookmarked by the user
                const isBookmarked = await checkIfBookmarked(restaurantData.id, auth);
                restaurantData.bookmarked = isBookmarked;

                return restaurantData;
            }));

            setRestaurantsList(docsData);
            // console.log("Fetched Food: ", docsData);
        } catch (error) {
            console.error("Error fetching collection data: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, [auth?.userLoggedIn]);

    const onRefresh = async () => {
        setRefreshing(true);  // เริ่มการรีเฟรช
        await fetchRestaurants();  // ดึงข้อมูลใหม่
        setRefreshing(false); // จบการรีเฟรช
    };

    const handleBookmark = async (restaurant) => {
        if (!auth?.currentUser || !auth?.currentUser?.uid) {
            // console.error("User not logged in or UID is undefined");
            return;
        }

        const updatedRestaurants = [...restaurantsList];
        const restaurantIndex = updatedRestaurants.findIndex(r => r.id === restaurant.id);

        if (restaurant.bookmarked) {
            await removeBookmark(restaurant.id, auth);
        } else {
            await addBookmark(restaurant, auth);
        }

        // Toggle the bookmark status in the local state
        updatedRestaurants[restaurantIndex].bookmarked = !restaurant.bookmarked;
        setRestaurantsList(updatedRestaurants);
    };
        
    const styles = createRestaurantStyles(theme);

    return (
        <View style={styles.safeArea}>
            <SafeAreaView style={styles.header}>
                <View style={styles.headerContainer}>
                    <Text variant="h1" style={{ color: '#FFEB3B' }}>
                        ร้านอาหาร
                    </Text>
                    <Text 
                        style={{
                            fontFamily: theme.fonts.regular.fontFamily,
                            fontSize: 14,
                            color: '#fff'
                        }}
                    >
                        รายการร้านอาหาร
                    </Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="search" size={24} color="gray" style={styles.icon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="ค้นหาร้านอาหาร"
                            value={search}
                            onChangeText={(text) => setSearch(text)}
                        />
                    </View>
                </View>
            </SafeAreaView>


            <View style={[styles.container, { marginTop: 8, flex: 1}]}>
                <Text style={[styles.text, { fontSize: 20 }]}>
                    เลือกร้านอาหารสำหรับคุณ
                </Text>
                
                <View>
                    <ScrollView 
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {categories.map((category, index) => (
                                <TouchableOpacity 
                                    key={index}
                                    onPress={() => setSelectedCategory(category)}
                                    style={{
                                        backgroundColor: selectedCategory === category ? theme.colors.primary : '#e1e1e1',
                                        padding: 8,
                                        borderRadius: 8,
                                        marginRight: 8,
                                        marginVertical: 8
                                    }}
                                >
                                    <Text style={{ color: selectedCategory === category ? theme.colors.secondary : '#333', fontSize: 14 }}>{category}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                </View>

                { loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                    </View>
                ) : (
                <FlatList
                    data={filteredRestaurants}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={async () => {
                                try {
                                    // Reference ไปยังเอกสารร้านอาหารใน Firestore
                                    const restaurantRef = doc(db, 'restaurants', item.id);
                        
                                    updateDoc(restaurantRef, {
                                        views: item.views + 1
                                    });
                        
                                    navigation.navigate('RestaurantDetail', item);
                                } catch (error) {
                                    console.error("Error updating views: ", error);
                                }
                            }}
                        >
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                                <View style={styles.itemTextContainer}>
                                    <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{item.title}</Text>
                                    <Text style={[styles.text, { fontSize: 14, color: 'gray' }]}>{item.category}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="eye" size={16} color={theme.colors.primary} />
                                        <Text style={[styles.text, { fontSize: 14, color: 'gray', marginLeft: 8 }]}>{item.views}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity 
                                    style={{ marginRight: 8 }} 
                                    onPress={() => handleBookmark(item)}
                                >
                                    <Ionicons 
                                        name={item.bookmarked ? "bookmark" : "bookmark-outline"} 
                                        size={24} 
                                        color={theme.colors.primary} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 300 }} // เพิ่ม padding ให้กับ FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // เพิ่ม refresh control
                    }
                />
                )}
            </View>
        </View>
    )
}

export default RestaurantScreen