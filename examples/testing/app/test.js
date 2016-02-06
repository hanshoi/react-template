var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var DynamicSearch = require('./dynamicsearch.js');


describe('Integration Tests', function() {

  it("search field starts empty", function() {
    var dynamicsearch = TestUtils.renderIntoDocument(
        <DynamicSearch countries={[]} />
    );

    var h1 = TestUtils.findRenderedDOMComponentWithTag(dynamicsearch, 'input');

    expect(h1.value).toEqual("");

  });

});


describe('Unit Tests', function() {

  it("is a react composite component", function() {
    debugger;
    expect(TestUtils.isCompositeComponent(DynamicSearch)).toExist();
  });
  
  it("call DynamicSearch field", function() {
    expect(DynamicSearch.getInitialState()).toEqual({searchString: ''});
  });

});
