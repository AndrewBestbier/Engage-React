var React = require('react');
var firebaseUtils = require('../../utils/firebaseUtils');
var Router = require('react-router');

var Register = React.createClass({
  mixins: [ Router.Navigation ],
  handleSubmit: function(e){
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var pw = this.refs.pw.getDOMNode().value;
    firebaseUtils.createUser({email: email, password: pw}, function(result){
      if(result){
        this.replaceWith('dashboard');
      }
    }.bind(this));
  },
  render: function(){

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
              <button style={buttonStyle} type="submit" className="btn btn-primary">Register</button>
            </form>
            Note that Engage is still in development. If you find any bugs or have suggestions, join room code 1234 and post them! Alternatively email andrew.bestbier@gmail.com
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Register;