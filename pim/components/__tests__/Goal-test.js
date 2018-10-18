import "react-native";
import React from "react";
import Goal from "../Goal.js";
import MockAsyncStorage from 'mock-async-storage';
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import { storeData } from "../../asyncstorage.js";
import { AsyncStorage as storage } from 'react-native'

//declaration of goal, to be tested

const goal = (
  <Goal
    asyncKey={"10394234234"}
    name={"Løp 1000m"}
    desc={"Mot opp ved lerkendal stadion og løp med Anders"}
    date={"Oct 3, 11:32"}
    numGoals={5}
  />
);

//mock of AsyncStorage, used in testing
const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}
const release = () => jest.unmock('AsyncStorage')
mock();

//Snapshot testing, both deep and shallow

describe("Goal snapshot", () => {
  jest.useFakeTimers();
  beforeEach(() => { });


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

describe("Goal Unit Testing: Tests functions", () => {
  jest.useFakeTimers();
  beforeEach(() => { });

  const GoalContainer = renderer.create(goal).getInstance();


  it("limitDesc should limit desc if too long", () => {
    const desc = GoalContainer.state.desc;
    const limitedDesc = GoalContainer.limitDesc();

    //Check that limited desc is not null and limited to 20 characters.
    expect(desc).not.toBe(null);
    expect(limitedDesc).not.toBe(null);
    expect(limitedDesc).toBe(desc.substring(0, 20) + "...")

    //Set description to something less than 20 character
    GoalContainer.setState({
      desc: "Løping"
    });

    desc2 = GoalContainer.state.desc;
    limitedDesc2 = GoalContainer.limitDesc();

    //Check that limited desc is not null and is assessed as being not too long.
    expect(desc2).not.toBe(null);
    expect(limitedDesc2).not.toBe(null);
    expect(limitedDesc2).not.toBe(desc2.substring(0, 20) + "...");
    expect(limitedDesc2).toBe(desc2);

  });

  it("toogleModal should toggle isModalVisible prop", () => {

    //check that initial value is false
    const visisbility = GoalContainer.state.isModalVisible;
    expect(visisbility).not.toBe(null);
    expect(visisbility).toBe(false);

    //call toogle function
    GoalContainer.toggleModal()

    //check that value is true
    visisbility2 = GoalContainer.state.isModalVisible;
    expect(visisbility2).not.toBe(null);
    expect(visisbility2).toBe(true);
  });

  it("removeItemValue should remove item from AsyncStorage", async () => {

    //Set an item and check that it's value is correct
    await storage.setItem('myKey', 'myValue')
    let value = await storage.getItem('myKey')
    expect(value).toBe('myValue')

    //Try to remove it, using removeItem and check that getItem returns undefined.

    GoalContainer.removeItemValue('myKey')
    value = await storage.getItem('myKey')
    expect(value).toBe(undefined)
  });
});
