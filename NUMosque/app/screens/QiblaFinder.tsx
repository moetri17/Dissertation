import React from 'react';
import { View, Button, Linking, Image, StyleSheet, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { BlurView } from 'expo-blur';



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
      <Image source={require('./assets/outdoor.jpg')} style={styles.backgroundImage} />
      <BlurView
        style={styles.absolute}
        tint="light" // or 'dark', 'default'
        intensity={80} // Adjust this value for more or less blur
      />
      <View style={styles.logoContainer}>
        <Image source={require('./assets/Mosque_logo.png')} style={styles.logo} />
        <Text style={styles.logoText}>NORTHUMBRIA ISLAMIC SOCIETY</Text>
      </View>
      <View style={styles.button}>
        <Button  title="Prayer Facility" onPress={PrayerRoomFacility} />
      </View>
      <View style={styles.button}>
        <Button title="Prayer Location" onPress={PrayerFacility} />
      </View>
      <View style={styles.button}>
        <Button  title="Jummah Facility" onPress={JummahFacility} />
      </View>
      <View style={styles.button}>
        <Button title="Jummah Location" onPress={JummahAddress} />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    top: 20, // Adjust this value to move the logo up
    alignItems: 'center',
    width: '100%', // Ensure the container takes the full width
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  logoText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  absolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '60%', // Adjust width as needed
  },
});
