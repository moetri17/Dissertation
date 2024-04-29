import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Settings = ({ navigation }: RouterProps) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const userSettingsRef = doc(db, "userSettings", user.uid);
            getDoc(userSettingsRef).then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    setNotificationsEnabled(docSnapshot.data().notificationsEnabled);
                }
            }).catch(error => {
                console.error("Error fetching user settings:", error);
            });
        }
    }, [user, db]);

    const toggleSwitch = async () => {
        const newSetting = !notificationsEnabled;
        setNotificationsEnabled(newSetting);
        if (user) {
            const userSettingsRef = doc(db, "userSettings", user.uid);
            await setDoc(userSettingsRef, { notificationsEnabled: newSetting }, { merge: true })
                .catch(error => {
                    console.error("Error updating settings:", error);
                });
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Logout Failed', 'An error occurred while trying to log out.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <Text>Enable Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={notificationsEnabled}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    button: {
        alignSelf: 'center',
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5,
    }
});

export default Settings;
