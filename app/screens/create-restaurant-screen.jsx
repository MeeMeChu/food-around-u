import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, View, ScrollView, SafeAreaView } from 'react-native';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import RNPickerSelect from 'react-native-picker-select';
import createAddRestaurantStyles from './styles/create-restaurant-style';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { TouchableOpacity } from 'react-native';
import AlertMessage from './components/alert-message';
import { db } from '../configs/firebase-config';

const CreateRestaurantScreen = ({ navigation }) => {
  const { theme } = useApp();
  const auth = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    locationURL: '',
    address: '',
    phone: '',
    category: '',
    author: auth?.currentUser?.displayName,
  });
  const [error, setError] = useState('');

  console.log(formData);

  const handleSubmit = async () => {

    if (!formData.title || !formData.imageUrl || !formData.phone || !formData.locationURL || !formData.category || !formData.address) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    setError('')
    try {
      const response = await addDoc(collection(db, 'restaurants'), {
        ...formData,
        views: 0,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });

      if (response != null) {
        navigation.navigate('Main');
      }
    } catch (e) {
      console.error("Error" , e);
    }
  }
  
  const handleChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,     
      [field]: value   
    }));
  };

  const styles = createAddRestaurantStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // ปรับค่า offset ตามความเหมาะสม
      >
        <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={[styles.textBold, { fontSize: 24, letterSpacing: 3}]}>เพิ่มร้านอาหาร</Text>
          </View>
          <View>
            <View style={styles.textContainer}>
                <Text style={[styles.text, { fontSize : 18 }]}>ชื่อร้าน</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="ชื่อร้านค้า"
                placeholderTextColor="#999"
                value={formData.title}
                onChangeText={(value) => handleChange('title', value)}
                autoCapitalize="none"
            />
          </View>
          <View>
            <View style={styles.textContainer}>
                <Text style={[styles.text, { fontSize : 18 }]}>ที่อยู่</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="ที่อยู่ของร้านค้า"
                placeholderTextColor="#999"
                value={formData.address}
                onChangeText={(value) => handleChange('address', value)}
                keyboardType="default"
                autoCapitalize="none"
            />
          </View>
          <View>
            <View style={styles.textContainer}>
                <Text style={[styles.text, { fontSize : 18 }]}>เบอร์โทรศัพท์</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="เบอร์โทรศัพท์"
                placeholderTextColor="#999"
                value={formData.phone}
                onChangeText={(value) => handleChange('phone', value)}
                keyboardType="number-pad"
                autoCapitalize="none"
            />
          </View>
          <View>
            <View style={styles.textContainer}>
                <Text style={[styles.text, { fontSize : 18 }]}>หมวดหมู่ร้านค้า</Text>
            </View>
            <RNPickerSelect
              onValueChange={(value) => handleChange('category',value)}
              items={[
                { label: 'บุฟเฟต์', value: 'บุฟเฟต์' },
                { label: 'ก๋วยเตี๋ยว', value: 'ก๋วยเตี๋ยว' },
                { label: 'ของหวาน', value: 'ของหวาน' },
                { label: 'อาหารตามสั่ง', value: 'อาหารตามสั่ง' },
              ]}
              placeholder={{
                label: 'เลือกหมวดหมู่...',
                value: null,
              }}
              style={{
                inputIOS: {
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  paddingRight: 30, // เพื่อให้มีพื้นที่สำหรับไอคอน dropdown
                },
                inputAndroid: {
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderColor: '#',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  paddingRight: 30, // เพื่อให้มีพื้นที่สำหรับไอคอน dropdown
                },
              }}
            />
          </View>
          <View>
            <View style={styles.textContainer}>
                <Text style={[styles.text, { fontSize : 18 }]}>ลิ้ง Google Map</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="https://maps.google.com/"
                placeholderTextColor="#999"
                value={formData.locationURL}
                onChangeText={(value) => handleChange('locationURL', value)}
                keyboardType="url"
                autoCapitalize="none"
            />
          </View>
          <View>
            <View style={styles.textContainer}>
                <Text style={[styles.text, { fontSize : 18 }]}>รูปภาพ (URL)</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="https://example.com/image.png"
                placeholderTextColor="#999"
                value={formData.imageUrl}
                onChangeText={(value) => handleChange('imageUrl', value)}
                keyboardType="url"
                autoCapitalize="none"
            />
          </View>
          {error ? (
            <View style={{ marginTop: 16}}>
              <AlertMessage error={error}/>
            </View>
          ) : null}
          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>เพิ่มข้อมูลร้านอาหาร</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CreateRestaurantScreen