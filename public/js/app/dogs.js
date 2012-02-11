(function ($) {

	// MODELS
	window.Elements = Backbone.Model.extend({});
	
	window.ElementCollection = Backbone.Collection.extend({
		model: Elements
	});

	
	// GLOBAL DATA
	window.Elements = new ElementCollection();
	
	
	// VIEWS - these need to be put in document.ready because they use $ to get the template
	$(document).ready(function() {
		
		// VIEWS
		console.log("Entering View's section of dogs.js");
		window.ElementView = Backbone.View.extend({
			tagName:"li",
			
			// Cache the template function for a single item.
			template: _.template($('#element-template').html()),
			
			initialize: function() {
				_.bindAll(this, 'render');
			},
			
			render: function() {
				console.log("Rendering element :" + this.model.attributes.name);
				this.$el.html(this.template(this.model.toJSON()));
				return this;
			}
		});
		
		console.log("Declaring AppView");
		window.AppView = Backbone.View.extend({
			el: "#playground",
			collection: window.Elements,
			
			initialize: function() {
				console.log("initializing AppView");
				_.bindAll(this, 'appendItem', 'appendItems'); // remember: every function that uses 'this' as the current object should be in here

				this.collection.bind('reset', this.appendItems); // collection event binder
				this.collection.bind('add', this.appendItem);
			},
			
			appendItem: function(item) {
			  var elementView = new ElementView({ model: item });
			  $(this.el).append(elementView.render().el);
			},
		
			appendItems: function(collection) {
				for(index in collection.models) // I would like to do this using an each or other itterator method
				{
					this.appendItem(collection.at(index));
				}
			}
		});
		
        console.log("Creating app");
        window.App = new AppView();
        window.Elements.reset(window.bootstrap.dogs); // kick off the rendering
	});
	
})(jQuery);