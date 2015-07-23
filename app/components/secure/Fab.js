var React = require('react');

//Imported Components
var Tooltip = require('react-bootstrap').Tooltip;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;

var Fab = React.createClass({

  render: function(){
  	var tooltip = <Tooltip placement='right'>{this.props.tooltip}</Tooltip>;

  	var fabStyle = {
		textAlign: 'center',
	  	position: 'absolute',
	  	right: 24,
	  	bottom: 24,
	  	zIndex: 999,
	  	width: 50,
	  	height: 50,
	  	padding: '10 16',
	  	fontSize: 18,
	  	lineHeight: 1.33,
	  	borderRadius: 25
  	}

    return (
      <OverlayTrigger placement='left' overlay={tooltip} delayShow={300} delayHide={150}>
        <button type="button" style={fabStyle} className="btn btn-success" onClick={this.props.click}>+</button>
      </OverlayTrigger>
    )
  }
});

module.exports = Fab;