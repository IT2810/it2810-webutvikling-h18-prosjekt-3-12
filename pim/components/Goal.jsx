import React, { Component } from 'react';
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


export class Goal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text : "",
            date : Date(),
            index : props.index,
            name : ""
          }
    }
    render() { 
        return ( 
        <View>
            <ScrollView style={styles.container}>
                <View> // className="Index"
                    <Text>
                        {this.state.index}
                    </Text>
                </View>
                <View> // className="Name"
                    <Text>
                        {this.state.name}
                    </Text>
                </View>
                <View> // className="Date"
                    <Text>
                        {this.state.date}
                    </Text>
                </View>
            </ScrollView>
        </View>
         );
    }


}
 