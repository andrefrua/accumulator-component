app.views.list = Backbone.View.extend({
	mode: null,
	events: {
		'click a[data-up]': 'priorityUp',
		'click a[data-down]': 'priorityDown',
		'click a[data-archive]': 'archive',
		'click input[data-status]': 'changeStatus',
		'click li.cf': 'changeMarkedStatus',
		'dblclick li.cf': 'changeStatusFromDoubleClick',
	},
	initialize: function () {
		var handler = _.bind(this.render, this);
		this.model.bind('change', handler);
		this.model.bind('add', handler);
		this.model.bind('remove', handler);
	},
	render: function () {
		var htmlListNotDone = '<ul class="list-not-done">';
		var htmlListDone = '<ul class="list-done">';

		self = this;
		this.model.each(function (todo, index) {
			if (self.mode === "archive" ? todo.get("archived") === true : todo.get("archived") === false) {
				if (!todo.get("done")) {
					var template = _.template($("#tpl-list-item").html());
					htmlListNotDone += template({
						title: todo.get("title"),
						index: index,
						archiveLink: self.mode === "archive" ? "unarchive" : "archive",
						done: todo.get("done") ? "yes" : "no",
						doneChecked: todo.get("done") ? 'checked=="checked"' : "",
						isMarked: todo.get("isMarked") ? "yes" : "no",
					});
				} else {
					var template = _.template($("#tpl-list-item-done").html());
					htmlListDone += template({
						title: todo.get("title"),
						index: index,
						archiveLink: self.mode === "archive" ? "unarchive" : "archive",
						done: todo.get("done") ? "yes" : "no",
						doneChecked: todo.get("done") ? 'checked=="checked"' : "",
						isMarked: todo.get("isMarked") ? "yes" : "no",
					});
				}
			}
		});
		htmlListNotDone += '</ul>';
		htmlListDone += '</ul>';

		var html = '<div class="list-container">' + htmlListNotDone + htmlListDone + '</div>';
		this.$el.html(html); //USe sanitize
		this.delegateEvents();
		return this;
	},



















	priorityUp: function (e) {
		var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
		this.model.up(index);
	},
	priorityDown: function (e) {
		var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
		this.model.down(index);
	},
	archive: function (e) {
		var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
		this.model.archive(this.mode !== "archive", index);
	},
	changeStatus: function (e) {
		var index = parseInt(e.target.parentNode.parentNode.getAttribute("data-index"));
		this.model.changeStatus(e.target.checked, index);
	},
	changeStatusFromDoubleClick: function (e) {
		var index = parseInt(e.target.parentNode.getAttribute("data-index"));
		this.model.changeStatus(!e.target.children[0].checked, index);
	},
	changeMarkedStatus: function(e) {
		var index = parseInt(e.target.parentNode.getAttribute("data-index"));
		this.model.changeMarkedStatus(!e.target.children[0].checked, index);
	},
	setMode: function (mode) {
		this.mode = mode;
		return this;
	}
});
