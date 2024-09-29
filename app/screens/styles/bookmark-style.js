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
    });
}

export default createBookmarkStyles;