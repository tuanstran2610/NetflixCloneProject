import { Image, View, Text, StyleSheet, StatusBar, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import Font5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Orientation from 'react-native-orientation-locker'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import { similarMoviesAPI } from '../api/similarMoviesAPI'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import SimilarMovies from '../components/SimilarMovies'
import React from 'react'

export default function MovieDetails({ route }) {

    const navigation = useNavigation();
    const { movie } = route.params;
    const [similarMoviesList, setSimilarMoviesList] = React.useState([]);


    React.useEffect(() => {
        const similarMoviesListAPICall = async () => {
            try {
                const similarMovies = await similarMoviesAPI(movie._id);
                setSimilarMoviesList(similarMovies);
            } catch (error) {
                console.error("Error fetching similar movies:", error);
            }
        };

        similarMoviesListAPICall();
    }, [movie]);

    const goBack = () => {
        navigation.goBack();
        Orientation.lockToPortrait();
        SystemNavigationBar.fullScreen(false);
    }

    const playMovie = (movieID, movieLink, movieTitle) => {
        navigation.navigate('MoviesVideoPlayer', { movieID, movieLink, movieTitle });
    };

    function formatRuntime(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return `${hours}h ${remainingMinutes}m`;
    }

    return (
        <TouchableWithoutFeedback>
            <ScrollView style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <TouchableOpacity  onPress={() => goBack()}>
                    <AntIcon style={styles.backButton} name="arrowleft" size={30} color="white" />
                </TouchableOpacity>
                <Image source={{ uri: `https://image.tmdb.org/t/p/original/${movie.posterPath}` }} style={styles.moviePoster} />
                <View style={styles.movieDetailsContainer}>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <View style={styles.subDetailsContainer}>
                        <Text style={styles.subDetails}>{new Date(movie.releaseDate).getFullYear()} | {formatRuntime(movie.runtime)} | <MaterialIcon style={{ marginTop: 10, }} name='hd' size={20} color='white' /></Text>
                    </View>
                    <View style={styles.subDetailsContainer}>
                        <MaterialIcon style={{ marginTop: 10, }} name="speaker" size={20} color="white" /><Text style={styles.subDetails}>English | Vietnamese</Text>
                        <MaterialIcon style={{ marginTop: 10, }} name="subtitles" size={20} color="white" /><Text style={styles.subDetails}>EN</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.playButton} onPress={() => playMovie(movie._id, movie.downloadLink, movie.title)}>
                        <Font5 name="play" size={20} color="black" />
                        <Text style={styles.playButtonText}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.downloadButton}>
                        <Font5 name="download" size={20} color="white" />
                        <Text style={styles.downloadButtonText}>Download</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.overview}>{movie.overview}</Text>
                    <Text style={styles.genresText}>Genre: {movie.genres.join(' | ')}</Text>
                </View>

                <View style={styles.similarMovieTextContainer}>
                    <Text style={styles.similarMovieText}>Similar Movies</Text>
                </View>
                <SimilarMovies similarMoviesList={similarMoviesList} />
            </ScrollView>
        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
    },
    backButton: {
        marginVertical: 40,
        marginHorizontal: 20
    },
    movieDetailsContainer: {
        width: '100%',
        paddingHorizontal: 1,
        paddingVertical: 15,
    },
    movieTitle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    subDetailsContainer: {
        flexDirection: 'row',
    },
    subDetails: {
        marginTop: 10,
        color: 'white',
        fontSize: 15,
        marginRight: 15,
    },
    buttonContainer: {
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'column'
    },
    playButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    playButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8
    },
    downloadButton: {
        backgroundColor: '#2D2D2D',
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    downloadButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
    detailsContainer: {
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'column',
        marginVertical: 5,
    },
    overview: {
        color: 'white',
        fontSize: 12,
        marginVertical: 5,
    },
    genresText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    similarMovieTextContainer: {
        width: '95%',
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: 'red',
        paddingHorizontal: 8,
    },
    similarMovieText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    moviePoster: {
        width: responsiveWidth(100),
        height: responsiveHeight(40), // Adjust the height to a suitable percentage of the screen
        resizeMode: 'cover', // Ensures the image scales while maintaining aspect ratio
        alignSelf: 'center',
        marginBottom: 10, // Add spacing below the image to separate it from other content
    }
})          