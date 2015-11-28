Meteor.publish('dares',function(userdId){
	// Only sending documents from collection with current users id 
	return Dares.find({user:userdId});
});

Dares.allow({
	insert: function(userdId, doc){
		return true;
	},

	update: function(){
		return true;
	}
});