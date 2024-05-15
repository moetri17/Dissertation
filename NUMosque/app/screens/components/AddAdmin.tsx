import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, ActivityIndicator, StyleSheet } from 'react-native';

const AddAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://192.168.0.23:8000/api/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleAdminToggle = (user, makeAdmin) => {
    Alert.alert(
      "Confirm Change",
      `Are you sure you want to ${makeAdmin ? 'add' : 'remove'} ${user.first_name || 'No Name'} ${user.last_name || ''} as an admin?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: () => updateAdminStatus(user, makeAdmin) }
      ]
    );
  };

  const updateAdminStatus = async (user, makeAdmin) => {
    const url = `http://192.168.0.23:8000/api/users/${user.uid}/admin-status`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                is_admin: makeAdmin
            })
        });

        const data = await response.json();
        if (response.ok) {
            setUsers(users.map(u => u.uid === user.uid ? { ...u, is_admin: makeAdmin } : u));
            Alert.alert("Success", `User ${makeAdmin ? 'added to' : 'removed from'} admin.`);
        } else {
            throw new Error(data.message || 'Failed to update admin status');
        }
    } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', error.message || 'Failed to update admin status');
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.uid}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.text}>{item.first_name || 'First Name not provided'} {item.last_name || 'Last Name not provided'}</Text>
            <Text style={styles.text}>{item.phone_number || 'Phone number not available'}</Text>
            <Button
              title={item.is_admin ? 'Remove Admin' : 'Make Admin'}
              onPress={() => handleAdminToggle(item, !item.is_admin)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  userContainer: {
    backgroundColor: '#FFF8E1',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000',
  },
});

export default AddAdmin;
