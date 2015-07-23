var React = require('react');

//Imported Components
var Card = require('./Card');

//Component
var CardList = React.createClass({

  

  render: function(){

    var cardListStyle = {
    marginTop: 10
  }


      this.props.questions.sort(function(a, b){
        return a.vote < b.vote;
      });

      var questionList = this.props.questions.map(function (question) {
        return (
          <Card question={question} key={question.$id} />
        );
      });
    
    return (
      <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="false" style={cardListStyle}>
        <div>{questionList}</div>
      </div>
    )
  }
});

module.exports = CardList;