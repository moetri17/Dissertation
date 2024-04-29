import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

interface RouterProps {
    navigation: NavigationProp<any, any>;
  }

  const Settings = ({ navigation } : RouterProps) => {

    const handleLogout = async () => {
        try {
          await FIREBASE_AUTH.signOut();
          // Navigate to Login screen after successful sign out
          navigation.navigate('Login');
        } catch (error) {
          // Handle sign out error if needed
          Alert.alert('Logout Failed', 'An error occurred while trying to log out.');
        }
      };


  return (
    <View>
      <Button onPress={handleLogout} title='Logout' />
    </View>
  )
}

export default Settings