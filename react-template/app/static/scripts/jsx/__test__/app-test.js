var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var Helloworld = require('../app.js');


describe('React units tests', function() {

  before("set helloworld with World as name", function(){
    this.helloworld = TestUtils.renderIntoDocument(
        <Helloworld name="World" />
    );
  });

  it("Helloworld prints Hello World", function() {
    var h1 = TestUtils.findRenderedDOMComponentWithTag(this.dynamicsearch, 'h1');
    expect(h1.text).toEqual("Hello World!");
  });

});
