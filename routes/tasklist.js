let DocumentDBClient = require('documentdb').DocumentClient;
let async = require('async');

function TaskList(taskModel) {
this.taskModel = taskModel;
}

module.exports = TaskList;

TaskList.prototype = {
 showTasks: function(req, res) {
     let self = this;

     let querySpec = {
     query: 'SELECT * FROM r where r.PartnerId="TMC"',
    
     };

     self.taskModel.find(querySpec, function(err, items) {
     if (err) {
         throw err;
     }

     res.render('index', {
         title: 'Data from Production for JDM1 ',
         tasks: items
     });
     });
 },

 addTask: function(req, res) {
     let self = this;
     let item = req.body;

     self.taskModel.addItem(item, function(err) {
     if (err) {
         throw err;
     }

     res.redirect('/');
     });
 },

 completeTask: function(req, res) {
     let self = this;
     let completedTasks = Object.keys(req.body);

     async.forEach(
     completedTasks,
     function taskIterator(completedTask, callback) {
         self.taskModel.updateItem(completedTask, function(err) {
         if (err) {
             callback(err);
         } else {
             callback(null);
         }
         });
     },
     function goHome(err) {
         if (err) {
         throw err;
         } else {
         res.redirect('/');
         }
     }
     );
 }
 };