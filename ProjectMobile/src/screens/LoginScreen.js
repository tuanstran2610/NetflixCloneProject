import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { userloginAPI, checkAuthAPI } from '../api/userloginAPI';
import { useNavigation } from '@react-navigation/native';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';


export default function LoginScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [validation, setValidation] = React.useState(true);

    React.useEffect(() => {
        console.log('Use effect')
        const checkauthuser = async () => {
            const response = await checkAuthAPI();
            //console.log('Check auth response', response);
            if (response.authenticated) {
                navigation.navigate('BottomTabNavigator',
                    {
                        screen: 'HomeScreen',
                        params: {
                            mylist: response.user.mylist,
                            watchedMovies: response.user.watchedMovies,
                            firstName: response.user.firstName,
                            lastName: response.user.lastName,
                            age: response.user.age,
                            gender: response.user.gender,
                            email: response.user.email,
                            username: response.user.username,
                        }
                    });
            }
        }
        checkauthuser()
    }, [])

    const handleLogin = async () => {
        const responseData = await userloginAPI(username, password)
        // console.log('ResponseData', responseData);
        if (responseData.success === false) {
            setValidation(false);
            //console.warn('Wrong username or password.')
        } else if (responseData.success === true) {
            navigation.navigate('BottomTabNavigator', {
                screen: 'HomeScreen',
                params: {
                    mylist: responseData.user.mylist,
                    watchedMovies: responseData.user.watchedMovies,
                    firstName: responseData.user.firstName,
                    lastName: responseData.user.lastName,
                    age: responseData.user.age,
                    gender: responseData.user.gender,
                    email: responseData.user.email,
                    username: responseData.user.username,
                }
            });
        }

    }
    const handleRegister = () => {
        navigation.navigate('RegisterScreen');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

            <TextInput
                style={styles.input}
                placeholder='Username'
                placeholderTextColor={"white"}
                onChangeText={(text) => setUsername(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={"white"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />


            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.buttonText}>Not a member. Register!</Text>
            </TouchableOpacity>
            <Text style={[styles.validate, { opacity: validation ? 0 : 1 }]}>
                Wrong username or password. Please try again.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
        fontweight: 'bold'
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray', borderWidth: 1,
        backgroundColor: '#333333',
        marginBottom: 10,
        paddingHorizontal: 10, borderRadius: 5,
        color: 'white',
    },
    loginButton: {
        backgroundColor: '#EB1825',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    validate: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 20,
        color: 'white'
    }

})