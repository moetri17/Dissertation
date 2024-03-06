import { View, Button } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'


interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation} : RouterProps) => {
  return (
    <View >
        <Button onPress={() => navigation.navigate('Details')} title='Open Details' />
        <Button onPress={() => FIREBASE_AUTH.signOut() } title='Logout' />
    </View>
  )
}

export default List