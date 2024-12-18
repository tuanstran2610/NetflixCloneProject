import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { userLogoutAPI } from '../api/logoutAPI';
import { useNavigation } from '@react-navigation/native';




const SettingsScreen = ({ route }) => {

  console.log('setting', route);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const response = await userLogoutAPI();
      if (response.success) {
        console.log('Logged out successfully');
        navigation.navigate('LoginScreen');
      } else {
        console.error('Logout failed:', response.error);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const profileNavigation = () => {
    //console.log("passing to pro", route)
    navigation.navigate('ProfileDetail', route.params);
  }

  const policyNavigation = () => {
    navigation.navigate('PolicyScreen');
  }

  const notiNavigation = () => {
    navigation.navigate('NotificationScreens');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon name='arrow-back' size={20} color='#888' />
        </TouchableOpacity>
        <Text style={styles.title}>Profiles & more</Text>
        <View style={{ width: 24, height: 24 }} />
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={profileNavigation}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name='profile' size={20} color='#888' />
            <Text style={styles.profileName}>Profile</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#808080' }}>Manage Profiles</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
        <TouchableOpacity style={styles.listItem} onPress={policyNavigation}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name='policy' size={20} color='#888' />
            <Text style={styles.listItemText}>Terms and Policies</Text>
          </View>
          <IonIcon name='arrow-back' size={20} color='#888' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={notiNavigation}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name='policy' size={20} color='#888' />
            <Text style={styles.listItemText}>Notifications</Text>
          </View>
          <IonIcon name='arrow-back' size={20} color='#888' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileName: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },

  logoutButton: {
    backgroundColor: '#555', // Darker gray background
    padding: 10, // Smaller padding
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16, // Larger font size
  },
});

export default SettingsScreen;