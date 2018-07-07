define(
    ['./apis/JiraApi'],
    function(JiraApi){
    
    var o = {};
    o.getProjects = function(){
        return JiraApi.getProjects();
    }
    
    o.getLatestProjects = function(){
        return JiraApi.getLatestProjects();
    }
    
    o.getProject = function(projectId){
        return JiraApi.getProject(projectId);
    }
    
    return o;
});