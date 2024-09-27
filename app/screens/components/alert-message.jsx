import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useApp } from '../../contexts/AppContext';

const AlertMessage = (props) => {
    const { theme } = useApp();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'rgba(211, 47, 47, 0.3)',
            border: 1,
            borderRadius: 8,
            padding: 8,
            flexDirection: 'row',
            alignItems: 'center'
        },
        text: {
            fontFamily: theme.fonts.regular.fontFamily,
            marginLeft: 8,
            color: 'rgba(95, 33, 32, 1)'
        }
    });


    return (
        <View style={styles.container}>
            <Ionicons name="alert-circle-outline" size={24} color='red' />
            <Text style={styles.text}>{props.error}</Text>
        </View>
    )
}

export default AlertMessage