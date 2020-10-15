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




Template.validator.events({
  'submit .form' (event,TemplateInstance){
    var log = document.getElementById("log-box");
    event.preventDefault();
    const target = event.target;
    var username = target.username.value;
    var web_token = target.web_token.value;
    username = "\"" + username + "\"";
    web_token = "\"" + web_token + "\"";
    var user = Users.find({}).fetch();


    log.value ="Entered CLick function"+user;
    console.log(" Test: "+JSON.stringify(user));

    user.forEach(element => {
      console.log(element);
      // console.log(JSON.stringify(element,0,2));
      if(JSON.stringify(element["Username"]) == username ){
       
        if (JSON.stringify(element['web_token']) == web_token) {
          const app = randHex(70);
          
          // var doc = Users.findOne({ Username: username });
          // console.log("Element ID: "+JSON.stringify(element["_id"]));
          // console.log("Element app_token: "+JSON.stringify(element["app_token"]));
          var id = element["_id"];
          console.log(id)
          var success_update = Users.update({_id: id} ,{ $set : { app_token : app } });
          // console.log("Element app_token: "+JSON.stringify(element["app_token"]));
          console.log("-----------Updated Token:  "+success_update + "----: ");
          log.value = log.value+"TOken Updated!!!";



          target.app_token.value = app;
          console.log("app_token:  "+app)

          // break;

        } else {
          console.error("Web_token Didnt Match");
          log.value = log.value+"Token Didnt Match";
          // break;
        }
      }
      else{
        var user = Users.findOne(id);
        console.log(user.fetch());
        console.error("Deleting Obejct"+ Users.remove(JSON.stringify(element["_id"])));
       console.warn("USER NOT FOUND/Deleted");
       log.value = log.value+"UsernOTFOund!!";

      }

      log.value = log.value+"Inside the Loop!!";
      
    });

    log.value = log.value+"    end of JS!!";

    console.log("after USer");


  

  }

})

