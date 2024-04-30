import React from 'react';
import { View, TouchableOpacity, Linking, Image, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

const Locations = () => {
  // Function to open Google Maps at the specified location
  const openLocation = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={logoStyles.logoContainer}>
          <Image source={require('./assets/mosqueInside.jpg')} style={logoStyles.image}/> 
          <View>  
            <Image source={require('./assets/Mosque_logo.png')} style={logoStyles.logo}/>
            <View style={logoStyles.textContainer}>  
              <Text style={logoStyles.text}>Northumbria ISOC</Text>
              <Text style={logoStyles.text}>Newcastle upon Tyne NE1 8SU</Text>
            </View>
          </View>
        </View>

        <View style={styles.textContainer}>
        <Text style={styles.sectionTitle}>Muslim Prayer Facility</Text>
        <TouchableOpacity style={styles.button} onPress={() => openLocation("Northumbria University Prayer Facility. ISOC (MASJID)")}>
          <Text style={styles.buttonText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.sectionTitle}>Jummah Prayer at Lipman Gym</Text>
        <TouchableOpacity style={styles.button} onPress={() => openLocation("JUMUAH PRAYER FACILITY @LIPMAN GYM, Newcastle upon Tyne NE1 8ST")}>
          <Text style={styles.buttonText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.sectionTitle}>Newcastle University Islamic Society</Text>
        <TouchableOpacity style={styles.button} onPress={() => openLocation("Newcastle University Islamic Society")}>
          <Text style={styles.buttonText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.sectionTitle}>Madina Masjid</Text>
        <TouchableOpacity style={styles.button} onPress={() => openLocation("Madina Masjid Newcastle")}>
          <Text style={styles.buttonText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.sectionTitle}>Newcastle Central Mosque</Text>
        <TouchableOpacity style={styles.button} onPress={() => openLocation("Newcastle Central Mosque")}>
          <Text style={styles.buttonText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  textContainer: {
    backgroundColor: '#FFF8E1',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3E8DF3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const logoStyles = StyleSheet.create({
  logoContainer: {
    height: screenHeight * 0.25,
    justifyContent: 'center',
    backgroundColor: '#FFF9EF',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    height: 75,
    width: 75,
    alignSelf: 'center',
    marginTop: '3%',
    marginBottom: '2%',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white',
  },
  date: { 
    textAlign: 'left', 
    marginVertical: 10, 
    fontSize: 14, 
    marginLeft:10
  }
});

const dateStyles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Locations;
