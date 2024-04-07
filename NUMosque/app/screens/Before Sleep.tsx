import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';

const BeforeSleep = () => {
  const [azkarData, setAzkarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCount, setCurrentCount] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const pagerRef = useRef(null);

  useEffect(() => {
    fetch('http://192.168.0.23:8000/api/azkar/night')
      .then((response) => response.json())
      .then((data) => {
        setAzkarData(data);
        setIsLoading(false);

      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      });
  }, []);

  const handlePress = (repitition) => {
    if (currentCount < repitition) {
      setCurrentCount(currentCount + 1);
    } else if (currentPage < azkarData.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setCurrentCount(1);
      pagerRef.current?.setPage(nextPage);
    } else {
      setIsCompleted(true);
    }
  };

  const ProgressBar = ({ current, total }) => {
    const progressBarWidth = ((current / total) * 100) + '%';
  
    return (
      <View style={styles.progressBarOverallContainer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: progressBarWidth }]} />
        </View>
        <Text style={styles.progressText}>{`${current}/${total}`}</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isCompleted) {
    return (
      <View style={styles.completedContainer}>
        <Text style={styles.completedText}>Completed ✅</Text>
      </View>
    );
  }

  return (
    <>
      <ProgressBar current={currentPage + 1} total={azkarData.length} />
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        orientation="horizontal"
        ref={pagerRef}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        {azkarData.map((azkar, index) => (
          <View key={index} style={styles.page}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.azkarName}>{azkar.Name}</Text>
              <Text style={styles.azkarText}>{azkar.Text} {"\n"} (x{azkar.Repitition})</Text>
              <Text style={styles.azkarTranslation}>{azkar.Translation}</Text>
              <TouchableOpacity style={styles.counter} onPress={() => handlePress(azkar.Repitition)}>
                <Text style={styles.counterText}>Next: {currentCount}/{azkar.Repitition}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        ))}
      </PagerView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bea9de',
  },
  pagerView: {
    flex: 1,
    backgroundColor: '#bea9de',
  },
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: '#bea9de',
  },
  scrollView: {
    paddingTop: 20,
    backgroundColor: '#bea9de',
  },
  azkarName: {
    textAlign:'center',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 20,
  },
  azkarText: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 20,
  },
  azkarTranslation: {
    fontSize: 16,
    color: '#555',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 20,
  },
  counter: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  counterText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bea9de',
  },
  completedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressBarOverallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#bea9de',
  },
  
  progressBarContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginRight: 10,
  },
  
  progressBar: {
    backgroundColor: '#546bab',
    borderRadius: 5,
  },
  
  progressText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default BeforeSleep;
