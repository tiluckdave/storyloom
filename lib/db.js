import { db } from '@/lib/firebase';
import { doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export const createUser = async (user) => {
    const userRef =  doc(db, 'users', user.uid);
    const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        animals: [],
        behaviours: [],
        age: 12
    }
    await setDoc(userRef, userData);
}

export const getUser = async (userId) => {
    const userRef =  doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data();
    }
    return null;
}

export const addOtherData = async (animals, behaviors, age, userId) => {
    const userRef =  doc(db, 'users', userId);
    const userData = {
        animals: animals,
        behaviours: behaviors,
        age: age
    }
    await updateDoc(userRef, userData);
}