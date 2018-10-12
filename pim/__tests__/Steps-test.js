import "react-native";
import React from "react";
import Steps from "../screens/StepsScreen";
import renderer from "react-test-renderer";

it("should render steps view correctly", () => {
  //tests a snapshot view
  const tree = renderer.create(<Steps />).toJSON();
  expect(tree).toMatchSnapshot();
});

//tests component functions
let stepsContainer = renderer.create(<Steps />).getInstance();
let formatedDate = stepsContainer.formatDate();
console.log(formatedDate);

it('formatDate returns date on format "Oct 2, 17:32"', () => {
  expect(formatedDate).stringMatching(/[a-zA-Z]+/);
});
