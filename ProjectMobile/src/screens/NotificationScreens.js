import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation-locker'
import { useNavigation } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar'

const notifications = [
  { id: '1', title: 'New episode available for Stranger Things', description: 'Watch the latest episode now!' },
  { id: '2', title: 'Top 10 movies to watch this week', description: 'Here are some recommendations for you.' },
  { id: '3', title: 'Breaking News: New movie release', description: 'Check out the new action movie this Friday.' },
  { id: '4', title: 'Upcoming season for The Witcher', description: 'The new season starts next month!' },
  { id: '5', title: 'Limited-time discount on subscriptions', description: 'Save 20% on annual plans this week only.' },
  { id: '6', title: 'Fan favorite: Best comedy shows', description: 'Laugh out loud with these top-rated comedies.' },
  { id: '7', title: 'Exclusive behind-the-scenes content', description: 'See how your favorite shows are made.' },
  { id: '8', title: 'Action movies marathon this weekend', description: 'Tune in for non-stop action-packed entertainment.' },
  { id: '9', title: 'Documentary of the month', description: 'Explore the wonders of the ocean in our latest docuseries.' },
  { id: '10', title: 'Live Q&A with your favorite cast', description: 'Join us live this Saturday for an interactive session.' },
  { id: '11', title: 'Trending: Top dramas to binge-watch', description: 'Don’t miss out on these must-watch dramas.' },
  { id: '12', title: 'New animated series for kids', description: 'Perfect family entertainment now streaming.' },
  { id: '13', title: 'Watch party with friends', description: 'Create a watch party and enjoy movies together.' },
  { id: '14', title: 'Awards night special', description: 'Catch the highlights from the biggest awards show.' },
  { id: '15', title: 'Your personalized recommendations', description: 'Movies and series handpicked just for you.' },
  { id: '16', title: 'Sci-fi adventure of the year', description: 'Don’t miss the most anticipated sci-fi release.' },
  { id: '17', title: 'Weekly quiz: Guess the movie', description: 'Test your knowledge and win exclusive rewards.' },
  { id: '18', title: 'New feature: Download episodes offline', description: 'Enjoy your favorite shows without the internet.' },
  { id: '19', title: 'Live sports streaming available', description: 'Catch the excitement of live sports from anywhere.' },
  { id: '20', title: 'Top horror films to scare you', description: 'Get ready for a thrilling night of horror.' }
];



const NotificationScreen = () => {

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
    Orientation.lockToPortrait();
    SystemNavigationBar.fullScreen(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <TouchableOpacity style={styles.readButton}>
              <AntDesign name="checkcircle" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212', // Dark background color
  },
  backButton: {
    marginTop: 20,
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text for the header
    textAlign: 'center',
    marginVertical: 16,
  },
  notification: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#444', // Darker border
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // White text for the title
  },
  description: {
    fontSize: 14,
    color: '#bbb', // Lighter text for the description
  },
  readButton: {
    paddingLeft: 10,
  },
});

export default NotificationScreen;
