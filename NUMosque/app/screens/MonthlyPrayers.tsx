import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Get device screen dimensions
const { width, height } = Dimensions.get('window');

// Data for each month
const months = [
  { name: 'January', image: require('./assets/january_timetable.png') },
  { name: 'February', image: require('./assets/february_timetable.png') },
  { name: 'March', image: require('./assets/march_timetable.png') },
  { name: 'April', image: require('./assets/april_timetable.png') },
  { name: 'May', image: require('./assets/may_timetable.png') },
  { name: 'June', image: require('./assets/june_timetable.png') },
  { name: 'July', image: require('./assets/july_timetable.png') },
  { name: 'August', image: require('./assets/august_timetable.png') },
  { name: 'September', image: require('./assets/september_timetable.png') },
  { name: 'October', image: require('./assets/october_timetable.png') },
  { name: 'November', image: require('./assets/november_timetable.png') },
  { name: 'December', image: require('./assets/december_timetable.png') },
];

const MonthlyPrayers = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const currentMonthIndex = new Date().getMonth();
  const currentMonth = months[currentMonthIndex];

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.imageContainer}>
          <Text style={styles.downloadText}>{currentMonth.name} Prayer Times</Text>
          <Image source={currentMonth.image} style={styles.prayerTimesImage} />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.fullScreenContainer}>
          <Image source={currentMonth.image} style={styles.fullScreenImage} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Icon name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Modal>

      <Text style={styles.downloadText}>*Jammat times may differ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  downloadText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  prayerTimesImage: {
    width: width * 0.6, // Dynamically set width
    height: height * 0.4, // Dynamically set height
    resizeMode: 'contain',
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  fullScreenImage: {
    width: width,
    height: height,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
  }
});

export default MonthlyPrayers;
