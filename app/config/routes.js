//Routing Components
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

//Views
var Main = require('../components/Main');
var Register = require('../components/login-register/Register');
var Login = require("../components/login-register/Login");
var Logout = require('../components/login-register/Logout');

var Home = require("../components/Home");
var Dashboard = require('../components/secure/Dashboard/Dashboard');

var JoinAnon = require('../components/login-register/JoinAnon');
var CreateAnon = require('../components/login-register/CreateAnon');
var ModAnon = require('../components/login-register/ModAnon');

//Global
var QuestionsFrame = require('../components/secure/QuestionsFrame');


//Joined
var JoinedRoom = require('../components/secure/Joined/JoinedRoom');
var JoinedPollsFrame = require('../components/secure/Joined/JoinedPolls/JoinedPollsFrame');

//Created
var CreatedRoom = require('../components/secure/Created/CreatedRoom');
var CreatedPollsFrame = require('../components/secure/Created/CreatedPolls/CreatedPollsFrame');
var CreatedSettings = require('../components/secure/Created/CreatedSettings');

//Moderation
var ModerationFrame = require('../components/secure/Moderation/ModerationFrame');


var routes = (
    <Route handler={Main} >
    /*
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
    <Route name="register" handler={Register} />
    <Route name="dashboard" handler={Dashboard} /> */
    
    <Route name="join" handler={JoinAnon} />
    <Route name="create" handler={CreateAnon} />
    <Route name="mod" handler={ModAnon} />

    <Route name="joined" path="joined/:roomid" handler={JoinedRoom}>
    	<Route name="joinedquestions" path="questions" handler={QuestionsFrame} />
        <Route name="joinedpolls" path="polls" handler={JoinedPollsFrame} />
    </Route>

    <Route name="created" path="created/:roomid" handler={CreatedRoom}>
        <Route name="createdquestions" path="questions" handler={QuestionsFrame} />
        <Route name="createdpolls" path="polls" handler={CreatedPollsFrame} />
        <Route name="createdsettings" path="settings" handler={CreatedSettings} />
    </Route>

    
    <Route name="moderatedquestions" path="moderatedquestions/:roomid" handler={ModerationFrame} />
    


    <Route name="home" path="/" handler={Home} />
  </Route>
);

module.exports = routes;