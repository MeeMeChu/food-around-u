import { View, SafeAreaView, TouchableOpacity, Image  } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useApp } from '../contexts/AppContext';
import createAccountStyles from './styles/account-style';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { Fragment } from 'react';


const AccountScreen = ({navigation}) => {
    const { theme } = useApp();
    const auth = useAuth();
    
    const styles = createAccountStyles(theme);

    return (
        <View>
            <SafeAreaView style={styles.header}>
                {auth?.userLoggedIn ? (
                    // Login แล้ว
                    <View style={styles.safeArea}>
                        <View style={[styles.container, { marginVertical: 8 }]}>
                            <Text style={styles.textWelcome}>ยินดีต้อนรับ, {auth?.currentUser?.displayName}</Text>
                            <View style={styles.imageContainer}>
                                <Image source={require('./../../assets/images/image_account.png')}/>
                            </View>
                            
                        </View>
                    </View>
                ) : (
                    // ยังไม่ได้ login
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
                {auth?.userLoggedIn ? (
                    <Fragment>
                        <View style={styles.settingContainer}>
                            <Ionicons name="storefront" size={20} color="black" />
                            <TouchableOpacity onPress={() => navigation.navigate('ListRestaurant')}>
                                <Text style={[styles.text, { marginLeft: 8 , fontSize: 18}]}>เพิ่มร้านอาหาร</Text>
                            </TouchableOpacity>
                        </View>
                        <Divider bold/>
                        <View style={styles.settingContainer}>
                            <Ionicons name="log-out" size={24} color={theme.colors.primary} />
                            <TouchableOpacity onPress={() => auth.logout()}>
                                <Text style={[styles.text, { marginLeft: 8 , fontSize: 18, color: theme.colors.primary }]}>ออกจากระบบ</Text>
                            </TouchableOpacity>
                        </View>
                    </Fragment>
                ) : (
                    null
                )}
                <Divider bold/>
                <View style={styles.settingContainer}>
                    <Ionicons name="information-circle-sharp" size={24} color="black" />
                    <Text style={[styles.text, { marginLeft: 8 , fontSize: 18}]}>เวอร์ชั่น 1.0.0</Text>
                </View>
                <Divider bold/>
            </View>
        </View>
    );
}

export default AccountScreen