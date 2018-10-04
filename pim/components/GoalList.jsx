import React, { Component } from 'react';
import Goal from '.Goal'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert
  } from "react-native";


class GoalList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collection : []
          }
    }
    render() { 
        return ( 
        <View>
            <ScrollView style={styles.container}>
                
            </ScrollView>
        </View>
         );
    }


}
 
export default Goal;