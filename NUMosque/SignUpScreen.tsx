import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Implement sign-up logic
    alert('Sign Up button pressed');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image
        source={require('./assets/Mosque_logo.png')} // Replace with your logo image file
        style={styles.logo}
      />
      <Text style={styles.title}>NORTHUMBRIA ISLAMIC SOCIETY</Text>
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
  backIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    // Adjust padding if necessary
    padding: 10,
  },
  logo: {
    width: 150, // Adjust the size as necessary
    height: 150, // Adjust the size as necessary
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
