/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 
        'knockout', 
        'jquery', 
        './appController',
        '../../lib/jira/AuthService',
        '../../lib/jira/StorageService',
        'ojs/ojknockout',
        'ojs/ojbutton',
        'ojs/ojinputtext', 
        'ojs/ojlabel'
],
 function(oj, ko, $, app, auth,StorageService) {
    function SettingsViewModel() {
    
      var self = this;
      
      self.server = ko.observable("");
      self.username = ko.observable("");
      self.password = ko.observable("");
      
      self.handleAttached = function() {
        if(StorageService.getUser()&&StorageService.getUser().name){
          self.username(StorageService.getUser().name);
        }
        
        self.server(StorageService.getInstanceURL());
      };
      self.saveClick = function(e){
          StorageService.setInstanceURL(self.server());
          app.userLogin(self.username());
          auth.loginWithCredentials(self.server(),self.username(),self.password());
          window.history.back();
      }

    }

    return new SettingsViewModel();
  }
);
