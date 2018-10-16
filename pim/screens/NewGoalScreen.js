import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert
} from "react-native";
import { storeData } from "../asyncstorage";
import { Icon } from "expo";

export default class NewGoalScreen extends React.Component {
  static navigationOptions = {
    title: "New Goal"
  };
  state = {
    inputName: "",
    inputDescription: "",
    inputValue: ""
  };

  //create a unique key for element to be stored in the asyncstorage
  createUniqueStoreKey = () => {
    return String(
      (((1 + Math.random()) * 0x1000000) | 0).toString(16).substring(-1)
    );
  };

  //return the formated the Date() object to => "Oct 01, 20:11"
  formatDate = () => {
    let date = String(new Date()).split(" ");
    const day = date[1] + " " + date[2] + ", ";
    const hours = date[4].substring(0, 5);
    const formatedDate = day + hours;
    return formatedDate;
  };

  //checks if input is empty, if so propmts user with alert message; else updates state and calls addGoal()
  handleAddGoalPress = () => {
    if (this.state.inputName === "") {
      Alert.alert(
        "Warning",
        "Cannot add a goal with an empty name. Please write a name for the goal.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else if (this.state.inputDescription === "") {
      Alert.alert(
        "Warning",
        "Cannot add a goal with an empty description. Please write a description for the goal.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      this.setState(
        {
          inputValue: JSON.stringify([
            this.state.inputName,
            this.state.inputDescription,
            this.formatDate()
          ])
        },
        () => this.addGoal()
      );
    }
  };

  //stores the inputvalue to asyncstorage and clears the textinput
  addGoal = () => {
    const key = this.createUniqueStoreKey();
    storeData(key, this.state.inputValue);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.goalsContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingBottom: 10,
              paddingTop: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>New goal</Text>
            <Icon.Ionicons
              name="ios-add-circle-outline"
              size={25}
              style={{ marginLeft: 10, marginTop: 0 }}
            />
          </View>
          <View styles={styles.addContainer}>
            <View style={styles.inputFieldContainer}>
              <TextInput //input field for name (short description) of goal
                style={styles.inputFieldName}
                placeholder={"Name of goal"}
                maxLength={30}
                onChangeText={value => this.setState({ inputName: value })}
                clearButtonMode="always"
                ref={input => {
                  this.textInput = input;
                }}
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <TextInput //input field for (long) description of goal
                style={styles.inputFieldDesc}
                placeholder={"Description of goal"}
                maxLength={100}
                onChangeText={value =>
                  this.setState({ inputDescription: value })
                }
                clearButtonMode="always"
                ref={input => {
                  this.textInput = input;
                }}
              />
            </View>
            <View style={styles.addTextWrapper}>
              <TouchableOpacity onPress={() => this.handleAddGoalPress()}>
                <Text style={styles.addText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    paddingBottom: 15
  },
  goalsContainer: {
    marginHorizontal: 40
  },
  addContainer: {
    flex: 1,
    flexDirection: "column"
  },
  inputFieldContainer: {
    marginBottom: 10
  },
  inputFieldName: {
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    height: 40,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16
  },
  inputFieldDesc: {
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    height: 100,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    paddingBottom: 60
  },
  addText: {
    fontSize: 17,
    color: "white",
    lineHeight: 24,
    backgroundColor: "rgb(76, 217, 100)",
    borderRadius: 7,
    overflow: "hidden",
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10
  },
  addTextWrapper: {
    width: "20%"
  }
});
