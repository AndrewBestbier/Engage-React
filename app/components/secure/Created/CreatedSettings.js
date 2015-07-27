var React = require('react');

//Components
var State = require('react-router').State;
var Input = require('react-bootstrap').Input;

var CreatedSettings = React.createClass({

  mixins: [ReactFireMixin,State],

  getInitialState: function(){
	  return {
	    roomid: this.getParams().roomid,
	    hover: false,
	    room: undefined,
	    moderation: false
	  }
	},

	componentDidMount: function() {

		var firebaseRef = new Firebase("https://engaged.firebaseio.com/rooms/"+this.props.params.roomid);
    	this.bindAsObject(firebaseRef, "room");
	},

	cardHover : function(){
	  this.setState({hover: true});
	},

	cardNotHovered: function(){
	  this.setState({hover: false});
	},

	changeModeration: function()
	{
		var firebaseRef = new Firebase("https://engaged.firebaseio.com/rooms/"+this.props.params.roomid);
		if(this.state.room.moderationon === false)
		{
			firebaseRef.child('moderationon').set(true);
		}
		else
		{
			firebaseRef.child('moderationon').set(false);
		}
	},

  render: function(){

  	

		var panelStyle = {
		  marginBottom: 10,
		  marginTop: 10,
		    transition: '0.3s',
		    padding: 10
		}

	  if(this.state.hover)
	  {
	    var panelStyle = {
	      marginBottom: 10,
	      marginTop: 10,
	      boxShadow: '0 5px 10px rgba(0,0,0,0.17)',
	      transition: '0.3s',
	      padding: 10
	    }
	  }

	  centerStyle = {
	  	textAlign: 'center'
	  }

	  if(this.state.room === undefined)
	  {
	  	var roomCode = '';
	  }
	  else
	  {
	  	var roomCode = this.state.room.roomcode;

	  	if(this.state.room.moderationon === false)
	  	{
	  		var moderation = false;
	  	}
	  	else
	  	{
	  		var moderation = true;
	  	}
	  }




    return (
	    <div style={panelStyle} className="panel panel-default" onMouseOver={this.cardHover} onMouseOut={this.cardNotHovered}>
		      <h4 style={centerStyle}>Settings:</h4>
		      <div style={centerStyle}>
		      	<h6>Room Code: <b>{roomCode}</b></h6>
		      	<h6>Moderation Code: <b>{roomCode}</b></h6>
		      	<Input type='checkbox' ref='checkbox' checked={moderation} label='Use Moderation' onChange={this.changeModeration}/>
		      </div>
	    </div>
    )
  }
});

module.exports = CreatedSettings;