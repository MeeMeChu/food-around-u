import React, { createContext, useContext } from 'react'
import { DefaultTheme, PaperProvider } from 'react-native-paper';

const AppContext = createContext({});

export const useTheme = () => useContext(AppContext);

export const AppProvider = ({ children }) => {

    const theme = {
        ...DefaultTheme,
        colors : {
            ...DefaultTheme.colors,
            primarry: '#6C63FF',
        },
        fonts: {
            regular: {
                fontFamily: 'NotoSansThai-Regular',
                fontWeight: 'normal',
            },
            medium: {
                fontFamily: 'NotoSansThai-Bold',
                fontWeight: 'normal',
            }
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
