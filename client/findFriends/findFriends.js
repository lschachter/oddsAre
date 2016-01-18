//Methods Called:
	//getUsers
	//makeDare
Template.findFriends.helpers({
	//currently presents all users as friends
	users: function(){
		friends = ReactiveMethod.call("getUsers");
    	return friends;

    },
    //returns the most recent challenge made by the user
    oddsAre: function(){
    	return Session.get("challenge");
    }
});

Template.findFriends.events({
	"click #submit-friends":function(event){
		event.preventDefault();
		let nums = Session.get("indexes");
		if (nums != undefined && nums != []){
			for (let i= 0; i < nums.length; i++){
				Meteor.call("makeDare", Session.get("challenge"), friends[nums[i]]._id);
			}
		}
		Session.set("challenge",undefined);
		delete Session.keys['challenge'];
		Session.set("indexes",undefined);
		delete Session.keys['indexes'];
		Router.go('/writeDare');

	},
	"click #submit-cancel":function(event){
		event.preventDefault();
		Session.set("challenge",undefined);
		delete Session.keys['challenge'];
		Session.set("indexes",undefined);
		delete Session.keys['indexes'];
		Router.go('/writeDare');
	},
	"click .toggle-checked":function(event){
		let nums = Session.get("indexes");
		if (nums == undefined || nums == []){
			Session.set("indexes",[event.target.value]);
		}
		else if (nums.indexOf(event.target.value) == -1){
			nums.push(event.target.value);
			Session.set("indexes", nums);
		}
		else{
			nums.splice(nums.indexOf(event.target.value),1);
			Session.set("indexes", nums);
		}
	}
});