(function(React, UndoActions, todoListUndoStore, global) {
    
    var UndoRemove = React.createClass({
        mixins: [Reflux.connect(todoListUndoStore,"list")],
        getInitialState: function() {
            return {
                list: []
            };
        },
        handleUndo: function() {
            UndoActions.undoRemove();
        },
        render: function() {
            var classes = React.addons.classSet({
                "hidden": this.state.list.length < 1
            });

            return (
                <div id="undo" className={classes}>
                    <a onClick={this.handleUndo}>Undo ({this.state.list.length})</a>
                </div>
            );
        }
    });
    
    React.render(
        <UndoRemove />,
        document.getElementById('undocontainer')
    );
})(window.React, window.UndoActions, window.todoListUndoStore, window);