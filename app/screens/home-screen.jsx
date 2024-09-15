import { useState } from "react";
import { View, StyleSheet, TextInput, FlatList, Image } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../contexts/AppContext";
import { Ionicons } from "@expo/vector-icons";

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

const HomeScreen = () => {
    const { theme } = useApp();
    const [search, setSearch] = useState("");

    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        container: {
            marginHorizontal: 16
        },
        header: {
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 16,
            flexDirection: 'row',
        },
        text: {
            fontFamily: theme.fonts.regular.fontFamily
        },
        inputContainer: {
            marginTop: 16,  
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingHorizontal: 8,
        },
        icon: {
            marginRight: 8,
        },
        textInput: {
            paddingVertical: 8,
        },
        item: {
            position: 'relative',
            margin: 8,
        },
        image: {
            width: 100,
            height: 160,
            objectFit: 'cover',
            borderRadius: 8,
        },
        textContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // เพิ่มพื้นหลังโปร่งแสง
            padding: 8,
            borderRadius: 8,
            alignItems: 'center',
        },
    });

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
            <View style={[styles.container, { marginVertical: 16 }]}>
                <Text style={[styles.text, {fontSize: 20}]}>แนะนำสำหรับคุณ</Text>
            </View>
        </View>
    );
}

export default HomeScreen