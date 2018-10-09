import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  List,
  ListItem,
} from "react-native";
import Goal from "../components/Goal"
import { Icon } from "expo";
import { storeData, fetchData } from "../asyncstorage";
import { AsyncStorage } from "react-native";

export default class GoalsScreen extends React.Component {
  static navigationOptions = {
    title: "Goals"
  };
  state = {
    inputValue: "",
    currentIndex : 0,
    goals: [["1","name","Description","11"]]
  };


  componentDidUpdate() {

  }

  componentWillMount() {
    AsyncStorage.getAllKeys().then(keys =>
      AsyncStorage.multiGet(keys).then(result => {
        result.map(element =>
          this.setState({
            goals: [...this.state.goals, ...[[element[0], element[1], element[2], element[3]]]], //using E6 spread syntax
            currentIndex: parseInt(this.state.goals[this.state.goals.length-1][0]) //Get the last used index
          })
        );
      })
    );
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }; //muligens ikke ;


  //create a unique key for element to be stored in the asyncstorage
  createUniqueStoreKey = () => {
    return String(
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(-1)
    );
  };

  // stores the inputvalue to asyncstorage and clears the textinput
  addGoal = (name, description ) => {
    this.setState({
      currentIndex : currentIndex + 1
    })
    const key = String(this.state.currentIndex);
    let date = new Date()
    storeData(key, name, description, date);
    //BUG: works first time, then it does not!!!
    this.setState({
      goals: [...this.state.goals, ...[[key, name, description, date]]]
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
              style = {styles.goalswrapperContainer}
              data={this.state.goals}
              keyExtractor = {data => data[0]}
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              renderItem={({item}) => (

                <Goal
                  index = {item[0]}
                  name = {item[1]}
                  text = {item[2]}
                  date = {item[3]}/>
              )}>
            </FlatList>
            <View style={styles.addContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('NewGoal')}>
                <Text style={styles.addText}>Add new goal</Text>
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
