import React from "react";
import {Platform} from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/StepsScreen";
import GoalsScreen from "../screens/GoalsScreen";
import NewGoalScreen from "../screens/NewGoalScreen"

const HomeStack = createStackNavigator({
    Home: HomeScreen

});

HomeStack.navigationOptions = {
    tabBarLabel: "Steps",
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === "ios"
                    ? `ios-walk${focused ? "" : "-outline"}`
                    : "md-walk"
            }
        />
    )
};

const GoalsStack = createStackNavigator({
    Goals: GoalsScreen,
    NewGoal: NewGoalScreen
});

GoalsStack.navigationOptions = {
    tabBarLabel: "Goals",
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === "ios"
                    ? `ios-checkmark-circle${focused ? "" : "-outline"}`
                    : "md-checkmark"
            }
        />
    )
};

export default createBottomTabNavigator({
    HomeStack,
    GoalsStack,
});



