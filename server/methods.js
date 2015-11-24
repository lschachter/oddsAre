Meteor.methods({
	addHacker: function(name,pseudo,email,hack){
		Hackers.insert({
			'name': name,
			'pseudo': pseudo,
			'email': email,
			'hack': hack
		});
	}
});