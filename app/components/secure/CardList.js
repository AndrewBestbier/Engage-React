var React = require('react');

//Imported Components
var Card = require('./Card');

//Component
var CardList = React.createClass({



    render: function() {

        var cardListStyle = {
            marginTop: 10
        }

        var panelStyle = {
            marginBottom: 10,
            marginTop: 10,
            marginRight: '6%',
            padding: 1,
            fontSize: 20,
            textAlign: 'center',
            color: 'black'
        }

        var voteCount = 0;
        if (this.props.questions === undefined || this.props.room === undefined) {
            var questionList = <div className="panel panel-default" style={panelStyle}>Loading</div>
        }
        else {
            this.props.questions.sort(function(a, b) {
                return a.vote < b.vote;
            });

            console.log(this.props.questions)

            var moderationOn = this.props.room.moderationon;

            var questionList = this.props.questions.map(function(question) {

                if (moderationOn === true && question.vote != 0) {
                    voteCount++;
                    return (
                        <Card question={question} key={question.$id} />
                    );
                }
                else if (moderationOn === false) {
                    return (
                        <Card question={question} key={question.$id} />
                    );
                }
            });
        }



        if (moderationOn === true && voteCount === 0) {
            return <div className="panel panel-default" style={panelStyle}>No questions have been moderated through. Click the green '+' to ask one.</div>
        }
        else if (moderationOn === false & this.props.questions.length === 0) {
            return <div className="panel panel-default" style={panelStyle}>No questions have been asked. Click the green '+' to ask one.</div>
        }
        else {
            return (
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="false" style={cardListStyle}>
            <div>{questionList}</div>
          </div>
            )
        }





    }
});

module.exports = CardList;