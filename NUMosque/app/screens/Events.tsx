import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

import UserEvents from './components/UserEvents';
import AdminEvents from './components/AdminEvents';

const Events = () => {
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const uid = user.uid;

        try {
          const response = await fetch(`http://192.168.0.23:8000/api/users/${uid}`);
          const data = await response.json();
          setUserRole(data.is_admin ? 'admin' : 'user');
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1 }}>
      {userRole === 'admin' ? <AdminEvents navigation={navigation} /> : <UserEvents />}
    </View>
  );
};

export default Events;
