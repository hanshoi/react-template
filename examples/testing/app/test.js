var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var DynamicSearch = require('./dynamicsearch.js');

describe('DynamicSearch', function() {

  it("search field starts empty", function() {
    var dynamicsearch = TestUtils.renderIntoDocument(
        <DynamicSearch countries={[]} />
    );

    var h1 = TestUtils.findRenderedDOMComponentWithTag(dynamicsearch, 'input');

    expect(h1.value).toEqual("");

  });

});

describe('App', function() {
  
  it("call DynamicSearch field", function() {
    console.log("some random shit");
  });

});
