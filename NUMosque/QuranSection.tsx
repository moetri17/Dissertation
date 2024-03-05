import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const QuranSection = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hi, this is a Quran page.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  text: {
    fontSize: 20, // Added for better visibility
  },
});

export default QuranSection;
