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

  handleChange: function() {
      this.setState({
          comment: this.refs.input.getValue()
      });
  },

  submitComment: function() {
      var roomid = this.getParams().roomid;

      //Not allowing the same user to comment on the same question in a minute

      var commentObject = JSON.parse(localStorage.getItem(this.props.question.$id + "_comment"));
      var canComment = false;

      if (commentObject === null) {
          var date = new Date();
          var milli = date.getTime();

          var commentTimeObject = {
              'question': this.props.question.$id,
              'time': milli
          };
          localStorage.setItem(this.props.question.$id + "_comment", JSON.stringify(commentTimeObject));
          canComment = true;
      }
      else {
          var date = new Date();
          var currentMilli = date.getTime();

          if ((currentMilli - commentObject.time) < 60000 && (this.state.comment != '')) {
              alert("You can only comment once a minute");
          }
          else {
              canComment = true;
          }
      }

      if (this.state.comment === '') {
          alert("You did not comment");
      }
      else if (canComment) {
          var commentRef = new Firebase('https://engaged.firebaseio.com/rooms/' + roomid + '/questions/' + this.props.question.$id + '/comments');
          commentRef.push({
              'comment': this.state.comment
          });
      }

      this.setState({
          comment: ''
      });
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
  	  marginBottom: 10,
      transition: '0.3s'
  	}

    if(this.state.hover)
    {
      var panelStyle = {
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
              <div style={IconcStyle}>
                <i className="fa fa-times card-icon" onClick={this.delete}></i>
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
