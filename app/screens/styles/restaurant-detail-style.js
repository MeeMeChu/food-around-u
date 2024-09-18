import { StyleSheet, Dimensions  } from "react-native"

const createRestDetailStyles = (theme) => {

    const { width, height } = Dimensions.get('screen')
    return StyleSheet.create({
        container: {
            margin: 16,
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
            alignItems: 'center',
            justifyContent: 'center'
        },
        text: {
            fontFamily: theme.fonts.regular.fontFamily
        },
        map: {
            width: '100%',
            height: 100,
            objectFit: 'cover', 
            borderRadius: 8, 
            marginTop: 8
        }
    });
}

export default createRestDetailStyles

