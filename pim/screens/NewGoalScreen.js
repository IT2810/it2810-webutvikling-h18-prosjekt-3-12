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

export default class NewGoalScreen extends React.Component {
  static navigationOptions = {
    title: "NewGoal"
  };
  state = {
    inputName: "",
    inputDescription: "",
    inputValue: ""
  };

  //create a unique key for element to be stored in the asyncstorage
  createUniqueStoreKey = () => {
    return String(
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(-1)
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

  handleOkPress = () => {
    //Check if input is not empty -> addGoal
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

  // stores the inputvalue to asyncstorage and clears the textinput
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
              flexDirection: "column",
              paddingBottom: 10,
              paddingTop: 15
            }}
          >
            <Text style={styles.header}>Create a new goal</Text>
            <TextInput //Input field for name (short description) of goal
              style={styles.inputField}
              placeholder={"Name of goal"}
              maxLength={50}
              onChangeText={value => this.setState({ inputName: value })}
              clearButtonMode="always"
              ref={input => {
                this.textInput = input;
              }}
            />
            <TextInput //Input field for (long) description of goal
              style={styles.inputField}
              placeholder={"Description of goal"}
              maxLength={200}
              onChangeText={value => this.setState({ inputDescription: value })}
              clearButtonMode="always"
              ref={input => {
                this.textInput = input;
              }}
            />
            <TouchableOpacity onPress={() => this.handleOkPress()}>
              <Text style={styles.addText}>Add new goal</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    fontSize: 20
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    paddingBottom: 15
  },
  goalsContainer: {
    marginHorizontal: 40
  },
  wrapperContainer: {
    flex: 1,
    flexDirection: "column"
  },
  goalswrapperContainer: {
    flex: 1,
    flexDirection: "column"
  },
  goalText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24
  },
  singleGoalContainer: {
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#E9F7FD",
    overflow: "hidden"
  },
  addContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputField: {
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    height: 40,
    width: "85%",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16
  },
  addText: {
    fontSize: 22,
    color: "white",
    lineHeight: 24,
    backgroundColor: "rgb(76, 217, 100)",
    borderRadius: 7,
    overflow: "hidden",
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10
  }
});
