import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const AdminSettings = ({ navigation }: RouterProps) => {
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Logout Failed', 'An error occurred while trying to log out.');
        }
    };

    const navigateToAddAdmin = () => {
        navigation.navigate('AddAdmin');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={navigateToAddAdmin}>
                <Text>Manage Admins</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', 
        padding: 20,
    },
    button: {
        alignSelf: 'center',
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10  // Ensure spacing between buttons
    }
});
export default AdminSettings;
