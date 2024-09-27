import { KeyboardAvoidingView, Linking, Platform, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { useApp } from '../contexts/AppContext';
import createLoginStyles from './styles/login-style';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        await auth.signInWithEmail(email, password);
        navigation.navigate('Main');
    }

    const { theme } = useApp();

    const styles = createLoginStyles(theme);
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={styles.headerContainer}>
                        <Text style={[styles.textBold, { fontSize: 24, letterSpacing: 3}]}>เข้าสู่ระบบ</Text>
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
                                secureTextEntry={!showPassword} // Show/Hide password based on state
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)} // Toggle show/hide password
                                style={styles.iconButton}
                            >
                                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>

                    <View style={{marginVertical : 32}}>
                        <Divider bold/>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={[styles.text, { color: '#999' }]}>คุณยังไม่มีบัญชีใช่หรือไม่? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={[styles.textBold, { color : theme.colors.primary }]}>สมัครเลย</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default LoginScreen;