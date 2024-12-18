import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { moviesListAPI } from '../api/movieList'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import React from 'react'

export default function MovieCards({ genreID, label }) {
    const [moviesList, setMoviesList] = React.useState([]);
    const navigation = useNavigation();

    const handleMovieDetails = (movie) => {
        navigation.navigate('MovieDetails', { movie })
    }

    React.useEffect(() => {
        const fetchMovies = async () => {
            const movies = await moviesListAPI(genreID);
            setMoviesList(movies);
        };
        fetchMovies();
    }, [genreID]);

    //console.log(`Movies from the genre ${genreID} is ${moviesList}`);

    const renderMovieCards = ({ item }) => (
        <TouchableOpacity onPress={() => handleMovieDetails(item)} style={styles.movieCardContainer}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item.posterPath}` }} style={styles.moviecardImage} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <FlatList
                data={moviesList.slice(0, 10)}
                keyExtractor={(item) => item._id}
                renderItem={renderMovieCards}
                windowSize={2}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        height: 280,
    },
    label: {
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: 'white',
    },
    movieCardContainer: {
        marginRight: 10,
        borderRadius: 20,
        marginBottom: 20
    },
    moviecardImage: {
        width: 150,
        height: '100%',
        borderRadius: 10,
    },
})