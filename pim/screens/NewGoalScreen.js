import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  List,
  ListItem,
} from "react-native";

export default class NewGoalScreen extends React.Component {
  static navigationOptions = {
    title: "NewGoal"
  };
  state = {
    inputName : "",
    inputDescription : ""
  };

  handleOkPress = () =>{ //Check if input is not empty -> addGoal
    if (this.state.inputName === "") {
        Alert.alert(
          "Warning",
          "Cannot add a goal with an empty name. Please write a name for the goal.",
          [{ text: "OK" }],
          { cancelable: false }
        );
        }
    else if (this.state.inputDescription === "") {
        Alert.alert(
            "Warning",
            "Cannot add a goal with an empty description. Please write a description for the goal.",
            [{ text: "OK" }],
            { cancelable: false }
        );
        }
    else{
        this.addGoal();
    }
  };

  addGoal = () => { //Store new Goal with GoalsScreen addGoal method, and go back to GoalsScreen.
    GoalsScreen.addGoal(this.state.inputName, this.state.inputDescription)
    this.props.navigation.goBack()
  }

 

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
            }}/>
            <TextInput //Input field for (long) description of goal
            style={styles.inputField}
            placeholder={"Description of goal"}
            maxLength={200}
            onChangeText={value => this.setState({ inputDescription: value })}
            clearButtonMode="always"
            ref={input => {
                this.textInput = input;
            }}/>
            <TouchableOpacity onPress={this.handleOkPress()}>
                <Text style={styles.addText}>Add new goal</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  header:{
      flex:1,
      fontSize:20
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



