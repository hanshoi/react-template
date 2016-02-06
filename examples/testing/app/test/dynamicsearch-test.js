var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var DynamicSearch = require('../dynamicsearch.js');


describe('React user simulation tests', function() {
  before("set dynamicsearch component with some countries", function(){
    this.dynamicsearch = TestUtils.renderIntoDocument(
        <DynamicSearch countries={[{"name": "Sweden"}, {"name": "Cuba"}, {"name": "Bahamas"}]} />
    );
  });

  it("search field starts empty", function() {
    var input = TestUtils.findRenderedDOMComponentWithTag(this.dynamicsearch, 'input');
    expect(input.value).toEqual("");
  });

  it("change input value and search string changes", function(){
    var input = TestUtils.findRenderedDOMComponentWithTag(this.dynamicsearch, 'input');
    input.value = "cu";
    TestUtils.Simulate.change(input);
    // no need to press enter
    expect(this.dynamicsearch.state.searchString).toEqual("cu");
  });

  it("find several countries with search string", function(){
    var input = TestUtils.findRenderedDOMComponentWithTag(this.dynamicsearch, 'input');
    input.value = "ba";
    TestUtils.Simulate.change(input);
    // no need to press enter
    var lis = TestUtils.scryRenderedDOMComponentsWithTag(this.dynamicsearch, 'li');
    expect(lis.length).toEqual(2);
  });


});


describe('Direct object tests', function() {

  before("get prototype class of DynamicSearch", function(){
    this.ds = DynamicSearch.prototype;
  });

  it("is a react composite component", function() {
    expect(TestUtils.isCompositeComponent(this.ds)).toExist();
  });
  
  it("initial state is an empty search string", function() {
    expect(this.ds.getInitialState()).toEqual({searchString: ''});
  });

});
