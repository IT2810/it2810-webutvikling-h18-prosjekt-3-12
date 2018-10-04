import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {Goal} from "../components/Goal"
import {GoalList} from "../components/GoalList"

var g1 = Goal({ index : 1})
var g2 = Goal({ index : 2})
var g3 = Goal({ index : 3})
var g4 = Goal({ index : 4})
var initial_goals = [g1,g2,g3,g4]

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Goals',
  };

  

  componentDidMount() {
    this._subscribe();
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
   

    //TODO: Legge til og lagre i ASYNC, hente fra ASYNC ved start.
    
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
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
