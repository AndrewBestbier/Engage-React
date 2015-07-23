var React = require('react');

//Components
var State = require('react-router').State;
var Button = require('react-bootstrap').Button;

var JoinedPoll = React.createClass({

	mixins: [State],

	getInitialState: function(){
	  return {
	    roomid: this.getParams().roomid,
	    hover: false
	  }
	},

	cardHover : function(){
	  this.setState({hover: true});
	},

	cardNotHovered: function(){
	  this.setState({hover: false});
	},

  respondToPoll: function(answer)
  {
    var pollRef = new Firebase('https://engaged.firebaseio.com/rooms/'+this.state.roomid+'/polls/'+this.props.poll.$id+'/votes'+answer);

    pollRef.transaction(function(currentValue) {
      return currentValue+1;
    });
  },

  render: function(){

		var panelStyle = {
		  marginLeft: 42,
		  marginBottom: 10,
      marginTop: 10,
	    transition: '0.3s',
	    padding: 10
		}

  	  if(this.state.hover)
  	  {
  	    var panelStyle = {
  	      marginLeft: 42,
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

      buttonStyle = {
        width: '23%',
        marginLeft: 11,
        marginRight: 11
      }
  	

    return (

      <div style={panelStyle} className="panel panel-default" onMouseOver={this.cardHover} onMouseOut={this.cardNotHovered}>
	      <h4 onClick={this.respondToPoll} style={centerStyle}>{this.props.poll.pollquestion}</h4>
        <Button style={buttonStyle} onClick={this.respondToPoll.bind(this,1)} bsStyle='default'>{this.props.poll.possibleanswer1}</Button>
        <Button style={buttonStyle} onClick={this.respondToPoll.bind(this,2)} bsStyle='default'>{this.props.poll.possibleanswer2}</Button>
        <Button style={buttonStyle} onClick={this.respondToPoll.bind(this,3)} bsStyle='success'>{this.props.poll.possibleanswer3}</Button>
        <Button style={buttonStyle} onClick={this.respondToPoll.bind(this,4)} bsStyle='default'>{this.props.poll.possibleanswer4}</Button>      
      </div>
    )
  }
});

module.exports = JoinedPoll;