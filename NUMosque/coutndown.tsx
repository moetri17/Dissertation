import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Assuming the interface definitions are the same as you provided
interface PrayerTime {
  Name: string;
  Time: string;
  IqamahTime: string;
}

interface Props {
  prayerTimes: PrayerTime[];
  nextPrayerIndex: number;
}

const PrayerTimes: React.FC<Props> = ({ prayerTimes, nextPrayerIndex }) => {
    if (prayerTimes.length === 0) {
      return <Text>No prayer times available</Text>;
    }  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextPrayerTime = new Date();
      const [hours, minutes] = prayerTimes[nextPrayerIndex].Time.split(':');
      nextPrayerTime.setHours(parseInt(hours), parseInt(minutes), 0);

      const difference = nextPrayerTime.getTime() - now.getTime();
      if (difference > 0) {
        const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutesLeft = Math.floor((difference / (1000 * 60)) % 60);
        const secondsLeft = Math.floor((difference / 1000) % 60);
        setCountdown(`${hoursLeft}:${minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`);
      } else {
        setCountdown("It's time!");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes, nextPrayerIndex]);

  return (
    <View style={prayerStyles.prayerTimesContainer}>
      <Text style={prayerStyles.prayerTitle}>Prayer Times</Text>
      {countdown && (
        <Text>Countdown to {prayerTimes[nextPrayerIndex].Name}: {countdown}</Text>
      )}
      <View style={prayerStyles.prayerTimeHeaderRow}>
        <Text style={prayerStyles.headerName}>Prayer</Text>
        <Text style={prayerStyles.headerTime}>Athan Time</Text>
        <Text style={prayerStyles.headerIqamahTime}>Iqamah Time</Text>
      </View>
      {prayerTimes.map((prayer, index) => (
        <View
          key={index}
          style={[
            prayerStyles.prayerTimeRow,
            nextPrayerIndex === index ? prayerStyles.highlightedPrayer : {},
          ]}
        >
          <Text style={prayerStyles.prayerName}>{prayer.Name}</Text>
          <Text style={prayerStyles.prayerTime}>{prayer.Time}</Text>
          <Text style={prayerStyles.iqamahTime}>{prayer.IqamahTime}</Text>
        </View>
      ))}
    </View>
  );
};

const prayerStyles = StyleSheet.create({
    prayerTimesContainer: {
      flexDirection: 'column',
      backgroundColor: '#FFF9EF',
      margin: 10,
      padding: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 8,
      alignSelf: 'stretch',
    },
    prayerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 8,
    },
    prayerTimeHeaderRow: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    prayerTimeRow: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      paddingVertical: 4,
      paddingHorizontal: 10,
      alignItems: 'center',
    },
    prayerName: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    prayerTime: {
      flex: 1,
      fontSize: 16,
      textAlign: 'center',
    },
    iqamahTime: {
      flex: 1,
      fontSize: 16,
      textAlign: 'right',
    },
    highlightedPrayer: {
      backgroundColor: '#bde0fe',
    },
    headerName: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    headerTime: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    headerIqamahTime: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    dateText: {
      fontSize: 12,
      fontWeight: '500',
      textAlign: 'left',
    },
  });

export default PrayerTimes;
