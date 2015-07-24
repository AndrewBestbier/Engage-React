var React = require('react');
var Authenticated = require('../../../utils/authenticated');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var RouterContext = Router.RouterContext;

var State = require('react-router').State;

//Components
var CreatedSidebar = require('./CreatedSidebar');
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var Room = React.createClass({
  mixins: [Authenticated, State, ReactFireMixin],

  getInitialState: function() {
    return {showModal: true};
  },

  componentDidMount: function() {

    var firebaseRef = new Firebase("https://engaged.firebaseio.com/rooms/"+this.props.params.roomid);
      this.bindAsObject(firebaseRef, "room");
  },

  close: function(){
    this.setState({ showModal: false });
  },

  open: function(){
    this.setState({ showModal: true });
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
      <div>
        <CreatedSidebar/>
        <RouteHandler />

        <Modal show={this.state.showModal} onHide={this.close}>

          <Modal.Header>
            <Modal.Title style={centerStyle}>Welcome to your room!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={centerStyle}>
              <h6>Room Code: <b>{roomCode}</b></h6>
              <h6>Moderation Code: <b>{roomCode}</b></h6>
              <Input type='checkbox' ref='checkbox' checked={moderation} label='Use Moderation' onChange={this.changeModeration}/>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle='primary' onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>


      </div>
    )
  }
});

module.exports = Room;