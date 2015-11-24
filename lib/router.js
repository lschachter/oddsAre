Router.configure({
	layoutTemplate: 'layout'
});
Router.route('/', {
	name: 'hackerProfile',
	waitOn: function(){
		return Meteor.subscribe('hackersList', Meteor.userId());
	}

});
