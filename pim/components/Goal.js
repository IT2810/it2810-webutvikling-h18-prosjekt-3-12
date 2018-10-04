import React, { Component } from "react";
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
      text: "",
      date: Date(),
      index: props.id,
      name: ""
    };
  }
  render() {
    return (
      <View>
        <Text>{this.state.index}</Text>
        <Text>{this.state.name}</Text>
        <Text>{this.state.date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
