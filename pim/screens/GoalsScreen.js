import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Goal from "../components/Goal";
import GoalList from "../components/GoalList";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Goals',
  };

  render() {
    var g1 = new Goal({ index : 1})
    var g2 = new Goal({ index : 2})
    var g3 = new Goal({ index : 3})
    var g4 = new Goal({ index : 4})
    var initial_goals = [g1,g2,g3,g4]
    
    return (
      <View>
        <ScrollView>
          <GoalList
            collection_of_goals = {initial_goals}/>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
