import React from 'react'
import { View, Image } from 'react-native'
import createRestDetailStyles from './styles/restaurant-detail-style'
import { useApp } from '../contexts/AppContext';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const RestaurantDetail = ({ route }) => {
    const { theme } = useApp();
    const data = route.params;

    const styles = createRestDetailStyles(theme);

    return (
        <View style={styles.imageContainer}>
            
            <Image style={styles.image} source={require('./../../assets/images/image5.jpg')} />
            <View style={styles.container}>
                <View style={{flex: 3, alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{ flex:2 }}>
                        <Text variant='h1' style={{ fontFamily: theme.fonts.medium.fontFamily }}>{data.title}</Text>
                        <View style={styles.star}>
                            <Ionicons style={{ marginHorizontal: 4 }} name="star" size={14} color="white" />
                            <Text style={[styles.text, {marginTop: 1.5 ,color: '#fff', fontSize: 12}]}>{data.star}</Text>
                        </View>
                        <Text style={[styles.text, { marginTop: 4, color: 'gray'}]}>{data.type}</Text>
                    </View>
                    <View style={{ flex:1, alignItems: 'flex-end' }}>
                        <Ionicons name="bookmark-outline" size={24} color="black" />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default RestaurantDetail