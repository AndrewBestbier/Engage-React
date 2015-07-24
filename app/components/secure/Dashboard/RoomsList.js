var React = require('react');

//Utilities
var Router = require('react-router');
var Link = Router.Link;


//Imported Components
var Tooltip = require('react-bootstrap').Tooltip;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;


//Component
var RoomsList = React.createClass({

  render: function(){

     notRoomStyle = {
      padding: 24
     }

     if(this.props.listType === 'joined')
     {
        var link = 'joinedquestions';
     } 
     else if (this.props.listType === 'created')
     {
        var link = 'createdquestions';
     }
     else if (this.props.listType === 'moderated')
     {
       var link = 'moderatedquestions';
     }


  	 if(this.props.rooms === undefined)
  	 {
  	 		var listItems = <h6 style={notRoomStyle}>Loading your rooms</h6>
  	 }
  	 else if (this.props.rooms.length === 0)
  	 {
  			var listItems = <h6 style={notRoomStyle}>You haven't {this.props.listType} any rooms. Click the orange '+' to join one.</h6>
  	 }
  	 else
  	 {
  	 	var listItems = this.props.rooms.map(function(item, index){

  	 		var roomid = {
  	 			'roomid': item.roomid
  	 		}
  	 	  return (
  	 	    <li key={index} className="list-group-item">
  	 	        <Link to={link} params={roomid}>{item.name}</Link>
  	 	    </li>
  	 	  )
  	 	}.bind(this));
  	 }

    return (
      <div>{listItems}</div>
    )
  }
});

module.exports = RoomsList;