Meteor.methods({
	addDare: function(dare){
		if (!this.userId){
			console.log('Not Logged In');
		}
		else{
			Dares.insert({
				'challenge': dare,
				'createdAt': new Date(),
				'creator': Meteor.userId(),
				'userName': Meteor.user().username
			});
		}
	},
	addSent: function(thisDare, friendly){
		Dares.update(
			{_id: thisDare},
			{$push: {sendTo: { $each: [friendly] }}}
		);
	},
	getCurrentDare: function(){
		return Dares.findOne({userName: Meteor.user().username}, {sort: {createdAt: -1}});
	},
	getUsers: function(){
		if (!this.userId){
			console.log('Not Logged In');
			return null;
		}
		else{
			return Meteor.users.find().fetch();
		}
	},
	getClickedDare: function(dareId){
		if (!this.userId){
			console.log('Not Logged In');
			return null;
		}
		else{
			console.log(dareId);
			return Dares.findOne({_id:dareId});
		}
	},
	maxDare: function(dareId, number){
		if (!this.userId){
			console.log('Not Logged In');
		}
		else{
			Dares.update(
				{_id: dareId},
				{$set: {max: number}}
			);
		}
	},
	getDaresReceived: function(){
		if (!this.userId){
			console.log('Not Logged In');
			return null;
		}
		else{
			//must take in list of friends as limiter as well
			return Dares.find({sendTo:{$regex:Meteor.userId()}}).fetch();
		}
	},
	getUsersSent: function(dareId){
		if (!this.userId){
			console.log('Not Logged In');
			return null;
		}
		else{
			let sents = Dares.findOne({_id:dareId}).sendTo;
			return Meteor.users.find({_id: { $in: sents}}).fetch();
		}
	},
	getDareWaiting: function(dareId){
		if (!this.userId){
			console.log('Not Logged In');
			return null;
		}
		else{
			return Dares.findOne({_id:dareId}).challenge;
		}
	},
	getDaresSent: function(){
		if (!this.userId){
			console.log('Not Logged In');
			return null;
		}
		else{
			return Dares.find({creator:Meteor.userId()}).fetch();
		}
	},
	deleteDare: function(){
		Dares.remove(Dares.findOne({userName: Meteor.user().username}, {sort: {createdAt: -1}}));
	}
});