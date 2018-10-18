import "react-native";
import React from "react";
import MainTab from "../MainTabNavigator";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";

describe("MainTabNavigator snapshot", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it("should render all of maintabnavigator correctly", () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<MainTab />);
    expect(result).toMatchSnapshot();
  });

  it("should render outer most of maintabnavigator correctly", () => {
    //tests a snapshot view
    const tree = renderer.create(<MainTab />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
