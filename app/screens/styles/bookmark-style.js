import { StyleSheet } from "react-native";

const createBookmarkStyles = (theme) => {
    return StyleSheet.create({
        safeArea: {
            flex: 1  
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
        loading: {
            flex: 1,
            justifyContent: 'center', 
            alignItems: 'center'
        },
        btn: {
            margin : 16, 
            padding: 8,
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

export default createBookmarkStyles;