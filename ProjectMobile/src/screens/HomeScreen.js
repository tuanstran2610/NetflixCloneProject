import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { moviesListAPI } from '../api/movieList'
import MovieBanner from '../components/MovieBanner'
import MyListMovie from '../components/MyListMovie'
import MovieCards from '../components/MovieCards'
import { mylistAPI } from '../api/mylistAPI'
import { useNavigation } from '@react-navigation/native'


export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const [moviesList, setMoviesList] = React.useState([]);
  const [mylist, setMylist] = React.useState(route.params.mylist)
  const [watchedMovies, setWatchedMovies] = React.useState(route.params.watchedMovies);


  React.useEffect(() => {
    const moviesListAPICall = async () => {
      try {
        const movies = await moviesListAPI();
        // console.log('Fetched Movies List:', movies); // Check API response
        setMoviesList(movies);
      } catch (error) {
        console.error('Error fetching movies list:', error);
      }
    };
    moviesListAPICall();
  }, []);


  React.useEffect(() => {
    const updateMylist = async () => {
      // You may need to fetch the updated mylist from your API here
      console.log("Homescreen mylist has been updated")
      const updatedMyList = await mylistAPI();
      setMylist(updatedMyList.moviesInMyList);
    };

    updateMylist();
  }, [route.params.mylist]);

  //console.log('Movie list', movieList)
  console.log('My list', mylist)
  console.log('Watched movies', watchedMovies)

  const handleBanner = (movie) => {
    console.log('Handle banner', movie);
  }

  const posterPlayButton = (movieID, movieLink, movieTitle) => {
    // console.log('Play button', movieID, movieLink, movieTitle)
    navigation.navigate('MoviesVideoPlayer', { movieID, movieLink, movieTitle })
  }

  const posterInfoButton = (movie) => {
    // console.log('Info', movie);
    navigation.navigate('MovieDetails', { movie })
  }


  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView style={styles.scrollView}>
        <MovieBanner
          moviesList={moviesList}
          mylist={mylist}
          handleBanner={handleBanner}
          posterPlayButton={posterPlayButton}
          posterInfoButton={posterInfoButton}
        />
        <View style={styles.subContainer}>
          {mylist.length != 0 && (<MyListMovie label={'My List'} mylist={mylist} />)}
          <MovieCards genreID={12} label={"Action Movies"} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  subContainer: {
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 20,
  }
})