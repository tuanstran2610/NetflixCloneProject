import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { userRegisterAPI } from '../api/userRegisterAPI'
import React, { useState } from 'react'

export default function RegisterScreen() {

    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('Male');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = React.useState(true);



    const handleRegister = async () => {
        const responseData = await userRegisterAPI(firstName, lastName, age, gender, email, username, password);

        if (responseData.success === false) {
            setValidation(false);

        } else if (responseData.success === true) {
            navigation.navigate('LoginScreen');
        }
    };

    const handleLogin = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="white"
                onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="white"
                onChangeText={(text) => setLastName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                placeholderTextColor="white"
                keyboardType="numeric"
                onChangeText={(text) => setAge(text)}
            />
            <View style={styles.genderSelection}>
                <Text style={styles.genderText}>Gender:</Text>
                <View style={styles.radioButtonContainer}>
                    <TouchableOpacity onPress={() => setGender('Male')}>
                        <View style={styles.radioButton}>
                            {gender === 'Male' && <View style={styles.radioButtonSelected} />}
                        </View>
                        <Text style={styles.radioButtonText}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGender('Female')}>
                        <View style={styles.radioButton}>
                            {gender === 'Female' && <View style={styles.radioButtonSelected} />}
                        </View>
                        <Text style={styles.radioButtonText}>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGender('Other')}>
                        <View style={styles.radioButton}>
                            {gender === 'Other' && <View style={styles.radioButtonSelected} />}
                        </View>
                        <Text style={styles.radioButtonText}>Other</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="white"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="white"
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.buttonText}>Already a member. Login!</Text>
            </TouchableOpacity>
            <Text style={[styles.validate, { opacity: validation ? 0 : 1 }]}>
                Username and password already exists!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000', // Dark background color
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#333333',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'white',
    },
    registerButton: {
        backgroundColor: '#EB1825',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    genderSelection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    genderText: {
        color: 'white',
        marginRight: 10,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        //margin: 20,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30,
    },
    radioButtonSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'blue',
    },
    radioButtonText: {
        color: 'white',
    },
    validate: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 20,
        color: 'white'
    }
});