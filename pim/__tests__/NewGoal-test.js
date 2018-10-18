import "react-native";
import React from "react";
import NewGoal from "../screens/NewGoalScreen";
import Goals from "../screens/GoalsScreen";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
//Snapshot testing
describe("NewGoal snapshot", () => {
  it("should render newgoal view correctly", () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<NewGoal />);
    expect(result).toMatchSnapshot();
  });

  it("should render outer most view in newgoal view correctly", () => {
    //tests a snapshot view
    const tree = renderer.create(<NewGoal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

//Unit testing
describe("Unit testing: tests functions", () => {
  const newGoalContainer = renderer.create(<NewGoal />).getInstance();

  test("creates unique keys for the asyncstorage", () => {
    const key1 = newGoalContainer.createUniqueStoreKey();
    let key2 = "";
    setTimeout(() => {
      key2 = newGoalContainer.createUniqueStoreKey();
    }, 10);
    expect(key1).not.toBe(key2);
  });

  test('formated date is on format "Oct 02, 21:22"', () => {
    const formatedDate = newGoalContainer.formatDate();

    //Month to match regex. 1 big letter, then 2 small letters
    const letters = formatedDate.substring(0, 3);
    expect(letters).toMatch(/[A-Z]{1}[a-z]{2}/);

    //Day to match regex. 2 numbers
    const day = formatedDate.substring(4, 6);
    expect(day).toMatch(/[1-9]{2}/);

    //Clock to match regex. 2 numbers, then colon, then 2 numbers
    const clock = formatedDate.substring(8, 14);
    expect(clock).toMatch(/[1-9]{2}[:]{1}[0-9]{2}/);
  });

 
});
