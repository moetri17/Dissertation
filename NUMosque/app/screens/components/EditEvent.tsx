import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditEvent = ({ route }) => {
  const { eventId } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [occurrence, setOccurrence] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`http://192.168.0.23:8000/api/events/${eventId}`);
      const eventData = await response.json();
      setTitle(eventData.title);
      setDescription(eventData.description);
      setLocation(eventData.location);
      setType(eventData.type);
      setOccurrence(eventData.occurrence);
      setNotes(eventData.notes);
      setStartDate(new Date(eventData.start_date));
      setEndDate(new Date(eventData.end_date));
    } catch (error) {
      console.error('Failed to fetch event details', error);
    }
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startDate;
    setShowStartTimePicker(false);
    setStartDate(currentTime);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endDate;
    setShowEndTimePicker(false);
    setEndDate(currentTime);
  };

  const handleEditEvent = () => {
    const eventData = {
      title,
      description,
      location,
      type,
      occurrence,
      notes,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    };

    fetch(`http://192.168.0.23:8000/api/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data
      alert('Event updated successfully');
    })
    .catch((error) => {
      console.error('Failed to update event:', error);
      alert('Failed to update event');
    });
 
};

  const formatDateAndTime = (date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Make sure location is valid from google maps"
      />

      <Text style={styles.label}>Type</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={setType}
        placeholder="e.g. Islamic event / University event"
      />

      <Text style={styles.label}>Occurrence</Text>
      <TextInput
        style={styles.input}
        value={occurrence}
        onChangeText={setOccurrence}
        placeholder="Monthly / Weekly / Daily / One-off"
      />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        placeholder="Additional notes"
        multiline
      />

      <Text style={styles.label}>Start Date and Time</Text>
      <Button title="Choose Date" onPress={() => setShowStartDatePicker(true)} />
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      <Button title="Choose Time" onPress={() => setShowStartTimePicker(true)} />
      {showStartTimePicker && (
        <DateTimePicker
          value={startDate}
          mode="time"
          display="default"
          onChange={handleStartTimeChange}
        />
      )}

    <TextInput 
    style={styles.input} 
    value={formatDateAndTime(startDate)} 
    editable={false}
    />

    <Text style={styles.label}>End Date and Time</Text>
    <Button title="Choose Date" onPress={() => setShowEndDatePicker(true)} />
    {showEndDatePicker && (
    <DateTimePicker
        value={endDate}
        mode="date"
        display="default"
        onChange={handleEndDateChange}
    />
    )}
    <Button title="Choose Time" onPress={() => setShowEndTimePicker(true)} />
    {showEndTimePicker && (
    <DateTimePicker
        value={endDate}
        mode="time"
        display="default"
        onChange={handleEndTimeChange}
    />
    )}

    <TextInput 
      style={styles.input} 
      value={formatDateAndTime(endDate)} 
      editable={false}
    />

    <View style={styles.buttonContainer}>
      <Button
        title="Update Event"
        onPress={handleEditEvent}
        color="#2E8B57"
      />
    </View>
    </ScrollView>

    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    contentContainer: {
      padding: 10,
      paddingBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      marginBottom: 15,
      borderRadius: 6,
    },
    label: {
      marginBottom: 5,
      fontSize: 16,
    },
    buttonContainer: {
      marginVertical: 10,
      backgroundColor: '#2E8B57',
      borderRadius: 5,
    },
  });
  
export default EditEvent;