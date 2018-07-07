/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', './appController',
'../../lib/jira/FilterService',
'../../lib/jira/StorageService',
'ojs/ojlistview','promise','ojs/ojarraydataprovider',
'ojs/ojknockout','ojs/ojinputtext','ojs/ojcheckboxset'],
 function(oj, ko, $, app, FilterService,StorageService) {
  
    function FilterViewModel() {
      
      var self = this;
     
      self.filter_internal = ko.observableArray([])
      self.filter = new oj.ArrayDataProvider(self.filter_internal,{'keyAttributes': 'id'});
      self.selectedItems = ko.observableArray([]);

    self.handleSelectionChanged = function(e,d){
        app.filterid = e.detail.value[0];
        app.lastselection = 'filter';
        
    }

    self.optionChange = function(e,d,c,b){
        var arr_new = self.filter_internal();
        for(var i= 0;i<arr_new.length;i++){
            if(arr_new[i].id!=d.id){
                arr_new[i].selected = [];
            }else{
                if(d.selected.length==0){
                    arr_new[i].selected = ["selected"];    
                }else{
                    arr_new[i].selected = [];
                }
                
            }
        }
        self.filter_internal(arr_new);
        if(d.selected[0]=="selected"){
            app.filterid = d.id;
            app.filter = d;
            StorageService.setActiveFilter(d.line);
        }else{
            app.lastselection = '';
            app.filterid = undefined;
            StorageService.setActiveFilter("");
        }
        
        /*if(e.detail.items==null){
            app.lastselection = '';
            app.filterid = undefined;
            StorageService.setActiveFilter("");
        }else{
            var set = $(e.target).find("oj-checkboxset");
            for(var i = 0;i<set.length;i++){
                if($(e.detail.items[0]).find("oj-checkboxset")[0].id == set[i].id){
    
                }else{
                    set[i].value=[]
                }
                
            } 

            self.selectedItems(e.detail.value);
            app.filterid = self.selectedItems()[0];
            app.filter = self.filter_internal().filter((elem)=> {
                if(elem.id == app.filterid)return true;
            })
            app.lastselection = 'filter';
            
            if(app.filter.length==0){
                app.lastselection = '';
                app.filterid = undefined;
                StorageService.setActiveFilter("");
            }else{
                StorageService.setActiveFilter(app.filter[0].line);
            }
        }*/
    }

    self.addFilter = function(e,d){
        var arr_new = self.filter_internal();
        var o_new = {};
        o_new.id = self.newFilterId();
        o_new.line = "assignee = currentUser()";
        o_new.selected=[];
        arr_new.push(o_new);
        self.filter_internal(arr_new);
    }

    self.deleteFilter = function(e,d){
        var out_array = self.filter_internal();
        out_array = out_array.filter((e) => {return e.selected.length>0 ?(false):(true)})
        self.filter_internal(out_array);
    }
    self.newFilterId = function(){
        return (self.filter_internal().map(e => {return e.id}).reduce(
            (a,b) => {return Math.max(a,b)},0
        )+1)
    }

      self.handleAttached = function(info) {
        var filter = StorageService.getFilter();
        if(filter&&filter.length>0){
            self.filter_internal(JSON.parse(filter));
        }
        
        

      };

      self.handleDetached = function(info){
        StorageService.setFilter(JSON.stringify(self.filter_internal()));
        
      }

    }

    return new FilterViewModel();
  }
);
