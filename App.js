import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBar, ScrollView, StyleSheet, View, Text, Image, Pressable, SafeAreaView } from 'react-native';

export default function App() {
  const [movie, setMovie] = useState({});

  const movieHandler = async () => {
    const { data } = await axios.get('https://randomic-movie.herokuapp.com/random-movies');
    if(data.overview.length === 0){
      await movieHandler();
      return;
    }
    setMovie(data);
    return;
  }

  useEffect(() => {
    movieHandler()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.view}>
        <Pressable
          style={styles.button}
          onPress={() => movieHandler()}
          title="Click here"
          accessibilityLabel='Click here'
        >
          <Text style={styles.text}>Atualizar</Text>
        </Pressable>
        <Text style={styles.title}>
          {movie.title}
        </Text>
        <Image
          style={styles.logo}
          source={{
            uri: movie.backdrop_path,
          }}
        />
        </View>
        <Text style={styles.overview}>
          {movie.overview}
        </Text>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    width: 350,
    // marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#f00',
    marginBottom: 10,
  },
  logo: {
    width: 350,
    height: 200,
    marginBottom: 30,
    borderRadius: 10,
    // marginLeft: 20,
  },
  overview: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    textAlign: 'justify',
    marginBottom: 30,
    paddingHorizontal: 10,
    paddingLeft: 2,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },
  scrollView: {
    marginHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20
  },
});
