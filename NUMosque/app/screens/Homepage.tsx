import React, { useState, useEffect } from 'react';
import {Modal, View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Linking } from 'react-native';
import PrayerTimes from './components/PrayerTime';
import Countdown from './components/CountDown';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenHeight = Dimensions.get('window').height;

const Homepage = () => {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);
  const [ayah, setAyah] = useState(null); // State to store fetched Ayah
  const [ayahTranslation, setAyahTranslation] = useState(null); // State to store fetched Ayah's English translation
  const [modalVisible, setModalVisible] = useState(false);

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

        <View style={styles.qiblaContainer}>
          <Text style={styles.qiblaText}>Wondering where the Qibla is?</Text>
          <TouchableOpacity style={styles.qiblaButton} onPress={() => Linking.openURL('https://qiblafinder.withgoogle.com/intl/en/onboarding')}>
            <Text style={styles.buttonText}>Find Qibla Direction</Text>
          </TouchableOpacity>
        </View>

        {ayah && (
          <View style={styles.ayahContainer}>
            <Text style={styles.ayahText}>{ayah.text}</Text>
            {ayahTranslation && (
              <Text style={styles.ayahTranslation}>{ayahTranslation.text}</Text>
            )}
            <Text style={styles.ayahReference}>{`${ayah.surah.name} ${ayah.numberInSurah}`}</Text>
          </View>
        )}
        
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.imageContainer}>
            <Text style={styles.downloadText}>May Prayer Times</Text>
            <Image source={require('./assets/may_timetable.png')} style={styles.prayerTimesImage} />
          </View>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.fullScreenContainer}>
            <Image source={require('./assets/may_timetable.png')} style={styles.fullScreenImage} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)} // Ensure this is straightforward
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} // Increase touch area
            >
              <Icon name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Modal>

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
    elevation: 3,
    shadowColor: '#000',
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
    marginTop: 10,
  },
  ayahReference: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
  },
  qiblaContainer: {
    backgroundColor: '#FFF8E1',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  qiblaText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  qiblaButton: {
    backgroundColor: '#3E8DF3',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageContainer: {
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  prayerTimesImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain'
  },
  downloadText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  fullScreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
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
    marginLeft: 10,
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
