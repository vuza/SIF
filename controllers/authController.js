var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var LocalStrategy   = require('passport-local').Strategy;

var errHandler = require('./errHandler');

var authController = {
    init: function(passport){
        // Passport needs to be able to serialize and deserialize users to support persistent login sessions
        passport.serializeUser(function(user, done) {
            console.log('serializing user: ');console.log(user);
            done(null, user._id);
        });

        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                console.log('deserializing user:',user);
                done(err, user);
            });
        });

        // Setting up Passport Strategies for Login and SignUp/Registration
        passport.use('login', new LocalStrategy({
                    passReqToCallback : true
                },
                function(req, username, password, done) {
                    // check in mongo if a user with username exists or not
                    User.findOne({ 'username' :  username },
                        function(err, user) {
                            // In case of any error, return using the done method
                            if (err)
                                return done(err);
                            // Username does not exist, log the error and redirect back
                            if (!user){
                                console.log('User Not Found with username '+username);
                                return done(null, false, {message: 'User not found'});
                            }
                            // User exists but wrong password, log the error
                            if (!isValidPassword(user, password)){
                                console.log('Invalid Password');
                                return done(null, false, {message: 'Invalid password'}); // redirect back to login page
                            }
                            // User and password both match, return user from done method
                            // which will be treated like success
                            return done(null, user);
                        }
                    );

                })
        );

        passport.use('signup', new LocalStrategy({
                    passReqToCallback : true // allows us to pass back the entire request to the callback
                },
                function(req, username, password, done) {

                    findOrCreateUser = function(){
                        // find a user in Mongo with provided username
                        User.find({$or: [{'username':  username}, {email: req.param('email')}]}, function(err, user) {
                            // In case of any error, return using the done method
                            if (err){
                                console.log('Error in SignUp: '+err);
                                return done(err);
                            }
                            // already exists
                            if (user.length > 0) {
                                console.log('User already exists with username: '+username);
                                return done(null, false, {message: 'User already exists'});
                            } else {
                                // if there is no user with that email
                                // create the user
                                var newUser = new User();

                                // set the user's local credentials
                                newUser.username = username;
                                newUser.password = createHash(password);
                                newUser.email = req.param('email');
                                newUser.firstName = req.param('firstName');
                                newUser.lastName = req.param('lastName');

                                // save the user
                                newUser.save(function(err) {
                                    if (err){
                                        console.log('Error in Saving user: '+err);
                                        throw err;
                                    }
                                    console.log('User Registration succesful');
                                    return done(null, newUser);
                                });
                            }
                        });
                    };
                    // Delay the execution of findOrCreateUser and execute the method
                    // in the next tick of the event loop
                    process.nextTick(findOrCreateUser);
                }
            )
        );

        // Generates hash using bCrypt
        var createHash = function(password){
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        }

        var isValidPassword = function(user, password){
            return bCrypt.compareSync(password, user.password);
        }
    },

    login: function(req, res){
        res.status(200).send({message: 'Login was successful', user: req.user});
    },

    signup: function(req, res){
        res.status(200).send({message: 'Signup was successful', user: req.user});
    },

    logout: function(req, res){
        req.logout();
        res.status(200).send('successfully logged out');
    },

    isAuthenticated: function(req, res, next){
        if(req.isAuthenticated())
            return next();

        res.status(401).send('Not authenticated');
    }
}

module.exports = authController;