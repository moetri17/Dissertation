import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AdminEvents = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://192.168.0.23:8000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(2)}, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const openGoogleMaps = (location) => {
    const encodedLocation = encodeURIComponent(location);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handleEditEvent = (eventId) => {
    navigation.navigate('EditEvent', { eventId: eventId });
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await fetch(`http://192.168.0.23:8000/api/events/${eventId}`, {
        method: 'DELETE',
      });
      fetchEvents();
    } catch (error) {
      console.error('Failed to delete event', error);
    }
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <ScrollView>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateTimeText}>{`Start: ${formatDate(event.start_date)}`}</Text>
              {event.end_date && <Text style={styles.dateTimeText}>{`End: ${formatDate(event.end_date)}`}</Text>}
            </View>
            <Text>{event.description}</Text>
            <TouchableOpacity onPress={() => openGoogleMaps(event.location)} style={styles.locationContainer}>
              <Icon name="map-marker" size={20} color="#2E8B57" />
              <Text style={styles.eventLocation}> {event.location}</Text>
            </TouchableOpacity>
            <Text style={styles.eventType}>Type: {event.type}</Text>
            <Text style={styles.eventOccurrence}>Occurrence: {event.occurrence}</Text>
            {event.notes && <Text style={styles.eventNotes}>Notes: {event.notes}</Text>}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#2E8B57' }]}
                onPress={() => handleEditEvent(event.id)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FF6347' }]}
                onPress={() => handleDeleteEvent(event.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEvent')}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0082',
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dateTimeText: {
    color: '#333',
    marginRight: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventLocation: {
    color: '#2E8B57',
  },
  eventType: {
    color: '#333',
    marginBottom: 5,
  },
  eventOccurrence: {
    color: '#333',
    marginBottom: 5,
  },
  eventNotes: {
    color: '#333',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2E8B57',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  }
});


export default AdminEvents;
