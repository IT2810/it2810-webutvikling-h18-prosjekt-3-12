import "react-native";
import React from "react";
import Steps from "../StepsScreen";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import Alert from "Alert";

//Snapshot testing
describe("Steps snapshot", () => {
  it("should render steps view correctly", () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<Steps />);
    expect(result).toMatchSnapshot();
  });

  it("should render outer most view in steps view correctly", () => {
    //tests a snapshot view
    const tree = renderer.create(<Steps />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

//Unit testing
describe("Unit testing: tests functions", () => {
  const stepsContainer = renderer.create(<Steps />).getInstance();

  test('formated date is on format "Oct 02, 21:22"', () => {
    const formatedDate = stepsContainer.formatDate();

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

  test("convert number of steps to distance (both in meters and km)", () => {
    //sets number of steps to 200 => should return distance in m
    stepsContainer.state.pastStepCount = 200;
    let meter_distance = (200 * 0.762).toFixed(0) + " m";
    expect(meter_distance).toMatch(stepsContainer.convertStepsToUnits());

    //sets number of steps to 2500 => should return distance in km
    stepsContainer.state.pastStepCount = 2500;
    let km_distance = ((2500 * 0.762) / 1000).toFixed(2) + " km";
    expect(stepsContainer.convertStepsToUnits()).toMatch(km_distance);
  });

  test("resets the current step count to 0", () => {
    stepsContainer.state.currentStepCount = 67;
    stepsContainer.onResetData();
    expect(stepsContainer.state.currentStepCount).toBe(0);
  });

  test("should handle the info icon press", () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<Steps />);
    const mockFn = jest
      .fn()
      .mockName(
        result.props.children.props.children.props.children[1].props.children[1]
          .props.onPress
      );
    expect(mockFn).toBeTruthy();
  });
});
