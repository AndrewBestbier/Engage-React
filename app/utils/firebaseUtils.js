var Firebase = require('firebase');
var forge = "https://engaged.firebaseio.com/";
var ref = new Firebase(forge);
var cachedUser = null;

var formatEmailForFirebase =  function(email){
  var key = email.replace('@', '^');
  if(key.indexOf('.') !== -1){
    return key.split('.').join('*');
  }
  return key.toLowerCase()
};

var addNewUserToFB = function(newUser){
  var key = formatEmailForFirebase(newUser.email);
  ref.child('user').child(key).set(newUser);
};

var firebaseUtils = {
  createUser: function(user, cb) {
    ref.createUser(user, function(err) {
      if (err) {
        switch (err.code) {
          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
            break;
          default:
            alert("Error creating user:", err);
        }
      } else {
          this.loginWithPW(user, function(authData){
            addNewUserToFB({
              email: user.email.toLowerCase(), 
              uid: authData.uid,
              token: authData.token
            });
          }, cb);
      }
    }.bind(this));
  },
  loginWithPW: function(userObj, cb, cbOnRegister){
    ref.authWithPassword(userObj, function(err, authData){
      if(err){
        console.log('Error on login:', err.message);
        cbOnRegister && cbOnRegister(false);
      } else {
        authData.email = userObj.email.toLowerCase();
        cachedUser = authData;
        cb(authData);
        this.onChange(true);
        cbOnRegister && cbOnRegister(true);
      }
    }.bind(this));
  },
  isLoggedIn: function(){
    //console.log(cachedUser.email);
    //return cachedUser && true || ref.getAuth() || false;
    return cachedUser && true || false;
  },
  getEmail: function()
  {
    return cachedUser;
  },
  logout: function(){
    ref.unauth();
    cachedUser = null;
    this.onChange(false);
  },
  formatEmailForFirebase :  function(email){
    var key = email.replace('@', '^');
    if(key.indexOf('.') !== -1){
      return key.split('.').join('*');
    }
    return key.toLowerCase()
  }
};

module.exports = firebaseUtils;