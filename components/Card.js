import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Card = (props) => {
  return (
    //get all styles of card styles and add style props we can add
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
    card:{
        //width: 300,
        //maxWidth: '80%',
        //alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,

        //ios
        shadowColor: 'black',
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,

        //android
        elevation: 8
      },
});

export default Card