var _ = require('lodash');

module.exports = function (app) {

  var passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const FacebookStrategy = require('passport-facebook').Strategy;
  var userModel = require("../model/user/user.model.server");
  const bcrypt = require('bcrypt-nodejs');

  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.post("/api/login", passport.authenticate('local'), login);
  app.post("/api/logout", logout);
  app.post("/api/register", register);
  app.post("/api/loggedin", loggedin);
  app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/#/profile',
    failureRedirect: '/#/login'
  }));

  // const facebookConfig = {
  //   clientID: '283460912577285',
  //   clientSecret: 'b8c1bf0146cfedf0b115502ccf4142f5',
  //   callbackURL: '/auth/facebook/callback',
  // }

  var facebookConfig = {
    clientID : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL : process.env.FACEBOOK_CALLBACK_URL
  };

  function serializeUser(user, done) {
    done(null, user.username);
  }

  function deserializeUser(username, done) {
    userModel.findUserByUsername(username).then(
      function (user) {
        done(null, user);
      },
      function (err) {
        done(err, null);
      });
  }

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  passport.use(new LocalStrategy(localStrategy));
  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  // Authentication

  function localStrategy(username, password, done) {
    userModel
      .findUserByUsername(username)
      .then(
        function (user) {
          if (user &&
            user.username === username &&
            bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function (err) {
          if (err) {
            return done(err);
          }
        }
      );
  }

  function login(req, res) {
    const user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    // res.send(200);
    res.send({});
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function register(req, res) {
    const user = req.body;
    console.log(req.body);
    user.password = bcrypt.hashSync(user.password);
    userModel
      .createUser(user)
      .then(
        function (newUser) {
          if (newUser) {
            req.login(user, function (error) {
              if (error) {
                res.status(400).send(error);
              } else {
                res.json(user);
              }
            });
          }
        }
      );
  }

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel
      .findUserByFacebookId(profile.id)
      .then(
        function (user) {
          if (user) {
            return done(null, user);
          } else {
            const names = profile.displayName.split(" ");
            const newFacebookUser = {
              lastName: names[1],
              firstName: names[0],
              email: profile.emails ? profile.emails[0].value : "",
              facebook: {id: profile.id, token: token}
            };
            return userModel.createUser(newFacebookUser);
          }
        },
        function (err) {
          if (err) {
            return done(err);
          }
        })
      .then(
        function (user) {
          return done(null, user);
        }, function (err) {
          if (err) {
            return done(err);
          }
        });
  }

    // var users = [
    //  //        { _id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonderland" },
    //  //        { _id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
    //  //        { _id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
    //  //        { _id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
    //  //    ];


    function createUser(req, res) {
      var user = _.pick(req.body, ['username', 'password', 'firstName', 'lastName', 'email', 'phone']);
      userModel.createUser(user).then(
        function (user) {
          if (user) {
            res.json(user);
          } else {
            res.status(400).send("Something went wrong");
          }
        },
        function (err) {
          res.status(400).send(err);
        }
      );
    };

    function findUser(req, res) {
      if (req.query["password"]) {
        findUserByCredentials(req, res);
      } else {
        findUserByUsername(req, res);
      }
    }

    function findUserByUsername(req, res) {
      var username = req.query["username"];
      userModel.findUserByUsername(username).then(
        function (user) {
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(200).send({});
          }
        },
        function (err) {
          res.status(400).send(err);
        }
      );
    };

    function findUserByCredentials(req, res) {
      var username = req.query["username"];
      var password = req.query["password"];
      userModel.findUserByCredentials(username, password).then(
        function (user) {
          if (user) {
            res.json(user);
          } else {
            res.status(400).send("Cannot find user with the username and password");
          }
        },
        function (err) {
          res.status(400).send(err);
        }
      );
    }

    function findUserById(req, res) {
      var userId = req.params["userId"];
      userModel.findUserById(userId).then(
        function (user) {
          if (user) {
            res.json(user);
          } else {
            res.status(400).send("Cannot find user with the userID");
          }
        },
        function (err) {
          res.status(400).send(err);
        }
      );
    };

    function updateUser(req, res) {
      var userId = req.params["userId"];
      var updatedUser = req.body;
      userModel.updateUser(userId, updatedUser).then(
        function (user) {
          if (user) {
            res.json(user);
          } else {
            res.status(400).send("Cannot find user")
          }
        },
        function (err) {
          res.status(400).send(err);
        }
      );
    };

    function deleteUser(req, res) {
      var userId = req.params["userId"];
      userModel.deleteUser(userId).then(
        function (stats) {
          res.json(stats);
        },
        function (err) {
          res.status(400).send(err);
        }
      );
    };

  }
