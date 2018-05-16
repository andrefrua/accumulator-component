app.models.ToDo = Backbone.Model.extend({
    defaults: {
        title: "ToDo",
        archived: false,
        done: false,
        isMarked: false,
        isSelected: false
    }
});
