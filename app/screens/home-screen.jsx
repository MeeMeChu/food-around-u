import { useEffect, useState } from "react";
import { View, FlatList, Image, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../contexts/AppContext";
import createHomeStyles from "./styles/home-style";
import { db } from "../configs/firebase-config";
import { collection, doc, getDocs, limit, orderBy, query, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";

const HomeScreen = ({ navigation }) => {
    const { theme } = useApp();
    const [ topRestaurantsList, setTopRestaurantsList ] = useState([]);
    const [ latestRestaurants, setLatestRestaurants ] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [ category, setCategory ] = useState([]);

    const fetchTopRestaurants = async () => {
        try {
            // สร้าง query ที่จะเรียงลำดับ views จากมากไปน้อย และจำกัดจำนวน 10 รายการ
            const q = query(
                collection(db, 'restaurants'), 
                orderBy('views', 'desc'), // เรียงลำดับตาม views มากไปน้อย
                limit(10) // จำกัดจำนวน 10 รายการ
            );
            
            const querySnapshot = await getDocs(q);
            
            const topRestaurants = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                created_at: doc.created_at ? dayjs(doc.data().created_at.toDate()).format('DD/MM/YYYY') : null,
                updated_at: doc.updated_at ? dayjs(doc.data().updated_at.toDate()).format('DD/MM/YYYY') : null
            }));
            
            setTopRestaurantsList(topRestaurants)
            console.log("Top 10 Restaurants by Views: ", topRestaurants);
        } catch (error) {
            console.error("Error fetching top restaurants: ", error);
        }
    };

    const fetchLatestRestaurants = async () => {
        try {
            // สร้าง query เพื่อดึงข้อมูลและเรียงตาม field created_at จากมากไปน้อย (ล่าสุดไปเก่าสุด)
            const restaurantsQuery = query(
                collection(db, 'restaurants'),
                orderBy('created_at', 'desc'), // เรียงตามวันที่เพิ่มล่าสุด
                limit(10) // จำกัดจำนวนข้อมูลให้ดึงมาแค่ 10
            );
    
            const querySnapshot = await getDocs(restaurantsQuery);
            const latestRestaurants = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                created_at: doc.created_at ? dayjs(doc.data().created_at.toDate()).format('DD/MM/YYYY') : null,
                updated_at: doc.updated_at ? dayjs(doc.data().updated_at.toDate()).format('DD/MM/YYYY') : null
            }));
            
            setLatestRestaurants(latestRestaurants);
            console.log("Latest Restaurants: ", latestRestaurants);
        } catch (error) {
            console.error("Error fetching latest restaurants: ", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'categories'));
            const docsData = querySnapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data(),
            }));
            setCategory(docsData);
            console.log("Fetched categories: ", docsData);
        } catch (error) {
            console.error("Error fetching collection data: ", error);
        }
    };

    useEffect(() => {
        fetchTopRestaurants();
        fetchLatestRestaurants();
        fetchCategories();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);  // เริ่มการรีเฟรช
        await fetchTopRestaurants();
        await fetchLatestRestaurants();
        await fetchCategories();
        setRefreshing(false); // จบการรีเฟรช
    };

    const styles = createHomeStyles(theme);

    return (
        <View style={styles.safeArea}>
            <SafeAreaView style={styles.header}>
                <View style={styles.safeArea}>
                    <Text variant="h1" 
                        style={{
                            color: '#FFEB3B',
                        }}
                    >
                        ร้านอาหารยอดนิยม
                    </Text>
                    <Text 
                        style={{
                            fontFamily: theme.fonts.regular.fontFamily,
                            fontSize: 14,
                            color: '#fff'
                        }}
                    >
                        บริเวณมหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่
                    </Text>
                </View>
            </SafeAreaView>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{
                    marginHorizontal: 8
                }}>
                    <FlatList
                        data={category}
                        horizontal={true} // กำหนดให้ FlatList แสดงในแนวนอน
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Image source={{ uri : item.imageUrl }} style={styles.image}/>
                                <View style={styles.textContainer}>
                                    <Text style={[styles.text, {color: '#fff', fontSize: 16}]}>{item.name}</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false} // ซ่อนสัญลักษณ์การเลื่อนแนวนอน
                    />
                </View>
                <View style={styles.container}>
                    <Text style={[styles.text, {fontSize: 20}]}>ร้านอาหารใหม่ล่าสุด</Text>
                </View>
                <View style={{
                    marginHorizontal: 8
                }}>
                    <FlatList
                        data={latestRestaurants}
                        horizontal={true} // กำหนดให้ FlatList แสดงในแนวนอน
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
                                <View style={styles.itemFood}>
                                    <Image source={{ uri : item.imageUrl }} style={styles.imageFood}/>
                                    <View style={styles.textFoodContainer}>
                                        <Text 
                                            style={{fontSize: 16, fontFamily: theme.fonts.medium.fontFamily}} 
                                            numberOfLines={1} 
                                            ellipsizeMode='tail'
                                        >
                                            {item.title}
                                        </Text>
                                        <Text style={[styles.text, {fontSize: 12}]}>{item.category}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={styles.star}>
                                                <Ionicons style={{ marginHorizontal: 4 }} name="eye" size={14} color="white" />
                                                <Text style={[styles.text, {marginTop: 1.5, marginRight : 4 ,color: '#fff', fontSize: 12}]}>{item.views}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false} // ซ่อนสัญลักษณ์การเลื่อนแนวนอน
                    />
                </View>
                <View style={styles.container}>
                    <Text style={[styles.text, {fontSize: 20}]}>ร้านอาหารยอดนิยม</Text>
                </View>
                <View style={{
                    marginHorizontal: 8
                }}>
                    <FlatList
                        data={topRestaurantsList}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={async () => {
                                    try {
                                        // Reference ไปยังเอกสารร้านอาหารใน Firestore
                                        const restaurantRef = doc(db, 'restaurants', item.id);
                            
                                        await updateDoc(restaurantRef, {
                                            views: item.views + 1
                                        });
                            
                                        navigation.navigate('RestaurantDetail', item);
                                    } catch (error) {
                                        console.error("Error updating views: ", error);
                                    }
                                }}
                            >
                                <View style={styles.itemFood}>
                                    <Image source={{ uri : item.imageUrl}} style={styles.imageFood}/>
                                    <View style={styles.textFoodContainer}>
                                    <Text 
                                            style={{fontSize: 16, fontFamily: theme.fonts.medium.fontFamily}} 
                                            numberOfLines={1} 
                                            ellipsizeMode='tail'
                                        >
                                            {item.title}
                                        </Text>
                                        <Text style={[styles.text, {fontSize: 12}]}>{item.category}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={styles.star}>
                                                <Ionicons style={{ marginHorizontal: 4 }} name="eye" size={14} color="white" />
                                                <Text style={[styles.text, {marginTop: 1.5, marginRight : 4 ,color: '#fff', fontSize: 12}]}>{item.views}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default HomeScreen