import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import Icon

const mockEvents = [
  {
    id: 1,
    title: 'Friday Prayer',
    description: 'Join us for Jumu\'ah at the university mosque.',
    startDate: '2024-04-04T13:00:00.000Z',
    endDate: null,
    location: 'Northumbria University Prayer Facility. ISOC (MASJID)',
    type: 'Islamic Event',
    occurrence: 'Weekly',
    notes: null
  },
  {
    id: 2,
    title: 'Ramadan Iftars',
    description: 'Daily Iftars at the mosque during Ramadan.',
    startDate: '2024-04-23T19:00:00.000Z',
    endDate: '2024-05-23T19:00:00.000Z',
    location: 'Northumbria University Prayer Facility. ISOC (MASJID)',
    type: 'Islamic Event',
    occurrence: 'Daily',
    notes: 'Don\'t forget to bring your own dates!'
  },
  {
    id: 3,
    title: 'Eid Celebration',
    description: 'Celebrate Eid al-Fitr with the university community.',
    startDate: '2024-05-13T08:00:00.000Z',
    endDate: '2024-05-13T11:00:00.000Z',
    location: 'Northumbria University Students Union',
    type: 'Islamic Event',
    occurrence: 'One-off',
    notes: 'Please wear formal attire.'
  }
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(2)}, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const openGoogleMaps = (location) => {
  const encodedLocation = encodeURIComponent(location);
  const url = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};

const UserEvents = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      {mockEvents.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeText}>Start: {formatDate(event.startDate)}</Text>
            {event.endDate && <Text style={styles.dateTimeText}>End: {formatDate(event.endDate)}</Text>}
          </View>
          <Text style={styles.eventDescription}>{event.description}</Text>
          <TouchableOpacity onPress={() => openGoogleMaps(event.location)} style={styles.locationContainer}>
            <Icon name="map-marker" size={20} color="#2E8B57" />
            <Text style={styles.eventLocation}> {event.location}</Text>
          </TouchableOpacity>
          <Text style={styles.eventType}>Type: {event.type}</Text>
          <Text style={styles.eventOccurrence}>Occurrence: {event.occurrence}</Text>
          {event.notes && <Text style={styles.eventNotes}>Notes: {event.notes}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E8B57',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#E8E8E8',
    marginBottom: 10,
  },
  eventCard: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  dateTimeContainer: {
    backgroundColor: '#E0F7FA',  // Light blueish color
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  dateTimeText: {
    fontSize: 16,
    color: '#007BFF',  // Vivid blue
    fontWeight: 'bold',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 14,
    color: '#696969',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventLocation: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#2E8B57',
  },
  eventType: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  eventOccurrence: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  eventNotes: {
    fontSize: 14,
    color: '#DAA520',
    marginTop: 4
  }
});

export default UserEvents;
