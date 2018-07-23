

define([
    './apis/TempoApi'
],function(TempoApi){
    var moment = [];//require.nodeRequire('moment');
    var momentDurationFormatSetup = [];//require.nodeRequire('moment-duration-format');
    var DateUtils = [];//require.nodeRequire('dateutils');
    var o = {};
    o.createWorklog=function(worklog) {
        return TempoApi.createWorklog(worklog);
    }
    
    o.updateWorklog = function(worklogId, worklog) {
        return TempoApi.updateWorklog(worklogId, worklog);
    }
    
    o.deleteWorklog=function(worklogId) {
        return TempoApi.deleteWorklog(worklogId);
    }
    
    o.getLatestWorklogs = function() {
        return TempoApi.getWorklogs(getTwoWeeksAgo(), getToday());
    }
    
    o.getTodayWorklogs = function() {
        return TempoApi.getWorklogs(getToday(), getToday());
    }
    
    o.getYesterdayWorklogs = function() {
        return TempoApi.getWorklogs(getYesterday(), getYesterday());
    }
    
    o.getRemainingWeekWorklogs = function() {
        if (getTodayWeekday() <= 1) {
            return Promise.resolve([]);
        }
        return TempoApi.getWorklogs(getStartOfWeek(), getTwoDaysAgo());
    }
    
    o.getLastWeekWorklogs = function() {
        return TempoApi.getWorklogs(getLastWeekStartOfWeek(), getLastWeekEndOfWeek());
    }
    
    o.getTimeSpentInHours = function(timeSpentSeconds) {
        return moment.duration(timeSpentSeconds, 'seconds').format(DateUtils.DateFormat.TIME, { trim: false });
    }
    
    o.getTodayTotalTime = function() {
        return TempoApi.getWorklogs(getToday(), getToday()).then(worklogs => calculateTotalTime(worklogs));
    }
    
    o.getWeekTotalTime = function() {
        return TempoApi.getWorklogs(getStartOfWeek(), getEndOfWeek()).then(worklogs => calculateTotalTime(worklogs));
    }
    
    o.getLastWeekTotalTime = function() {
        return getLastWeekWorklogs().then(worklogs => calculateTotalTime(worklogs));
    }
    
    function calculateTotalTime(worklogs) {
        let totalTime = 0;
    
        worklogs.map((entry) => (
            totalTime += entry.timeSpentSeconds
        ));
    
        return getTimeSpentInHours(totalTime);
    }
    
    function getToday() {
        return moment();
    }
    
    function getTodayWeekday() {
        return moment().weekday();
    }
    
    function getYesterday() {
        return moment().subtract(1, 'day');
    }
    
    function getTwoDaysAgo() {
        return moment().subtract(2, 'days');
    }
    
    function getStartOfWeek() {
        return moment().startOf('week');
    }
    
    function getEndOfWeek() {
        return moment().endOf('week');
    }
    
    function getLastWeek() {
        return moment().subtract(1, 'week');
    }
    
    function getLastWeekStartOfWeek() {
        return moment().subtract(1, 'week').weekday(0);
    }
    
    function getLastWeekEndOfWeek() {
        return moment().subtract(1, 'week').weekday(6);
    }
    
    function getTwoWeeksAgo() {
        return moment().subtract(2, 'weeks');
    }

    return o;
})




