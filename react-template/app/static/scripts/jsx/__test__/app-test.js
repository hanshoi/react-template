import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import expect from "expect";
import Helloworld from "../hello";


describe('React units tests', () => {
  let helloworld;

  before("set helloworld with World as name", () => {
    helloworld = TestUtils.renderIntoDocument(
        <Helloworld name="World" />
    );
  });

  it("Helloworld prints Hello World", () => {
    let h1 = TestUtils.findRenderedDOMComponentWithTag(helloworld, 'h1');
    expect(h1.textContent).toEqual("Hello World!");
  });

});
