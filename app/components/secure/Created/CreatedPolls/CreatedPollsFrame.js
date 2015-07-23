var React = require('react');
var Authenticated = require('../../../../utils/authenticated');
var firebaseUtils = require('../../../../utils/firebaseUtils');

//Imported Components
var Fab = require('../..//Fab');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var PieGraph = require("react-chartjs").Pie;

var CreatedPollList = require('./CreatedPollList');

var CreatedPollsFrame = React.createClass({

  mixins: [Authenticated,ReactFireMixin],

    getInitialState: function(){
      return {
        showPollModal: false,
        pollQuestion: '',
        possibleAnswer1: '',
        possibleAnswer2: '',
        possibleAnswer3: '',
        possibleAnswer4: ''
      }
    },

    componentWillMount: function() {
    var firebaseRef = new Firebase("https://engaged.firebaseio.com/rooms/"+this.props.params.roomid+"/polls");
    this.bindAsArray(firebaseRef, "polls");
  },

    close: function(){
      this.setState({ showPollModal: false });
    },

    open: function(){
      this.setState({ showPollModal: true });
    },

    handleChange: function() {
      this.setState({
        pollQuestion: this.refs.pollQuestion.getValue(),
        possibleAnswer1: this.refs.possibleAnswer1.getValue(),
        possibleAnswer2: this.refs.possibleAnswer2.getValue(),
        possibleAnswer3: this.refs.possibleAnswer3.getValue(),
        possibleAnswer4: this.refs.possibleAnswer4.getValue(),
      });
    },


    submitPoll: function(){
      var pollRef = new Firebase('https://engaged.firebaseio.com/rooms/'+this.props.params.roomid+'/polls/');

      pollRef.push({ 
        'pollquestion': this.state.pollQuestion, 
        'possibleanswer1': this.state.possibleAnswer1, 
        'votes1': 0,
        'possibleanswer2': this.state.possibleAnswer2, 
        'votes2': 0,
        'possibleanswer3': this.state.possibleAnswer3, 
        'votes3': 0,
        'possibleanswer4': this.state.possibleAnswer4,
        'votes4': 0
      });

      this.setState({ 
        showPollModal: false,
        pollQuestion: '',
        possibleAnswer1: '',
        possibleAnswer2: '',
        possibleAnswer3: '',
        possibleAnswer4: ''
      });
    },

  render: function(){

    var data = [
        {
            value: 0,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Red"
        },
        {
            value: 0,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Green"
        },
        {
            value: 1,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Yellow"
        }
    ]

    if(!(this.state.polls === undefined))
    {
      data = [
        {
            value: 1,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Red"
        },
        {
            value: 1,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Green"
        },
        {
            value: 2,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Yellow"
        }
    ]
    }

    

    return (
      <div>

        <CreatedPollList polls={this.state.polls}/>
        
        <Fab click={this.open} tooltip='Create a poll'/>

        {/*<PieGraph data={data}/> */}

        <Modal show={this.state.showPollModal} onHide={this.close}>

          <Modal.Header>
            <Modal.Title>Create a poll!</Modal.Title>
            <Input type='text' placeholder='Type your question' ref='pollQuestion' onChange={this.handleChange} />
          </Modal.Header>

          <Modal.Body>
            <h5>Possible Answers:</h5>
            <Input type='text' placeholder='Type the first possible answer' ref='possibleAnswer1' onChange={this.handleChange} />
            <Input type='text' placeholder='Type the second possible answer' ref='possibleAnswer2' onChange={this.handleChange} />
            <Input type='text' placeholder='Type the third possible answer' ref='possibleAnswer3' onChange={this.handleChange} />
            <Input type='text' placeholder='Type the fourth possible answer' ref='possibleAnswer4' onChange={this.handleChange} />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle='primary' onClick={this.submitPoll}>Create</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
});

module.exports = CreatedPollsFrame;