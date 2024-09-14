import * as Font from 'expo-font';
import { Fragment, useEffect, useState } from "react";
import Routes from "./app/routes";
import { AppProvider } from "./app/contexts/AppContext";
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'NotoSansThai-Regular': require('./assets/fonts/NotoSansThai-Regular.ttf'),
      'NotoSansThai-Bold': require('./assets/fonts/NotoSansThai-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // แสดงหน้าจอโหลดจนกว่าฟอนต์จะโหลดเสร็จ
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Fragment>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Fragment>
  );
}

