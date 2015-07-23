var React = require('react');

//Components
var State = require('react-router').State;
var PieGraph = require("react-chartjs").Pie;

var Poll = React.createClass({

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

  render: function(){

		var panelStyle = {
		  marginLeft: 42,
		  marginBottom: 10,
	      transition: '0.3s',
	      padding: 10
		}

  	  if(this.state.hover)
  	  {
  	    var panelStyle = {
  	      marginLeft: 42,
  	      marginBottom: 10,
  	      boxShadow: '0 5px 10px rgba(0,0,0,0.17)',
  	      transition: '0.3s',
  	      padding: 10
  	    }
  	  }

  	  centerStyle = {
  	  	textAlign: 'center'
  	  }

  	var data = [
  	    {
  	        value: this.props.poll.votes1,
  	        color:"#F7464A",
  	        highlight: "#FF5A5E",
  	        label: this.props.poll.possibleanswer1
  	    },
  	    {
  	        value: this.props.poll.votes2,
  	        color: "#46BFBD",
  	        highlight: "#5AD3D1",
  	        label: this.props.poll.possibleanswer2
  	    },
  	    {
  	        value: this.props.poll.votes3,
  	        color: "#FDB45C",
  	        highlight: "#FFC870",
  	        label: this.props.poll.possibleanswer3
  	    },
  	    {
  	        value: this.props.poll.votes4,
  	        color: "#2980b9",
  	        highlight: "#3498db",
  	        label: this.props.poll.possibleanswer4
  	    }
  	]

  	if((this.props.poll.votes1+this.props.poll.votes2+this.props.poll.votes3+this.props.poll.votes4) == 0)
  	{
  		var graph = <h5>No one has voted yet</h5>
  	}
  	else
  	{
  		var graph = <PieGraph data={data}/>
  	}

  	

    return (

      <div style={panelStyle} className="panel panel-default" onMouseOver={this.cardHover} onMouseOut={this.cardNotHovered}>
	      <h4 style={centerStyle}>{this.props.poll.pollquestion}</h4>
	      <div style={centerStyle}>
	      	{graph}
	      </div>
      </div>
    )
  }
});

module.exports = Poll;