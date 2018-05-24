/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var Todo = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			completed: false,
			selected: false,
		},

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.set('completed', !this.get('completed'));
		},

		// Toggle selected
		toggleSelected: function() {
			this.set('selected', !this.get('selected'));
		}
	});

	return Todo;
});
