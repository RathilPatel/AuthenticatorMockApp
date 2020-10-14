import { Meteor } from 'meteor/meteor';
import { Mongo } from  'meteor/mongo';
import { Users } from '../import/dbimport';


Meteor.startup(() => {

  // code to run on server at startup
  // Meteor.call('removeAllUsers');
  Users.remove({});
  Users.insert({Username: "User1", password: "test1",createdAt: new Date(),web_token: null, app_token: null});
  Users.insert({Username: "User2", password: "test2",createdAt: new Date(),web_token: null, app_token: null});
  Users.insert({Username: "User3", password: "test3",createdAt: new Date(),web_token: null, app_token: null});
  Users.insert({Username: "User4", password: "test4",createdAt: new Date(),web_token: null, app_token: null});

  Meteor.methods({

    // removeAllUsers: function() {

    //   return Users.remove({});

    // },
    getallusers: function(){
        return Users.find();
    }

  });




});
