import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useFonts, Amiri_400Regular, Amiri_700Bold } from '@expo-google-fonts/amiri';

const MAX_PAGE_NUMBER = 604;


const Juz = ({ route, navigation }) => {
  const [juzDetails, setJuzDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef(null);

  let [fontsLoaded] = useFonts({
    Amiri_400Regular,
    Amiri_700Bold,
  });

  useEffect(() => {
    fetch(`http://192.168.0.23:8000/api/quran/pages?juz_number=${route.params.juz_number}`)
      .then(response => response.json())
      .then(data => {
        setJuzDetails(data);
        if (data.length > 0) {
          setCurrentPage(data[0].page); // Initialize with the first page of the juz
        }
      })
      .catch(error => {
        console.error('Error fetching Juz data:', error);
      });
  }, [route.params.juz_number]);

  const fetchPage = (pageNumber) => {
    if (pageNumber <= MAX_PAGE_NUMBER) {
    fetch(`http://192.168.0.23:8000/api/quran/pages?page=${pageNumber}`)
      .then(response => response.json())
      .then(data => {
        setJuzDetails(data);
        setCurrentPage(pageNumber); // Update current page
      })
      .catch(error => {
        console.error('Error fetching page details:', error);
      });
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollTo({y: 0, animated: false});
  }, [currentPage]);

  const onSwipeLeft = () => {
    const nextPage = currentPage + 1;
    navigation.setParams({ page: nextPage });
    fetchPage(nextPage);
  };
  
  const onSwipeRight = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    navigation.setParams({ page: prevPage });
    fetchPage(prevPage);
  };

  const config = {
    velocityThreshold: 0.8,
    directionalOffsetThreshold: 130,
  };

  const currentPageDetails = juzDetails.find(detail => parseInt(detail.page) === currentPage);

  if (!currentPageDetails) {
    return <Text>No Juz details found.</Text>;
  }

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Consider using AppLoading here as well
  }

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeRight}
      onSwipeRight={onSwipeLeft}
      config={config}
      style={styles.container}
    >
      <ScrollView ref={scrollViewRef}>
        <View style={styles.pageContainer}>
          <Text style={styles.text}>{currentPageDetails.surah_text}</Text>
          <Text style={styles.pageNumber}>{currentPageDetails.page}</Text>
          <View style={styles.horizontalLine} />
        </View>
      </ScrollView>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 17,
    color: '#333',
    textAlign: 'center',
    lineHeight: 45,
    fontFamily: 'Amiri_700Bold'
  },
  pageContainer: {
    marginBottom: 5,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
});

export default Juz;
