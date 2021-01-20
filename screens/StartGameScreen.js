import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert, Dimensions, ScrollView } from 'react-native';

import Colors from '../constants/colors'

import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'

const StartGameScreen = (props) => {

  const [enteredValue, setEnteredValue] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

  useEffect(() => {
    const updateLayout = () => {
      //set button width to change to the default when orientation changes
      setButtonWidth(Dimensions.get('window').width / 4)
    }
    //orientation change
    Dimensions.addEventListener('change', updateLayout)

    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
  }
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert('Invalid number', 'Number has to be a number between 1-99', [{ text: 'Ok', style: 'destructive', onPress: resetInputHandler }])
      return
    }
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    setEnteredValue('')
    Keyboard.dismiss()
  }

  let confirmedOutput
  if(confirmed){
    confirmedOutput = (
    <Card style={styles.summaryContainer}>
      <Text>Chosen number:</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <Button onPress={() => props.onStartGame(selectedNumber)} title="Start game"></Button>
      <MainButton onPress={() => props.onStartGame(selectedNumber)}>Custom button start game</MainButton>
    </Card>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a new game</Text>
            <Card style={styles.inputContainer}>
                <Text style={styles.text}>Select a number</Text>
                <Input onChangeText={numberInputHandler} value={enteredValue} style={styles.input} blurOnSubmit autoCapitalize="none" autoCorrect={false} keyboardType="number-pad" maxLength={2}></Input>
                <View style={styles.btnContainer}>
                  <View style={{ width: buttonWidth }}>
                      <Button onPress={resetInputHandler} color={Colors.secondary} title="Reset"></Button>
                  </View>
                  <View style={{ width: buttonWidth }}>
                      <Button onPress={confirmInputHandler} color={Colors.primary} title="Confirm"></Button>
                  </View>
                </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      title:{
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
      },
      inputContainer:{
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
      },
      btnContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
      },
      /*
      btn:{
          //width: 100
          width: Dimensions.get('window').width / 4
      },
      */
      input:{
        width: 50,
        textAlign: 'center'
      },
      summaryContainer:{
        marginTop: 20,
        alignItems: 'center'
      },
      text:{
        fontFamily: 'open-sans'
      }
});

export default StartGameScreen