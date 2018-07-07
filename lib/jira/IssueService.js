define(['./apis/JiraApi'],function(JiraApi){
    
    var o = {};
    
    o.getIssue = function(issueId){
        return JiraApi.getIssue(issueId);
    }
    
    o.getIssuesByProject = function(projectId){
        return JiraApi.getIssuesByProject(projectId);
    }

    o.getIssues = function(projectId){
        return JiraApi.getIssues();
    }

    o.getIssuesByFilter = function(filterLine){
        return JiraApi.getIssuesByFilter(filterLine);
    }

    o.getIssuesByProjectAndJQL = function(projectId,JQL){
        return JiraApi.getIssuesByProjectAndJQL(projectId,JQL);
    }


    
    o.getIssuesByPRIDorFID= function(projectId,filterId){
        return JiraApi.getIssuesByPRIDorFID(projectId,filterId);
    }
    return o;
})





