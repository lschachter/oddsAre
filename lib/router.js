Router.route('/hackerProfile', {
	name: 'hackerProfile',
	waitOn: function(){
		return Meteor.subscribe('hackersList');
	}

});
Router.route('/',{name:'new'});
