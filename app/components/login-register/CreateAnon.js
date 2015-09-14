var React = require('react');
var firebaseUtils = require('../../utils/firebaseUtils');
var Router = require('react-router');

var JoinAnon = React.createClass({
    mixins: [Router.Navigation],

    handleSubmit: function(e) {
        var roomName = this.refs.roomname.getDOMNode().value;
        var email = Math.random().toString(36).substring(7) + "@" + Math.random().toString(36).substring(7) + ".com";
        var pw = Math.random().toString(36).substring(7);
        firebaseUtils.createUser({
            email: email,
            password: pw
        }, function(result) {
            if (result) {
                this.createRoom(roomName, email)
            }
        }.bind(this));
    },

    createRoom: function(roomName, userEmail) {
        var roomCode = Math.floor(Math.random() * 167772).toString(16);
        var moderationCode = Math.floor(Math.random() * 167772).toString(16);

        var email = firebaseUtils.formatEmailForFirebase(userEmail);

        if (roomName === '') {
            alert("You did not give the room a name");
        }
        else {
            //Pushing the room and then getting the id of that room so we can map it to the user
            var createRef = new Firebase("https://engaged.firebaseio.com/rooms");
            var pushRef = createRef.push({
                'roomcode': roomCode,
                'roomname': roomName,
                'moderationon': false,
                'moderationcode': moderationCode
            });
            var createdRoomID = pushRef.key();

            //Mapping it to the user
            var createdUserRef = new Firebase("https://engaged.firebaseio.com/user/" + email + "/created");

            createdUserRef.push({
                'name': roomName,
                'roomid': createdRoomID
            });

            this.transitionTo("createdquestions", {
                roomid: createdRoomID
            });
        }
    },


    render: function() {

        var panelStyle = {
            padding: 10,
            marginTop: 10
        }

        var buttonStyle = {
            width: '100%'
        }


        return (
            <div className="panel panel-default" style={panelStyle}>
        <div className="panel-body">
          <div className="col-sm-6 col-sm-offset-3">
              <div className="form-group">
                <label>Enter the Room Name</label>
                <input ref="roomname" type="text" className="form-control" placeholder="Enter the Room Name" />
              </div>
              
              <button style={buttonStyle} onClick={this.handleSubmit} type="submit" className="btn btn-primary">Create Room</button>
          </div>
        </div>
      </div>
        )
    }
});

module.exports = JoinAnon;