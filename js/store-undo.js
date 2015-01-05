(function(Reflux, TodoActions, UndoActions, global) {
    'use strict';

    // some variables and helpers for our fake database stuff
    var localStorageKey = "todosRemoved";

    function getItemByKey(list,itemKey){
        return _.find(list, function(item) {
            return item.key === itemKey;
        });
    }
	
    global.todoListUndoStore = Reflux.createStore({
        init: function(){
            this.getDefaultData();
        },
        // this will set up listeners to all publishers in TodoActions, using onKeyname (or keyname) as callbacks
        listenables: [TodoActions,UndoActions],
        onUndoRemove: function() {
            var itemsToUndo = this.list.pop();
            this.updateList(this.list);
            _.map(itemsToUndo, function(itemToUndo) {
                TodoActions.addItem(itemToUndo.label);
            });

        },
        onItemsRemoved: function(list) {
            this.list.push(list);
            this.updateList(this.list);
        },
        // called whenever we change a list. normally this would mean a database API call
        updateList: function(list){
            localStorage.setItem(localStorageKey, JSON.stringify(list));
            // if we used a real database, we would likely do the below in a callback
            this.list = list;
            this.trigger(list); // sends the updated list to all listening components (TodoApp)
        },
        // this will be called by all listening components as they register their listeners
        getDefaultData: function() {
            var loadedList = localStorage.getItem(localStorageKey);
            if (!loadedList) {
                // If no list is in localstorage, start out with a default one
                this.list = [];
            } else {
                this.list = JSON.parse(loadedList);
            }
            return this.list;
        }
    });

})(window.Reflux, window.TodoActions,window.UndoActions, window);
