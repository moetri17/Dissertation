import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import Countdown from '../../components/CountDown';


const screenHeight = Dimensions.get('window').height;

const Homepage = () => {
  const [nextPrayer, setNextPrayer] = useState({ name: '', time: '' });

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // Ensure this URL is correct and accessible from your device
        const response = await fetch('http://192.168.0.23:8000/api/prayer-times');
        const data = await response.json();

        setNextPrayer({ name: data.nextPrayerName, time: data.nextPrayerTime });
      } catch (error) {
        console.error("Failed to fetch prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, []);

  const targetDate = new Date().toISOString().slice(0, 10) + 'T' + nextPrayer.time;

  return (
    <>
      <View style={styles.container}>
        <View style={logoStyles.logoContainer}>
          <Image source={require('./assets/mosqueInside.jpg')} style={logoStyles.image}/> 
          <BlurView intensity={0} style={StyleSheet.absoluteFill}>   
            <View>  
              <Image source={require('./assets/Mosque_logo.png')} style={logoStyles.logo}/>
              <View style={logoStyles.textContainer}>  
                <Text style={logoStyles.text}>
                  Northumbria ISOC
                </Text>
                <Text style={logoStyles.text}>Newcastle upon Tyne NE1 8SU</Text>
              </View>
            </View>
          </BlurView>
        </View>

        <View style={prayerStyles.prayerTimesContainer}>
          <Text>The next prayer {nextPrayer.name} will be at: {nextPrayer.time}</Text>
          {nextPrayer.time && <Countdown targetDate={targetDate} />}
        </View>


        <View style={prayerStyles.prayerTimesContainer}>
          <Text>Ayah for today:</Text>
        </View>


        <View style={prayerStyles.prayerTimesContainer}>
          <Text>Upcoming events:</Text>
        </View>

        <View style={prayerStyles.prayerTimesContainer}>
          <Text>hadith of the day:</Text>
        </View>

        <View style={prayerStyles.prayerTimesContainer}>
          <Text>Ask me a question system:</Text>
        </View>
      </View>
    </>
  );
}

export default Homepage;

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },

});

const logoStyles = StyleSheet.create({
  logoContainer: {
    height: screenHeight * 0.25, // Set the container height to 25% of the screen height
    justifyContent: 'center', // Center the content vertically
    backgroundColor: '#FFF9EF',
    alignItems: 'center',
  },
  logo: {
    height: 75,
    width: 75,
    alignSelf: 'center',
    marginTop: '3%',
    marginBottom: '2%',
  },
  image: {
    position: 'absolute', // Make image fill the designated space without affecting layout
    width: '100%', // Ensure the image covers the width
    height: '100%', // The image height now effectively 25% of the screen height
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white', // Ensure text is visible on the image
  },
});

const prayerStyles = StyleSheet.create({
  prayerTimesContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFF9EF',
    margin: 10,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf:'center'
  },
});
