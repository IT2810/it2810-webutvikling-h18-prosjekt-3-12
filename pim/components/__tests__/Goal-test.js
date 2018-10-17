import 'react-native';
import React from 'react';
import Goal from "../Goal.js"
import renderer from 'react-test-renderer';

jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });


describe("Goal snapshot", () => {
    it('It should render Goal component correctly', () => {
        const tree = renderer.create(<Goal />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

