var React = require('react');

//Imported Components
var Card = require('./Card');

//Component
var CardList = React.createClass({

  

  render: function(){

    var cardListStyle = {
    marginTop: 10
  }

  var panelStyle = {
      marginBottom: 10,
      marginRight: '6%',
      padding: 1,
      fontSize: 20,
      textAlign: 'center',
      color: 'black'
    }

    if(this.props.questions === undefined || this.props.room === undefined)
    {
      var questionList = <div className="panel panel-default" style={panelStyle}>Loading</div>
    }
    else if (this.props.questions.length === 0)
     {
      var questionList = <div className="panel panel-default" style={panelStyle}>No questions have been asked yet. Click the Green + to ask one</div>
     }
     else
     {
        this.props.questions.sort(function(a, b){
          return a.vote < b.vote;
        });

        var moderationOn = this.props.room.moderationon;

        var questionList = this.props.questions.map(function (question) {

          if(moderationOn === true && question.vote !=0)
          {
            return (
              <Card question={question} key={question.$id} />
            );
          }
          else if (moderationOn === false)
          {
            return (
              <Card question={question} key={question.$id} />
            );
          }
        });
     }


      
    
    return (
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="false" style={cardListStyle}>
        <div>{questionList}</div>
      </div>
    )
  }
});

module.exports = CardList;