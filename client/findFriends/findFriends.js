Template.findFriends.helpers({
	users: function(){
		friends = ReactiveMethod.call("getUsers");
    	return friends;

    },
    oddsAre: function(){
    	let thisDare = ReactiveMethod.call('getCurrentDare');
    	Session.set("thisDare", thisDare._id);
    	return thisDare.challenge;
    }
});

Template.findFriends.events({
	"click #submit-friends":function(event){
		event.preventDefault();
		let nums = Session.get("indexes");
		if (nums != undefined && nums != []){
			for (let i= 0; i < nums.length; i++){
				Meteor.call("addSent", Session.get("thisDare"), friends[nums[i]]._id);
			}
		}
		Router.go('/writeDare');

	},
	"click #submit-cancel":function(event){
		event.preventDefault();
		Meteor.call("deleteDare");
		Router.go('/writeDare');
	},
	"click .toggle-checked":function(event){
		let nums = Session.get("indexes");
		if (nums == undefined){
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