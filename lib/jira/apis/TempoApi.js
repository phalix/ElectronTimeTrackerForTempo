


define([
'./AtlassianHttp',
'./../StorageService'
],function(Http,StorageService){
    var DateUtils =  [];//require.nodeRequire('dateutils');
    var o = {};
    const BASE_URL = StorageService.getInstanceURL() + Http.API_TYPE + '/tempo-timesheets/3';
    const WORKLOGS_ENDPOINT = '/worklogs';
    o.createWorklog = function(worklog){
        const url = BASE_URL + WORKLOGS_ENDPOINT;
        return Http.requestMethod('POST', url, worklog);
    }
    
    o.updateWorklog = function(worklogId, worklog){
        const url = BASE_URL + WORKLOGS_ENDPOINT + '/' + worklogId;
        return Http.requestMethod('PUT', url, worklog);
    }
    
    o.deleteWorklog = function(worklogId){
        const url = BASE_URL + WORKLOGS_ENDPOINT + '/' + worklogId;
        return Http.requestMethod('DELETE', url);
    }
    
    o.getWorklogs = function(dateFrom, dateTo){
        const queryObject = {
            dateFrom: dateFrom ? formatDate(dateFrom) : undefined,
            dateTo: dateTo ? formatDate(dateTo) : undefined,
        };
        const queryString = Http.buildUrlQuery(queryObject);
    
        const url = BASE_URL + WORKLOGS_ENDPOINT + queryString;
        return Http.get(url, Http.buildOptions()).then(response => response.json());
    }
    
    function formatDate(date) {
        return DateUtils.formatDate(date, DateUtils.DateFormat.SHORT_DATE);
    }

    return o;
})





/*type Worklog = {
    id: number,
    comment: string,
    self: string, // url
    issue: {
        key: string,
        id: number,
        self: string,
        remainingEstimateSeconds: number,
        summary: string,
        issueType: {
            name: string,
            iconUrl: string
        },
        projectId: number
    },
    timeSpentSeconds: number,
    billedSeconds: number,
    dateStarted: string,
    author: {
        name: string,
        displayName: string,
        avatar: string, // url
        self: string // url
    },
    workAttributeValues: [{
        value: string,
        id: number,
        workAttribute: {
            name: string,
            key: string,
            id: number,
            type: {
                name: string,
                value: any,
                systemType: boolean
            },
            required: boolean,
            sequence: number,
            externalUrl: string,
        },
        worklogId: number
    }],
    meta: any
}
*/