var React = require('react');
var Authenticated = require('../../../utils/authenticated');
var State = require('react-router').State;

//Imported Components
var ModCardList = require('./ModCardList');

var ModerationFrame = React.createClass({

  mixins: [Authenticated,ReactFireMixin,State],

  getInitialState: function() {
    this.questions = [];
    return {questions: []};
  },

  componentWillMount: function() {
    var firebaseRef = new Firebase("https://engaged.firebaseio.com/rooms/"+this.props.params.roomid+"/questions");
    


    this.bindAsArray(firebaseRef, "questions");

    var firebaseRef = new Firebase("https://engaged.firebaseio.com/rooms/"+this.props.params.roomid);
    this.bindAsObject(firebaseRef, "room");

  },

  render: function(){
    

    return (
      <div>
        <ModCardList questions={this.state.questions} room={this.state.room}/>
      </div>
    )
  }
});

module.exports = ModerationFrame;