var React = require('react');

//Imported Components
var Tooltip = require('react-bootstrap').Tooltip;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;

var DashboardFab = React.createClass({

  render: function(){
  	var tooltip = <Tooltip placement='right'>{this.props.fabText}</Tooltip>;

  	var fabStyle = {
		textAlign: 'center',
	  	position: 'absolute',
	  	right: 27,
	  	top: 17,
	  	zIndex: 999,
	  	width: 50,
	  	height: 50,
	  	fontSize: 18,
	  	lineHeight: 1.33,
	  	borderRadius: 25
  	}

    return (
      <OverlayTrigger placement='left' overlay={tooltip} delayShow={300} delayHide={150}>
        <button type="button" style={fabStyle} className="btn btn-warning" onClick={this.props.click}>+</button>
      </OverlayTrigger>
    )
  }
});

module.exports = DashboardFab;