import React, { createContext, useContext } from 'react'
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const AppContext = createContext({});

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

    const theme = {
        ...DefaultTheme,
        colors : {
            ...DefaultTheme.colors,
            primary: '#B10000',
            secondary: '#FFF0E6'
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

    return (
        <AppContext.Provider value={{theme}}>
            <PaperProvider theme={theme}>
                {children}
            </PaperProvider>
        </AppContext.Provider>
    )
}
