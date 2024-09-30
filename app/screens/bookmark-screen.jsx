import { Fragment, useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, SafeAreaView, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper';
import createBookmarkStyles from './styles/bookmark-style'
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../configs/firebase-config';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AlertMessage from './components/alert-message';

const BookmarkScreen = ({ navigation }) => {

  const { theme } = useApp();
  const auth = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      if (!auth?.currentUser || !auth?.currentUser?.uid) {
        // console.error("User not logged in or UID is undefined");
        return;
      }

      setLoading(true);
      const bookmarksRef = collection(db, 'users', auth?.currentUser?.uid, 'bookmarks');
      const querySnapshot = await getDocs(bookmarksRef);
      const bookmarks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setBookmarkList(bookmarks);
      console.log("Fetched Bookmarks: ", bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks: ", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);  // เริ่มการรีเฟรช
    await fetchBookmarks();  // ดึงข้อมูลใหม่
    setRefreshing(false); // จบการรีเฟรช
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const styles = createBookmarkStyles(theme);

  return (
    <View style={styles.safeArea}>
      <SafeAreaView style={styles.header}>
        <View style={[styles.container, { marginVertical: 8 }]}>
            <Text variant="h1" 
                style={{
                    color: '#FFEB3B',
                }}
            >
                บันทึกของฉัน
            </Text>
            <Text 
              style={{
                  fontFamily: theme.fonts.regular.fontFamily,
                  fontSize: 14,
                  color: '#fff'
              }}
            >
                รายการร้อนอาหารที่ฉันชื่อชอบ
            </Text>
        </View>
      </SafeAreaView>
      {auth?.userLoggedIn ? (
        <View style={[styles.container, { flex: 1 }]}>
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : (
            <Fragment>
              {bookmarkList.length === 0 ? (
                <View style={[styles.loading, {flexDirection: 'row'}]}>
                    <AlertMessage error="ไม่มีข้อมูลการบันทึก"/>
                    <TouchableOpacity style={{}} onPress={() => onRefresh()}>
                      <Ionicons name="refresh" size={24} color={theme.colors.primary} style={{ marginLeft: 8}}/>
                    </TouchableOpacity>
                </View>
              ):(
                <FlatList
                  data={bookmarkList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={async () => {
                        try {
                            // Reference ไปยังเอกสารร้านอาหารใน Firestore
                            const restaurantRef = doc(db, 'restaurants', item.id);
                
                            updateDoc(restaurantRef, {
                                views: item.views + 1
                            });
                
                            navigation.navigate('RestaurantDetail', item);
                        } catch (error) {
                            console.error("Error updating views: ", error);
                        }
                      }}
                    >
                      <View style={styles.itemContainer}>
                          <Image source={{ uri: item.imageUrl }} style={styles.image} />
                          <View style={styles.itemTextContainer}>
                              <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{item.title}</Text>
                              <Text style={[styles.text, { fontSize: 14, color: 'gray' }]}>{item.category}</Text>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                  <Ionicons name="eye" size={16} color={theme.colors.primary} />
                                  <Text style={[styles.text, { fontSize: 14, color: 'gray', marginLeft: 8 }]}>{item.views}</Text>
                              </View>
                          </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 300 }} // เพิ่ม padding ให้กับ FlatList
                  refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> // เพิ่ม refresh control
                  }
                />
              )}
            </Fragment>
          )}
        </View>
      ): (
        <View style={styles.loading}>
          <Text style={styles.text}>กรุณาเข้าสู่ระบบก่อนจึงจะสามารถบันทึกได้!</Text>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnText}>สมัครสมาชิกหรือเข้าสู่ระบบ</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default BookmarkScreen