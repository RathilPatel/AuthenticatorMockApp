import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from  'meteor/mongo';
import { Users }   from '../../import/dbimport.js';
import './main.html';
import { Meteor } from 'meteor/meteor'
console.log("IN App Specific JS");

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

Template.validator.onCreated(function helloOnCreated() {
    var tmp = Users.find();
    console.log("User Data here --> "+ JSON.stringify(tmp));

});


// Template.Login.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });

Template.validator.events({
  'submit .form' (event,TemplateInstance){
    event.preventDefault();
    const target = event.target;
    var username = target.username.value;
    var web_token = target.web_token.value;
    username = "\"" + username + "\"";
    web_token = "\"" + web_token + "\"";
    var user = Users.find({});

    console.log(" Test: "+JSON.stringify(user));

    user.forEach(element => {
      if(JSON.stringify(element["Username"]) == username ){
              console.log(JSON.stringify(element));

        console.log(JSON.stringify(element["Username"]));
        // var doc = 
        console.log("Username from Form : " + username + " Username from DB: " + JSON.stringify(element['Username']));
        if (JSON.stringify(element['web_token']) == web_token) {
          console.log("Accepted Web_token Proceed: "+ web_token + " From DB: " + JSON.stringify(element['web_token'] ));
          const app_token = randHex(70);
          target.app_token.value = app_token;

          // break;

        } else {
          console.error("Web_token Didnt Match");
          // break;
        }
      }
      else{
       // console.warn("USER NOT FOUND");
      }
      
    });

    console.log("after USer");


  

  }

})
