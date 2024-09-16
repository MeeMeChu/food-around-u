import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // ใช้ไอคอนจาก Ionicons
import HomeScreen from '../screens/home-screen';
import RestaurantScreen from '../screens/restaurant-screen';
import AccountScreen from '../screens/account-screen';
import { useApp } from '../contexts/AppContext';

const Tab = createBottomTabNavigator();


const Routes = () => {
    const { theme } = useApp();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Food') {
                            iconName = focused ? 'fast-food' : 'fast-food-outline';
                        } else if (route.name === 'Bookmark') {
                            iconName = focused ? 'bookmarks' : 'bookmarks-outline';
                        } else if (route.name === 'Account') {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        // คุณสามารถคืนค่าไอคอนที่คุณต้องการใช้ได้ที่นี่
                        return <Ionicons name={iconName} size={size} color={theme.colors.primary} />;
                    },
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarLabelStyle: {
                        fontFamily: theme.fonts.regular.fontFamily
                    }
                })}
            >
                <Tab.Screen options={{title: 'หน้าแรก'}} name="Home" component={HomeScreen} />
                <Tab.Screen options={{title: 'ร้านอาหาร'}} name="Food" component={RestaurantScreen} />
                <Tab.Screen options={{title: 'ที่บันทึกไว้'}} name="Bookmark" component={AccountScreen} />
                <Tab.Screen options={{title: 'ฉัน'}} name="Account" component={AccountScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Routes