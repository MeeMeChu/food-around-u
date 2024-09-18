import React, { Fragment, useState } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import createRestDetailStyles from './styles/restaurant-detail-style'
import { useApp } from '../contexts/AppContext';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const RestaurantDetail = ({ route }) => {
    const { theme } = useApp();
    const data = route.params;
    const [bookMark, setBookMark] = useState(false);

    const styles = createRestDetailStyles(theme);

    return (
        <Fragment>
            <Image style={styles.image} source={require('./../../assets/images/image5.jpg')} />
            <View style={styles.container}>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <View>
                        <Text variant='h1' style={{ fontFamily: theme.fonts.medium.fontFamily }}>{data.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <View style={styles.star}>
                                <Ionicons style={{ marginHorizontal: 4 }} name="star" size={14} color="white" />
                                <Text style={[styles.text, {marginTop: 1.5 ,color: '#fff', fontSize: 12}]}>{data.star}</Text>
                            </View>
                            <Text style={[styles.text, { fontSize: 14, marginLeft: 8 }]}>{data.reviews} รีวิว</Text>
                        </View>
                        <Text style={[styles.text, { marginTop: 4, color: 'gray'}]}>{data.type}</Text>
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
                <View>
                    <Image style={styles.map} source={require('./../../assets/images/image6_map.png')}/>
                </View>
            </View>
        </Fragment>
    )
}

export default RestaurantDetail