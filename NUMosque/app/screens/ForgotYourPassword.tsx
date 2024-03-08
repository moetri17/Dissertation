import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotYourPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleSendResetEmail = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert(
                    "Email Sent",
                    "Check your email to reset your password.",
                    [
                        { text: "OK", onPress: () => navigation.goBack() }
                    ]
                );
            })
            .catch((error) => {
                const errorMessage = error.message;
                // Error message handling
                Alert.alert("Error", errorMessage);
            });
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('./assets/Mosque_logo.png')}
            />
            <Text style={styles.title}>NORTHUMBRIA ISLAMIC SOCIETY</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter Email"
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handleSendResetEmail}>
                <Text style={styles.buttonText}>Send Reset Email</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 30,
        backgroundColor: '#FFF9EF'
    },
    backButton: {
        alignSelf: 'flex-start',
        fontSize: 24,
        color: '#000',
        marginBottom: 10
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20
    },
    forgotPasswordText: {
        color: '#3E8DF3',
        marginBottom: 20,
      },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#3E8DF3', // Change this to the shade of blue you prefer
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        width: '50%', // Reduced from '100%' to '90%' to make the button narrower
        height: 40, // Reduced from 50 to 40 to make the button shorter
        backgroundColor: '#3E8DF3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export default ForgotYourPassword;
