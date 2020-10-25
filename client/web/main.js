import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from  'meteor/mongo';
import { Users }  from '../../import/dbimport.js';
import { Meteor } from 'meteor/meteor'
import { putwebdata } from '../app/temp'


import './main.html';
// console.log("IN Web Specific JS");

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
    var token = randHex(10);
      var doc = Users.findOne({ Username: username });
    console.log("---------"+doc);
        var success_update = Users.update({ _id : doc._id},{ $set : { web_token : token } })
        console.log(success_update);
        console.log(Users.find().fetch());
        if(success_update){
            target.web_token.value = token;
            // putwebdata(token);
        }

  }


});


Template.Login.events({
  'click #signin' (event,TemplateInstance){
    // event.preventDefault();
    console.log(TemplateInstance.$('#login__token'));

    event.preventDefault();

    var username = document.getElementById("login__username").value;
    var password = document.getElementById("login__password").value;
    var web__token = document.getElementById("web__token").value;
    var login__token = document.getElementById("login__token").value;
    username = "\"" + username +"\"";
    password = "\"" + password + "\"";
    web__token = "\"" + web__token + "\"";
    login__token = "\"" + login__token + "\"";


    var user = Users.find({});

    user.forEach(element => {

        if(JSON.stringify(element["Username"]) == username){

          console.log("Username from Form : " + username + " Username from DB: " + JSON.stringify(element['Username']));

          if(JSON.stringify(element["password"]) == password){

            if(JSON.stringify(element["web_token"]) == web__token){

              if(JSON.stringify(element["app_token"]) == login__token){

                    console.log("-----------------Successfull-----------------");
                    document.getElementById("info-message").innerHTML = ' <div class="oaerror success" id="message" name= "success-message"> <strong>Finally</strong> - Congrats, you figured out how to login. </div>';
              }
              else{
                console.log("Login Token Didnt Match");
                console.log(JSON.stringify(element["app_token"]) +"========"+login__token);
                document.getElementById("info-message").innerHTML = '<div class="oaerror danger" id="message" name = "failed-message"> <strong>Error</strong>- Invalid Token. Please try again.</div>'
              }
            }
            else{
              console.log("Web_token didnt Match");
              document.getElementById("info-message").innerHTML = '<div class="oaerror danger" id="message"> <strong>Error</strong>- Invalid Token. Please try again.</div>'
            }
          }
          else {
            console.log("Password Didn't match");
            document.getElementById("info-message").innerHTML = '<div class="oaerror danger" id="message"> <strong>Error</strong>- Invalid Token. Please try again.</div>'
          }


        }
        else{
          console.log("User Not found");
          // document.getElementById("info-message").innerHTML = '<div class="oaerror danger"> <strong>Error</strong>- Invalid Token. Please try again.</div>'
        }


    });

    console.log(" username "+ username + " Password: "+ password + " web_token: "+ web__token + " Login_token: " +login__token);

    console.log(Users.find().fetch());



  }


});
