
define(['../../lodash','./../StorageService','./AtlassianHttp','./../WorklogService'],
function(_,StorageService,Http,WorklogService){
    var o = {};
    const URL = Http.API_TYPE + '/api/2';
    const PROJECT_ENDPOINT = '/project';
    const ISSUE_ENDPOINT = '/issue';
    const USER_ENDPOINT = '/myself';
    const FILTER_ENDPOINT = '/filter';
    
    o.loginWithCredentials=function(instanceURL, username, password) {
        const apiKey = Http.createApiKeyFromCredentials(username, password);
        const options = Http.buildHeadersWithApiKey(apiKey);
    
        return Http.get(instanceURL + URL + USER_ENDPOINT, options)
            .then(response => {
                StorageService.setApiKey(apiKey);
                StorageService.setInstanceURL(instanceURL);
                return response.json();
            })
            .catch(() => Promise.reject({
                message: 'Login failed'
            }));
    }
    
    o.isAuth = function() {
        return !_.isEmpty(StorageService.getApiKey() && StorageService.getUser());
    }
    
    o.getFilter = function() {
        return Http.get(StorageService.getInstanceURL() + URL + FILTER_ENDPOINT, Http.buildOptions())
            .then(response => response.json());
    }

    o.getProjects = function() {
        return Http.get(StorageService.getInstanceURL() + URL + PROJECT_ENDPOINT, Http.buildOptions())
            .then(response => response.json());
    }
    
    o.getLatestProjects = function() {
        const latestProjects = [];
        const latestProjectsIds = [];
        return WorklogService.getLatestWorklogs().then(worklogs => {
            worklogs.forEach(worklog => {
                if (!latestProjectsIds.includes(worklog.issue.projectId)) {
                    const project = this.getProject(worklog.issue.projectId).then(p => p);
                    latestProjectsIds.push(worklog.issue.projectId);
                    latestProjects.push(project);
                }
            });
            return Promise.all(latestProjects);
        });
    }
    
    o.getProject = function(projectId) {
        const projectEndpoint = '/' + projectId;
        return Http.get(StorageService.getInstanceURL() + URL + PROJECT_ENDPOINT + projectEndpoint, Http.buildOptions())
            .then(response => response.json());
    }
    
    o.getIssues = function(){
        const searchQuery = '/search?maxResults=10';
        return Http.get(StorageService.getInstanceURL() + URL + searchQuery, Http.buildOptions())
            .then(response => response.json());
    }

    o.getIssuesByProject = function(projectId) {
        const searchQuery = '/search?jql=project=' + projectId + '&maxResults=100';
        return Http.get(StorageService.getInstanceURL() + URL + searchQuery, Http.buildOptions())
            .then(response => response.json());
    }

    o.getIssuesByProjectAndJQL = function(projectId,jql) {
        const searchQuery = '/search?jql=project=' + projectId+' AND '+jql + '&maxResults=100';
        return Http.get(StorageService.getInstanceURL() + URL + searchQuery, Http.buildOptions())
            .then(response => response.json());
    }

    o.getIssuesByFilter = function(filter){
        const searchQuery = '/search?jql=' + filter + '&maxResults=100';
        return Http.get(StorageService.getInstanceURL() + URL + searchQuery, Http.buildOptions())
            .then(response => response.json());
    }
    
    o.getIssuesByPRIDorFID = function(projectId,filterId) {
        var query = "";
        if(projectId&&projectId!="undefined"){
            var proj = "project="+projectId;
        }
        if(filterId){
            var fil = "filter="+filterId;
        }
        if(projectId&&projectId!="undefined"){
            query = proj;   
        }
        if(filterId&&filterId!="undefined"){
            query = fil;
        }
        if(proj&&fil){
            query = proj+"%20AND%20"+fil
        }
        
        const searchQuery = '/search?jql=' + query + '&maxResults=1000';
        return Http.get(StorageService.getInstanceURL() + URL + searchQuery, Http.buildOptions())
            .then(response => response.json());
    }
    
    o.getIssue = function(issueId) {
        const issueEndpoint = '/' + issueId;
        return Http.get(StorageService.getInstanceURL() + URL + ISSUE_ENDPOINT + issueEndpoint, Http.buildOptions())
            .then(response => response.json());
    }

    return o;
    
})


