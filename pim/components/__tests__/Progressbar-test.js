import "react-native";
import React from "react";
import Progressbar from "../Progressbar";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

//Snapshot testing
describe("Progressbar snapshot", () => {
  it("should render progressbar view correctly", () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<Progressbar />);
    expect(result).toMatchSnapshot();
  });

  it("should render outer most view in progressbar view correctly", () => {
    //tests a snapshot view
    const tree = renderer.create(<Progressbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

//Unit testing

describe("Unit testing: tests functions", () => {
  //To achive: 0. Actual: 166 => should return 0
  const progresbarContainer1 = renderer
    .create(
      <Progressbar
        stepsToAchive={0}
        pastStepCount={123}
        currentStepCount={43}
      />
    )
    .getInstance();
  test("gets correct progress for actual steps set to 0", () => {
    const res1 = progresbarContainer1.getProgress();
    expect(res1).toBe(0.0);
  });

  //To achive: 200. Past: 0 => should return 0
  const progresbarContainer2 = renderer
    .create(
      <Progressbar
        stepsToAchive={200}
        pastStepCount={0}
        currentStepCount={43}
      />
    )
    .getInstance();
  test("gets correct progress for past steps set to 0", () => {
    const res2 = progresbarContainer2.getProgress();
    expect(res2).toBe(0);
  });

  //To achive: 200. Actual: 166 => should return 0.83
  const progresbarContainer3 = renderer
    .create(
      <Progressbar
        stepsToAchive={200}
        pastStepCount={123}
        currentStepCount={43}
      />
    )
    .getInstance();
  test("gets correct progress for actual steps lower than set achivment", () => {
    const res3 = progresbarContainer3.getProgress();
    expect(res3).toBe(0.83);
  });
});
