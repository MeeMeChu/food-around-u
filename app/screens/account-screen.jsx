import { View, SafeAreaView, TouchableOpacity, Image  } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useApp } from '../contexts/AppContext';
import createAccountStyles from './styles/account-style';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';


const AccountScreen = ({navigation}) => {
    const { theme } = useApp();
    const auth = useAuth();
    
    const styles = createAccountStyles(theme);

    return (
        <View>
            <SafeAreaView style={styles.header}>
                {auth.userLoggedIn ? (
                    // ยังไม่ Login
                    <View style={styles.safeArea}>
                        <View style={styles.container}>
                            <Text style={styles.textWelcome}>Welcome, {auth.currentUser.email}</Text>
                            <Text></Text>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.btnText}>สมัครสมาชิกหรือเข้าสู่ระบบ</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Login แล้ว
                    <View style={styles.safeArea}>
                        <View style={styles.imageContainer}>
                            <Image source={require('./../../assets/images/image_account.png')}/>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.btnText}>สมัครสมาชิกหรือเข้าสู่ระบบ</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
            <View style={styles.container}>
                <View style={styles.settingContainer}>
                    <Ionicons name="settings" size={20} color="black" />
                    <Text style={[styles.text, { marginLeft: 4 , fontSize: 18}]}>ตั้งค่า</Text>
                </View>
                <Divider bold/>
            </View>
        </View>
    );
}

export default AccountScreen