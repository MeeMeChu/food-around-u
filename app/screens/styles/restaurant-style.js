import { StyleSheet } from "react-native";

const createRestaurantStyles = (theme) => {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        container: {
            marginHorizontal: 16
        },
        header: {
            backgroundColor: theme.colors.primary,
        },
        headerContainer: {
            marginHorizontal: 16,
            marginVertical: 8,
        },
        text: {
            fontFamily: theme.fonts.regular.fontFamily
        },
        inputContainer: {
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingHorizontal: 8,
        },
        icon: {
            marginRight: 8,
        },
        textInput: {
            flex: 1,
            paddingVertical: 8,
        },
        image: {
            width: 95,
            height: 95,
            objectFit: 'cover',
            margin: 8,
            borderRadius: 8,
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 4,
            backgroundColor: '#fff',
            borderRadius: 12,
            overflow: 'hidden',
        },
        itemTextContainer: {
            flex: 1,
            padding: 8,
        },
        button: {
            backgroundColor: theme.colors.primary,
            padding: 8,
            borderRadius: 8,
        },
    });
}

export default createRestaurantStyles;