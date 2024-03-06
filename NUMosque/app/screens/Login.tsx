import { View, TextInput, StyleSheet, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    
    const SignIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // Handle successful login here
        } catch (error) {
            // Handle login error here
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const SignUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            // Handle successful signup here
        } catch (error) {
            // Handle signup error here
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
            <TextInput
                value={email}
                style={styles.input}
                placeholder='email'
                autoCapitalize='none'
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                secureTextEntry={true}
                value={password}
                style={styles.input}
                placeholder='password'
                autoCapitalize='none'
                onChangeText={(text) => setPassword(text)}
            />
            {loading ? (
                <ActivityIndicator size='large' color='#0000ff'/>
            ) : (
                <>
                    <Button title='Login' onPress={SignIn} />
                    <Button title='Create account' onPress={SignUp} />
                </>
            )}
            </KeyboardAvoidingView>
        </View>
    );
};

export  default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal:20,
        flex:1,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth:1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#FFF',
    }
})