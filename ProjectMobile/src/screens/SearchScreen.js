import { View, Text, TextInput, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { moviesListAPI } from '../api/movieList';
import { movieSearchAPI } from '../api/MovieSearchAPI'
import AntIcon from 'react-native-vector-icons/AntDesign'
import SearchMovieList from '../components/SearchMovieList';
import React from 'react';

export default function SearchScreen() {

  const [moviesList, setMoviesList] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [searchResult, setSearchResult] = React.useState([]);

  React.useEffect(() => {
    const movieListAPICall = async () => {
      const movies = await moviesListAPI();
      setMoviesList(movies);
    };

    movieListAPICall();
  }, []);

  //console.log("Search movie list are", moviesList);

  const handleSearch = async (text) => {
    setSearchText(text);

    // console.log("Search Text", searchText);

    if (text.length > 2) {
      const results = await movieSearchAPI(text);
      setSearchResult(results);
      console.log("Search Results", searchResult);
    } else {
      setSearchResult([]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.searchContainer}>
          <TextInput
            placeholder='Seach Moive'
            placeholderTextColor='#888'
            style={styles.searchInput}
            onChangeText={handleSearch}
            value={searchText} />
          <AntIcon name='search1' size={20} color='#888' style={styles.searchIcon} />

        </View>
        <Text>SearchScreen</Text>
        {searchResult.length > 0 ? (
          <SearchMovieList data={searchResult} />
        ) : (
          <View>
            <Text style={styles.allMoviesLabel}>All Movies</Text>
            <SearchMovieList data={moviesList} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 60,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: '#333',
    alignSelf: 'center',
    width: '90%',
  },

  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: 'white',
  }, searchIcon: {
    marginLeft: 10
  },
  allMoviesLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
  },
});