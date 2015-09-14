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
                this.moderateRoom(roomCode, email)
            }
        }.bind(this));
    },

    moderateRoom: function(roomCode, email) {
        var userEmail = firebaseUtils.formatEmailForFirebase(email);

        var joinRef = new Firebase("https://engaged.firebaseio.com/rooms");
        joinRef.orderByChild('moderationcode').equalTo(roomCode).on('value', function fn(snap) {
            if (snap.val() === null) {
                alert("That room does not exist");
                joinRef.off();
            }
            else {
                var roomId = Object.keys(snap.val())[0];
                var obj = snap.val();
                var roomName = obj[roomId].roomname;

                var modUserRef = new Firebase("https://engaged.firebaseio.com/user/" + userEmail + "/moderated");
                modUserRef.push({
                    'name': roomName,
                    'roomid': roomId
                });
                joinRef.off();
                this.transitionTo("moderatedquestions", {
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
              <button style={buttonStyle} onClick={this.handleSubmit} type="submit" className="btn btn-primary">Moderate Room</button>
          </div>
        </div>
      </div>
        )
    }
});

module.exports = JoinAnon;