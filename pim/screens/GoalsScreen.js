import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  Platform,
  FlatList,
  List,
  ListItem
} from "react-native";
import { Icon } from "expo";
import { storeData, fetchData } from "../asyncstorage";
import { AsyncStorage } from "react-native";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Goals"
  };
  state = {
    inputValue: "",
    goals: []
  };

  componentWillMount() {
    AsyncStorage.getAllKeys().then(keys =>
      AsyncStorage.multiGet(keys).then(result => {
        result.map(element =>
          this.setState({
            goals: [...this.state.goals, ...[[element[0], element[1]]]] //using E6 spread syntax
          })
        );
      })
    );
  }

  //prompts user with waring if goal is empty, if not => calls addGoal
  handleAddPress = () => {
    if (this.state.inputValue === "") {
      Alert.alert(
        "Warning",
        "Cannot add a empty goal. Please write a goal.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      this.addGoal();
    }
  };

  //create a unique key for element to be stored in the asyncstorage
  createUniqueStoreKey = () => {
    return String(
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(-1)
    );
  };

  // stores the inputvalue to asyncstorage and clears the textinput
  addGoal = () => {
    const key = this.createUniqueStoreKey();
    storeData(key, this.state.inputValue);
    //BUG: works first time, then it does not!!!
    this.textInput.clear();
    if (Platform.OS === "ios") {
      this.textInput.setNativeProps({ text: " " });
    }
    this.setState({
      inputValue: "",
      goals: [...this.state.goals, ...[[key, this.state.inputValue]]]
    });
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>My goals</Text>
            <Icon.Ionicons
              name="ios-checkmark-circle-outline"
              size={25}
              style={{ marginLeft: 10, marginTop: 0 }}
            />
          </View>
          <View style={styles.wrapperContainer}>
            <View style={styles.goalswrapperContainer}>
              {this.state.goals.map(g => (
                <View style={styles.singleGoalContainer} key={g[0]}>
                  <Text style={styles.goalText} key={g[1]}>
                    {g[1]}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.addContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={"Add a goal..."}
                maxLength={50}
                onChangeText={value => this.setState({ inputValue: value })}
                clearButtonMode="always"
                ref={input => {
                  this.textInput = input;
                }}
              />
              <TouchableOpacity onPress={this.handleAddPress}>
                <Text style={styles.addText}>+</Text>
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
    borderRadius: 7,
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
