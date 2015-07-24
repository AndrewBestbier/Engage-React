var React = require('react');


//Imported Components
var Input = require('react-bootstrap').Input;
var Comments = require('../Comments');
var Router = require('react-router');
var Button = require('react-bootstrap').Button;


var Card = React.createClass({

  mixins: [ Router.State ],

  getInitialState: function() {
    return {hover: false, comment: ''};
  },

  accept: function(){

    var roomid = this.getParams().roomid;

  	var modRef = new Firebase('https://engaged.firebaseio.com/rooms/'+roomid+'/questions/'+this.props.question.$id+'/vote');
  	modRef.transaction(function(currentValue) {
  	  return currentValue+1;
  	});
  },

  delete: function(){
  	  var roomid = this.getParams().roomid;
      
      var modRef = new Firebase('https://engaged.firebaseio.com/rooms/'+roomid+'/questions/'+this.props.question.$id);
      modRef.remove();
  },

  cardHover : function(){
    this.setState({hover: true});
  },


  cardNotHovered: function(){
    this.setState({hover: false});
  },




  render: function(){

  	var chatIconStyle = {
  	  float: 'left',
  	  fontSize: 20,
  	}

  	var IconcStyle = {
  	  float: 'right',
  	  fontSize: 20
  	}

  	var questionTextStyle = {
  	  textAlign: 'center',
  	  fontSize: 20
  	}


  	var panelStyle = {
  	  marginLeft: 42,
  	  marginBottom: 10,
      transition: '0.3s'
  	}

    if(this.state.hover)
    {
      var panelStyle = {
        marginLeft: 42,
        marginBottom: 10,
        boxShadow: '0 5px 10px rgba(0,0,0,0.17)',
        transition: '0.3s'
      }
    }

    



    
    return (
      <div className="panel panel-default" style={panelStyle} onMouseOver={this.cardHover} onMouseOut={this.cardNotHovered}>
          <div className="panel-heading" role="tab">
            <h4 className="panel-title">
              <div style={IconcStyle}>
                <i className="fa fa-times card-icon" onClick={this.delete}></i>
                <i className="fa fa-check card-icon" onClick={this.accept}></i>
              </div>
              <div style={questionTextStyle}>{this.props.question.question}</div>
            </h4>
          </div>
      </div>
    )
  }
});

module.exports = Card;


