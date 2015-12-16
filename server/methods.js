Meteor.methods({
	//makes # of dares = # of people chosen
	//called from: findFriends
	makeDare: function(newChallenge, friendly){
		if (!this.userId){
			console.log('Not Logged In');
		}
		else{
			Dares.insert({
				'challenge': newChallenge,
				'createdAt': new Date(),
				'creator': Meteor.userId(),
				'userName': Meteor.user().username,
				'sendTo': friendly
			});
		}
	},
	//returns the user connected to that id
	//called from: daresReceived
	getUser: function(friendId){
		if (!this.userId){
			console.log('Not Logged In');
			return null;
		}
		else{
			return Meteor.users.findOne({_id: friendId});
		}
	},
	//will eventually return users that are friends with current user
	//called from: findFriends
	getUsers: function(){
		if (!this.userId){
			console.log('Not Logged In');
			return null;
		}
		else{
			return Meteor.users.find().fetch();
		}
	},
	//creates the max field for that dare
	//called from: read
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
	//adds the numbers chosen to the dare
	//called from: read
	addOdds: function(dareId,whichPlayer, number){
		if (!this.userId){
			console.log('Not Logged In');
		}
		else{
			let thisDare = Dares.findOne({_id:dareId});
			if (whichPlayer == thisDare.creator){
				Dares.update(
					{_id:dareId},
					{$set: {creatorOdds: number}}
				);
			}
			else{
				Dares.update(
					{_id:dareId},
					{$set: {receiverOdds: number}}
				);
			}
		}
	},
	//if max exists, returns it, else returns false
	//called from: read
	getMax: function(dareId){
		if (!this.userId){
			console.log('Not Logged In');
			return -1;
		}
		else{
			let dare = Dares.findOne({_id: dareId});
			if (dare.max != undefined){
				return dare.max;
			}
			else{
				return 0;
			}
		}
	},
	//returns all dares that you need to act upon
	//called from: daresReceived
	getDaresReceived: function(){
		if (!this.userId){
			console.log('Not Logged In');
			return null;
		}
		else{
			//must take in list of friends as limiter as well
			//return: your dares where max is true;
				//dares you were sent where max is false
			return Dares.find(
				{$and: [
					{$or: [
						{sendTo:Meteor.userId()},
						{$and: [
							{creator: Meteor.userId()},
							{max: {$exists: true}}
						]}
					]},
					{$or:[
						{receiverOdds: {$exists: false}},
						{creatorOdds: {$exists:false}}
					]}
				]},
			{sort: {createdAt: -1}}
			).fetch();
		}
	},
	//returns all dares you are connected to that are waiting for actions
	//called from: daresReceived
	getPendingDares: function(){
		if (!this.userId){
			console.log('Not Logged In');
			return null;
		}
		else{
			//return: dares you were sent where max is false;
				//your dares where max is true
			return Dares.find(
				{$and: [
					{$or: [
						{$and: [
							{creator:Meteor.userId()},
							{max: {$exists: false}}
						]},
						{$and: [
							{sendTo:Meteor.userId()},
							{max: {$exists: true}}
						]}
					]},
					{$or: [
						{receiverOdds: {$exists: false}},
						{creatorOdds: {$exists:false}}
					]}
				]},
			{sort: {createdAt: -1}}
			).fetch();
		}
	},
	//returns challenge from the dare waiting for your action
	//called from: readWaiting
	getDareWaiting: function(dareId){
		if (!this.userId){
			console.log('Not Logged In');
			return null;
		}
		else{
			return Dares.findOne({_id:dareId});
		}
	}
});