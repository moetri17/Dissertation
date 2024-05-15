import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const MenuScreen = ({ navigation }: RouterProps) => {
  const handleMenuPress = (menuName: string) => {
    navigation.navigate(menuName);
  };

  const menuItems = [
    { name: 'Homepage', imageSource: require('./assets/home.png'), text: 'Home page' },
    { name: 'Quran', imageSource: require('./assets/quran.png'), text: 'Quran' },
    { name: 'Events', imageSource: require('./assets/events.png'), text: 'Events' },
    { name: 'Locations', imageSource: require('./assets/location.png'), text: 'Locations' },
    { name: 'Athkar', imageSource: require('./assets/azkar.png'), text: 'Athkar' },
    { name: 'Ask Me', imageSource: require('./assets/chatbot.png'), text: 'Ask Me' },
    { name: 'Settings', imageSource: require('./assets/settings.png'), text: 'Settings' },
    { name: 'About', imageSource: require('./assets/info.png'), text: 'About' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <MenuButton key={index} imageSource={item.imageSource} text={item.text} onPress={() => handleMenuPress(item.name)} />
        ))}
      </View>
    </View>
  );
};

const MenuButton = ({ imageSource, text, onPress }: any) => (
  <TouchableOpacity style={styles.menuButton} onPress={onPress}>
    <Image source={imageSource} style={styles.buttonImage} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuButton: {
    backgroundColor: '#FFF8E1',
    width: height * 0.18,
    height: height * 0.18,
    borderRadius: height * 0.09,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
