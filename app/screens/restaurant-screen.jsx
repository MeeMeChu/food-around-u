import React, { useEffect, useState } from 'react'
import { 
    SafeAreaView, 
    TextInput, 
    View, 
    TouchableOpacity, 
    FlatList, 
    Image, 
    ScrollView,
    RefreshControl 
} from 'react-native';
import { Text } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';

import createRestaurantStyles from './styles/restaurant-style';
import { useApp } from '../contexts/AppContext';
import { db } from '../configs/firebase-config';

const RestaurantScreen = ({ navigation }) => {

    const { theme } = useApp();
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [restaurantsList ,setRestaurantslist] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('บุฟเฟต์'); // เก็บหมวดหมู่ที่เลือก

    const categories = ['บุฟเฟต์', 'ก๋วยเตี๋ยว', 'ของหวาน', 'อาหารตามสั่ง'];

    const filteredRestaurants = selectedCategory === 'บุฟเฟต์' || selectedCategory === ''
        ? restaurantsList
        : restaurantsList.filter(item => item.category === selectedCategory); // กรองตาม category

    const fetchRestaurants = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'restaurants'));
            const docsData = querySnapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data(),
                created_at: doc.created_at ? dayjs(doc.data().created_at.toDate()).format('DD/MM/YYYY') : null,
                updated_at: doc.updated_at ? dayjs(doc.data().updated_at.toDate()).format('DD/MM/YYYY') : null
            }));
            setRestaurantslist(docsData);
            console.log("Fetched Food: ", docsData);
        } catch (error) {
            console.error("Error fetching collection data: ", error);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);  // เริ่มการรีเฟรช
        await fetchRestaurants();  // ดึงข้อมูลใหม่
        setRefreshing(false); // จบการรีเฟรช
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


            <View style={[styles.container, { marginTop: 8}]}>
                <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', marginBottom: 8 }]}>
                    เลือกร้านอาหารสำหรับคุณ
                </Text>
                <ScrollView horizontal={true}>
                    {categories.map((category, index) => (
                        <TouchableOpacity 
                            key={index}
                            onPress={() => setSelectedCategory(category)}
                            style={{
                                backgroundColor: selectedCategory === category ? theme.colors.primary : 'gray',
                                padding: 8,
                                borderRadius: 8,
                                marginRight: 4,
                                marginVertical: 8
                            }}
                        >
                            <Text style={{ color: selectedCategory === category ? '#fff' : '#333', fontSize: 14 }}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
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
                                >
                                    <Ionicons 
                                        name={"bookmark-outline"} 
                                        size={24} 
                                        color={theme.colors.primary} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 256 }} // เพิ่ม padding ให้กับ FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // เพิ่ม refresh control
                    }
                />
            </View>
        </View>
    )
}

export default RestaurantScreen