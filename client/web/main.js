import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from  'meteor/mongo';
import { Users }  from '../../import/dbimport.js';
import { Meteor } from 'meteor/meteor'


import './main.html';
console.log("IN Web Specific JS");

// export const Users = new Mongo.Collection('user');

var randHex = function(len) {
  var maxlen = 8,
      min = Math.pow(16,Math.min(len,maxlen)-1)
      max = Math.pow(16,Math.min(len,maxlen)) - 1,
      n   = Math.floor( Math.random() * (max-min+1) ) + min,
      r   = n.toString(16);
  while ( r.length < len ) {
     r = r + randHex( len - maxlen );
  }
  return r;
};

Template.Login.onCreated(function helloOnCreated() {
  // counter starts at 0
  // this.counter = new ReactiveVar(0);
  // Users.insert({Username: "username", password: "password",createdAt: new Date()});
  // Meteor.call('removeAllUsers');
  // Users.insert({Username: "User1", password: "test1",createdAt: new Date(),web_token: null, app_token: null});
  // Users.insert({Username: "User2", password: "test2",createdAt: new Date(),web_token: null, app_token: null});
  // Users.insert({Username: "User3", password: "test3",createdAt: new Date(),web_token: null, app_token: null});
  // Users.insert({Username: "User4", password: "test4",createdAt: new Date(),web_token: null, app_token: null});
  // console.log(Meteor.call('getallusers'));
  console.log(Users.find());

});

Template.Login.events({
  'submit .form' (event,TemplateInstance){
    event.preventDefault();
    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;
    console.log(Users.find().fetch());
    // console.log(randHex(64));
    const token = randHex(64);
    var doc = Users.findOne({ Username: username });
    console.log(doc);
        var success_update = Users.update({ _id : doc._id},{ $set : { web_token : token } })
        console.log(success_update);
        console.log(Users.find().fetch());
        if(success_update){
            target.web_token.value = token;
        }

  }


});


Template.Login.events({
  'click #signin' (event,TemplateInstance){
    // event.preventDefault();
    console.log(TemplateInstance.$('#login__token'));
  
    event.preventDefault();
    // const target = event.target;
    const username = event.target.username.value;
    const password = event.target.password.value;
console.log(username);

    // const app_token = TemplateInstance.$('#login__token');
    // const username = TemplateInstance.$('#login__username');
    // const password = TemplateInstance.$('#login__password');
    // const web_token = TemplateInstance.$('#web__token');

  
    console.log("App_token: "+ app_token + " username "+ username + " Password: "+ password + " web_token: "+ web_token);
  
  
  
  
  }


});




