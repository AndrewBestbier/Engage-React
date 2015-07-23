var React = require('react');
var Authenticated = require('../../../utils/authenticated');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var RouterContext = Router.RouterContext;

//Components
var JoinedSidebar = require('./JoinedSidebar');

var Room = React.createClass({
  mixins: [Authenticated],

  render: function(){


    return (
      <div>
        <JoinedSidebar/>
        <RouteHandler />
      </div>
    )
  }
});

module.exports = Room;