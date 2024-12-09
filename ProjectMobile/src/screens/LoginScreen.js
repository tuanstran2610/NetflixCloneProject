import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { userloginAPI, checkAuthAPI } from '../api/userloginAPI';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        console.log('Use effect')
        const checkauthuser = async () => {
            const response = await checkAuthAPI();
            console.log('Check auth response', response);
            if (response.authenticated) {
                navigation.navigate('BottomTabNavigator', {
                    screen: 'HomeScreen',
                    params: { mylist: response.user.mylist, watchedMovies: response.user.watchedMovies }
                });
            }
        }
        checkauthuser()
    }, [])

    const handleLogin = async () => {
        const responseData = await userloginAPI(username, password)
        // console.log('ResponseData', responseData);
        if (responseData.success === false) {
            console.warn('Wrong username or password.')
        } else if (responseData.success === true) {
            navigation.navigate('BottomTabNavigator', {
                screen: 'HomeScreen',
                params: { mylist: responseData.user.mylist, watchedMovies: responseData.user.watchedMovies }
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

})