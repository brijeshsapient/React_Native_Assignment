import React, { useState } from "react";

import { TextInput ,StyleSheet } from "react-native";
import firestore from '@react-native-firebase/firestore';

const Input = ({visible,todos, onRefresh})=>{
    const [todo,setTodo] = useState('');
    if(visible)
    {
        return(
            <TextInput style={styles.textInput}
                autoCapitalize="sentences"
                autoCorrect={true}
                onChangeText={(value)=>{
                    setTodo(value)
                }}
                keyboardType="default"
                value={todo}
                returnKeyType="next"
                onSubmitEditing={()=>{
                    firestore().collection('todos').add({
                        content: todo,
                        priority: todos.length+1,
                      }).then(()=>{onRefresh()});
                      setTodo('');
                }} 
            />
        );
    }else{
        return null;
    }
};

const styles = StyleSheet.create({
    textInput:{
        height: 100,
        padding: 20,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#C04000',
        elevation:10,
        fontSize:20,
        color:'#fff'
      }
});


export default Input;