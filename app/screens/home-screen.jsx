import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex : 1, justifyContent: 'start'}}>
            <View style={styles.header}>
                <View>
                    <Text>Hi, Thanakrit</Text>
                    <Text>Let’s recommended restaurants</Text>
                </View>
                <View>
                    <Avatar.Text size={32} label="XD" />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        margin: 16,
        display: 'flex',
        justifyContent: 'space-between'
    }
});

export default HomeScreen