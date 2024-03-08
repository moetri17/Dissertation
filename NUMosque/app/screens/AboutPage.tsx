import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const AboutPage = () => {
    return (
        <ScrollView style={styles.container}>
            <View>
                <Image source={require('./assets/Mosque_logo.png')} style={styles.logo} />
                <Text>NORTHUMBRIA ISLAMIC SOCIETY</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Northumbria ISOC</Text>
                <Text style={styles.sectionContent}>About Mosque:</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mosque Services</Text>
                <Text style={styles.sectionContent}>Capacity:</Text>
                <Text style={styles.sectionContent}>Facilities:</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Donation Link</Text>
                <Text style={styles.sectionContent}>URL for donations:</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Developer Info</Text>
                <Text style={styles.sectionContent}>Name: Mohamed Etri</Text>
                <Text style={styles.sectionContent}>Email: mohamedetri667@gmail.com</Text>
                <Text style={styles.feedbackText}>Feel free to send me feedback through my email!</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    menuIcon: {
        padding: 10,
    },
    logo: {
        width: 120,
        height: 60,
        resizeMode: 'contain',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#000',
        textAlign: 'center',
        marginVertical: 20,
    },
    section: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 16,
        margin: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        marginBottom: 5,
    },
    feedbackText: {
        fontSize: 14,
        color: '#007bff',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default AboutPage;