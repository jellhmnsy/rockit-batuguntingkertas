import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { authentication, db } from '../firebase/firebaseconfig';

export default function Home() {
    const [user, setUser] = useState([]);

    const getUser = async () => {
        const docsRef = collection(db, "users");
        const q = query(docsRef, where("userUID", "!=", authentication?.currentUser?.uid));
        
        const unsubscribe = onSnapshot(q, (onSnap) => {
            let data = [];
            console.log('1');

            onSnap.docs.forEach((user) => {
                console.log('2');
                data.push({...user.data()});
        })

        setUser(data);
        console.log('Data Fetched', user);
        })
        return unsubscribe;
        // const docsSnap = onSnapshot(q, (onSnap) => {
        //     let data = [];
        //     console.log('1')

        //     onSnap.docs.forEach(user => {
        //         console.log('2')

        //         data.push({...user.data()});
        //         setUser(data);
        //         console.log('berhasil')
        //         console.log(user.data());
        //     });
        // })
    }
    useEffect(() => {
        const unsubscribe = getUser();
        return unsubscribe;
    }, [])

  return (
    <View>
      <Text>Home</Text>
      {user.length > 0 && ( // Conditionally render user list if there are users
        <ul>
          {user.map((user) => (
            <li key={user.id}>{user.username} (UID: {user.userUID})</li>
          ))}
        </ul>
      )}
    </View>
  )
}

const styles = StyleSheet.create({})