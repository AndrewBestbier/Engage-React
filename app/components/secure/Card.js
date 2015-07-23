var React = require('react');


//Imported Components
var Input = require('react-bootstrap').Input;
var Comments = require('./Comments');
var Router = require('react-router');
var Button = require('react-bootstrap').Button;


var Card = React.createClass({

  mixins: [ Router.State ],

  getInitialState: function() {
    return {hover: false, comment: ''};
  },

  upVote: function(){

    var roomid = this.getParams().roomid;

  	var voteRef = new Firebase('https://engaged.firebaseio.com/rooms/'+roomid+'/questions/'+this.props.question.$id+'/vote');
  	voteRef.transaction(function(currentValue) {
  	  return currentValue+1;
  	});
  },

  downVote: function(){
  	  var roomid = this.getParams().roomid;
      
      var voteRef = new Firebase('https://engaged.firebaseio.com/rooms/'+roomid+'/questions/'+this.props.question.$id+'/vote');
      voteRef.transaction(function(currentValue) {
        return currentValue-1;
      });
  },

  cardHover : function(){
    this.setState({hover: true});
  },


  cardNotHovered: function(){
    this.setState({hover: false});
  },

  handleChange: function() {
      this.setState({
        comment: this.refs.input.getValue()
      });
    },

    submitComment : function(){
      var roomid = this.getParams().roomid;
      var commentRef = new Firebase('https://engaged.firebaseio.com/rooms/'+roomid+'/questions/'+this.props.question.$id+'/comments');
      commentRef.push({ 'comment': this.state.comment});
      this.setState({comment: ''});
    },



  render: function(){

  	var chatIconStyle = {
  	  float: 'left',
  	  fontSize: 20,
  	}

  	var voteIconcStyle = {
  	  float: 'right',
  	  fontSize: 20
  	}

  	var questionTextStyle = {
  	  textAlign: 'center',
  	  fontSize: 20
  	}

  	var voteNumberStyle = {
  	  marginLeft: 10,
  	  marginRight: 10
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
            <i className="fa fa-weixin card-icon" role="button" data-toggle="collapse" data-parent="#accordion" href={"#"+this.props.question.$id} aria-expanded="false" style={chatIconStyle}></i>
              <div style={voteIconcStyle}>
                <i className="fa fa-arrow-up card-icon" onClick={this.upVote}></i>
                <span style={voteNumberStyle}>{this.props.question.vote}</span>
                <i className="fa fa-arrow-down card-icon" onClick={this.downVote}></i>
              </div>
              <div style={questionTextStyle}>{this.props.question.question}</div>
            </h4>
          </div>
          
          <div id={this.props.question.$id} className="panel-collapse collapse" role="tabpanel">
            <div className="panel-body">
               <Comments items={this.props.question.comments}/>
            </div>
            <div className="panel-footer">
              <div className="input-group">
                <Input type='text' value={this.state.comment} placeholder='Type your comment' ref='input' onChange={this.handleChange} />
                <span className="input-group-btn">
                  <Button bsStyle='primary' onClick={this.submitComment}>Submit</Button>
                </span>
              </div>
            </div>
          </div>
      </div>
    )
  }
});

module.exports = Card;


