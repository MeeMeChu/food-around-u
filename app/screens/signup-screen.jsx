import { useState } from 'react';
import { TextInput, View, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import createLoginStyles from './styles/login-style';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import AlertMessage from './components/alert-message';

const SignUpScreen = ({ navigation }) => {
    const auth = useAuth();
    const { theme } = useApp();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    
    const handleRegister = async () => {

        if (!email || !password || !confirmPassword || !displayName) {
            setError("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        if (!isValidEmail(email)) {
            setError("กรุณากรอกอีเมลที่ถูกต้อง");
            return;
        }

        if (password.length < 6) {
            setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
            return;
        }

        if (password !== confirmPassword) {
            setError('รหัสผ่านของคุณไม่ตรงกัน');
            return;
        }
        setError('');
        try {
            await auth.signUpWithEmail(email, password, displayName);

            navigation.navigate('Main');
        } catch (e) {
            setError('Email ของคุณมีคนใช้งานอยู่แล้ว')
        }

        // เปลี่ยนเส้นทางไปยังหน้าหลังจากลงทะเบียนสำเร็จ
    }

    const styles = createLoginStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // ปรับค่า offset ตามความเหมาะสม
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.headerContainer}>
                        <Text style={[styles.textBold, { fontSize: 24, letterSpacing: 3}]}>สมัครสมาชิก</Text>
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <View style={styles.textContainer}>
                            <Text style={[styles.text, { fontSize : 18 }]}>Display name</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Display name"
                            placeholderTextColor="#999"
                            value={displayName}
                            onChangeText={setDisplayName}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={{ marginTop: 8 }}>
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
                    {error ? (
                        <View style={{ marginTop: 8}}>
                            <AlertMessage error={error}/>
                        </View>
                    ) : null}
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
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUpScreen