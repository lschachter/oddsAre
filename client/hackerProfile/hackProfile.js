Template.hackerProfile.events({
	"click #submit-btn": function(event,template){
		let name = template.find('#name').value;
		let pseudo = template.find('#pseudo').value;
		let email = template.find('#email').value;
		let hack = template.find('#hack').value;


		Meteor.call("addHacker",name,pseudo,email,hack);

	}

});


Template.hackerProfile.helpers({
	'myHackers': function(){
		return Hackers.find().fetch();
	}
})