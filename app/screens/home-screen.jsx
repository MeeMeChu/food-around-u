import { useEffect, useState } from "react";
import { View, TextInput, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../contexts/AppContext";
import { Ionicons } from "@expo/vector-icons";
import createHomeStyles from "./styles/home-style";
import { db } from "../configs/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import dayjs from "dayjs";

const HomeScreen = ({ navigation }) => {
    const { theme } = useApp();
    const [restaurantsList, setRestaurantslist] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'restaurants'));
                const docsData = querySnapshot.docs.map(doc => ({ 
                    id: doc.id, 
                    ...doc.data(),
                    created_at: dayjs(doc.data().created_at.toDate()).format('DD/MM/YYYY'),
                    updated_at: dayjs(doc.data().updated_at.toDate()).format('DD/MM/YYYY')
                }));
                setRestaurantslist(docsData);
                console.log("Fetched Food: ", docsData);
            } catch (error) {
                console.error("Error fetching collection data: ", error);
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
        
        fetchRestaurants();
        fetchCategories();
    }, []);

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
            <ScrollView>
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
                    <Text style={[styles.text, {fontSize: 20}]}>แนะนำสำหรับคุณ</Text>
                </View>
                <View style={{
                    marginHorizontal: 8
                }}>
                    <FlatList
                        data={restaurantsList}
                        horizontal={true} // กำหนดให้ FlatList แสดงในแนวนอน
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('RestaurantDetail', item)}
                            >
                                <View style={styles.itemFood}>
                                    <Image source={{ uri : item.imageUrl }} style={styles.imageFood}/>
                                    <View style={styles.textFoodContainer}>
                                        <Text style={{fontSize: 16, fontFamily: theme.fonts.medium.fontFamily}}>{item.title}</Text>
                                        <Text style={[styles.text, {fontSize: 12}]}>{item.tag}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={styles.star}>
                                                <Ionicons style={{ marginHorizontal: 4 }} name="star" size={14} color="white" />
                                                <Text style={[styles.text, {marginTop: 1.5 ,color: '#fff', fontSize: 12}]}>{item.star}</Text>
                                            </View>
                                            <Text style={[styles.text, { fontSize: 14, marginLeft: 8 }]}> รีวิว</Text>
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
                        data={restaurantsList}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('RestaurantDetail', item)}
                            >
                                <View style={styles.itemFood}>
                                    <Image source={{ uri : item.imageUrl}} style={styles.imageFood}/>
                                    <View style={styles.textFoodContainer}>
                                        <Text style={{fontSize: 16, fontFamily: theme.fonts.medium.fontFamily}}>{item.title}</Text>
                                        <Text style={[styles.text, {fontSize: 12}]}>{item.tag}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={styles.star}>
                                                <Ionicons style={{ marginHorizontal: 4 }} name="star" size={14} color="white" />
                                                <Text style={[styles.text, {marginTop: 1.5 ,color: '#fff', fontSize: 12}]}>{item.star}</Text>
                                            </View>
                                            <Text style={[styles.text, { fontSize: 14, marginLeft: 8 }]}>{item.reviews} รีวิว</Text>
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