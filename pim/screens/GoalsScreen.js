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
import { AsyncStorage } from "react-native";

export default class GoalsScreen extends React.Component {
  static navigationOptions = {
    title: "Goals"
  };
  state = {
    currentIndex : 0,
    goals: []
  };


  componentWillMount() {
    AsyncStorage.getAllKeys().then(keys =>
      AsyncStorage.multiGet(keys).then(result => {
        result.map(element =>
          this.setState({
            goals: [...this.state.goals, ...[[element[0], element[1]]]], //using E6 spread syntax
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

  render() {
    console.log(this.state.goals)
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
