import { StyleSheet } from "react-native";

const createAddRestaurantStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 16,
        },
        text: {
            fontFamily: theme.fonts.regular.fontFamily
        },
        textBold: {
            fontFamily: theme.fonts.medium.fontFamily
        },
        headerContainer: {
            alignItems: 'center',
            marginVertical: 16,
        },
        input: {
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            backgroundColor: '#fff',
            fontSize: 16,
        },
        textContainer: {
            margin : 4
        },
        btn: {
            marginTop: 16,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: theme.colors.primary
        },
        btnText: {
            textAlign: 'center',
            color: theme.colors.secondary,
            fontSize: 18,
            fontFamily: theme.fonts.medium.fontFamily,
        },
    });
}

export default createAddRestaurantStyles