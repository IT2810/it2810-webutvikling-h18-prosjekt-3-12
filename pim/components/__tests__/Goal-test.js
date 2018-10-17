import 'react-native';
import React from 'react';
import Goal from "../Goal.js"
import renderer from 'react-test-renderer';

jest.useFakeTimers();
  beforeEach(() => {

  });


describe("Goal snapshot", () => {
    it('It should render Goal component correctly', () => {
        const tree = renderer.create(<Goal
            asyncKey={"1"}
            name={"2"}
            desc={"3"}
            date={"4"}
            numGoals={5}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

