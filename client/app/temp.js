import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from  'meteor/mongo';
import { Users }   from '../../import/dbimport.js';

function putwebdata(data){

    document.getElementById("login__username").value = "User1";
    document.getElementById("web__token").value = data;
    
    }


    exports.putwebdata = putwebdata;
    