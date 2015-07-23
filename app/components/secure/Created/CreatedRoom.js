var React = require('react');
var Authenticated = require('../../../utils/authenticated');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var RouterContext = Router.RouterContext;

//Components
var CreatedSidebar = require('./CreatedSidebar');
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var Room = React.createClass({
  mixins: [Authenticated],

  getInitialState: function() {
    return {showModal: true};
  },

  close: function(){
    this.setState({ showModal: false });
  },

  open: function(){
    this.setState({ showModal: true });
  },

  render: function(){


    return (
      <div>
        <CreatedSidebar/>
        <RouteHandler />

        <Modal show={this.state.showModal} onHide={this.close}>

          <Modal.Header>
            <Modal.Title>Ask a question!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Input type='text' placeholder='Type your question' ref='input' onChange={this.handleChange} />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle='primary' onClick={this.submitQuestion}>Submit</Button>
          </Modal.Footer>
        </Modal>


      </div>
    )
  }
});

module.exports = Room;