import React, {useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList, TouchableOpacity, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ListItem from "./src/components/ListItem";
import Input from "./src/components/Input";

const App =()=>{
  const [todos, setTodos] = useState([]);
  const [visible,setVisible] = useState(false);
  const [opacity,setOpacity] = useState(1);
  const onRefresh =()=>{
    fetch();
  }
  useEffect(() => {
    fetch();
  }, []);
const fetch=()=>{
  const todos=[];
    const subscriber = async ()=>{
     const response = await firestore()
      .collection('todos')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          todos.push( {id: documentSnapshot.id,content: documentSnapshot.data().content,priority: documentSnapshot.data().priority});
        });
      });
      setTodos({
        todos: todos.sort((a, b) => {
          let comparison = 0 ;
          if(a.priority > b.priority ) comparison = 1;
          else if(a.priority < b.priority ) comparison = -1;

          return comparison;
        }),
      });
      setTodos(todos)
      console.log(todos);
    }
    subscriber();
}
const addTodo = ()=>{
  setVisible(true);
}
const onContentOffsetChanged = (distanceFromTop: number) => {
    if(distanceFromTop === 0) { 
      addTodo();
      setOpacity(.4);
    }
    else{
      setVisible(false);
      setOpacity(1);
    }
  };
  return(
    <View style={{backgroundColor:'#000',flex:1}}>
      <Text style={styles.hedear}>Personal List</Text>
      <Input visible={visible} todos={ todos } onRefresh={onRefresh}/>
      <FlatList
        data={todos}
        keyExtractor={(todo) =>todo.id}
        onScroll={
          (event: NativeSyntheticEvent<NativeScrollEvent>) => 
              onContentOffsetChanged(event.nativeEvent.contentOffset.y)
          }
        renderItem={({item}) => {
          return (
            <ListItem item={item} opacity={opacity} onRefresh={onRefresh} onContentOffsetChanged={onContentOffsetChanged}/>
          )
        }}
      />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  hedear:{
    fontSize:18,
    color:'#fff',
    textAlign:'center',
    padding:5
  },
  
})