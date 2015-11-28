Meteor.methods({
	setPrivate: function(dareId, setToPrivate){
	    let dare = Dares.findOne(dareId);

	    //Make sure only the owner can make a task private
	    if (dare.owner !== Meteor.userId()){
	      throw new Meteor.Error("not-authorized");
	    }
	    Dares.update(dareId, { $set: { private: setToPrivate}});
    },
	addDare: function(dare){
		if (!this.userId){
			console.log('Not Logged In');
		}
		else{
			Dares.insert({
				'dare': dare,
				'createdAt': new Date(),
				'creator': this.userId,
				//should also have set for friends 
				//receivind dare; ask how to use that
				'userName': Meteor.user.userName
			});
		}
	},
	sendOdds: function(odds){
		if (!this.userId){
			console.log('Not Logged In');
		}
		else{
			/*have to find way to send back to darer*/
			console.log(odds);
		}
	},
	compareNums: function(num){
		if (!this.userId){
			console.log('Not Logged In');
		}
		else{
			console.log(num);
		}
	}
});