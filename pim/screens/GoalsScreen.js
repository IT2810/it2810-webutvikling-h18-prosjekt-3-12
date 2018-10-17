import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  List,
  ListItem
} from "react-native";
import Goal from "../components/Goal";
import { Icon } from "expo";
import { AsyncStorage } from "react-native";

export default class GoalsScreen extends React.Component {
  static navigationOptions = {
    title: "Goals"
  };
  state = {
    currentIndex: 0,
    goals: [],
    numGoals: 0
  };

  //fetches all previously saved goals from asyncstorage and adds them to the goal state
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
    //get the number of goals saved to async on app start
    AsyncStorage.getAllKeys().then(keys =>
      this.setState({
        numGoals: keys.length
      })
    );
    //checks if a back navigation is made from newgoalscreen to goalscreen
    this.props.navigation.addListener("willFocus", playload => {
      if (playload.action.type === "Navigation/BACK") {
        AsyncStorage.getAllKeys().then(keys =>
          this.handleBackNavigation(keys.length)
        );
      }
    });
  }

  //backnavigation is made, then checks if new goal is made => if so updates states
  handleBackNavigation = newNumGoals => {
    if (newNumGoals !== this.state.numGoals) {
      this.setState({
        numGoals: newNumGoals
      });
      if (this.state.numGoals !== 0) {
        this.setSavedGoalToState();
      }
    }
  };

  //fetches last saved goal and adds it to the goal state
  setSavedGoalToState = () => {
    AsyncStorage.getAllKeys().then(keys =>
      AsyncStorage.getItem([...keys].sort().pop()).then(element => {
        this.setState(
          {
            goals: [
              ...this.state.goals,
              ...[[String([...keys].sort().pop()), String(element)]]
            ]
          },
          () => console.log("Set saved goal to state:", this.state.goals)
        );
      })
    );
  };

  //updates the number of goals saved to async
  handleUpdateNumGoals = num => {
    this.setState({
      numGoals: this.state.numGoals - num
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
            <FlatList
              data={this.state.goals}
              keyExtractor={item => item[0]}
              renderItem={({ item }) => (
                <Goal
                  asyncKey={item[0]}
                  name={JSON.parse(item[1])[0]}
                  desc={JSON.parse(item[1])[1]}
                  date={JSON.parse(item[1])[2]}
                  numGoals={num => this.handleUpdateNumGoals(num)}
                />
              )}
            />
            <View style={styles.addContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("NewGoal")}
              >
                <Text style={styles.addText}>Add new goal +</Text>
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
    fontSize: 17,
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
