import React, { createContext, useContext, useState } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

// Mockup นะ
const foodMenu = [
  {
    id: '1',
    name: "ข้าวหมูเด้ง",
    description: "ปิ๊งป่อง",
    rating: 5.0,
    reviews: 15,
    image: require('./../../assets/images/image1.png'),
  },
  {   
    id: '2',
    name: "ข้าวกุ้งเด้ง",
    description: "ปิ๊งป่อง",
    rating: 5.0,
    reviews: 15,
    image: require('./../../assets/images/image2.png'),
  },
  {
    id: '3',
    name: "ข้าวปลาเด้ง",
    description: "ปิ๊งป่อง",
    rating: 5.0,
    reviews: 15,
    image: require('./../../assets/images/image3.png'),
  },
  {
    id: '4',
    name: "ข้าวไก่เด้ง",
    description: "ปิ๊งป่อง",
    rating: 5.0,
    reviews: 15,
    image: require('./../../assets/images/image4.png'),
  },
  {
    id: '5',
    name: "ข้าวสุดหล่อเด้ง",
    description: "ปิ๊งป่อง",
    rating: 5.0,
    reviews: 15,
    image: require('./../../assets/images/image5.jpg'),
  },
];

const AppContext = createContext({});

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#B10000',
            secondary: '#FFF0E6',
        },
        fonts: {
            regular: {
                fontFamily: 'NotoSansThai-Regular',
                fontWeight: 'normal',
            },
            medium: {
                fontFamily: 'NotoSansThai-Bold',
                fontWeight: 'normal',
            },
            h1: {
                fontFamily: 'NotoSansThai-Regular',
                fontSize: 20,
            },
        },
    };

    // Add state for bookmarks
    const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState([]);

    const toggleBookmark = (restaurantId) => {
        setBookmarkedRestaurants((prev) => {
            if (prev.includes(restaurantId)) {
                return prev.filter(id => id !== restaurantId); // Remove from bookmarks
            } else {
                return [...prev, restaurantId]; // Add to bookmarks
            }
        });
    };

    return (
        <AppContext.Provider value={{ theme, bookmarkedRestaurants, toggleBookmark, foodMenu }}>
            <PaperProvider theme={theme}>
                {children}
            </PaperProvider>
        </AppContext.Provider>
    );
};
