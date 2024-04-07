import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'


interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const MenuScreen = ({ navigation } : RouterProps) => {

  const handleMenuPress = (menuName) => {
    switch (menuName) {
      case 'Homepage':
        navigation.navigate('Homepage');
        break;
      case 'Quran':
        navigation.navigate('Quran');
        break;
      case 'Location':
        navigation.navigate('Mosque Locations');
        break;
      case 'Athkar':
        navigation.navigate('Athkar');
        break;
      case 'Chatbot':
        navigation.navigate('Chatbot');
        break;
      case 'About':
        navigation.navigate('About');
        break;
    }
  };
  
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
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <MenuButton imageSource={require('./assets/home.png')} text="Home page" onPress={() => handleMenuPress('Homepage')} />
        <MenuButton imageSource={require('./assets/quran.png')} text="Quran" onPress={() => handleMenuPress('Quran')} />
        <MenuButton imageSource={require('./assets/events.png')} text="Events" onPress={() => handleMenuPress('Events')} />
        <MenuButton imageSource={require('./assets/qibla.png')} text="Location" onPress={() => handleMenuPress('Location')} />
        <MenuButton imageSource={require('./assets/azkar.png')} text="Athkar" onPress={() => handleMenuPress('Athkar')} />
        <MenuButton imageSource={require('./assets/chatbot.png')} text="Chatbot" onPress={() => handleMenuPress('Chatbot')} />
        <MenuButton imageSource={require('./assets/settings.png')} text="Settings" onPress={() => handleMenuPress('Settings')} />
        <MenuButton imageSource={require('./assets/info.png')} text="About" onPress={() => handleMenuPress('About')} />
      </View>
      <Button onPress={handleLogout} title='Logout' />
    </View>
  );
};

const MenuButton = ({ imageSource, text, onPress }) => (
  <TouchableOpacity style={styles.menuButton} onPress={onPress}>
    <Image source={imageSource} style={styles.buttonImage} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    
  },
  menuButton: {
    backgroundColor: '#3E8DF3',
    width: '40%',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 10, height: 2 }, // X-offset and Y-offset of the shadow
    shadowOpacity: 0.5, // Opacity of the shadow
    shadowRadius: 5, // Blur radius of the shadow
    elevation: 5, // Elevation for Android
  },
  buttonImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default MenuScreen;
