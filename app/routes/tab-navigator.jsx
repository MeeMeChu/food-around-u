import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomeScreen from '../screens/home-screen';
import AccountScreen from '../screens/account-screen';
import { useApp } from '../contexts/AppContext';
import { Ionicons } from '@expo/vector-icons';
import RestaurantScreen from '../screens/restaurant-screen';
import BookmarkScreen from '../screens/bookmark-screen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { theme } = useApp();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Restaurant') {
                        iconName = focused ? 'fast-food' : 'fast-food-outline';
                    } else if (route.name === 'Bookmark') {
                        iconName = focused ? 'bookmarks' : 'bookmarks-outline';
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={theme.colors.primary} />;
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarLabelStyle: {
                    fontFamily: theme.fonts.regular.fontFamily,
                },
            })}
        >
            <Tab.Screen options={{ title: 'หน้าแรก' }} name="Home" component={HomeScreen} />
            <Tab.Screen options={{ title: 'ร้านอาหาร' }} name="Restaurant" component={RestaurantScreen} />
            <Tab.Screen options={{ title: 'ที่บันทึกไว้' }} name="Bookmark" component={BookmarkScreen} />
            <Tab.Screen options={{ title: 'ฉัน' }} name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
}

export default TabNavigator