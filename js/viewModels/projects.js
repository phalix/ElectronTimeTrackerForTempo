/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', './appController',
'../../lib/jira/ProjectService'
,'../../lib/jira/StorageService'
,'ojs/ojlistview','promise','ojs/ojarraydataprovider','ojs/ojknockout'],
 function(oj, ko, $, app,ProjectService,StorageService) {
  
    function ProjectViewModel() {
      
      var self = this;
      self.project_internal = ko.observableArray([])
      self.projects = new oj.ArrayDataProvider(self.project_internal,{'keyAttributes': 'id'});
      self.selectedItems = ko.observableArray([]);

    self.handleSelectionChanged = function(e,d,c,b){
        if(e.detail.value.length==0){
          app.projectid = undefined;
          app.lastselection = '';
          StorageService.setActiveProjectId("");
        }else{
          app.projectid = e.detail.value[0];
          app.lastselection = 'project';
          StorageService.setActiveProjectId(e.detail.value[0]);
        }
        
    }

     self.handleAttached = function() {
        ProjectService.getProjects().then(projects => {
            self.project_internal(projects);
        })
      };

    }

    return new ProjectViewModel();
  }
);
