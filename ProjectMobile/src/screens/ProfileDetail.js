import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation-locker'
import { useNavigation } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar'

const ProfileScreen = ({ route }) => {

  //console.log('Profile param: ', route.params.params.age)

  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack();
    Orientation.lockToPortrait();
    SystemNavigationBar.fullScreen(false);
  }
  // Mock user data (replace with dynamic data if available)
  const user = {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png', // Replace with actual avatar URL
    username: route.params.params.username,
    firstName: route.params.params.firstName,
    lastName: route.params.params.lastName,
    email: route.params.params.email,
    age: route.params.params.age,
    gender: route.params.params.gender,
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Avatar and Username */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{user.username}</Text>
      </View>

      {/* User Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailBox}>
          <Text style={styles.detailText}><Text style={styles.label}>First Name:</Text> {user.firstName}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailText}><Text style={styles.label}>Last Name:</Text> {user.lastName}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailText}><Text style={styles.label}>Email:</Text> {user.email}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailText}><Text style={styles.label}>Age:</Text> {user.age}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.detailText}><Text style={styles.label}>Gender:</Text> {user.gender}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#555',
  },
  username: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  detailBox: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
  },
  detailText: {
    fontSize: 16,
    color: 'white',
  },
  label: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ProfileScreen;
