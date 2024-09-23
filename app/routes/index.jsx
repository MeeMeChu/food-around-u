import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '../contexts/AppContext';
import TabNavigator from './tab-navigator';
import RestaurantDetail from '../screens/restaurant-detail-screen';
import LoginScreen from '../screens/login-screen';
import SignUpScreen from '../screens/signup-screen';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const { theme } = useApp();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* วาง Tab Navigator ไว้ใน Stack */}
                <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
                
                {/* หน้าที่ไม่ได้อยู่ใน Tab */}
                <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} options={{
                    headerTitle: '',
                    headerBackTitle: 'กลับ',
                    headerStyle: {
                        backgroundColor: theme.colors.primary
                    },
                    headerTintColor: '#fff',
                }}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{
                    headerShown: false
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes