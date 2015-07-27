var React = require('react');
var CardList = require('./CardList');
var Authenticated = require('../../utils/authenticated');
var State = require('react-router').State;

//Imported Components
var CardList = require('./CardList');
var Fab = require('./Fab');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;


var QuestionsFrame = React.createClass({

  mixins: [Authenticated,ReactFireMixin,State],

  getInitialState: function() {
    this.questions = [];
    return {questions: [],showModal: false, value: '', room: '' };
  },

  componentWillMount: function() {
    var firebaseRef = new Firebase("https://engaged.firebaseio.com/rooms/"+this.props.params.roomid+"/questions");
    this.bindAsArray(firebaseRef, "questions");

    var firebaseRef = new Firebase("https://engaged.firebaseio.com/rooms/"+this.props.params.roomid);
    this.bindAsObject(firebaseRef, "room");
  },

  close: function(){
    this.setState({ showModal: false });
  },

  open: function(){
    this.setState({ showModal: true });
  },

  handleChange: function() {
    this.setState({
      value: this.refs.input.getValue()
    });
  },


  submitQuestion: function(){

    if(this.state.value === '')
    {
      alert("You did not enter a question");
    }
    else
    {
      var questionRef = new Firebase('https://engaged.firebaseio.com/rooms/'+this.props.params.roomid+'/questions/');
      questionRef.push({ 'question': this.state.value, 'vote': 0 });
      this.setState({ showModal: false });
    }
    
  },

  render: function(){

    centerStyle = {
      align: 'center'
    }
    

    return (
      <div>
        <CardList questions={this.state.questions} room={this.state.room} />
        
        <Fab click={this.open} tooltip='Ask a question'/>

        <Modal show={this.state.showModal} onHide={this.close}>

          <Modal.Header>
            <Modal.Title style={centerStyle}>Ask a question!</Modal.Title>
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

module.exports = QuestionsFrame;