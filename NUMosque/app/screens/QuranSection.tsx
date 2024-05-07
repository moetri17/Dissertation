import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/Ionicons';

const Quran = ({ navigation }) => {
  const tabs = ['surah', 'page', 'juz'];
  const [surahs, setSurahs] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [pages, setPages] = useState([]);
  const [juz, setJuz] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    fetchSurahs();
    fetchPages();
    fetchJuz();
  }, []);

  
  const fetchSurahs = async () => {
    try {
      const response = await fetch('http://192.168.0.23:8000/api/quran/surahsList');
      const data = await response.json();
      const surahOptions = data.map(surah => ({
        label: `${surah.surah_number} - ${surah.surah_name}`,
        value: surah.surah_number.toString(),
      }));
      setSurahs(surahOptions);
    } catch (error) {
      console.error('Error fetching surah list', error);
    }
  };

  const fetchPages = async () => {
    try {
      const response = await fetch('http://192.168.0.23:8000/api/quran/pagesList');
      const data = await response.json();
      const pageOptions = data.map(page => ({
        label: `Page ${page.page} - ${page.surah_name} - Juz ${page.juz_number}`,
        value: page.page,
      }));
      setPages(pageOptions);
    } catch (error) {
      console.error('Error fetching page list', error);
    }
  };

  const fetchJuz = async () => {
    try {
      const response = await fetch('http://192.168.0.23:8000/api/quran/juzList');
      const data = await response.json();
      const juzOptions = data.map(juz => ({
        label: `Juz ${juz.juz_number} - ${juz.juz_name}`,
        value: juz.juz_number,
      }));
      setJuz(juzOptions);
    } catch (error) {
      console.error('Error fetching juz list', error);
    }
  };

  const handleTabChangeByIndex = (index) => {
    setSelectedTabIndex(index);
  };

  const onSwipe = (direction) => {
    if (direction === 'SWIPE_LEFT') {
      setSelectedTabIndex((prevIndex) => (prevIndex + 1) % tabs.length);
    } else if (direction === 'SWIPE_RIGHT') {
      setSelectedTabIndex((prevIndex) => (prevIndex - 1 + tabs.length) % tabs.length);
    }
  };

  const config = {
    velocityThreshold: 0.5,
    directionalOffsetThreshold: 40,
  };


  const renderList = () => {
    const selectedTab = tabs[selectedTabIndex];
    switch (selectedTab) {
      case 'surah':
        return surahs.map((surah, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate('Surah', { surah_number: surah.value })}>
            <Text style={styles.textItem}>{surah.label}</Text>
          </TouchableOpacity>
        ));
      case 'page':
        return pages.map((page, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate('Page', { page: page.value })}>
            <Text style={styles.textItem}>{page.label}</Text>
          </TouchableOpacity>
        ));
      case 'juz':
        return juz.map((juz, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate('Juz', { juz_number: juz.value })}>
            <Text style={styles.textItem}>{juz.label}</Text>
          </TouchableOpacity>
        ));
      default:
        return null;
    }
  };

  const onSearch = () => {
    const numberQuery = parseInt(searchQuery);
    if (!isNaN(numberQuery) && numberQuery > 0) {
      let paramName;
      let maxNumber;
  
      switch (tabs[selectedTabIndex]) {
        case 'page':
          paramName = 'page';  // Directly use 'page' as it doesn't follow the "_number" suffix
          maxNumber = 604;
          break;
        case 'surah':
          paramName = 'surah_number';
          maxNumber = 114;  // Assuming there are 114 surahs
          break;
        case 'juz':
          paramName = 'juz_number';
          maxNumber = 30;  // Assuming there are 30 juz
          break;
        default:
          console.error('Invalid tab index');
          return;
      }
  
      if (numberQuery <= maxNumber) {
        navigation.navigate(tabs[selectedTabIndex].charAt(0).toUpperCase() + tabs[selectedTabIndex].slice(1), {
          [paramName]: numberQuery
        });
        setSearchQuery(''); // Clear the search input
      } else {
        alert(`Please enter a valid ${tabs[selectedTabIndex]} number between 1 and ${maxNumber}`);
      }
    } else {
      console.log('Search query is not a number');
      alert('Please enter a valid number');
    }
  };

  return (
    <GestureRecognizer
      onSwipeLeft={() => onSwipe('SWIPE_LEFT')}
      onSwipeRight={() => onSwipe('SWIPE_RIGHT')}
      config={config}
      style={styles.container}
    >
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, selectedTabIndex === index && styles.selectedTab]}
            onPress={() => handleTabChangeByIndex(index)}
          >
            <Text style={styles.tabText}>{tab.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={`Search by ${tabs[selectedTabIndex]} number`}
          keyboardType="numeric"
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
        <TouchableOpacity onPress={onSearch}>
          <Icon name="search" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {renderList()}
      </ScrollView>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingTop: 10,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  selectedTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#007AFF', // Highlight color for the selected tab
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    marginHorizontal: 10,
  },
  textItem: {
    fontSize: 16,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#E2E2E2',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Quran;
