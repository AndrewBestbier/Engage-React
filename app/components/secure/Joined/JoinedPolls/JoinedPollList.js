var React = require('react');

//Imported Components
var JoinedPoll = require('./JoinedPoll');

//Component
var JoinedPollList = React.createClass({

  render: function(){

    var panelStyle = {
      marginBottom: 10,
      marginTop: 10,
      padding: 1,
      fontSize: 20,
      marginRight: '6%',
      textAlign: 'center',
      color: 'black'
    }

    if(this.props.polls === undefined)
    {
      var pollList = <div className="panel panel-default" style={panelStyle}>Loading</div>
    }
    else if (this.props.polls.length === 0)
     {
      var pollList = <div className="panel panel-default" style={panelStyle}>No Polls have been created yet.</div>
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