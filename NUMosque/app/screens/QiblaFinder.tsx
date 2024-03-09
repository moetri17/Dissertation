import React from 'react';
import { View, TouchableOpacity, Linking, Image, StyleSheet, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';


export default function App() {
  // Function to open Google Maps at the specified location
  const PrayerRoomFacility = () => {
    const address = "Northumbria University Prayer Facility. ISOC (MASJID)";
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const JummahFacility = () => {
    const address = "JUMUAH PRAYER FACILITY @LIPMAN GYM, Newcastle upon Tyne NE1 8ST";
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  // Function to copy the address to the clipboard
  const PrayerFacility = async () => {
    await Clipboard.setStringAsync('Newcastle upon Tyne NE1 8SU');
  };

  const JummahAddress = async () => {
    await Clipboard.setStringAsync('JUMUAH PRAYER FACILITY @LIPMAN GYM, Newcastle upon Tyne NE1 8ST');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={require('./assets/Mosque_logo.png')} style={styles.logo} />
        <Text style={styles.logoText}>Northumbria Islamic Society</Text>
        
        {/* Prayer Facility Section */}
        <Text style={styles.sectionTitle}>Muslim Prayer Facility</Text>
        <TouchableOpacity style={styles.button} onPress={PrayerRoomFacility}>
          <Text style={styles.buttonText}>Open in Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={PrayerFacility}>
          <Text style={styles.buttonText}>Copy Address</Text>
        </TouchableOpacity>

        {/* Jummah Facility Section */}
        <Text style={styles.sectionTitle}>Jummah Prayer at Lipman Gym</Text>
        <TouchableOpacity style={styles.button} onPress={JummahFacility}>
          <Text style={styles.buttonText}>Open in Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={JummahAddress}>
          <Text style={styles.buttonText}>Copy Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9EF',
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%', // Ensure the container takes the full width
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#3E8DF3', // A shade of blue for better visibility
    padding: 10,
    borderRadius: 5,
    marginVertical: 5, // Adds space between buttons
    width: '80%', // Makes buttons wider for easier tapping
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
