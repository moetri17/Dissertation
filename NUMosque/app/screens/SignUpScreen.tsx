import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, Switch } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const uid = userCredential.user.uid;
      const adminStatus = isAdmin;
  
      // Use fetch to send the data to your Laravel backend
      fetch('http://192.168.0.23:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
          email: email,
          isAdmin: adminStatus,
        }),
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response from your Laravel API
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => navigation.replace('Inside') }
        ]);
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to register user in the backend.');
      });
  
    } catch (error) {
      let errorMessage = "Failed to create account";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image source={require('./assets/Mosque_logo.png')} style={styles.logo} />
      <Text style={styles.title}>NORTHUMBRIA ISOC</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Choose a Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Text style={styles.switchLabel}>Admin</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isAdmin ? "#3E8DF3" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setIsAdmin}
        value={isAdmin}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9EF',
  },
  contentContainer: {
    padding: 30,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000', // Updated color to match your theme
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#3E8DF3',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E8DF3', // Updated color to match your theme
    marginBottom: 5,
  },
  button: {
    width: '50%',
    height: 40,
    backgroundColor: '#3E8DF3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
