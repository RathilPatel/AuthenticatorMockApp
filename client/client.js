import { Meteor } from 'meteor/meteor';
import { Mongo } from  'meteor/mongo';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Users }  from '../import/dbimport.js';



if(Meteor.isCordova){
  console.log("This will Load in MObile");
  import './app/main.html';
  import './app/main.js';
}
else if (Meteor.isClient) {
    console.log("This will Load in Web");
    import './web/main.html';
    import './web/main.js';
}
