import { StyleSheet } from "react-native";

const createAccountStyles = (theme) => {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        container: {
            marginHorizontal: 16
        },
        header: {
            paddingVertical: 8,
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 16,
            flexDirection: 'row',
        },
        text: {
            fontFamily: theme.fonts.regular.fontFamily
        },
        textWelcome: {
            fontFamily: theme.fonts.medium.fontFamily,
            fontSize: 24,
            color: '#FFEB3B'
        },
        btn: {
            margin : 16, 
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: theme.colors.secondary
        },
        btnText: {
            textAlign: 'center',
            color: theme.colors.primary,
            fontSize: 18,
            fontFamily: theme.fonts.medium.fontFamily,
        },
        imageContainer: {
            alignItems: 'center'
        },
        settingContainer: {
            marginVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
        }
    });
}

export default createAccountStyles;