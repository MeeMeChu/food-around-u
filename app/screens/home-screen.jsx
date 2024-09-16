import { useState } from "react";
import { View, TextInput, FlatList, Image, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../contexts/AppContext";
import { Ionicons } from "@expo/vector-icons";
import createHomeStyles from "./styles/home-style";

const category = [
    {
        id: '1',
        name: "ชาบู",
        image: require('./../../assets/images/image1.png'),
    },
    {   
        id: '2',
        name: "ปิ้งย่าง",
        image: require('./../../assets/images/image2.png'),
        
    },
    {
        id: '3',
        name: "อาหารญี่ปุน",
        image: require('./../../assets/images/image3.png'),
    },
    {
        id: '4',
        name: "อาหารเกาหลี",
        image: require('./../../assets/images/image4.png'),
    },
]

const foodList = [
    {
        id: '1',
        title: 'เต่าตั้งเตา',
        image: require('./../../assets/images/image2.png'),
        type: 'ปิ้งย่าง',
        star: '5.0',
        reviews: '1',
    },
    {
        id: '2',
        title: 'เต่าตั้งเตา',
        image: require('./../../assets/images/image3.png'),
        type: 'ปิ้งย่าง',
        star: '5.0',
        reviews: '1',
    },
    {
        id: '3',
        title: 'เต่าตั้งเตา',
        image: require('./../../assets/images/image4.png'),
        type: 'ปิ้งย่าง',
        star: '5.0',
        reviews: '1',
    },
    {
        id: '4',
        title: 'เต่าตั้งเตา',
        image: require('./../../assets/images/image4.png'),
        type: 'ปิ้งย่าง',
        star: '5.0',
        reviews: '1',
    },
    {
        id: '5',
        title: 'เต่าตั้งเตา',
        image: require('./../../assets/images/image4.png'),
        type: 'ปิ้งย่าง',
        star: '5.0',
        reviews: '1',
    },
    {
        id: '6',
        title: 'เต่าตั้งเตา',
        image: require('./../../assets/images/image4.png'),
        type: 'ปิ้งย่าง',
        star: '5.0',
        reviews: '1',
    },
]

const HomeScreen = () => {
    const { theme } = useApp();
    const [search, setSearch] = useState("");

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
                    <View style={styles.inputContainer}>
                        <Ionicons name="search" size={24} color="gray" style={styles.icon}/>
                        <TextInput
                            style={styles.textInput}
                            placeholder="ค้นหาร้านอาหาร"
                            value={search}
                            onChangeText={search => setSearch(search)}
                        />
                    </View>
                </View>
            </SafeAreaView>
            <View style={{
                marginHorizontal: 8
            }}>
                <FlatList
                    data={category}
                    horizontal={true} // กำหนดให้ FlatList แสดงในแนวนอน
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Image source={item.image} style={styles.image}/>
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
                    data={foodList}
                    horizontal={true} // กำหนดให้ FlatList แสดงในแนวนอน
                    renderItem={({ item }) => (
                        <View style={styles.itemFood}>
                            <Image source={item.image} style={styles.imageFood}/>
                            <View style={styles.textFoodContainer}>
                                <Text style={{fontSize: 16, fontFamily: theme.fonts.medium.fontFamily}}>{item.title}</Text>
                                <Text style={[styles.text, {fontSize: 12}]}>{item.type}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={styles.star}>
                                        <Ionicons style={{ marginHorizontal: 4 }} name="star" size={14} color="white" />
                                        <Text style={[styles.text, {marginTop: 1.5 ,color: '#fff', fontSize: 12}]}>{item.star}</Text>
                                    </View>
                                    <Text style={[styles.text, { fontSize: 14, marginLeft: 8 }]}>{item.reviews} รีวิว</Text>
                                </View>
                            </View>
                        </View>
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
                    data={foodList}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <View style={styles.itemFood}>
                            <Image source={item.image} style={styles.imageFood}/>
                            <View style={styles.textFoodContainer}>
                                <Text style={{fontSize: 16, fontFamily: theme.fonts.medium.fontFamily}}>{item.title}</Text>
                                <Text style={[styles.text, {fontSize: 12}]}>{item.type}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={styles.star}>
                                        <Ionicons style={{ marginHorizontal: 4 }} name="star" size={14} color="white" />
                                        <Text style={[styles.text, {marginTop: 1.5 ,color: '#fff', fontSize: 12}]}>{item.star}</Text>
                                    </View>
                                    <Text style={[styles.text, { fontSize: 14, marginLeft: 8 }]}>{item.reviews} รีวิว</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

export default HomeScreen