import { db } from '@/lib/firebase';
import { doc, getDoc, where, query, collection, getDocs, setDoc, updateDoc } from 'firebase/firestore';

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

export const createMyStory = async (story) => {
    const storyRef =  doc(collection(db, 'stories'));
    const storyData = {
        uid: storyRef.id,
        title: story.title,
        story: story.story,
        userId: story.userid,
        audio: story.audio,
        date: new Date().toDateString()
    }
    await setDoc(storyRef, storyData);
}

export const getStory = async (storyId) => {
    const storyRef =  doc(collection(db, 'stories'), storyId);
    const storySnap = await getDoc(storyRef);
    if (storySnap.exists()) {
        return storySnap.data();
    }
    return null;
}

// from the stories collection get story with date as today and userid as given 
export const getMyStories = async (userId) => {
    const storiesRef = collection(db, 'stories');
    const q = query(storiesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const stories = [];
    querySnapshot.forEach((doc) => {
        stories.push(doc.data());
    });
    stories.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    // remove story with todays date 
    if (stories[0]?.date === new Date().toDateString()) {
        stories.shift();
    }
    return stories;
}

export const getTodayStory = async (userID) => {
    let date = new Date().toDateString();
    const storyRef = collection(db, 'stories');
    const q = query(storyRef, where("userId", "==", userID), where("date", "==", date));
    const querySnapshot = await getDocs(q);
    const stories = [];
    querySnapshot.forEach((doc) => {
        stories.push(doc.data());
    });
    console.log(stories[0]?.id);
    return stories[0];
}