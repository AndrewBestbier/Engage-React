var React = require('react');

//Components
var State = require('react-router').State;
var Button = require('react-bootstrap').Button;
var firebaseUtils = require('../../../../utils/firebaseUtils');

var JoinedPoll = React.createClass({

	mixins: [State,ReactFireMixin],

	getInitialState: function(){
	  return {
	    roomid: this.getParams().roomid,
	    hover: false,
      pollvoted: null,
      useremail: ''
	  }
	},

  componentWillMount : function()
  {
    this.props.poll.$id

    var userRef = new Firebase("https://engaged.firebaseio.com");
    var authData = userRef.getAuth();


    var userEmail = firebaseUtils.formatEmailForFirebase(authData.email);

    this.setState({
      useremail: userEmail
    })

    var pollRef = new Firebase('https://engaged.firebaseio.com/user/'+userEmail+'/polls/'+this.props.poll.$id);

    this.bindAsObject(pollRef, "pollvoted");
  },


	cardHover : function(){
	  this.setState({hover: true});
	},

	cardNotHovered: function(){
	  this.setState({hover: false});
	},

  respondToPoll: function(answer)
  {
    var pollUserRef = new Firebase("https://engaged.firebaseio.com/user/"+this.state.useremail+"/polls/"+this.props.poll.$id);

    var roomId = this.state.roomid;
    var pollId = this.props.poll.$id;

    pollUserRef.set({voted: answer}, function(error){
      if (error) {
          alert("You have already answered this poll");
        } else {
          var pollRef = new Firebase('https://engaged.firebaseio.com/rooms/'+roomId+'/polls/'+pollId+'/votes'+answer);

          pollRef.transaction(function(currentValue) {
            return currentValue+1;
          });
        }
    });
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

      buttonStyle = {
        width: '22%',
        marginLeft: 11,
        marginRight: 11
      }

      var buttonObject = {
        button1Style : 'default',
        button2Style : 'default',
        button3Style : 'default',
        button4Style : 'default'
      }

      if(this.state.pollvoted != null)
      {
         buttonObject["button"+this.state.pollvoted.voted+"Style"] = 'success';
      }

    return (

      <div style={panelStyle} className="panel panel-default" onMouseOver={this.cardHover} onMouseOut={this.cardNotHovered}>
	      <h4 onClick={this.respondToPoll} style={centerStyle}>{this.props.poll.pollquestion}</h4>
        <Button style={buttonStyle} onClick={this.respondToPoll.bind(this,1)} bsStyle={buttonObject.button1Style}>{this.props.poll.possibleanswer1}</Button>
        <Button style={buttonStyle} onClick={this.respondToPoll.bind(this,2)} bsStyle={buttonObject.button2Style}>{this.props.poll.possibleanswer2}</Button>
        <Button style={buttonStyle} onClick={this.respondToPoll.bind(this,3)} bsStyle={buttonObject.button3Style}>{this.props.poll.possibleanswer3}</Button>
        <Button style={buttonStyle} onClick={this.respondToPoll.bind(this,4)} bsStyle={buttonObject.button4Style}>{this.props.poll.possibleanswer4}</Button>      
      </div>
    )
  }
});

module.exports = JoinedPoll;