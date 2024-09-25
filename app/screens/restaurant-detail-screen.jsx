import React, { useState } from 'react'
import { View, Image, TouchableOpacity, ScrollView, Linking } from 'react-native'
import createRestDetailStyles from './styles/restaurant-detail-style'
import { useApp } from '../contexts/AppContext';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const RestaurantDetail = ({ route }) => {
    const { theme } = useApp();
    const data = route.params;
    const [bookMark, setBookMark] = useState(false);

    const openLink = () => {
        Linking.openURL(data.locationURL).catch(err => console.error("Couldn't load page", err));
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
                        { bookMark ? (
                            <TouchableOpacity onPress={()=> setBookMark(false)}>
                                <Ionicons name="bookmark" size={24} color={theme.colors.primary} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={()=> setBookMark(true)}>
                                <Ionicons name="bookmark-outline" size={24} color={theme.colors.primary} />
                            </TouchableOpacity>
                        )}
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