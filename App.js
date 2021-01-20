import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import Header from './components/Header'

import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

//importing fonts
import * as Font from 'expo-font'

import { AppLoading } from 'expo'

//get fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false)

  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)

  if(!dataLoaded){
    //apploading waits a little to show content
    //get fonts in startAsync
    //change state to true so we exit the current if statement
    //we can now use custom fonts
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(err) => console.log(err)}></AppLoading>
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
    //setGuessRounds(0)
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler}></StartGameScreen>
  if(userNumber && guessRounds <= 0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}></GameScreen>
  } else if(guessRounds > 0) (
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}></GameOverScreen>
  )

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor="#ac1a56" style="light"></StatusBar>
      <Header title="Guess a number"></Header>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,
  }
});

export default App