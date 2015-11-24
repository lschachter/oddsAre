Meteor.publish('hackersList',function(){
	return Hackers.find();
});

Hackers.allow({
	insert: function(userdId, doc){
		return true;
	},

	update: function(){
		return true;
	}
});