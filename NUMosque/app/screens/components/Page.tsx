import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useFonts, Amiri_400Regular, Amiri_700Bold } from '@expo-google-fonts/amiri';

const MAX_PAGE_NUMBER = 604;

const PageDetails = ({ route, navigation }) => {
  const [pageDetails, setPageDetails] = useState([]);
  const scrollViewRef = useRef(null);

  let [fontsLoaded] = useFonts({
    Amiri_400Regular,
    Amiri_700Bold
  });
  let { page } = route.params;

  const fetchPageDetails = (pageNumber) => {
    fetch(`http://192.168.0.23:8000/api/quran/pages?page=${pageNumber}`)
      .then(response => response.json())
      .then(data => {
        setPageDetails(data);
      })
      .catch(error => {
        console.error('Error fetching page details:', error);
      });
  };

  useEffect(() => {
    fetchPageDetails(page);
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });

  }, [page]);

  const onSwipeLeft = (gestureState) => {
    // Assuming you have a way to determine the last page number, prevent going beyond it.
    const prevPage = page > 1 ? page - 1 : 1;
    navigation.setParams({ page: prevPage });
    fetchPageDetails(prevPage);
  };

  
  const onSwipeRight = (gestureState) => {
    if (page < MAX_PAGE_NUMBER) {
      const nextPage = page + 1;
      navigation.setParams({ page: nextPage });
      fetchPageDetails(nextPage);
    }
  };

  const config = {
    velocityThreshold: 0.8,
    directionalOffsetThreshold: 130,
  };


  if (!pageDetails) {
    return <Text>No page details found.</Text>;
  }

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={config}
      style={styles.container}
    >
      <ScrollView ref={scrollViewRef}>
        {pageDetails.map((detail, index) => (
          <View key={index} style={styles.pageContainer}>
            <Text style={styles.text}>{detail.surah_text}</Text>
            <Text style={styles.pageNumber}>{detail.page}</Text>
            <View style={styles.horizontalLine} />
          </View>
        ))}
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

export default PageDetails;
