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
      text: this.props.text,
      date: Date(),
      index: props.id,
      name: this.props.name
    };
  }


  //popup for information about the goal's description
  handleInfoIconPress = () => {
    Alert.alert(
      "Information",
      this.state.text,
    );
  };
  render() {
    return (
      <View>
        <Text>{this.state.index}</Text>
        <Text>{this.state.name}</Text>
        <Text>{this.state.date}</Text>
        <TouchableOpacity onPress={this.handleInfoIconPress}>
                  <Icon.Ionicons
                    name="ios-information-circle-outline"
                    size={16}
                    style={{ color: "rgba(96,100,109, 1)" }}
                  />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
