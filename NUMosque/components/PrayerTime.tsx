import React from 'react';
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
  }

  return (
    <View style={prayerStyles.prayerTimesContainer}>
      <Text style={prayerStyles.prayerTitle}>Prayer Times</Text>
      <View style={prayerStyles.prayerTimeHeaderRow}>
        <Text style={prayerStyles.headerName}></Text>
        <Text style={prayerStyles.headerTime}>Athan</Text>
        <Text style={prayerStyles.headerIqamahTime}>Iqamah </Text>
      </View>
      {prayerTimes.map((prayer, index) => (
        <View
          key={index}
          style={[
            prayerStyles.prayerTimeRow,
            index === nextPrayerIndex ? prayerStyles.highlighter : null,
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
    highlighter: {
      backgroundColor: '#bde0fe',
    },
  });

export default PrayerTimes;
