import { StyleSheet } from "react-native";

const createLoginStyles = (theme) => {
    return StyleSheet.create({
        container: {
            marginHorizontal: 16
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
            padding: 24,
        },
        textContainer: {
            margin : 4
        },
        btn: {
            marginTop: 24,
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
        showPasswordButton: {
            marginLeft: 8,
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
        passwordContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
        },
        inputWithIcon: {
            flex: 1,
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingRight: 40, // Add padding to avoid text overlapping with icon
            backgroundColor: '#fff',
            fontSize: 16,
        },
        iconButton: {
            position: 'absolute',
            right: 10,
            height: 50,
            justifyContent: 'center',
        },
    });
}

export default createLoginStyles;