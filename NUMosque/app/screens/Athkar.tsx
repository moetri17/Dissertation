import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

const { height } = Dimensions.get('window');

const Athkar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#89CFF0', height: (height / 3) - 30 }]}
        onPress={() => navigation.navigate('Morning Athkar')}>
        <View style={styles.content}>
          <Text style={styles.buttonText}>Morning Athkar</Text>
          <Image source={require('./assets/sun.png')} style={styles.image} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ffc84d', height: (height / 3) - 30 }]}
        onPress={() => navigation.navigate('Evening Athkar')}>
        <View style={styles.content}>
          <Text style={styles.buttonText}>Evening Athkar</Text>
          <Image source={require('./assets/evening.png')} style={styles.image} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#243447', height: (height / 3) - 30 }]} 
        onPress={() => navigation.navigate('Before Sleep')}>
        <View style={styles.content}>
          <Text style={styles.buttonText}>Before Sleep</Text>
          <Image source={require('./assets/night.png')} style={styles.image} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default Athkar;
