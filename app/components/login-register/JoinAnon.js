var React = require('react');
var firebaseUtils = require('../../utils/firebaseUtils');
var Router = require('react-router');

var JoinAnon = React.createClass({
    mixins: [Router.Navigation],

    handleSubmit: function(e) {
        var roomCode = this.refs.roomcode.getDOMNode().value;
        var email = Math.random().toString(36).substring(7) + "@" + Math.random().toString(36).substring(7) + ".com";
        var pw = Math.random().toString(36).substring(7);
        firebaseUtils.createUser({
            email: email,
            password: pw
        }, function(result) {
            if (result) {
                this.joinRoom(roomCode, email)
            }
        }.bind(this));
    },

    joinRoom: function(joinValue, userEmail) {

        var email = firebaseUtils.formatEmailForFirebase(userEmail);

        var joinRef = new Firebase("https://engaged.firebaseio.com/rooms");
        joinRef.orderByChild('roomcode').equalTo(joinValue).on('value', function fn(snap) {
            if (snap.val() === null) {
                alert("That room does not exist");
                joinRef.off();
            }
            else {
                var roomId = Object.keys(snap.val())[0];
                var obj = snap.val();
                var roomName = obj[roomId].roomname;

                var joinedUserRef = new Firebase("https://engaged.firebaseio.com/user/" + email + "/joined");
                joinedUserRef.push({
                    'name': roomName,
                    'roomid': roomId
                });

                joinRef.off();
                this.transitionTo("joinedquestions", {
                    roomid: roomId
                });
            }
        }.bind(this));
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
                <label>Enter the Room Code</label>
                <input ref="roomcode" type="text" className="form-control" placeholder="Enter the Room Code" />
              </div>

              <button style={buttonStyle} onClick={this.handleSubmit} type="submit" className="btn btn-primary">Join Room</button>
              <h6>Try room code 147f if you are looking to try Engage out</h6>
          </div>
        </div>
      </div>
        )
    }
});

module.exports = JoinAnon;