import React, { useEffect, useState } from 'react'
import { View, Image, TouchableOpacity, ScrollView, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';

import { useApp } from '../contexts/AppContext';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';
import createRestDetailStyles from './styles/restaurant-detail-style'
import { addBookmark, removeBookmark } from '../utils/bookmark';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../configs/firebase-config';

const RestaurantDetail = ({ route }) => {
    const { theme } = useApp();
    const auth = useAuth();
    const data = route.params;
    const [bookmarked, setBookmarked] = useState(false);

    // ตรวจสอบว่าร้านนี้ถูก bookmark แล้วหรือยัง
    useEffect(() => {
        const checkIfBookmarked = async () => {
            if (!auth?.currentUser || !auth?.currentUser.uid) return;
            const bookmarkRef = doc(db, 'users', auth.currentUser.uid, 'bookmarks', data.id);
            const docSnapshot = await getDoc(bookmarkRef);
            setBookmarked(docSnapshot.exists());
        };

        checkIfBookmarked();
    }, [auth?.currentUser, data.id]);

    const openLink = () => {
        Linking.openURL(data.locationURL).catch(err => console.error("Couldn't load page", err));
    };

    // ฟังก์ชันสำหรับจัดการการเพิ่มหรือลบ bookmark
    const handleBookmark = async () => {
        if (!auth.currentUser || !auth.currentUser.uid) {
            // console.error("User not logged in or UID is undefined");
            return;
        }

        const bookmarkRef = doc(db, 'users', auth?.currentUser?.uid, 'bookmarks', data.id);

        if (bookmarked) {
            await removeBookmark(data.id, auth);
        } else {
            await addBookmark(data, auth);
        }

        // สลับสถานะ bookmark
        setBookmarked(!bookmarked);
    };

    const styles = createRestDetailStyles(theme);

    return (
        <ScrollView>
            {data.imageUrl ? (
                <Image style={styles.image} source={{ uri : data.imageUrl }} />
            ): (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
            <View style={styles.container}>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <View>
                        <Text variant='h1' style={{ fontFamily: theme.fonts.medium.fontFamily }}>{data.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <View style={styles.star}>
                                <Ionicons style={{ marginHorizontal: 4 }} name="eye" size={14} color="white" />
                                <Text style={[styles.text, {marginTop: 1.5, marginRight : 4 ,color: '#fff', fontSize: 12}]}>{data.views}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={handleBookmark}>
                            <Ionicons 
                                name={bookmarked ? "bookmark" : "bookmark-outline"} 
                                size={24} 
                                color={theme.colors.primary} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={openLink}>
                    <Image style={styles.map} source={require('./../../assets/images/image_map.png')}/>
                </TouchableOpacity>
                <View>
                    <Text style={[styles.text, { marginVertical: 16 }]}>{data.address}</Text>
                    <Divider bold/>
                    <Text style={[styles.text, { marginVertical: 16 }]}>เบอร์โทร : {data.phone}</Text>
                    <Divider bold/>
                </View>
            </View>
        </ScrollView>
    )
}

export default RestaurantDetail