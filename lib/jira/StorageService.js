define([],function(){
    var o = {};
    o.getActiveProjectId=function() {
        return localStorage.getItem('activeProjectId');
    }
    
    o.setActiveProjectId=function(id) {
        localStorage.setItem('activeProjectId', id);
    }
    
    o.getActiveProjectName=function() {
        return localStorage.getItem('activeProjectName');
    }
    
    o.setActiveProjectName=function(name) {
        localStorage.setItem('activeProjectName', name);
    }
    
    o.getActiveIssueId=function() {
        return localStorage.getItem('activeIssueId');
    }
    
    o.setActiveIssueId=function(id) {
        localStorage.setItem('activeIssueId', id);
    }
    
    o.getActiveIssueKey=function() {
        return localStorage.getItem('activeIssueKey');
    }
    
    o.setActiveIssueKey=function(key) {
        localStorage.setItem('activeIssueKey', key);
    }
    
    o.getActiveDate=function() {
        return localStorage.getItem('activeDate');
    }
    
    o.setActiveDate=function(date) {
        localStorage.setItem('activeDate', date);
    }
    
    o.getActiveComment=function() {
        return localStorage.getItem('activeComment');
    }
    
    o.getActiveFilter=function() {
        return localStorage.getItem('activeFilter');
    }

    o.setFilter = function(in_arr){
        localStorage.setItem('filter',in_arr)
    }

    o.getFilter = function(){
        return localStorage.getItem('filter')
    }
    
    o.setActiveComment=function(comment) {
        localStorage.setItem('activeComment', comment);
    }
    
    o.setActiveFilter=function(filter) {
        localStorage.setItem('activeFilter', filter);
    }
    
    o.clearActiveTimer=function() {
        localStorage.removeItem('activeProjectId');
        localStorage.removeItem('activeProjectName');
        localStorage.removeItem('worklogProjectId');
        localStorage.removeItem('worklogProjectName');
        localStorage.removeItem('activeIssueId');
        localStorage.removeItem('activeIssueKey');
        localStorage.removeItem('activeComment');
        localStorage.removeItem('activeDate');
        localStorage.removeItem('dateStartMoment');
        localStorage.removeItem('datePauseMoment');
        localStorage.setItem('viewType', 'timer');
    }
    
    o.getWorklogProjectId=function() {
        return localStorage.getItem('worklogProjectId');
    }
    
    o.setWorklogProjectId=function(id) {
        localStorage.setItem('worklogProjectId', id);
    }
    
    o.getWorklogProjectName=function() {
        return localStorage.getItem('worklogProjectName');
    }
    
    o.setWorklogProjectName=function(name) {
        localStorage.setItem('worklogProjectName', name);
    }
    
    o.getWorklogIssueId=function() {
        return localStorage.getItem('worklogIssueId');
    }
    
    o.setWorklogIssueId=function(id) {
        localStorage.setItem('worklogIssueId', id);
    }
    
    o.getWorklogIssueKey=function() {
        return localStorage.getItem('worklogIssueKey');
    }
    
    o.setWorklogIssueKey=function(key) {
        localStorage.setItem('worklogIssueKey', key);
    }
    
    o.getDateStartMoment=function() {
        return localStorage.getItem('dateStartMoment');
    }
    
    o.setDateStartMoment=function(moment) {
        localStorage.removeItem('datePauseMoment');
        localStorage.setItem('dateStartMoment', moment);
    }
    
    o.getDatePauseMoment=function() {
        return localStorage.getItem('datePauseMoment');
    }
    
    o.setDatePauseMoment=function(moment) {
        localStorage.setItem('datePauseMoment', moment);
    }
    
    o.setTimeSpentInSeconds=function(timeSpentInSeconds) {
        localStorage.setItem('timeSpentInSeconds', timeSpentInSeconds);
    }
    
    o.getTimeSpentInSeconds=function() {
        return localStorage.getItem('timeSpentInSeconds');
    }
    
    o.getApiKey=function() {
        return localStorage.getItem('apiKey');
    }
    
    o.setApiKey=function(apiKey) {
        localStorage.setItem('apiKey', apiKey);
    }
    
    o.getInstanceURL=function() {
        return localStorage.getItem('instanceURL');
    }
    
    o.setInstanceURL=function(instanceURL) {
        localStorage.setItem('instanceURL', instanceURL);
    }
    
    o.getUser=function() {
        return JSON.parse(localStorage.getItem('user'));
    }
    
    o.setUser=function(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    
    o.logout=function() {
        localStorage.removeItem('user');
        localStorage.removeItem('apiKey');
        localStorage.removeItem('worklogProjectId');
        localStorage.removeItem('worklogProjectName');
        localStorage.removeItem('worklogIssueId');
        localStorage.removeItem('worklogIssueKey');
        localStorage.removeItem('viewType');
        location.reload();
    }
    
    o.getSettings=function() {
        return JSON.parse(localStorage.getItem('settings'));
    }
    
    o.setSettings=function(settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
    }
    
    // TODO: Make a Singleton for the timer
    o.startTimer=function() {
        unpauseTimer();
        localStorage.setItem('isTimerStarted', true);
    }
    
    o.stopTimer=function() {
        localStorage.setItem('isTimerStarted', false);
        localStorage.setItem('isTimerPaused', false);
    }
    
    o.pauseTimer=function() {
        localStorage.setItem('isTimerPaused', true);
    }
    
    o.unpauseTimer=function() {
        localStorage.setItem('isTimerPaused', false);
    }
    
    o.isTimerStarted=function() {
        return localStorage.getItem('isTimerStarted');
    }
    
    o.isTimerPaused=function() {
        return localStorage.getItem('isTimerPaused');
    }
    
    o.getViewType=function() {
        return localStorage.getItem('viewType');
    }
    
    o.setViewType=function(viewType) {
        localStorage.setItem('viewType', viewType);
    }
    return o;
})


