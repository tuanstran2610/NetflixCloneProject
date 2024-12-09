import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Image, Text } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveScreenFontSize, responsiveFontSize } from 'react-native-responsive-dimensions';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { addMovieToList, removeMovieFromList } from '../api/mylistAPI';

export default function MovieBanner({ moviesList, mylist, handleBanner, posterPlayButton, posterInfoButton }) {

    const [userMyList, setUserMyList] = React.useState(mylist);
    //console.log("User list", userMyList);
    const navigation = useNavigation();

    const addToList = async (item) => {
        try {
            let response;
            if (userMyList.includes(item._id)) {
                response = await removeMovieFromList(item._id);
            } else {
                response = await addMovieToList(item._id);
            }
            console.log('User current mylist', response.user.mylist);
            setUserMyList(response.user.mylist);
            navigation.navigate('HomeScreen', { mylist: response.user.mylist })
        } catch (error) {
            console.log('Error adding/removing from list', error)
        }
    }

    const renderMovieBanner = ({ item }) => (
        <TouchableOpacity>
            <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/original/${item.posterPath}` }} style={styles.posterImage} resizeMode='cover'>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']} style={styles.linearGradient}>
                    <TouchableOpacity key={item} style={styles.myListButton} onPress={() => addToList(item)}>
                        {userMyList.includes(item._id) ? (<AntDesignIcon name='checkcircle' size={30} color='white' />) : (<AntDesignIcon name='plus' size={30} color='white' />)}
                        <Text style={styles.myListText}>My List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.posterPlayButton}
                        onPress={() => posterPlayButton(item._id, item.downloadLink, item.title)}>
                        <EntypoIcon name='controller-play' size={30} color='black' />
                        <Text style={styles.playText}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.posterInfoButton} onPress={() => posterInfoButton(item)} >
                        <AntDesignIcon name='infocirlceo' size={30} color='white' />
                        <Text style={styles.infoText}>Info</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity >
    );

    return (
        <View style={styles.container}>
            <FlatList
                pagingEnabled
                data={moviesList}
                keyExtractor={(item) => item._id}
                renderItem={renderMovieBanner}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: responsiveHeight(70),
        width: '100%',
    },
    // movieBannerItem: {
    //     // Add styles for each movie banner item here
    //     width: 300, // Example width
    //     height: 200, // Example height
    //     marginRight: 10, // Example margin
    // },
    posterImage: {
        width: responsiveWidth(100),
        height: '100%',
        justifyContent: 'flex-end',
    },
    linearGradient: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    myListButton: {
        alignItems: 'center'
    },
    posterPlayButton: {

        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: responsiveWidth(2),
        backgroundColor: 'white',
        width: responsiveWidth(25),
    },
    posterInfoButton: {
        alignItems: 'center'
    },
    myListText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        marginTop: responsiveHeight(0.5),
    },
    playText: {
        color: 'black',
        fontSize: responsiveFontSize(2), fontWeight: 'bold',
        marginLeft: responsiveWidth(1.5)
    },
    infoText: {
        color: 'white',
        fontSize: responsiveFontSize(2), fontWeight: 'bold',
        marginTop: responsiveHeight(0.5)
    }
});