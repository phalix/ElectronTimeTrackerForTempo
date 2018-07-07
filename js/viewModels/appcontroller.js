/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout','../../lib/jira/StorageService', ,'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function(oj, ko,StorageService) {
    
     function ControllerViewModel() {
       var self = this;


       
       
       self.suggestions = ko.observableArray([]);

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
  
       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'dashboard': {label: 'Dashboard', isDefault: true},
         'projects': {label: 'Projects'},
         'settings': {label: 'Settings'},
         'filter': {label: 'Filter'},
         'tasks': {label: 'Tasks'},
         /*'incidents': {label: 'Incidents'},
         'customers': {label: 'Customers'},
         'about': {label: 'About'}*/
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Navigation setup
      var navData = [
      {name: 'Dashboard', id: 'dashboard',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
       {name: 'Tasks', id: 'tasks',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
       {name: 'Projects', id: 'projects',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
       {name: 'Filter', id: 'filter',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'} /*,
      {name: 'Incidents', id: 'incidents',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
      {name: 'Customers', id: 'customers',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
       {name: 'About', id: 'about',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}*/
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

      // Application Name used in drawer
      self.appName = ko.observable("Tempo Time Management with Electron");
      // User Info used in Global Navigation area
      if(StorageService.getUser()&&StorageService.getUser().name){
        self.userLogin = ko.observable(StorageService.getUser().name);
      }else{
        self.userLogin = ko.observable("");
      }
      
      
      self.valueChangedListener = function(e){
        if(e.detail.originalEvent.path[1].id=="settings"){
          oj.Router.rootInstance.stateId("settings")
        }
      }
      
      // Generate some content
      self.generateContent = function(){
        for (var i = 0; i < 5; i++) {
          $('#content').append('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.</p>');
        }
      }
     
     }

     return new ControllerViewModel();
  }
);
