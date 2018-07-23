requirejs(['ojs/ojcore', 'knockout', 'jquery', 
'./js/viewModels/appController', 
'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojmenu',
  'ojs/ojtoolbar', 'ojs/ojnavigationlist', 'ojs/ojmodule'],
  function(oj, ko, $, app) {
           
     // Change the default location for the viewModel and view files
    oj.ModuleBinding.defaults.modelPath = './js/viewModels/';
    oj.ModuleBinding.defaults.viewPath = 'text!'+__dirname+'/html/views/';

    $(function () {
      oj.Router.sync().then(
        function () {
          ko.applyBindings(app, document.getElementById('page'));
        },
        function (error) {
          oj.Logger.error('Error in root start: ' + error.message);
        }
      );
    });
  }
);
