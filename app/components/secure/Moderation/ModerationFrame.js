var React = require('react');
var Authenticated = require('../../../utils/authenticated');
var State = require('react-router').State;
var firebaseUtils = require('../../../utils/firebaseUtils');
var Router = require('react-router');

//Imported Components
var ModCardList = require('./ModCardList');

var ModerationFrame = React.createClass({

  mixins: [Authenticated,ReactFireMixin,State, Router.Navigation],

  getInitialState: function() {
    this.questions = [];
    return {questions: []};
  },

  componentWillMount: function() {
    var firebaseRef = new Firebase("https://engaged.firebaseio.com/rooms/"+this.props.params.roomid+"/questions");
    this.bindAsArray(firebaseRef, "questions");

    var firebaseRef = new Firebase("https://engaged.firebaseio.com/rooms/"+this.props.params.roomid);
    this.bindAsObject(firebaseRef, "room");

    //Auth
    var userRef = new Firebase("https://engaged.firebaseio.com");
    var authData = userRef.getAuth();
    var userEmail = firebaseUtils.formatEmailForFirebase(authData.email);

    var authRef = new Firebase('https://engaged.firebaseio.com/user/'+userEmail+'/moderated/');

    //Security
    authRef.orderByChild('roomid').equalTo(this.props.params.roomid).on('value', function fn(snap) {
          if(snap.val() === null)
          {
            this.transitionTo('logout');
            firebaseUtils.logout();
            authRef.off();
          }
          else
          {
            this.setState({
              showModal: true
            })
          }
    }.bind(this)); //This this is used so that the state can be set 

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