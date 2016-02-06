var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var DynamicSearch = require('../dynamicsearch.js');


describe('Integration Tests', function() {

  it("search field starts empty", function() {
    var dynamicsearch = TestUtils.renderIntoDocument(
        <DynamicSearch countries={[{"name": "Cuba"}]} />
    );

    var h1 = TestUtils.findRenderedDOMComponentWithTag(dynamicsearch, 'input');

    expect(h1.value).toEqual("");
  });

});


describe('Unit Tests', function() {

  before("get prototype class of DynamicSearch", function(){
    this.ds = DynamicSearch.prototype;
  });

  it("is a react composite component", function() {
    expect(TestUtils.isCompositeComponent(this.ds)).toExist();
  });
  
  it("call DynamicSearch field", function() {
    expect(this.ds.getInitialState()).toEqual({searchString: ''});
  });

});
