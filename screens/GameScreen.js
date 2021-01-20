import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/defaultStyles'
import MainButton from '../components/MainButton'

import { Ionicons } from '@expo/vector-icons'

//import * as ScreenOrientation from 'expo-screen-orientation'

const generateRandomNumBetween = (min, max, exclude) => {
    //min and max numbers
    min = Math.ceil(min)
    max = Math.floor(max)

    //generate random number between the min and max number
    const randNum = Math.floor(Math.random() * (max - min) + min)

    //check if random number is excluded to generate new
    if(randNum === exclude){
        return generateRandomNumBetween(min, max, exclude)
    } else {
        return randNum
    }
}

//for scrollview:
/*
const renderListItem = (value, numOfRounds) => (
  <View key={value} style={styles.listItem}>
    <Text>#{numOfRounds}</Text>
    <Text>{value}</Text>
  </View>
)
*/
//for flatlist
const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text>#{listLength - itemData.index}</Text>
    <Text>{itemData.item}</Text>
  </View>
)

const GameScreen = (props) => {
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

const initialGuess = generateRandomNumBetween(1, 100, props.userChoice)

//define min and max numbers. exclude user choice
const [currentGuess, setCurrentGuess] = useState(initialGuess)
const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])

//device width and height
const [availableDeviceWidth, setAvailablDeviceWidth] = useState(Dimensions.get('window').width)
const [availableDeviceHeight, setAvailablDeviceHeight] = useState(Dimensions.get('window').height)

//define variables to change later when user clicks on buttons. useRef keeps values on re-render
const currentLow = useRef(1)
const currentHigh = useRef(100)

//destructure
const { userChoice, onGameOver } = props

useEffect(() => {
  const updateLayout = () => {
    setAvailablDeviceWidth(Dimensions.get('window'.width))
    setAvailablDeviceHeight(Dimensions.get('window'.height))
  }
  Dimensions.addEventListener('change', updateLayout)

  return () => {
    Dimensions.removeEventListener('change', updateLayout)
  }
})

useEffect(() => {
  if(currentGuess === userChoice){
    onGameOver(pastGuesses.length)
  }
}, [currentGuess, userChoice, onGameOver])

const nextGuessHandler = (direction) => {
  //check if user lies about the number being too high or too low
  if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
    Alert.alert('Dont lie', 'You know that is wrong', [{ text: 'Sorry', style: 'cancel' }])
    return
  }

  //change the value of the variables so that the computer has an eaiser time guessing the number
  //value changes to the currentGuess so its always getting narrowed down
  if(direction === 'lower'){
    currentHigh.current = currentGuess
  } else {
    currentLow.current = currentGuess + 1
  }
  const nextNumber = generateRandomNumBetween(currentLow.current, currentHigh.current, currentGuess)
  setCurrentGuess(nextNumber)
  //setRounds(currentRounds => currentRounds + 1)
  setPastGuesses(currentPastGuesses => [nextNumber.toString(), ...currentPastGuesses])
}

let listContainerStyle = styles.listContainer
if(availableDeviceWidth < 350){
  listContainerStyle = styles.listContainerBig
}

if(availableDeviceHeight < 500){
  return(
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponents guess</Text>
      <View style={styles.controls}>
      <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
        <Ionicons name="md-remove" size={24} color="white"></Ionicons>
      </MainButton>
      <NumberContainer>{currentGuess}</NumberContainer>
      <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
        <Ionicons name="md-add" size={24} color="white"></Ionicons>
      </MainButton>
      </View>
      <View style={listContainerStyle}>
        {/*
        works aswell:
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => (
          renderListItem(guess, pastGuesses.length - index)
          ))}
        </ScrollView>
        */}
        <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} contentContainerStyle={styles.list}></FlatList>
      </View>
    </View>
  )
}

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponents guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white"></Ionicons>
          </MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white"></Ionicons>
          </MainButton>
      </Card>
      <View style={listContainerStyle}>
        {/*
        works aswell:
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => (
          renderListItem(guess, pastGuesses.length - index)
          ))}
        </ScrollView>
        */}
        <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} contentContainerStyle={styles.list}></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
      flex: 1,
      padding: 10,
      alignItems: 'center',
      paddingVertical: 10
  },
  btnContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      //marginTop: 20,
      marginTop: Dimensions.get('window') > 600 ? 20 : 5,
      width: 300,
      maxWidth: '90%'
  },
  controls:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  listContainer:{
    flex: 1,
    width: '60%'
  },
  listContainerBig:{
    flex: 1,
    width: '80%'
  },
  list:{
    flexGrow: 1,
    //alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem:{
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
  
});

export default GameScreen