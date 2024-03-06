


import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen'; // Ensure this path is correct
import MenuScreen from './Menu'; // Ensure the path to Menu.js is correct
import ForgotYourPassword from './ForgotYourPassword'; // Check this path
import AboutPage from './AboutPage'; // make sure the path is correct
import QuranSection from './QuranSection'; // Add this line to import QuranSection
import QiblaFinder from './QiblaFinder';
import Chatbot from './Chatbot';


const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
        navigation.navigate('Menu');
    };

    const handleGoogleSignIn = () => {
        // Implement Google Sign-In logic here
    };

    return (
        <View style={styles.container}>


            <View style={styles.logoContainer}>
                <Image source={require('./assets/Mosque_logo.png')} style={styles.logo} />
                <Text style={styles.logoText}>NORTHUMBRIA ISLAMIC SOCIETY</Text>
                <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                    <Image source={require('./assets/google.png')} style={styles.googleLogo} />
                    <Text style={styles.googleButtonText}>Sign in using Google</Text>
                </TouchableOpacity>
            </View>


            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            
            
            <TouchableOpacity onPress={() => navigation.navigate('ForgotYourPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>


        </View>
    );
}

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen name="ForgotYourPassword" component={ForgotYourPassword} />
                <Stack.Screen name="Quran" component={QuranSection} />
                <Stack.Screen name="Chatbot" component={Chatbot} />
                <Stack.Screen name="About" component={AboutPage} />
                <Stack.Screen name="Mosque Locations" component={QiblaFinder} />
            </Stack.Navigator>

        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FF',
    padding: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  logoText: {
    fontWeight: 'bold',
    marginVertical: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3E8DF3',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
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
  forgotPasswordText: {
    color: '#3E8DF3',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3E8DF3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
