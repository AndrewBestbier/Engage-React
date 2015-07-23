var React = require('react');
var Authenticated = require('../../../../utils/authenticated');
var firebaseUtils = require('../../../../utils/firebaseUtils');

//Imported Components
var JoinedPollList = require('./JoinedPollList');

var JoinedPollsFrame = React.createClass({

  mixins: [Authenticated,ReactFireMixin],

  getInitialState: function(){
      return {
        polls: undefined, //So that this.state is not null on the initial render
      }
    },

    componentWillMount: function() {
        var firebaseRef = new Firebase("https://engaged.firebaseio.com/rooms/"+this.props.params.roomid+"/polls");
        this.bindAsArray(firebaseRef, "polls");
  },

  render: function(){

    return (
      <div>
        <JoinedPollList polls={this.state.polls}/>
      </div>
    )
  }
});

module.exports = JoinedPollsFrame;