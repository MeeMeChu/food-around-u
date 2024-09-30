import { StyleSheet } from "react-native";

const createListRestaurantStyles = (theme) => {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
        },
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
        image: {
            width: 95,
            height: 95,
            objectFit: 'cover',
            margin: 8,
            borderRadius: 8,
        },
        headerContainer: {
            alignItems: 'center',
            marginTop: 16,
        },
        textContainer: {
            margin : 4
        },
        btn: {
            marginVertical: 8,
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
        loading: {
            flex: 1,
            justifyContent: 'center', 
            alignItems: 'center'
        },
    });
}

export default createListRestaurantStyles;