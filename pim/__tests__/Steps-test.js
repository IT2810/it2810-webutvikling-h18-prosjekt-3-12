import "react-native";
import React from "react";
import Steps from "../screens/StepsScreen";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

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

//tests component functions
let stepsContainer = renderer.create(<Steps />).getInstance();
let formatedDate = stepsContainer.formatDate();
console.log(formatedDate);
