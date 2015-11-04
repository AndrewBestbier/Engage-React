var React = require("react");
var Router = require('react-router');
var Link = Router.Link;
var firebaseUtils = require('../utils/firebaseUtils');

var Home = React.createClass({

  mixins: [Router.Navigation],

  handleSubmit: function(roomCode) {

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

        var divStyle = {
            marginTop: -6
        }

        var buttonStyle = {
            marginTop: 10,
            marginRight: 10
        }

        var textStyle = {
            marginTop: 5,
            color: '#FFFFFF'
        }

        return (
            <div style={divStyle}>

				<section id="home" name="home"></section>
				<div id="headerwrap">
				    <div className="container">
				    	<div className="row centered">
				    		<div className="col-lg-12">
								<h1>Welcome to <b>Engage</b></h1>
								<h3>Give your people a voice.</h3>

				    		</div>

				    		<div className="col-lg-2">
				    			<h5>Incredibly Intuitive</h5>
				    			<p>Engage is simple to use - for both management and employees. You can have it running in under a minute!</p>
				    			<img className="hidden-xs hidden-sm hidden-md" src="assets/img/arrow1.png"/>
				    		</div>
				    		<div className="col-lg-8">
				    			<img className="img-responsive" src="assets/img/app-bg.png" alt=""/>
				    		</div>


				    		<div className="col-lg-2">

				    			<img className="hidden-xs hidden-sm hidden-md" src="assets/img/arrow2.png"/>
				    			<h5>Accessible</h5>
				    			<p>Engage can be accessed through any internet enabled device. Your employees can simply use devices they carry with them every day.</p>
				    		</div>

				    		<div className="col-xs-12">
                  <a style={buttonStyle} className="btn btn-success btn-lg" onClick={this.handleSubmit.bind(this, '71a9')}>Concerns</a>
                  <a style={buttonStyle} className="btn btn-success btn-lg" onClick={this.handleSubmit.bind(this, '1209')}>Suggestions</a>
                  <a style={buttonStyle} className="btn btn-success btn-lg" onClick={this.handleSubmit.bind(this, '10a0a')}>HR</a>
                  <a style={buttonStyle} className="btn btn-success btn-lg" onClick={this.handleSubmit.bind(this, '5dc6')}>Administration</a>
                  <a style={buttonStyle} className="btn btn-success btn-lg" onClick={this.handleSubmit.bind(this, '9e32')}>General</a>






				    		</div>

				    	</div>
				    </div>
				</div>


				<section id="desc" name="desc"></section>

				<div id="intro">
					<div className="container">
						<div className="row centered">
							<h1>How it works:</h1>


							<div className="col-lg-6">
								<img src="assets/img/intro01.png" alt=""/>
								<p>The speaker creates an online room which the audience can join using a code. Your audience can then ask questions, vote on questions and respond to polls created by the speaker - all in real time.</p>
							</div>
							<div className="col-lg-6">
								<img src="assets/img/intro03.png" alt=""/>
								<p>These questions and polls are then projected in front of the audience, allowing the speaker to engage with their audience far more effectively.</p>
							</div>
						</div>


				    </div>
				</div>

				<div id="c">
					<div className="container">
						<p>© 2015</p>

					</div>
				</div>
    	</div>
        )
    }
});

module.exports = Home;
