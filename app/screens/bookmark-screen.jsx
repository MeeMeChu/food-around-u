import { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native'
import { Text } from 'react-native-paper';
import createBookmarkStyles from './styles/bookmark-style'
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebase-config';

const BookmarkScreen = () => {

  const { theme } = useApp();
  const auth = useAuth();
  const [bookmarkList, setBookmarkList] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const bookmarksRef = collection(db, 'users', auth?.currentUser?.uid, 'bookmarks');
      const querySnapshot = await getDocs(bookmarksRef);
      const bookmarks = querySnapshot.docs.map(doc => ({
        id: doc.id,  // id ของ bookmark
        ...doc.data() // ข้อมูลอื่นๆ ใน bookmark เช่น title, imageUrl, category ฯลฯ
      }));
  
      setBookmarkList(bookmarks);
      console.log("Fetched Bookmarks: ", bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks: ", error);
    }
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
                คอลเล็กชั่นของฉัน
            </Text>
            <Text 
              style={{
                  fontFamily: theme.fonts.regular.fontFamily,
                  fontSize: 14,
                  color: '#fff'
              }}
            >
                รายการร้อนอาหารที่เราชื่อชอบ
            </Text>
        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <Text>asdasasd</Text>
      </View>
    </View>
  )
}

export default BookmarkScreen