import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

export default class Progressbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#E9F7FD"
    };
  }
  getProgress = () => {
    if (this.props.stepsToAchive === 0 || isNaN(this.props.stepsToAchive)) {
      return 0;
    } else if (this.props.pastStepCount === 0) {
      return 1;
    }
    /* if (this.props.stepsToAchive / this.props.pastStepCount >= 1) {
      this.setState({
        color: "rgb(76, 217, 100)"
      });
      return this.props.stepsToAchive / this.props.pastStepCount;
    } */
    return (
      (this.props.pastStepCount + this.props.currentStepCount) /
      this.props.stepsToAchive
    );
  };

  render() {
    return (
      <View style={{ flex: 1, width: "100%", paddingTop: 10 }}>
        <ProgressBar
          progress={this.getProgress()}
          width={null}
          height={10}
          borderColor={"#d6d7da"}
          color={this.getProgress() >= 1 ? "rgb(76, 217, 100)" : "#ff837c"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
