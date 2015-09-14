var React = require("react");



var Home = React.createClass({


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
								<h1>Welcome To <b>Engage</b></h1>
								<h3>Give your audience a voice.</h3>
								
				    		</div>
				    		
				    		<div className="col-lg-2">
				    			<h5>Incredibly Intuitive</h5>
				    			<p>Engage is simple to use - for both the speaker and audience. You can have it running in under a minute!</p>
				    			<img className="hidden-xs hidden-sm hidden-md" src="assets/img/arrow1.png"/>
				    		</div>
				    		<div className="col-lg-8">
				    			<img className="img-responsive" src="assets/img/app-bg.png" alt=""/>
				    		</div>


				    		<div className="col-lg-2">
				    			
				    			<img className="hidden-xs hidden-sm hidden-md" src="assets/img/arrow2.png"/>
				    			<h5>Accessible</h5>
				    			<p>Engage can be accessed through any internet enabled device. The audience can simply use devices they carry with them every day.</p>
				    		</div>

				    		<div className="col-xs-12">
				    			<a href="#join" style={buttonStyle} className="btn btn-success btn-lg">Join a Room</a>
				    			<a href="#create" style={buttonStyle} className="btn btn-success btn-lg">Create a Room</a>
				    			<a href="#mod" style={buttonStyle} className="btn btn-success btn-lg">Moderate a Room</a>

				    			<div className="col-xs-12" style={textStyle}>
				    				Looking to try Engage out? Click 'Join a Room' and enter the room code 147f
				    			</div>
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
								<p>The speaker creates an online room which the audience can join using a code. Your audience can then ask questions, vote on questions and respond to polls created by the speaker - All in real time</p>
							</div>
							<div className="col-lg-6">
								<img src="assets/img/intro03.png" alt=""/>
								<p>These questions and polls are then projected infront of the audience, allowing the speaker to engage with their audience far more effectively.</p>
							</div>
						</div>
						
						
				    </div>
				</div>

				<div id="c">
					<div className="container">
						<p>Created by Andrew Bestbier & David Baron</p>
					
					</div>
				</div>
    	</div>
        )
    }
});

module.exports = Home;