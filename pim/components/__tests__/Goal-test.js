import "react-native";
import React from "react";
import Goal from "../Goal.js";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

describe("Goal snapshot", () => {
  jest.useFakeTimers();
  beforeEach(() => {});

  const goal = (
    <Goal
      asyncKey={"10394234234"}
      name={"Løp 1000m"}
      desc={"Mot opp ved lerkendal stadion og løp med Anders"}
      date={"Oct 3, 11:32"}
      numGoals={5}
    />
  );

  it("It should render the whole Goal component correctly", () => {
    const tree = renderer.create(goal).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should shallowrender Goal component correctly", () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(goal);
    expect(result).toMatchSnapshot();
  });
});
