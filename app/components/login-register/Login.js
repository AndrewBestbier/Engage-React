var React = require('react');
var Router = require('react-router');
var firebaseUtils = require('../../utils/firebaseUtils');
var Login = React.createClass({
    mixins: [Router.Navigation],
    statics: {
        attemptedTransition: null
    },
    getInitialState: function() {
        return {
            error: false
        }
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var email = this.refs.email.getDOMNode().value.toLowerCase();
        var pw = this.refs.pw.getDOMNode().value;

        firebaseUtils.loginWithPW({
            email: email,
            password: pw
        }, function() {
            if (Login.attemptedTransition) {
                var transition = Login.attemptedTransition;
                Login.attemptedTransition = null;
                transition.retry();
            }
            else {
                this.replaceWith('dashboard');
            }
        }.bind(this));
    },
    render: function() {
        var errors = this.state.error ? <p> Error on Login </p> : '';

        var panelStyle = {
            padding: 10,
            marginTop: 10
        }

        var buttonStyle = {
            width: '100%'
        }

        return (
            <div className="panel panel-default" style={panelStyle}>
        <div className="panel-body">
          <div className="col-sm-6 col-sm-offset-3">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label> Email </label>
                <input className="form-control" ref="email" placeholder="Email"/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input ref="pw" type="password" className="form-control" placeholder="Password" />
              </div>
              <button style={buttonStyle} type="submit" className="btn btn-primary">Login</button>
              <br/>
              Note that Engage is still in development. If you find any bugs or have suggestions, join room code 1234 and post them! Alternatively email andrew.bestbier@gmail.com
            </form>
          </div>
        </div>
      </div>
        );
    }
});

module.exports = Login;