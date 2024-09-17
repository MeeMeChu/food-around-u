import { StyleSheet, Dimensions  } from "react-native"

const createRestDetailStyles = (theme) => {

    const { width, height } = Dimensions.get('screen')
    return StyleSheet.create({
        container: {
            flex: 1,
            margin: 16,
        },
        imageContainer: {
            flex: 1,
        },
        image: {
            width: width * 1.0,
            height: 200,
            objectFit: 'cover'
        },
        star : {
            backgroundColor : theme.colors.primary,
            flexDirection: 'row',
            paddingVertical: 2, 
            paddingHorizontal: 4, 
            borderRadius: 8, 
            alignItems: 'center'
        },
        text: {
            fontFamily: theme.fonts.regular.fontFamily
        },
    });
}

export default createRestDetailStyles

