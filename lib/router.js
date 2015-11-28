Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/send',{
	name: 'sendDare',
	waitOn: function(){
		return Meteor.subscribe('dares', Meteor.userId());
	}

});

Router.route('/odds',{name: 'sendOdds'});
Router.route('/pickNum',{name: 'pickNum'});

