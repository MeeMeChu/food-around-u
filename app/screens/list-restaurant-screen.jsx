import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, RefreshControl, Text, View } from 'react-native'
import createListRestaurantStyles from './styles/list-restaurant-style'
import { useApp } from '../contexts/AppContext';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../configs/firebase-config';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import AlertMessage from './components/alert-message';
import { ActivityIndicator } from 'react-native-paper';

const ListRestaurantScreen = ({ navigation }) => {

    const { theme } = useApp();
    const auth = useAuth();
    const styles = createListRestaurantStyles(theme);
    const [listRestaurant, setListRestaurant] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteDialog = (id) => {
        Alert.alert('คุณต้องการลบข้อมูลหรือไม่', 'คุณแน่ใจมั้ยที่จะลบข้อมูลที่คุณเลือก คุณจะไม่สามารถที่กู้คืนข้อมูลที่ลบได้', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', 
                onPress: async () => {
                    try {
                        await deleteDoc(doc(db, 'restaurants', id));
                        setRefresh(prev => !prev);
                    } catch (e) {
                        console.error("Delete error", e);
                    }
                }
            },
        ]);
    }

    const fetchListRestaurants = async () => {
        try {
            setLoading(true);
            // สร้าง query ที่จะเรียงลำดับ views จากมากไปน้อย และจำกัดจำนวน 10 รายการ
            const q = query(collection(db, 'restaurants'), where('author', '==', auth?.currentUser?.displayName));
            
            const querySnapshot = await getDocs(q);
            
            const restaurants = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                created_at: doc.data().created_at ? dayjs(doc.data().created_at.toDate()).format('DD/MM/YYYY') : null,
                updated_at: doc.data().updated_at ? dayjs(doc.data().updated_at.toDate()).format('DD/MM/YYYY') : null
            }));
            
            setListRestaurant(restaurants)
            console.log("List restaurants ", restaurants);
        } catch (error) {
            console.error("Error fetching top restaurants: ", error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);  // เริ่มการรีเฟรช
        await fetchListRestaurants();  // ดึงข้อมูลใหม่
        setRefreshing(false); // จบการรีเฟรช
    };

    useEffect(() => {
        fetchListRestaurants();
    }, [refresh]);

    return (
        <View style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={[styles.textBold, { fontSize: 24, letterSpacing: 1}]}>รายการร้านอาหารที่คุณเพิ่ม</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CreateRestaurant')}>
                    <Text style={styles.btnText}>เพิ่มข้อมูลร้านอาหาร</Text>
                </TouchableOpacity>
                { loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                    </View>
                ):(
                    <View>
                        { listRestaurant.length === 0 ? (
                            <FlatList
                                data={[{error: "ไม่มีข้อมูล"}]}
                                horizontal={false}
                                renderItem={({ item }) => (
                                    <View style={styles.itemFood}>
                                        <AlertMessage error={item.error}/>
                                    </View>
                                )}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 300 }}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                            />
                        ) : (
                            <FlatList
                                data={listRestaurant}
                                horizontal={false}
                                renderItem={({ item }) => (
                                    <View style={styles.itemFood}>
                                        <Image source={{ uri : item.imageUrl }} style={styles.imageFood}/>
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
                                                style={{ marginRight: 16 }} 
                                                onPress={() => navigation.navigate('EditRestaurant', item)}
                                            >
                                                <Ionicons 
                                                    name="pencil-sharp"
                                                    size={24} 
                                                    color={theme.colors.primary} 
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                style={{ marginRight: 16 }} 
                                                onPress={() => deleteDialog(item.id)}
                                            >
                                                <Ionicons 
                                                    name="trash-sharp"
                                                    size={24} 
                                                    color={theme.colors.primary} 
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 300 }}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                            />
                        )}
                    </View>
                )}
            </View>
        </View>
    )
}

export default ListRestaurantScreen