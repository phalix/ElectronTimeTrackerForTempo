define(
    ['./apis/JiraApi'],
    function(JiraApi){
    
    var o = {};
    o.getFilter = function(){
        return JiraApi.getFilter();
    }
    
    
    return o;
});