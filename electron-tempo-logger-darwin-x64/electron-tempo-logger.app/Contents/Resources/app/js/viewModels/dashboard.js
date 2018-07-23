/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', './appController',
'../../lib/jira/IssueService',
'../../lib/jira/StorageService',
'../../lib/jira/WorklogService',
'ojs/ojknockout',
'ojs/ojlabel',
'ojs/ojinputtext',
'ojs/ojbutton',
'ojs/ojselectcombobox',
'ojs/ojpopup'
],
 function(oj, ko, $, app,IssueService,StorageService,WorklogService) {
  
    function DashboardViewModel() {
      
            

      var self = this;
      self.app = app;
      var tags = [".net", "accounting", "ADE", "adf", "Adfc",
      "Adfm", "Android", "Aria", "C", "c#", "C++", "chrome",
      "Cloud", "CSS3", "DBA", "eclipse", "firefox", "git",
      "hibernate", "html", "html5", "IE", "IOS", "java",
      "javascript", "jdeveloper", "jet", "jquery", "jqueryui",
      "JS", "knockout", "MAF", "maven", "MCS", "mysql",
      "netbeans", "Oracle", "solaris", "spring", "svn", "ux",
      "xhtml", "XML"];
      
        var tagOptions = [];
        /*$.each(tags, function(i, val) {
        var item = {"value": val, "label": val};
        tagOptions.push(item);
        });*/

    self.issues = ko.observable([]);
    
    
    self.suggestions = ko.observableArray([]);
    app.suggestions = self.suggestions;

      self.timer = ko.observable([]);
      self.getTimerId = function(){
        var arr = self.timer();
        
        var max = arr
            .map(e => e.id)
            .reduce((a, b) => {
            return Math.max(a, b);
        },0);
        return max+1;
      }

      

      self.buttonClick = function(e,d){
        if(d.starttime()==0){
            d.starttime(new Date().getTime());
            d.time(d.timeshow());
            d.datestart = (new Date)
        }else
        if(d.stoptime()==0){
            d.stoptime(new Date().getTime());
            d.time(Math.round((parseFloat(d.time())+(d.stoptime()-d.starttime())/1000/60)*100)/100);
            d.timeshow(d.time());
            d.starttime(0);
            d.stoptime(0);
        }
      }

      setInterval(function(){
        for(var timer_id in self.timer()){
            var timer = self.timer()[timer_id];
            if(timer.starttime()>0){
                timer.timeshow(Math.round((parseFloat(timer.time())+(new Date().getTime()-timer.starttime())/1000/60)*100)/100);
            }else{
                timer.time(timer.timeshow());

            }
        }
      }.bind(self),100);

      self.addTimerClick = function(){
        var o = {};    
        var taskkey = "";
        if(app.taskdata &&app.taskdata.value){
            taskkey = app.taskdata.value
        }
        o.task = ko.observable(taskkey);
        o.wodesc = ko.observable("");
        o.time = ko.observable(0);
        o.timeshow = ko.observable(0);
        o.starttime = ko.observable(0);
        o.stoptime = ko.observable(0);
        o.suggestions = ko.observableArray(tagOptions);
        o.id = self.getTimerId();
        o.datestart = (new Date)
        
        var new_a = self.timer();
        new_a.push(o);
        self.timer(new_a);
      };
      self.addTimerClick();

      self.deleteWorklog = function(e,d,c){
          var timer_ar = self.timer();
          timer_ar = timer_ar.filter(e => {
              return !(e.id==d.id)
            });
          self.timer(timer_ar);
      }



      self.commitWorklogClick = function(e,d,c,b){
        
        if(d.task().trim().length>0&&d.time()>0&&d.wodesc().length>0){
            StorageService.setActiveProjectId(c.$root.suggestions().filter((e) => {return e.value==d.task()})[0].issue.fields.project.id);
            StorageService.setActiveIssueKey(d.task());
            
            var worklog = {
                author: {
                    name: StorageService.getUser().name
                },
                issue: {
                    projectId: StorageService.getActiveProjectId(),
                    key: StorageService.getActiveIssueKey(),
                    remainingEstimateSeconds: 0
                },
                timeSpentSeconds: (d.time()*60),
                dateStarted: (d.datestart.toISOString()),
                comment: d.wodesc()
            };

            console.log(worklog);
            WorklogService.createWorklog(worklog);
            

    
        }else{
            console.log("error");
        }
      }

      
      self.handleAttached = function() {
        
      };
      this.handleActivated = function(info){
        if(app.action == 'createtask'){
            self.addTimerClick();
            app.action = ''
            delete app.taskdata;

        }else{

            app.projectid = StorageService.getActiveProjectId();
            app.filter = StorageService.getActiveFilter();

            setTimeout(function(){if($('#popup1').length>0){$('#popup1')[0].open()}},0);
            if(app.projectid && app.filter &&app.filter.length>0){
                IssueService.getIssuesByProjectAndJQL(app.projectid,app.filter).then(issues =>{
                    var tagOptions = [];
                    $.each(issues.issues, function(i, val) {
                    var item = {"value": val.key, "label": val.key +'-'+val.fields.summary};
                    item.issue = val;
                    tagOptions.push(item);
                    
                    });
                    self.suggestions(tagOptions);
                    app.suggestions = self.suggestions;
                    setTimeout(function(){if($('#popup1').length>0){$('#popup1')[0].close()}},0);
                },()=>{
                    setTimeout(function(){if($('#popup1').length>0){$('#popup1')[0].close()}},0); 
                })
            }else if(app.lastselection='project' && app.projectid){
                IssueService.getIssuesByProject(app.projectid).then(issues => {
                    var tagOptions = [];
                    $.each(issues.issues, function(i, val) {
                    var item = {"value": val.key, "label": val.key +'-'+val.fields.summary};
                    item.issue = val;
                    tagOptions.push(item);
                    
                    });
                    self.suggestions(tagOptions);
                    app.suggestions = self.suggestions;
                    setTimeout(function(){if($('#popup1').length>0){$('#popup1')[0].close()}},0);
                },()=>{
                    setTimeout(function(){if($('#popup1').length>0){$('#popup1')[0].close()}},0);
                })
            }else if(app.filter &&app.filter.length>0){
                console.log(self.app.filter)
                IssueService.getIssuesByFilter(app.filter).then(issues => {
                    var tagOptions = [];
                    $.each(issues.issues, function(i, val) {
                    var item = {"value": val.key, "label": val.key +'-'+val.fields.summary};
                    item.issue = val;
                    tagOptions.push(item);
                    
                    });
                    self.suggestions(tagOptions);
                    app.suggestions = self.suggestions;
                    setTimeout(function(){if($('#popup1').length>0){$('#popup1')[0].close()}},0);
                },()=>{
                    setTimeout(function(){if($('#popup1').length>0){$('#popup1')[0].close()}},0);
                })
                
                
            }else{
                IssueService.getIssues().then(issues => {
                    var tagOptions = [];
                    $.each(issues.issues, function(i, val) {
                        var item = {"value": val.key, "label": val.key +' - '+ val.fields.summary};
                        item.issue = val;
                        tagOptions.push(item);
                    
                    });
                    self.suggestions(tagOptions);
                    app.suggestions = self.suggestions;
                    setTimeout(function(){if($('#popup1').length>0){$('#popup1')[0].close()}},0);
                },()=>{
                    setTimeout(function(){if($('#popup1').length>0){$('#popup1')[0].close()}},0);
                })
            }
        }
            
      }

    }

    return new DashboardViewModel();
  }
);
