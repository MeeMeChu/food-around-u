import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AccountScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Account Screen</Text>
        </SafeAreaView>
    )
}

export default AccountScreen