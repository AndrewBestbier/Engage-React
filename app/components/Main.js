var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var firebaseUtils = require('../utils/firebaseUtils');

//Imported Components
var ReactRouterBootstrap = require('react-router-bootstrap')
var NavItemLink = ReactRouterBootstrap.NavItemLink
var Navbar = require('react-bootstrap').Navbar;
var CollapsibleNav = require('react-bootstrap').CollapsibleNav;
var Nav = require('react-bootstrap').Nav;


//Component
var Main = React.createClass({
    getInitialState: function() {
        return {
            loggedIn: firebaseUtils.isLoggedIn()
        }
    },
    handleLogout: function(loggedIn) {
        this.setState({
            loggedIn: loggedIn
        });
    },
    componentWillMount: function() {
        firebaseUtils.onChange = this.handleLogout;
    },
    render: function() {
        var loginOrOut;
        var register;
        var home = <NavItemLink to='home'>Home</NavItemLink>;

        if (this.state.loggedIn) {
            loginOrOut = <NavItemLink to='logout'>Logout</NavItemLink>;
            register = null;
            dashboard = <NavItemLink to='dashboard'> Dashboard </NavItemLink>;
        }
        else {
            loginOrOut = <NavItemLink to='login'>Login</NavItemLink>;
            register = <NavItemLink to='register'> Register </NavItemLink>;
            dashboard = null;
        }
        return (
            <span>
        <Navbar brand='Engage' inverse fixedTop toggleNavKey={0}>
            <CollapsibleNav eventKey={0}>
              <Nav navbar right>
                {home}
                <NavItemLink to='mod'>Moderate</NavItemLink>
              </Nav>
            </CollapsibleNav>
          </Navbar>
        <div className="container">
          <div className="row">
            <RouteHandler />
          </div>
        </div>
      </span>
        )
    }
});

module.exports = Main;
