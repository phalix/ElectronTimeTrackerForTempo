/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', './appController',
'ojs/ojlistview','promise','ojs/ojarraydataprovider','ojs/ojknockout',
'ojs/ojbutton'],
 function(oj, ko, $, app) {
  
    function TasksViewModel() {
      
      var self = this;
      self.app = app;
      self.tasks_internal = ko.observableArray([])
      self.tasks = new oj.ArrayDataProvider(self.tasks_internal,{'keyAttributes': 'value'});
      self.selectedItems = ko.observableArray([]);

      self.handleSelectionChanged = function(e,d){
          app.taskid = d;
      }

      self.addTimer = function(e,d,c,b){
        console.log(e);
        app.taskdata = d;
        app.action = 'createtask';
        app.router.go('dashboard');
      }

    

      self.handleAttached = function() {
        self.tasks_internal(app.suggestions());
        if(app.suggestions().length==0){
          app.router.go('dashboard');
        }
      };

    }

    return new TasksViewModel();
  }
);
