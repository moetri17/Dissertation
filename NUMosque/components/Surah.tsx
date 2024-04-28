import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useFonts, Amiri_400Regular, Amiri_700Bold } from '@expo-google-fonts/amiri';

const Surah = ({ route, navigation }) => {
  const [surahDetails, setSurahDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollViewRef = useRef(null);

  let [fontsLoaded] = useFonts({
    Amiri_400Regular,
    Amiri_700Bold
  });


  useEffect(() => {
    fetch(`http://192.168.0.23:8000/api/quran/pages?surah_number=${route.params.surah_number}`)
      .then(response => response.json())
      .then(data => {
        setSurahDetails(data);
        if (data.length > 0) {
          setCurrentPage(data[0].page); // Initialize with the first page of the surah
        }
      })
      .catch(error => {
        console.error('Error fetching Surah data:', error);
      });
  }, [route.params.surah_number]);

  const fetchPage = (pageNumber) => {
    fetch(`http://192.168.0.23:8000/api/quran/pages?page=${pageNumber}`)
      .then(response => response.json())
      .then(data => {
        setSurahDetails(data);
        setCurrentPage(pageNumber); // Update current page
      })
      .catch(error => {
        console.error('Error fetching page details:', error);
      });
  };

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  }, [currentPage]);


  const onSwipeLeft = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    navigation.setParams({ page: prevPage });
    fetchPage(prevPage);
  };
  
  const onSwipeRight = () => {
    const nextPage = currentPage + 1;
    navigation.setParams({ page: nextPage }); // Update the page number in params
    fetchPage(nextPage);
  };

  const config = {
    velocityThreshold: 0.8,
    directionalOffsetThreshold: 130,
  };

  const currentPageDetails = surahDetails.find(detail => parseInt(detail.page) === currentPage);

  if (!currentPageDetails) {
    return <Text>No Surah details found.</Text>;
  }

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
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
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    lineHeight: 42,
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

export default Surah;
