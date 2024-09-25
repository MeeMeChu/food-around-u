import { StyleSheet } from "react-native";

const createHomeStyles = (theme) => {
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
        inputContainer: {
            marginTop: 16,  
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
            paddingVertical: 8,
        },
        item: {
            position: 'relative',
            margin: 8,
        },
        image: {
            width: 100,
            height: 180,
            objectFit: 'cover',
            borderRadius: 8,
        },
        textContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // เพิ่มพื้นหลังโปร่งแสง
            padding: 8,
            borderRadius: 8,
            alignItems: 'center',
        },
        itemFood: {
            position: 'relative',
            margin: 8,
        },
        imageFood: {
            width: 150,
            height: 150,
            objectFit: 'cover',
            borderRadius: 8,
        },
        textFoodContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // เพิ่มพื้นหลังโปร่งแสง
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
            alignItems: 'start',
        },
        star : {
            backgroundColor : theme.colors.primary,
            flexDirection: 'row',
            paddingVertical: 2, 
            paddingHorizontal: 4, 
            borderRadius: 8, 
            alignItems: 'center'
        }
    });
}


export default createHomeStyles;