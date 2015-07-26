var React = require("react");



var Home = React.createClass({

	
  render: function(){

  	var divStyle = {
  		marginLeft: -48,
  		marginRight: -47,
  		marginTop: -6
  	}

    return (
    	<div style={divStyle}>
    		
				<section id="home" name="home"></section>
				<div id="headerwrap">
				    <div className="container">
				    	<div className="row centered">
				    		<div className="col-lg-12">
								<h1>Welcome To <b>Engage</b></h1>
								<h3>Give student's a voice.</h3>
								
				    		</div>
				    		
				    		<div className="col-lg-2">
				    			<h5>Incredibly Intuitive</h5>
				    			<p>Engage is incredibly easy to use - for both lecturers and student's. You can have it running in under 2 minutes!</p>
				    			<img className="hidden-xs hidden-sm hidden-md" src="assets/img/arrow1.png"/>
				    		</div>
				    		<div className="col-lg-8">
				    			<img className="img-responsive" src="assets/img/app-bg.png" alt=""/>
				    		</div>

				    		
				    		<div className="col-lg-2">
				    			
				    			<img className="hidden-xs hidden-sm hidden-md" src="assets/img/arrow2.png"/>
				    			<h5>Accessible</h5>
				    			<p>Engage can be accessed through any internet enabled device. Student's can simply use devices they carry with them every day.</p>
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
								<p>The lecturer creates an online room which student's can join using a code. Student's can then ask questions, vote on questions and respond to polls created by the lecturer - All in real time</p>
							</div>
							<div className="col-lg-6">
								<img src="assets/img/intro03.png" alt=""/>
								<p>These questions and polls are then projected infront of the class, allowing the lecturer to gauge the class far more effectively. Reduce student passivity instantly! </p>
							</div>
						</div>
						
						
				    </div>
				</div>
				

				
				<section id="showcase" name="showcase"></section>
				<div id="showcase">
					<div className="container">
						<div className="row">
							<h1 className="centered">Screenshots of Engage</h1>

							<div className="col-lg-8 col-lg-offset-2">
								<div id="carousel-example-generic" className="carousel slide">
							
								  <ol className="carousel-indicators">
								    <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
								    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
								  </ol>
								
					
								  <div className="carousel-inner">
								    <div className="item active">
								      <img src="assets/img/item-01.png" alt=""/>
								    </div>
								    <div className="item">
								      <img src="assets/img/item-02.png" alt=""/>
								    </div>
								  </div>
								</div>
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
