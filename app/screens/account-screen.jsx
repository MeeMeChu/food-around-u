import { View, Text, StyleSheet, FlatList, SafeAreaView  } from 'react-native';

const DATA = new Array(1000).fill(null).map((_, index) => ({
    key: `item-${index}`,
    label: `Item ${index}`,
}));

const AccountScreen = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <FlatList
                    data={DATA}
                    horizontal={true} // กำหนดให้ FlatList แสดงในแนวนอน
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>{item.label}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.key}
                    showsHorizontalScrollIndicator={false} // ซ่อนสัญลักษณ์การเลื่อนแนวนอน
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    item: {
        padding: 16,
        marginHorizontal: 8,
        backgroundColor: '#f9c2ff',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AccountScreen