var React = require('react');

//Imported Components
var ModCard = require('./ModCard');

//Component
var ModCardList = React.createClass({

  

  render: function(){

    var cardListStyle = {
    marginTop: 10
  }

  var panelStyle = {
      marginBottom: 10,
      padding: 1,
      fontSize: 20,
      textAlign: 'center',
      color: 'black'
    }

    var voteCount =0;

    if(this.props.room === undefined)
    {
      var questionList = <div className="panel panel-default" style={panelStyle}>Loading</div>
    }
     else
     {
        this.props.questions.sort(function(a, b){
          return a.vote < b.vote;
        });

        var questionList = this.props.questions.map(function (question) {
          if(question.vote <1)
          {
            voteCount++;
            return (
            <ModCard question={question} key={question.$id} />
          )
          }
        });
     }

     if(voteCount > 0 && !(this.props.room === undefined) && !(this.props.room.moderationon === false))
     {
        return (
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="false" style={cardListStyle}>
          <div>{questionList}</div>
        </div>
      )
     }
     else if(!(this.props.room === undefined) && this.props.room.moderationon === false )
     {
      return (
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="false" style={cardListStyle}>
          <div className="panel panel-default" style={panelStyle}>Moderation is switched off for this room.</div>
        </div>
      )
     }
     else if (voteCount == 0  && !(this.props.room === undefined) )
     {
        return (
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="false" style={cardListStyle}>
          <div className="panel panel-default" style={panelStyle}>No questions need to be moderated</div>
        </div>
      )
     }
     else
     {
        return (
        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="false" style={cardListStyle}>
          <div className="panel panel-default" style={panelStyle}>Loading</div>
        </div>
        )
     }

  

    
  }
});

module.exports = ModCardList;