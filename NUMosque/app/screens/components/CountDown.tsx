import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import { formatInTimeZone } from 'date-fns-tz';
import { enGB } from 'date-fns/locale/en-GB';

const Countdown = ({ nextPrayer }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateEndTime = (time) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      const now = new Date();
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
      const endTimeInLondon = formatInTimeZone(endTime, 'Europe/London', 'yyyy-MM-dd HH:mm:ss', { locale: enGB });
      const endTimeUTC = new Date(endTimeInLondon);
      if (endTimeUTC <= now) {
        endTimeUTC.setDate(endTimeUTC.getDate() + 1);
      }
      return endTimeUTC;
    };

    const targetTime = calculateEndTime(nextPrayer.Time);
    scheduleNotifications(targetTime);

    const updateCountdown = () => {
      const now = new Date();
      const distance = targetTime.getTime() - now.getTime();
      if (distance >= 0) {
        const hoursLeft = Math.floor((distance / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const minutesLeft = Math.floor((distance / (1000 * 60)) % 60).toString().padStart(2, '0');
        const secondsLeft = Math.floor((distance / 1000) % 60).toString().padStart(2, '0');
        setCountdown(`${hoursLeft}:${minutesLeft}:${secondsLeft}`);
      } else {
        setCountdown(nextPrayer);
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [nextPrayer]);

  const scheduleNotifications = async (targetTime) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Athan Time 🕌",
        body: `${nextPrayer.NextPrayer} prayer is now.`,
      },
      trigger: targetTime,
    });
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.countdownText}>
        <Text style={styles.prayerName}>{nextPrayer.NextPrayer}</Text> prayer will be in:
        {"\n\n"}
        <Text style={styles.time}>{countdown}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    margin: 10,
    padding: 20,
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prayerName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  countdownText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  time: {
    fontWeight: 'bold',
    fontSize: 48,
    fontFamily: 'monospace',
    color: '#000',
  },
});

export default Countdown;
