var React = require('react');
var Authenticated = require('../../../utils/authenticated');
var firebaseUtils = require('../../../utils/firebaseUtils');
var Router = require('react-router');


//Imported Components
var Panel = require('react-bootstrap').Panel;
var DashboardFab = require('./DashboardFab');
var RoomsList = require('./RoomsList');
var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var NewDash = React.createClass({

	mixins: [Authenticated,ReactFireMixin],

	getInitialState: function(){
    return {
      loggedIn: firebaseUtils.isLoggedIn(),
      showJoinModal: false,
      showCreateModal: false,
      showModerateModal: false,
      joinValue: '',
      createValue: '',
      moderateValue: '',
      useremail: ''
    }
  },


  closeJoinModal: function(){
    this.setState({ showJoinModal: false });
  },

  openJoinModal: function(){
    this.setState({ showJoinModal: true });
  },

  closeCreateModal: function(){
    this.setState({ showCreateModal: false });
  },

  openCreateModal: function(){
    this.setState({ showCreateModal: true });
  },

  closeModerateModal: function(){
    this.setState({ showModerateModal: false });
  },

  openModerateModal: function(){
    this.setState({ showModerateModal: true });
  },



  handleJoinChange: function() {
    this.setState({
      joinValue: this.refs.joinInput.getValue()
    });
  },

  handleCreateChange: function() {
    this.setState({
      createValue: this.refs.createInput.getValue()
    });
  },

  handleModerateChange: function() {
    this.setState({
      moderateValue: this.refs.moderateInput.getValue()
    });
  },



  componentDidMount: function() {


    var userRef = new Firebase("https://engaged.firebaseio.com");
    var authData = userRef.getAuth();


    var userEmail = firebaseUtils.formatEmailForFirebase(authData.email);


    this.setState({
      useremail: userEmail
    });


    //Joined Ref
    var joinedRef = new Firebase("https://engaged.firebaseio.com/user/"+userEmail+"/joined");
    this.bindAsArray(joinedRef, "joined");

    //Created Ref
    var createdRef = new Firebase("https://engaged.firebaseio.com/user/"+userEmail+"/created");
    this.bindAsArray(createdRef, "created");

    //Moderated Ref
    var moderatedRef = new Firebase("https://engaged.firebaseio.com/user/"+userEmail+"/moderated");
    this.bindAsArray(moderatedRef, "moderated"); 
    
  },

  joinRoom: function()
  {

    var userEmail = this.state.useremail;

  	var joinRef = new Firebase("https://engaged.firebaseio.com/rooms");
  	joinRef.orderByChild('roomcode').equalTo(this.state.joinValue).on('value', function fn(snap) {
          if(snap.val() === null)
          {
          	alert("That room does not exist");
          	joinRef.off();
          }
          else
          {
          	var roomId = Object.keys(snap.val())[0];
      			var obj = snap.val();
      			var roomName = obj[roomId].roomname;

      			var joinedUserRef = new Firebase("https://engaged.firebaseio.com/user/"+userEmail+"/joined");
        		joinedUserRef.push({ 'name': roomName, 'roomid': roomId});
        		joinRef.off();
          }
    });



    this.setState({joinValue: ''});
    this.setState({ showJoinModal: false });
  },

  createRoom: function()
  {
  	var roomCode = Math.floor(Math.random()*167772).toString(16);
    var moderationCode = Math.floor(Math.random()*167772).toString(16);

    if(this.state.createValue === '')
    {
      alert("You did not give the room a name");
    }
    else
    {
      //Pushing the room and then getting the id of that room so we can map it to the user
      var createRef = new Firebase("https://engaged.firebaseio.com/rooms");
      var pushRef = createRef.push({ 'roomcode': roomCode, 'roomname': this.state.createValue, 'moderationon': false, 'moderationcode': moderationCode});
      var createdRoomID = pushRef.key();

      //Mapping it to the user
      var createdUserRef = new Firebase("https://engaged.firebaseio.com/user/"+this.state.useremail+"/created");

      createdUserRef.push({ 'name': this.state.createValue, 'roomid': createdRoomID});

      this.setState({createValue: ''});
      this.setState({ showCreateModal: false });
    }
  },

  moderateRoom: function()
  {
  	var userEmail = this.state.useremail;

    var joinRef = new Firebase("https://engaged.firebaseio.com/rooms");
    joinRef.orderByChild('moderationcode').equalTo(this.state.moderateValue).on('value', function fn(snap) {
          if(snap.val() === null)
          {
            alert("That room does not exist");
            joinRef.off();
          }
          else
          {
            var roomId = Object.keys(snap.val())[0];
        var obj = snap.val();
        var roomName = obj[roomId].roomname;

        var modUserRef = new Firebase("https://engaged.firebaseio.com/user/"+userEmail+"/moderated");
        modUserRef.push({ 'name': roomName, 'roomid': roomId});
        joinRef.off();
          }
    });



    this.setState({moderateValue: ''});
    this.setState({ showModerateModal: false });
  },

  render: function(){

  	ulStyle = {
      padding: 0,
      margin: 0
    }

    divStyle = {
      textAlign: 'center',
      marginTop: 10
    }

    centerStyle = {
      textAlign: 'center',
      marginTop: 10
    }

    specialPanelStyle={
      marginLeft: 0,
      marginRight: 0
    }

    return (
      <div>
      	<div className="col-lg-4"  style={divStyle}>
      	  <DashboardFab fabText='Join a new room' click={this.openJoinModal}/>
	      <Panel header='Joined Rooms' bsStyle='success' style={specialPanelStyle}>
	          <div>
	            <ul style={ulStyle}> 
	              <RoomsList rooms={this.state.joined} listType='joined'/>
	            </ul>
	          </div>
	      </Panel>
	    </div>
	    <div className="col-lg-4"  style={divStyle}>
	      <DashboardFab fabText='Create a new room' click={this.openCreateModal}/>
	      <Panel header='Created Rooms' bsStyle='success' style={specialPanelStyle}>
	          <div>
	            <ul style={ulStyle}> 
	              <RoomsList rooms={this.state.created} listType='created' />
	            </ul>
	          </div>
	      </Panel>
	    </div>
	    <div className="col-lg-4"  style={divStyle}>
	      <DashboardFab fabText='Moderate a new room' click={this.openModerateModal}/>
	      <Panel header='Moderated Rooms' bsStyle='success' style={specialPanelStyle}>
	          <div>
	            <ul style={ulStyle}> 
	              <RoomsList rooms={this.state.moderated} listType='moderated'/>
	            </ul>
	          </div>
	      </Panel>
	    </div>

		{/* Join Room Modal */}
	    <Modal show={this.state.showJoinModal} onHide={this.closeJoinModal}>

          <Modal.Header>
            <Modal.Title style={centerStyle}>Join a room!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Input type='text' placeholder='Type the room code' ref='joinInput' onChange={this.handleJoinChange} />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeJoinModal}>Close</Button>
            <Button bsStyle='primary' onClick={this.joinRoom}>Join</Button>
          </Modal.Footer>
        </Modal>

        {/* Create Room Modal */}
        <Modal show={this.state.showCreateModal} onHide={this.closeCreateModal}>

          <Modal.Header>
            <Modal.Title style={centerStyle}>Create a room!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Input type='text' placeholder='Type your room title' ref='createInput' onChange={this.handleCreateChange} />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeCreateModal}>Close</Button>
            <Button bsStyle='primary' onClick={this.createRoom}>Create</Button>
          </Modal.Footer>
        </Modal>

    	{/* Moderate Room Modal */}
        <Modal show={this.state.showModerateModal} onHide={this.closeModerateModal}>

          <Modal.Header>
            <Modal.Title style={centerStyle}>Moderate a room!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Input type='text' placeholder='Type the room code' ref='moderateInput' onChange={this.handleModerateChange} />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeModerateModal}>Close</Button>
            <Button bsStyle='primary' onClick={this.moderateRoom}>Moderate</Button>
          </Modal.Footer>
        </Modal>


      </div>
    )
  }
});

module.exports = NewDash;