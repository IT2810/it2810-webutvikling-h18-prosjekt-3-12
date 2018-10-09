import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { Icon } from "expo";

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      name: this.props.name,
      text: this.props.text,
      date: this.props.date,
    };
  }


  componentWillReceiveProps(nextProps) {
    // update original states
    this.setState({
      index: nextProps.props.index,
      name: nextProps.props.name,
      text: nextProps.props.text,
      date: nextProps.props.date,
    });
}


  //popup for information about the goal's description
  handleInfoIconPress = () => {
    Alert.alert(
      "Information",
      this.state.text,
    );
  };
  render() {
    return (
      <View>
        <Text>{this.state.index}</Text>
        <Text>{this.state.name}</Text>
        <Text>{this.state.date}</Text>
        <TouchableOpacity onPress={this.handleInfoIconPress}>
                  <Icon.Ionicons
                    name="ios-information-circle-outline"
                    size={16}
                    style={{ color: "rgba(96,100,109, 1)" }}
                  />
        </TouchableOpacity>
      </View>
    );
  };
 




}

export default Goal;

const styles = StyleSheet.create({});
