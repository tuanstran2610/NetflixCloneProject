import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation-locker'
import { useNavigation } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar'

const PolicyScreen = () => {

    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
        Orientation.lockToPortrait();
        SystemNavigationBar.fullScreen(false);
    }

    return (
        <View style={styles.container}>
            {/* Back Arrow */}
            <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
                <Icon name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Terms and Policies</Text>

            {/* Content */}
            <ScrollView style={styles.contentContainer}>
                <Text style={styles.contentText}>
                    Welcome to our application. Please read the following terms and policies carefully:
                </Text>
                <Text style={styles.sectionTitle}>1. Introduction</Text>
                <Text style={styles.contentText}>
                    By using this application, you agree to comply with and be bound by these terms.
                </Text>
                <Text style={styles.sectionTitle}>2. Privacy Policy</Text>
                <Text style={styles.contentText}>
                    We are committed to protecting your privacy. Your data will not be shared with third parties without your consent.
                </Text>
                <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
                <Text style={styles.contentText}>
                    Users are expected to use the application responsibly and avoid any harmful activities.
                </Text>
                <Text style={styles.sectionTitle}>4. Modifications</Text>
                <Text style={styles.contentText}>
                    We reserve the right to modify these terms at any time. Please check this page regularly for updates.
                </Text>
                <Text style={styles.sectionTitle}>5. Contact Us</Text>
                <Text style={styles.contentText}>
                    If you have any questions about these terms, please contact us at netflix.support@mail.ru.
                </Text>
            </ScrollView>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 20,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    contentText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
        lineHeight: 22,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 10,
    },
});

export default PolicyScreen;
