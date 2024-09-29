import { deleteDoc, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../configs/firebase-config";

export const checkIfBookmarked = async (restaurantID, auth) => {
    try {   
        if (!auth?.currentUser || !auth?.currentUser?.uid) {
            // console.log("User not logged in or UID is undefined");
            return false;
        }

        const bookmarkRef = doc(db, 'users', auth?.currentUser?.uid, 'bookmarks', restaurantID);
        const docSnapshot = await getDoc(bookmarkRef);
        return docSnapshot.exists();
    } catch (error) {
        console.error("Error checking bookmark:", error);
        return false;
    }
};

// Function สำหรับเพิ่ม bookmark
export const addBookmark = async (restaurant, auth) => {
    try {
        const bookmarkRef = doc(db, 'users', auth?.currentUser?.uid, 'bookmarks', restaurant.id);
        await setDoc(bookmarkRef, {
            title: restaurant.title,
            imageUrl: restaurant.imageUrl,
            category: restaurant.category,
            address: restaurant.address,
            locationURL: restaurant.locationURL,
            phone: restaurant.phone,
            bookmarkedAt: Timestamp.now()
        });
        console.log("Bookmark added!");
    } catch (error) {
        console.error("Error adding bookmark: ", error);
    }
};

// Function สำหรับลบ bookmark
export const removeBookmark = async (restaurantID, auth) => {
    try {
        const bookmarkRef = doc(db, 'users', auth?.currentUser?.uid, 'bookmarks', restaurantID);
        await deleteDoc(bookmarkRef);
        console.log("Bookmark removed!");
    } catch (error) {
        console.error("Error removing bookmark: ", error);
    }
};
