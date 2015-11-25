Meteor.methods({
	addHacker: function(name,pseudo,email,hack){
		//console.log(this.userId);
		if(!this.userId){
			console.log('Not Logged In');
		} else {

		Hackers.insert({
			'name': name,
			'pseudo': pseudo,
			'email': email,
			'hack': hack,
			'user': this.userId
		});
		}
	}
});