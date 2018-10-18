import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Pedometer, Icon } from "expo";
import Progressbar from "../components/Progressbar";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Steps"
  };

  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    refreshing: false,
    stepsToAchive: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  //From Expo Docs: https://docs.expo.io/versions/v30.0.0/sdk/pedometer
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1); //24h difference
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  //returns distance based on steps, either in km or meters
  convertStepsToUnits = () => {
    const steps = this.state.pastStepCount;
    let distance = steps * 0.762; // 1 step = 0.768m
    return distance / 1000 > 1
      ? (distance / 1000).toFixed(2) + " km"
      : distance.toFixed(0) + " m";
  };

  //popup for information about the step counter
  handleInfoIconPress = () => {
    Alert.alert(
      "Steps Information",
      "- Walk with the phone and watch this number increase.",
      [{ text: "OK" }],
      { cancelable: false }
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

  //resets the data and updates the view
  onResetData = () => {
    this.setState({ currentStepCount: 0 });
    this._unsubscribe(); //reset currentStepCount subscription
    this._subscribe();
  };

  //handle button press and make user confirm the action
  handleResetPress = () => {
    Alert.alert(
      "Reset Data",
      "Do you want to reset the data?",
      [
        { text: "Yes", onPress: () => this.onResetData() },
        { text: "Cancel", style: "cancel" }
      ],
      { cancelable: false }
    );
  };

  //sets the number of steps to state
  handleStepsPerDay = value => {
    let num = parseInt(String(value)); //avoids numbers beginning vith 0, eg. 02000 => 2000
    this.setState({ stepsToAchive: num });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.stepsContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingBottom: 10
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Activity
                </Text>
                <Icon.Ionicons
                  name="ios-walk"
                  size={30}
                  style={{ marginLeft: 10, marginTop: -4 }}
                />
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  Current steps: {this.state.currentStepCount} steps
                </Text>
                <TouchableOpacity
                  onPress={this.handleInfoIconPress}
                  style={{ marginTop: 5 }}
                >
                  <Icon.Ionicons
                    name="ios-information-circle-outline"
                    size={16}
                    style={{ color: "rgba(96,100,109, 1)" }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.infoContainerWithDate}>
                <Text style={styles.infoText}>
                  Past day: {this.state.pastStepCount} steps
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    marginVertical: 15,
                    color: "rgba(96,100,109, 1)"
                  }}
                >
                  {this.formatDate()}
                </Text>
              </View>
              <View style={styles.infoContainerWithDate}>
                <Text style={styles.infoText}>
                  Distance: {this.convertStepsToUnits()}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    marginVertical: 15,
                    color: "rgba(96,100,109, 1)"
                  }}
                >
                  {this.formatDate()}
                </Text>
              </View>
              <View style={styles.resetContainer}>
                <TouchableOpacity onPress={this.handleResetPress}>
                  <Text style={styles.resetText}>Reset data</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.stepsGoalContainer}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    paddingBottom: 10
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Achivement
                  </Text>
                  <Icon.Ionicons
                    name="ios-medal"
                    size={20}
                    style={{ marginLeft: 10, marginTop: 2 }}
                  />
                </View>
                <View style={styles.stepsGoalContainerText}>
                  <Text style={styles.goalText}>
                    Number of steps to achive pr day:
                  </Text>
                  <TextInput
                    style={styles.inputFieldNumberSteps}
                    keyboardType="numeric"
                    maxLength={5}
                    onChangeText={value => this.handleStepsPerDay(value)}
                  />
                </View>
                <Progressbar
                  currentStepCount={this.state.currentStepCount}
                  pastStepCount={this.state.pastStepCount}
                  stepsToAchive={this.state.stepsToAchive}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  stepsContainer: {
    marginHorizontal: 40
  },
  infoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24
  },
  infoContainer: {
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 20,
    marginBottom: 15,
    backgroundColor: "#E9F7FD",
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoContainerWithDate: {
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 20,
    paddingBottom: 0,
    marginBottom: 15,
    backgroundColor: "#E9F7FD",
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  resetContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 0
  },
  resetText: {
    fontSize: 12,
    color: "white",
    lineHeight: 24,
    backgroundColor: "#ff837c",
    borderRadius: 7,
    overflow: "hidden",
    padding: 5
  },
  inputFieldNumberSteps: {
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    height: 40,
    width: 76,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    marginLeft: 10,
    marginTop: -10
  },
  stepsGoalContainer: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 40
  },
  stepsGoalContainerText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
