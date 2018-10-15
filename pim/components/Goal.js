import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Icon } from "expo";
import Modal from "react-native-modal";

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asyncKey: this.props.asyncKey,
      name: this.props.name,
      desc: this.props.desc,
      date: this.props.date,
      isModalVisible: false
    };
  }

  //DEPRECATED, REPLACE
  componentWillReceiveProps(nextProps) {
    // update original states
    this.setState({
      index: nextProps.index,
      name: nextProps.name,
      text: nextProps.text,
      date: nextProps.date
    });
  }

  //popup for information about the goal's description
  handleInfoIconPress = () => {
    Alert.alert("Information", this.state.desc);
  };

  //limit the length of descritpion to 20 character. For more the user can press info to view full desc
  limitDesc = () => {
    if (this.state.desc.length > 20) {
      return this.state.desc.substring(0, 20) + "...";
    }
    return this.state.desc;
  };

  //toogles the modal for the goal on/off
  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={styles.singleGoalContainer}>
        <View style={styles.goalsNameContainer}>
          <Text style={styles.goalNameText}>{this.state.name}</Text>
          <TouchableOpacity onPress={this.handleInfoIconPress}>
            <Icon.Ionicons
              name="ios-information-circle-outline"
              size={16}
              style={{ color: "rgba(96,100,109, 1)" }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.goalsInfoContainer}>
          <Text style={styles.goalDescText}>{this.limitDesc()} </Text>
          <Text style={styles.goalDateText}>{this.state.date}</Text>
        </View>
      </View>
    );
  }
}

export default Goal;

const styles = StyleSheet.create({
  goalsNameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  goalsInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  goalNameText: {
    fontSize: 20,
    color: "black",
    lineHeight: 24
  },
  goalDescText: {
    color: "rgba(96,100,109, 1)",
    lineHeight: 24
  },
  goalDateText: {
    color: "rgba(96,100,109, 1)"
  },
  singleGoalContainer: {
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#E9F7FD",
    overflow: "hidden"
  }
});
