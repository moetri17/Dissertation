import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

interface SurahOption {
  label: string;
  value: string;
}

const DropdownComponent = () => {
  const [surahs, setSurahs] = useState<SurahOption[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [surahText, setSurahText] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://192.168.0.23:8000/api/surahs')
      .then((response) => response.json())
      .then((data) => {
        const surahOptions = data.map((surah: { Surah: number; Name: string }) => ({
          label: `${surah.Surah} - ${surah.Name}`,
          value: surah.Surah.toString(),
        }));
        setSurahs(surahOptions);
      })
      .catch((error) => {
        console.error('Error fetching surah list', error);
      });
  }, []);

  // Fetch Surah text when a Surah is selected
  useEffect(() => {
    if (selectedValue) {
      fetch(`http://192.168.0.23:8000/api/text?surah=${selectedValue}`)
        .then((response) => response.json())
        .then((data) => {
          // Assuming the API returns an array, and we're interested in the first item
          if (data && data.length > 0) {
            setSurahText(data[0].Text);
          } else {
            setSurahText(null); // Clear text if no data is returned
          }
        })
        .catch((error) => {
          console.error('Error fetching surah text', error);
          setSurahText(null);
        });
    } else {
      setSurahText(null); // Clear text when no Surah is selected
    }
  }, [selectedValue]);

  const renderItem = (item: SurahOption) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === selectedValue && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="checkcircle"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={surahs}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Surah"
        searchPlaceholder="Search..."
        value={selectedValue}
        onChange={(item) => {
          setSelectedValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />
      {surahText && (
        <ScrollView style={{ marginTop: 10 }}>
          <Text style={styles.quranText}>{surahText}</Text>
        </ScrollView>
      )}
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E2E2',
    backgroundColor: 'white',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#888', 
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: 'gold',
    
  },
  quranText: {
    fontSize: 24,
    textAlign:'center',
  },
});

