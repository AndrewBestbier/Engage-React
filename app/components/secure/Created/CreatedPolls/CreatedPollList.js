var React = require('react');

//Imported Components
var CreatedPoll = require('./CreatedPoll');

//Component
var CreatedPollList = React.createClass({

  render: function(){

    centerStyle = {
      marginTop: 10
    }

    if(this.props.polls === undefined)
    {
      var pollList = <h2>Loading</h2>
    }
    else if (this.props.polls.length === 0)
     {
      var pollList = <div className="panel panel-default">No Polls have been created yet. Click the Green + to create one</div>
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