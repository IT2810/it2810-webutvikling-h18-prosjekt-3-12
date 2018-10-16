import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Icon } from "expo";
import Modal from "react-native-modal";
import { AsyncStorage } from "react-native";

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asyncKey: this.props.asyncKey,
      name: this.props.name,
      desc: this.props.desc,
      date: this.props.date,
      isModalVisible: false,
      checked: false
    };
  }

  //DEPRECATED, REPLACE
  //componentWillReceiveProps(nextProps) {
  // update original states
  //this.setState({
  //  index: nextProps.index,
  //  name: nextProps.name,
  //  text: nextProps.text,
  //  date: nextProps.date,
  //  isModalVisible: false
  //});
  //}

  //limit the length of descritpion to 20 character. For more the user can press info to view full desc
  limitDesc = () => {
    if (this.state.desc.length > 20) {
      return this.state.desc.substring(0, 20) + "...";
    }
    return this.state.desc;
  };

  //toogles the modal for the goal on/off
  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  //swithes checked state and performs corresponding action to asyncstorage
  handleCheckBoxToogle = () => {
    if (!this.state.checked) {
      this.setState({ checked: !this.state.checked });
      this.removeItemValue(this.state.asyncKey);
      this.toggleModal();
      this.refCallback();
    }
  };

  //removes item from async based on key
  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (exception) {
      console.log("Error removing item", exception);
    }
  }

  //callback to Goal.js with update for removed item
  refCallback = element => {
    this.props.numGoals(-1);
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.toggleModal}>
          <View
            style={
              this.state.checked === true
                ? styles.singleGoalContainerChecked
                : styles.singleGoalContainer
            }
          >
            <View style={styles.goalsNameContainer}>
              <Text
                style={
                  this.state.checked === true
                    ? styles.goalHeaderTextChecked
                    : styles.goalHeaderText
                }
              >
                {this.state.name}
              </Text>
              <Icon.Ionicons
                name="ios-information-circle-outline"
                size={16}
                style={{ color: "rgba(96,100,109, 1)" }}
              />
            </View>
            <View style={styles.goalsInfoContainer}>
              <Text style={styles.goalDescText}>{this.limitDesc()} </Text>
              <Text style={styles.goalDateText}>{this.state.date}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isModalVisible}
          backdropOpacity={0.7}
          onBackdropPress={this.toggleModal}
        >
          <View style={styles.modal}>
            <View style={styles.headerContainer}>
              <Text style={styles.modalTextHeader}>{this.state.name}</Text>
              <TouchableOpacity onPress={this.toggleModal}>
                <Icon.Ionicons
                  name="ios-close-circle-outline"
                  size={20}
                  style={{ color: "black", padding: 10 }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTextDesc}>{this.state.desc}</Text>
            <View style={styles.modalBottomColumn}>
              <View style={styles.modalBottomRow}>
                <TouchableOpacity onPress={this.handleCheckBoxToogle}>
                  <View style={styles.completedContainer}>
                    <Icon.Ionicons
                      name={
                        this.state.checked === false
                          ? "ios-radio-button-off"
                          : "ios-radio-button-on"
                      }
                      size={16}
                      style={{ color: "rgba(96,100,109, 1)", marginTop: 3 }}
                    />
                    <Text style={styles.modalTextComplete}>Completed</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.modalTextDate}>{this.state.date}</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Goal;

const styles = StyleSheet.create({
  goalsNameContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  goalsInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  goalDescText: {
    color: "rgba(96,100,109, 1)",
    lineHeight: 24
  },
  goalDateText: {
    fontSize: 13,
    color: "rgba(96,100,109, 1)"
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
  singleGoalContainerChecked: {
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#E9F7FD",
    opacity: 0.4,
    overflow: "hidden"
  },
  goalHeaderTextChecked: {
    fontSize: 16,
    color: "black",
    lineHeight: 24,
    textDecorationLine: "line-through"
  },
  goalHeaderText: {
    fontSize: 16,
    color: "black",
    lineHeight: 24,
    textDecorationLine: "none"
  },
  modal: {
    marginHorizontal: 20,
    minHeight: 200,
    maxHeight: 300,
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalBottomColumn: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  modalBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalTextHeader: {
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 15,
    fontSize: 17,
    color: "black",
    lineHeight: 24
  },
  modalTextDesc: {
    paddingLeft: 10,
    fontSize: 16,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    marginTop: -30
  },
  modalTextComplete: {
    fontSize: 16,
    paddingRight: 5,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    paddingLeft: 7
  },
  modalTextDate: {
    fontSize: 12,
    color: "rgba(96,100,109, 1)",
    marginTop: 5
  },
  completedContainer: {
    flexDirection: "row"
  }
});
