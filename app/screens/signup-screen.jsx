import { useState } from 'react';
import { TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import { useApp } from '../contexts/AppContext';
import createLoginStyles from './styles/login-style';
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useApp();

    const handleRegister = () => {
        console.log('Email : ', email);
        console.log('Password : ', password);
        console.log('ConfirmPassword : ', confirmPassword);
        
    }

    const styles = createLoginStyles(theme);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={[styles.textBold, { fontSize: 24, letterSpacing: 3}]}>สมัครสมาชิก</Text>
            </View>
            <View>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, { fontSize : 18 }]}>Email address</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

            </View>
            <View style={{ marginTop: 8 }}>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, { fontSize : 18 }]}>Password</Text>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputWithIcon}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
            </View>
            <View style={{ marginTop: 8 }}>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, { fontSize : 18 }]}>Confirm password</Text>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputWithIcon}
                        placeholder="Confirm password"
                        placeholderTextColor="#999"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                <Text style={styles.btnText}>สมัครสมาชิก</Text>
            </TouchableOpacity>

            <View style={{marginVertical : 32}}>
                <Divider bold/>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={[styles.text, { color: '#999' }]}>คุณมีบัญชีอยู่แล้วใช่หรือไม่? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.textBold, { color : theme.colors.primary }]}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignUpScreen