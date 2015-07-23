var React = require('react');

//Imported Components
var JoinedPoll = require('./JoinedPoll');

//Component
var JoinedPollList = React.createClass({

  render: function(){

    if(this.props.polls === undefined)
    {
      var pollList = <h2>Loading</h2>
    }
    else if (this.props.polls.length === 0)
     {
      var pollList = <div className="panel panel-default">No Polls have been created yet.</div>
     }
     else
     {
        var pollList = this.props.polls.map(function (poll) {
          return (
            <JoinedPoll poll={poll} />
          );
        });
     }

    
    return (
      <div>
        {pollList}
      </div>
    )
  }
});

module.exports = JoinedPollList;