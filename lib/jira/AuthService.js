define([
    './apis/JiraApi',
    './StorageService'
],function(JiraApi,StorageService){
    function isAuth() {
        return JiraApi.isAuth();
    }
    
    function loginWithCredentials(instanceURL, username, password) {
        return JiraApi.loginWithCredentials(instanceURL, username, password)
            .then(response => {
                StorageService.setUser(response);
                //window.eventEmitter.emitEvent('userHasLogged', [response]);
            });
    }

    var object = {};
    object.isAuth = isAuth;
    object.loginWithCredentials = loginWithCredentials;
    return object;
})


