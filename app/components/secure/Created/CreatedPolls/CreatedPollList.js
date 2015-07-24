var React = require('react');

//Imported Components
var CreatedPoll = require('./CreatedPoll');

//Component
var CreatedPollList = React.createClass({

  render: function(){

    centerStyle = {
      marginTop: 10
    }

    var panelStyle = {
      marginLeft: 42,
      marginBottom: 10,
      marginTop: 10,
      padding: 1,
      fontSize: 20,
      textAlign: 'center',
      color: 'black'
    }

    if(this.props.polls === undefined)
    {
      var pollList = <div className="panel panel-default" style={panelStyle}>Loading</div>
    }
    else if (this.props.polls.length === 0)
     {
      var pollList = <div className="panel panel-default" style={panelStyle}>No Polls have been created yet. Click the Green + to create one</div>
     }
     else
     {
        var pollList = this.props.polls.map(function (poll) {
          return (
            <CreatedPoll poll={poll} />
          );
        });
     }

    
    
    return (
      <div style={centerStyle}>
        {pollList}
      </div>
    )
  }
});

module.exports = CreatedPollList;