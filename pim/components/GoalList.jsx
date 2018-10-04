import React, { Component } from 'react';
import { Goal } from "./Goal"
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


export class GoalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collection_of_goals : props.collection_of_goals
          }
    }
    render() { 
        return ( 
        <View>
            <ScrollView>
                {this.state.collection_of_goals.map(g =>
                 <Goal key={g.id} name={g.name} date ={g.date} description={g.description}/>)}
            </ScrollView>
        </View>
         );
    }


}
 