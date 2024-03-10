import { View, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Text, KeyboardAvoidingView, Image } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = ({navigation} ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    
    const SignIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding' style={styles.keyboardAvoidingView}>
            <Image source={require('./assets/Mosque_logo.png')} style={styles.logo} />
                <Text style={styles.title}>Northumbria Islamic Society</Text>
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    secureTextEntry={true}
                    value={password}
                    style={styles.input}
                    placeholder='Password'
                    autoCapitalize='none'
                    onChangeText={(text) => setPassword(text)}
                />
                {loading ? (
                    <ActivityIndicator size='large' color='#1E90FF'/>
                ) : (
                    <>
                       <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.ForgotPasswordText}>Forgot your password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={SignIn}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.buttonText}>Create account</Text>
                        </TouchableOpacity>
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export  default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF9EF'
    },
    logo: {
        width: 150, // Adjust the width as necessary
        height: 150, // Adjust the height as necessary
        marginBottom: 20, // Adds some space below the logo
    },
    keyboardAvoidingView: {
        alignItems: 'center', // Center the content
    },
    button: {
        backgroundColor: '#3E8DF3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '80%', // Adjusted to match your input width
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    ForgotPasswordText: {
        color: '#3E8DF3',
        marginBottom: 20,
      },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333', // Dark text for better readability
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
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%', // Adjust based on preference
    },
})