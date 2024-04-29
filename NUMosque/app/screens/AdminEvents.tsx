import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <ScrollView>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.title}>{event.title}</Text>
            <Text>{event.description}</Text>
            <Text>{`Start: ${new Date(event.start_date).toLocaleString()}`}</Text>
            {event.end_date && <Text>{`End: ${new Date(event.end_date).toLocaleString()}`}</Text>}
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
