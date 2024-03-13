import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Linking } from 'react-native';


const screenHeight = Dimensions.get('window').height;


const AboutPage = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={logoStyles.container}>
            <Image source={require('./assets/mosqueInside.jpg')} style={logoStyles.image}/> 
            <View>  
                <Image source={require('./assets/Mosque_logo.png')} style={logoStyles.logo}/>
                <View style={logoStyles.textContainer}>  
                <Text style={logoStyles.text}>Northumbria ISOC</Text>
                <Text style={logoStyles.text}>Newcastle upon Tyne NE1 8SU</Text>
                </View>
            </View>
            </View>

            <View style={textStyles.container}>
                <Text style={textStyles.aboutText}>About Northumbria ISOC:</Text>
                    <Text style={textStyles.aboutInfo}>
                        The Islamic society at Northumbria University provides a supportive 
                        community for Muslim students and educates others about Islam through 
                        events, talks by renowned speakers, and weekly classes. Celebrations 
                        include Iftar dinners during Ramadan and Eid. The society, noted for its 
                        diversity and activity, has won multiple awards, including best society 
                        and faith society. Facilities for prayer and ablution are available for men 
                        and women on campus. Membership is open to all for an annual fee, and the 
                        society maintains an active online presence on social media and can be contacted via email.
                    </Text>

            </View>

            <View style={textStyles.container}>
                <Text>Mosque Services</Text>
                <Text>Capacity:</Text>
                <Text>Facilities:</Text>
            </View>

            <View style={textStyles.container}>
                <Text style={textStyles.donationText}>Donations:{"\n"}</Text>
                <Text 
                    onPress={() => Linking.openURL('https://donate.islamic-relief.org.uk/')}
                    style={textStyles.linkText}
                >
                    https://donate.islamic-relief.org.uk/
                </Text>
                <Text>
                    *The organistaion linked above is not affiliated with this Mosque
                </Text>
            </View>

            <View style={textStyles.container}>
                <Text style={textStyles.contactInfo}> ISOC contact details: {"\n"}</Text>
                <Text style={textStyles.myInfo}>Email: </Text>
                <Text onPress={() => Linking.openURL('mailto:su.islamicsociety@northumbria.ac.uk')} style={textStyles.linkText}>
                    su.islamicsociety@northumbria.ac.uk
                </Text>
                <Text style={textStyles.myInfo}>Instagram: </Text>
                <Text onPress={() => Linking.openURL('https://www.instagram.com/northumbriaisoc/')} style={textStyles.linkText}>
                    northumbriaisoc
                </Text>
                <Text style={textStyles.myInfo}>Facebook: </Text>
                <Text onPress={() => Linking.openURL('https://www.facebook.com/northumbria.isoc/?locale=en_GB')} style={textStyles.linkText}>
                    Northumbria University Islamic Society
                </Text>
            </View>

            <View style={textStyles.container}>
                <Text style={textStyles.devInfo}>Developer Information:{"\n"}</Text>
                <Text><Text style={textStyles.myInfo}>Name: </Text>Mohamed Etri</Text>
                <Text><Text style={textStyles.myInfo}>Email: </Text>mohamedetri667@gmail.com{"\n"}</Text>
                <Text style={textStyles.feedback}>Feel free to send me feedback through my email!</Text>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      flex: 1,
    },
  });


const logoStyles = StyleSheet.create({
    container: {
        height: screenHeight * 0.25,
        justifyContent: 'center',
        backgroundColor: '#FFF9EF',
        alignItems: 'center',
        width: '100%',
    },    
    logo: {
      height: 75,
      width: 75,
      alignSelf: 'center',
      marginTop: '3%',
      marginBottom: '2%',
    },
    image: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    textContainer: {
      alignItems: 'center',
    },
    text: {
      fontWeight: '700',
      fontSize: 15,
      color: '#FFF',
    },
    date: { 
      textAlign: 'left', 
      marginVertical: 10, 
      fontSize: 14, 
      marginLeft:10
    },
  });


const textStyles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        backgroundColor: '#FFF9EF',
        margin: 10,
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch',
    },
    aboutText:{
        fontWeight:'bold',
        fontSize:16,
    },
    aboutInfo:{
        textAlign:'left'
    },
    donationText:{
        fontWeight:'bold',
        fontSize: 18,
    },
    linkText:{
        color:'#338BA8',
        fontSize:14,
    },
    devInfo:{
        fontWeight:'bold',
        fontSize: 18,
    },
    myInfo:{
        fontWeight:'bold',
        fontSize:14, 
    },
    feedback:{
     color:'#43A6C6'   
    },
    contactInfo:{
        fontWeight:'bold',
        fontSize: 18,
    },
});

export default AboutPage;