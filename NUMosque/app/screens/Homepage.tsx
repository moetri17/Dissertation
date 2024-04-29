import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import PrayerTimes from './components/PrayerTime';
import Countdown from './components/CountDown';
import moment from 'moment';

const screenHeight = Dimensions.get('window').height;

const Homepage = () => {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);
  const [ayah, setAyah] = useState(null); // State to store fetched Ayah
  const [ayahTranslation, setAyahTranslation] = useState(null); // State to store fetched Ayah's English translation

  const getNextPrayerIndexForToday = (prayerTimes) => {
    const now = moment();
    for (let i = 0; i < prayerTimes.length; i++) {
      const prayerTime = moment(prayerTimes[i].Time, 'HH:mm:ss');
      if (prayerTime.isAfter(now)) {
        return i;
      }
    }
    return -1; // If no future prayer times are found for today, return -1
  };

  useEffect(() => {
    const fetchPrayerTimesAndAyah = async () => {
      try {
        // API endpoint to fetch all prayer times
        const responseAllTimes = await fetch('http://192.168.0.23:8000/api/prayer-times');
        const allTimesData = await responseAllTimes.json();
        setPrayerTimes(allTimesData);

        // API endpoint to fetch the next prayer time
        const responseNextPrayer = await fetch('http://192.168.0.23:8000/api/next-prayer-time');
        const nextPrayerData = await responseNextPrayer.json();
        setNextPrayer(nextPrayerData);

        // Generate a random Ayah number
        const randomAyahNumber = Math.floor(Math.random() * 6236) + 1;
        // Fetch the random Ayah
        const responseAyah = await fetch(`https://api.alquran.cloud/v1/ayah/${randomAyahNumber}`);
        const ayahData = await responseAyah.json();
        if (ayahData && ayahData.data) {
          setAyah(ayahData.data);

          // Fetch the English translation of the Ayah
          const responseAyahTranslation = await fetch(`http://api.alquran.cloud/v1/ayah/${randomAyahNumber}/en.asad`);
          const ayahTranslationData = await responseAyahTranslation.json();
          if (ayahTranslationData && ayahTranslationData.data) {
            setAyahTranslation(ayahTranslationData.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchPrayerTimesAndAyah();
  }, []);

  const formattedDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(currentDate);
  const nextPrayerIndex = getNextPrayerIndexForToday(prayerTimes);
  return (
    <>
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
        <View style={dateStyles.dateContainer}>
          <Text style={logoStyles.date}>{formattedDate}</Text>
        </View>
        {nextPrayer && <Countdown nextPrayer={nextPrayer} />}
        <PrayerTimes prayerTimes={prayerTimes} nextPrayerIndex={nextPrayerIndex}/>
        {ayah && (
          <View style={styles.ayahContainer}>
            <Text style={styles.ayahText}>{ayah.text}</Text>
            {ayahTranslation && (
              <Text style={styles.ayahTranslation}>{ayahTranslation.text}</Text>
            )}
            <Text style={styles.ayahReference}>{`${ayah.surah.name} ${ayah.numberInSurah}`}</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  ayahContainer: {
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
  ayahText: {
    fontSize: 18,
    textAlign: 'center',
  },
  ayahTranslation: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 10, // Adds space between the Arabic text and its translation
  },
  ayahReference: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 10, // Adds space after the translation for the reference
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
