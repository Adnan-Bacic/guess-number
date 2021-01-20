import React from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native';

import Colors from '../constants/colors'
import DefaultStyles from '../constants/defaultStyles'
import MainButton from '../components/MainButton'

const GameOverScreen = (props) => {
  
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Game over!</Text>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/success.png')} style={styles.image} resizeMode="cover"></Image>
          <Image style={styles.image} fadeDuration={1000} source={{ uri: 'https://image.shutterstock.com/image-photo/evening-view-ama-dablam-on-600w-258841592.jpg'}}></Image>
        </View>
        <View style={styles.resultContainer}>
          <View style={styles.resultText}>
            <Text style={DefaultStyles.bodyText}>Number of rounds: <Text style={styles.highlight}>{props.roundsNumber}</Text></Text>
            <Text style={DefaultStyles.bodyText}>Number was: <Text style={styles.highlight}>{props.userNumber}</Text></Text>
          </View>
        </View>
        <Button onPress={props.onRestart} title="Play again"></Button>
        <MainButton onPress={props.onRestart}>Custom button play again</MainButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  imageContainer:{
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  image:{
    width: '100%',
    height: '100%'
  },
  resultContainer:{
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
  },
  resultText:{
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
  },
  highlight:{
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
});

export default GameOverScreen