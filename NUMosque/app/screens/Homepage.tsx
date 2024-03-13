import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import PrayerTimes from '../../components/PrayerTime';
import Countdown from '../../components/CountDown';
import moment from 'moment';


const screenHeight = Dimensions.get('window').height;

const Homepage = () => {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);


  const getNextPrayerIndexForToday = (prayerTimes) => {
    const now = moment();
    for (let i = 0; i < prayerTimes.length; i++) {
      const prayerTime = moment(prayerTimes[i].Time, 'HH:mm:ss');
      // If the prayer time is later than the current time, return this index
      if (prayerTime.isAfter(now)) {
        return i;
      }
    }
    // If no future prayer times are found for today, return -1
    return -1;
  };


  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // API endpoint to fetch all prayer times
        const responseAllTimes = await fetch('http://192.168.0.23:8000/api/prayer-times');
        const allTimesData = await responseAllTimes.json();
        setPrayerTimes(allTimesData);

        // API endpoint to fetch the next prayer time
        const responseNextPrayer = await fetch('http://192.168.0.23:8000/api/next-prayer-time');
        const nextPrayerData = await responseNextPrayer.json();
        setNextPrayer(nextPrayerData);
      } catch (error) {
        console.error("Failed to fetch prayer times:", error);
      }
    };

    fetchPrayerTimes();
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

});

const logoStyles = StyleSheet.create({
  logoContainer: {
    height: screenHeight * 0.25, // Set the container height to 25% of the screen height
    justifyContent: 'center', // Center the content vertically
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
    color: 'white', // Ensure text is visible on the image
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
    backgroundColor: '#FFF9EF',
    margin: 10,
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
  },
});
