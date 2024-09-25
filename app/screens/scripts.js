import React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from '../configs/firebase-config';

const AddRestaurants = () => {
    const restaurants = [
        {
            title: "ติดมันส์ หาดใหญ่",
            imageUrl: "https://p16-va.lemon8cdn.com/tos-alisg-v-a3e477-sg/d4f77abd0be149e2ba270462db2bf32c~tplv-tej9nj120t-origin.webp",
            locationURL: "https://maps.app.goo.gl/hZHB9vrVCLopQcDG9",
            address: "35 37 ถ. สามชัย ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0816903412",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "Shabu Haven Hatyai - ชาบูเฮเว่น หาดใหญ่",
            imageUrl: "https://scontent.fbkk5-1.fna.fbcdn.net/v/t39.30808-6/274656184_306924314753492_8806659285650550730_n.jpg",
            locationURL: "https://maps.app.goo.gl/AoGCnJr7Do5gqv7LA",
            address: "53/5 ถนน ประชารักษ์ ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0623453623",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "บูตะ ชาบู หาดใหญ่",
            imageUrl: "https://scontent.fbkk5-6.fna.fbcdn.net/v/t39.30808-6/313293478_3224264531168081_6615821833120473569_n.jpg",
            locationURL: "https://maps.app.goo.gl/cskBFoUBQQLgHWMm6",
            address: "626 ถนน ปุณณกัณฑ์ ตำบล คอหงส์ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0950928530",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "ร้านบุฟเฟ่ต์ริมน้ำ กะทะร้อน",
            imageUrl: "https://scontent.fbkk5-4.fna.fbcdn.net/v/t39.30808-6/411271350_661174252887313_4271123136212325464_n.jpg",
            locationURL: "https://maps.app.goo.gl/4Ym1m2NfK81pQvfN6",
            address: "399 ถนน ราษฎร์อุทิศ ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0842500460",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "สุกี้จินดา สาขาหาดใหญ่",
            imageUrl: "https://scontent.fbkk5-7.fna.fbcdn.net/v/t39.30808-6/356278258_222018340778149_4102084797169882965_n.jpg",
            locationURL: "https://maps.app.goo.gl/cJzyGuYT5SUzADRU6",
            address: "29, 18 ถนน ศรีภูวนารถ ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0622426447",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "E-ฟราย ชาบูชาบู",
            imageUrl: "https://scontent.fbkk5-3.fna.fbcdn.net/v/t39.30808-6/412022839_211532735341043_6352844022864781483_n.jpg",
            locationURL: "https://maps.app.goo.gl/ZKoH9zbV9b2SWyh27",
            address: "86 1 ถนน นิพัทธ์สงเคราะห์ 4 ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0842692929",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "หมูกระทะแป๊ะยิ้ม BBQ & Hotpot",
            imageUrl: "https://scontent.fbkk5-4.fna.fbcdn.net/v/t39.30808-6/457017086_828408839395148_4049776755163455800_n.jpg",
            locationURL: "https://maps.app.goo.gl/1716pwp9Kjz7K1Ez7",
            address: "144 9 ถนน ประชาธิปัตย์ ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0620516405",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "เหยี่ยนสุกี้หม้อไฟ",
            imageUrl: "https://www.kinaddhatyai.com/wp-content/uploads/2022/08/cats.jpg",
            locationURL: "https://maps.app.goo.gl/PK6jEVQ9sYwqDhJm6",
            address: "107/3 ถนน ศรีภูวนารถ ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0648517688",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "แมนดารินสุกี้ ติ่มซำ ฮาลาลบุฟเฟ่ต์ หาดใหญ่",
            imageUrl: "https://img.wongnai.com/p/1920x0/2022/09/19/0344aa1ad01e484ab2305bbe9d2130fc.jpg",
            locationURL: "https://maps.app.goo.gl/EWQPMRYWAdtzuTfL8",
            address: "302, 18 รัถการ ซอย 7/3 อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0866963231",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "พริกขี้หนู หมูกระทะ",
            imageUrl: "https://www.kinaddhatyai.com/wp-content/uploads/2021/11/cats1.jpg",
            locationURL: "https://maps.app.goo.gl/ae2FKUCxJ6WHSDNF9",
            address: "81/1 ถนนไทยอาคาร ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0985859864",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "Madam shabu บุฟเฟต์ หาดใหญ่",
            imageUrl: "https://scontent.fbkk5-4.fna.fbcdn.net/v/t39.30808-6/311338850_652409926533172_1761713979998088876_n.jpg",
            locationURL: "https://maps.app.goo.gl/prePV126uiSrzV2f6",
            address: "340 ถ. ธรรมนูญวิถี ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0937202646",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "ไอย๊ะชาบู",
            imageUrl: "https://scontent.fbkk5-3.fna.fbcdn.net/v/t39.30808-6/443822123_914697914001263_6620254948629889973_n.jpg",
            locationURL: "https://maps.app.goo.gl/tHPFq8DwrbY6xkfU9",
            address: "174 ถ. สามชัย ตำบล คอหงส์ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0615425242",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        },
        {
            title: "เรือนเพชรหมูกระทะ",
            imageUrl: "https://scontent.fbkk5-7.fna.fbcdn.net/v/t39.30808-6/417553368_794096016096518_7030693704308209514_n.jpg",
            locationURL: "https://maps.app.goo.gl/FsJWF2CgL4ypcusj7",
            address: "ถนน ศรีภูวนารทใน ตำบล หาดใหญ่ อำเภอหาดใหญ่ สงขลา 90110",
            phone: "0959768102",
            views: 0,
            category: "บุฟเฟต์",
            created_at: Timestamp.now(),
            updated_at: Timestamp.now()
        }
        // ข้อมูลร้านอาหารอื่นๆ เพิ่มเติม...
    ];

    const handleAddRestaurants = async () => {
        try {
            for (const restaurant of restaurants) {
                await addDoc(collection(db, "restaurants"), restaurant);
            }
            console.log("All restaurants have been added successfully");
        } catch (e) {
            console.error("Error adding restaurants: ", e);
        }
    };

    return (
        <SafeAreaView>
            <Text>เพิ่มข้อมูลร้านอาหาร</Text>
            {/* <Button title="Add Restaurants" onPress={handleAddRestaurants} /> */}
        </SafeAreaView>
    );
};

export default AddRestaurants;