Meteor.publish('hackersList',function(userdId){
	// Only sending documents from collection with current users id 
	return Hackers.find({user:userdId});
});

Hackers.allow({
	insert: function(userdId, doc){
		return true;
	},

	update: function(){
		return true;
	}
});