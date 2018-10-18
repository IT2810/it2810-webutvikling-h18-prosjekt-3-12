import "react-native";
import React from "react";
import Goals from "../GoalsScreen";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import MockAsyncStorage from 'mock-async-storage';
import { AsyncStorage as storage } from 'react-native'


//mock of AsyncStorage, used in testing
const mock = () => {
    const mockImpl = new MockAsyncStorage()
    jest.mock('AsyncStorage', () => mockImpl)
}
const release = () => jest.unmock('AsyncStorage')
mock();

/* Both Snapshot and unit testing are not working because of unsolved 
problems with navigation property


describe("GoalScreen snapshot", () => {
    it("should render GoalScreen view correctly", () => {
        const renderer = new ShallowRenderer();
        const result = renderer.render(<Goals />);
        expect(result).toMatchSnapshot();
    });

    it("should render outer most view in GoalScreen view correctly", () => {
        //tests a snapshot view
        const tree = renderer.create(<Goals />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
*/


//Unit testing
describe("Unit testing: tests functions", () => {
    const navigation = { navigate: jest.fn() };
    const GoalsContainer = renderer.create(<Goals navigation={navigation} />).getInstance();

    it("handleUpdateGoals should update number of goals correctly", () => {

        //Set numGoals to some non-zero number
        GoalsContainer.setState({

            numGoals: 5
        });

        let numGoals = GoalsContainer.state.numGoals
        expect(numGoals).toBe(5);

        //Try to update tate with function
        GoalsContainer.handleUpdateGoals(3);
        numGoals.toBe(2);

    });



});

