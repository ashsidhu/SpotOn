/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Business = require('../api/business/business.model');
var User = require('../api/user/user.model');
var Appointment = require('../api/appointment/appointment.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Business Owner',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Ash',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      // console.log('finished populating users');
      User.findOne(function(err, data){
        // console.log('user id', data._id);
        Business.find({}).remove(function() {
          Business.create({
            name: "Hack Reactor",
            info: "Coding school for the 21st century",
            defaultDuration: 60,
            active: true,
            type: 'school',
            _ownerId: data._id
          }, {
            name: "CanCun",
            info: "Its burrito time",
            defaultDuration: 60,
            active: true,
            type: 'restaurant',
            _ownerId: data._id
          }, {
            name: "Public Barber",
            info: "We turn normal people into hipsters",
            defaultDuration: 60,
            active: true,
            type: 'salon',
            _ownerId: data._id
          }, function(){
            Business.find(function(err, data) {
              var _ownerId = data[0]._ownerId;
              // console.log('business', _ownerId);
              User.find({_id: _ownerId}, function (err, data){
                // console.log('user from business', data)
              });
            })
          });
        });
      });
    }
  );
});

Appointment.find({}).remove(function() {
  Appointment.create({dueDate: new Date()})
})
