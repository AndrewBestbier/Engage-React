var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var State = require('react-router').State;

var Tooltip = require('react-bootstrap').Tooltip;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;

var JoinedSidebar = React.createClass({

  mixins: [State],

  getInitialState: function(){
    return {
      roomid: this.getParams().roomid,
    }
  },


  render: function(){


    var questionTooltip = <Tooltip>View the room's questions</Tooltip>;
    var pollTooltip = <Tooltip>View the room's polls</Tooltip>;
    var settingsTooltip = <Tooltip>Room Settings</Tooltip>;


    return (
      <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
              <li>
                <Link to="joinedquestions" params={{roomid: this.state.roomid}}> 
                  <OverlayTrigger placement='right' overlay={questionTooltip} delayShow={300} delayHide={150}>
                    <i className="fa fa-question-circle fa-2x sidebar-icon" ></i> 
                  </OverlayTrigger>
                </Link>
              </li>
              
              <li>
                  <Link to="joinedpolls" params={{roomid: this.state.roomid}}> 
                    <OverlayTrigger placement='right' overlay={pollTooltip} delayShow={300} delayHide={150}>
                      <i className="fa fa-pie-chart fa-2x sidebar-icon"></i>
                    </OverlayTrigger>
                  </Link>
              </li>
              <li>
                  <Link to="joinedquestions" params={{roomid: this.state.roomid}}> 
                    <OverlayTrigger placement='right' overlay={settingsTooltip} delayShow={300} delayHide={150}>
                      <i className="fa fa-cogs fa-2x sidebar-icon"></i>
                    </OverlayTrigger>
                  </Link>
              </li>
          </ul>
      </div>
    )
  }
});

module.exports = JoinedSidebar;