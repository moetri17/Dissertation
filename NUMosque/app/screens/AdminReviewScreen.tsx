import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdminReviewScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Application Under Review</Text>
            <Text style={styles.description}>
                Your request to become an admin is currently being reviewed. 
                We will notify you once the review process is completed.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF9EF',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3E8DF3',
        marginBottom: 15,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#3E8DF3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default AdminReviewScreen;
