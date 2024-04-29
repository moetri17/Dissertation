import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native'


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
      case 'Events':
        navigation.navigate('Events');
        break;
      case 'Location':
        navigation.navigate('Mosque Locations');
        break;
      case 'Chatbot':
        navigation.navigate('Chatbot');
        break;
      case 'About':
        navigation.navigate('About');
        break;
      case 'Settings':
        navigation.navigate('Settings');
        break;
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <MenuButton imageSource={require('./assets/home.png')} text="Home page" onPress={() => handleMenuPress('Homepage')} />
        <MenuButton imageSource={require('./assets/quran.png')} text="Quran" onPress={() => handleMenuPress('Quran')} />
        <MenuButton imageSource={require('./assets/events.png')} text="Events" onPress={() => handleMenuPress('Events')} />
        <MenuButton imageSource={require('./assets/qibla.png')} text="Location" onPress={() => handleMenuPress('Location')} />
        <MenuButton imageSource={require('./assets/azkar.png')} text="Azkar" onPress={() => handleMenuPress('Azkar')} />
        <MenuButton imageSource={require('./assets/chatbot.png')} text="Chatbot" onPress={() => handleMenuPress('Chatbot')} />
        <MenuButton imageSource={require('./assets/settings.png')} text="Settings" onPress={() => handleMenuPress('Settings')} />
        <MenuButton imageSource={require('./assets/info.png')} text="About" onPress={() => handleMenuPress('About')} />
      </View>
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
    // Removed flex: 1 to stop it from expanding too much
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 0,
  },
  menuButton: {
    backgroundColor: '#3E8DF3',
    width: '40%',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 10, height: 2 }, // X-offset and Y-offset of the shadow
    shadowOpacity: 0.5, // Opacity of the shadow
    shadowRadius: 5, // Blur radius of the shadow
    elevation: 7, // Elevation for Android
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
