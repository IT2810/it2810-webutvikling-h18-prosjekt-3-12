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

export default class GoalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection_of_goals: props.collection_of_goals
    };
  }
  render() {
    return (
      <View>
        {this.state.collection_of_goals.map(g => (
          <Goal key={g} id={g} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
