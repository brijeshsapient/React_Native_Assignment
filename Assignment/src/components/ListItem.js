import React, { useState } from "react";
import {View ,Text,TouchableOpacity,StyleSheet} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as Icon from "react-native-feather";
import firestore from '@react-native-firebase/firestore';

const ListItem = ({item,opacity,onRefresh,onContentOffsetChanged})=>{
     const [side,setSide] = useState('');
     const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };
      const onSwipeLeft= async (gestureState) =>{
        const res = await firestore().collection('todos').doc(item.id).delete();
        onRefresh();
      }
    
      const onSwipeRight= async (gestureState)=> {
        const res = await firestore().collection('todos').doc(item.id).delete();
        onRefresh();
      }
    
      const onSwipe=(gestureName, gestureState) =>{
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        switch (gestureName) {
          case SWIPE_UP:
               setSide('');
            break;
          case SWIPE_DOWN:
                onContentOffsetChanged(0);
                setSide('');
            break;
          case SWIPE_LEFT:
              setSide('Left')
            break;
          case SWIPE_RIGHT:
              setSide('Right')
            break;

        }
      }

    if(opacity===1 && side==''){
        return(
        <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        onSwipeLeft={(state) => onSwipeLeft(state)}
        onSwipeRight={(state) => onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
        }}
        >
        <TouchableOpacity>
                  <View style={styles.container}>
                    <Text style={styles.content}>{item.content}</Text>
                  </View>
            </TouchableOpacity>
        </GestureRecognizer>
        )
    }else if(side=="Left"){
       return( <TouchableOpacity>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={styles.container}>
                        <Text style={styles.content}>{item.content}</Text>
                    </View>
                    <View style={{alignSelf:'center',marginHorizontal:40}}>
                        <Icon.Check  stroke="green" fill="#000" width={50} height={50}   />
                    </View>
                </View>    
        </TouchableOpacity>)
    }
    else if(side=="Right"){
        return(
        <TouchableOpacity>    
            <View style={{flex:1,flexDirection:'row'}}>
                <View style={styles.container}>
                    <Text style={styles.content}>{item.content}</Text>
                </View>
                <View style={{alignSelf:'center',marginHorizontal:40}}>
                <Icon.Delete  stroke="red" fill="#000" width={50} height={50}   />
                </View>
            </View>
        </TouchableOpacity>    
        )
    }
    else {
        return(
            <TouchableOpacity onPress={()=>{onContentOffsetChanged(1)}}>
                  <View style={styles.container1}>
                    <Text style={styles.content}>{item.content}</Text>
                  </View>
            </TouchableOpacity>
        )
    }
   
};

const styles = StyleSheet.create({
    content:{
        fontSize:20,
        color:'#fff',
        marginLeft:20,
        textAlign:'left',
        marginTop:20
      },
      container:{
        height:80,
        backgroundColor:'#C04000',
        borderBottomWidth:1,
        flex:3
      }, 
      container1:{
        height:80,
        backgroundColor:'#C04000',
        borderBottomWidth:1,
        opacity:.4,
      }, 
});
export default ListItem;