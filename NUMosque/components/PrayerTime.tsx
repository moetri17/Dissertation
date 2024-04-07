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
      alignSelf: 'stretch',
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
      borderRadius:5,
    },
  });

export default PrayerTimes;
