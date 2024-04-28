import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

// FIXME: ADD FUNCTIONALITY TO ALL 3 TABS 
// FIXME: MAKE SURE THE WHOLE QURAN IS PROPRELY FORMATTED IN THE APP WITH NO MISTAKES
// FIXME: TRY ADDING IN A SWIPING AS WELL AS SCROLLING

interface SurahOption {
  label: string;
  value: string;
}

interface PageOption {
  page: number;
  surah_name: string;
  juz_number: number;
}

interface JuzOption {
  juz_number: number;
  juz_name: string;
}

const Quran = ({ navigation }) => {
  const tabs = ['surah', 'page', 'juz'];
  const [surahs, setSurahs] = useState<SurahOption[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // Use tab index instead
  const [pages, setPages] = useState([]);
  const [juz, setJuz] = useState([]);


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
});

export default Quran;
