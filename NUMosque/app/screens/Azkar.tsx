import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

const { height } = Dimensions.get('window'); // Get the screen height

const Azkar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#89CFF0', height: (height / 3) - 30 }]}
        onPress={() => navigation.navigate('Morning Athkar')}>
        <View style={styles.content}>
          <Text style={styles.buttonText}>Morning Azkar</Text>
          <Image source={require('./assets/sun.png')} style={styles.image} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ffc84d', height: (height / 3) - 30 }]}
        onPress={() => navigation.navigate('Evening Athkar')}>
        <View style={styles.content}>
          <Text style={styles.buttonText}>Evening Azkar</Text>
          {/* Add your image here */}
          <Image source={require('./assets/evening.png')} style={styles.image} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#243447', height: (height / 3) - 30 }]} 
        onPress={() => navigation.navigate('NightAzkar')}>
        <View style={styles.content}>
          <Text style={styles.buttonText}>Night Azkar</Text>
          {/* Add your image here */}
          <Image source={require('./assets/night.png')} style={styles.image} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around', // This will distribute space evenly, including between elements
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  button: {
    width: '100%', // Take up all available width
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10, // Adds a margin between the buttons
  },
  content: {
    flexDirection: 'row', // Aligns text and image side by side
    alignItems: 'center', // Centers items vertically
    justifyContent: 'space-between', // Puts max space between text and image
    width: '100%', // Ensure the content uses the full width of the button
    paddingHorizontal: 20, // Padding inside the button
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left', // Aligns the text to the left
  },
  image: {
    width: 50, // Adjust based on your image
    height: 50, // Adjust to match the aspect ratio of your image
    resizeMode: 'contain', // Keeps the aspect ratio of the image
  },
});

export default Azkar;
