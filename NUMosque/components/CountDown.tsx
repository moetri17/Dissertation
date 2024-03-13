import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Countdown = ({ nextPrayer }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateEndTime = (time) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      const now = new Date();
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
      // If the prayer time has already passed for today, set it for the next day
      if (endTime <= now) {
        endTime.setDate(endTime.getDate() + 1);
      }
      return endTime;
    };

    const targetTime = calculateEndTime(nextPrayer.Time);
    const updateCountdown = () => {
      const now = new Date();
      const distance = targetTime.getTime() - now.getTime();

      if (distance >= 0) {
        const hoursLeft = Math.floor((distance / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const minutesLeft = Math.floor((distance / (1000 * 60)) % 60).toString().padStart(2, '0');
        const secondsLeft = Math.floor((distance / 1000) % 60).toString().padStart(2, '0');
        setCountdown(`${hoursLeft}:${minutesLeft}:${secondsLeft}`);
      } else {
        // Reset countdown to "00:00:00" when the prayer time is passed
        setCountdown('00:00:00');
      }
    };

    // Set up the countdown timer to tick every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [nextPrayer]);

  return (
    <View style={styles.container}>
      <Text style={styles.countdownText}><Text style={styles.prayerName}>{nextPrayer.Name}</Text> prayer will be in: {"\n\n"}<Text style={styles.prayerName}>{countdown}</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFF9EF',
    margin: 10,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
  },
  prayerName:{
    fontWeight:'bold',
    fontSize: 20,
  },
  countdownText:{
    fontSize:18,
    textAlign: 'center',
  },
});

export default Countdown;
