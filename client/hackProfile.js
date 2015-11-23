
Template.hackerProfile.events({
	"click #submit-btn": function(event,template){
		let name = template.find('#name').value;
		let pseudo = template.find('#pseudo').value;
		let email = template.find('#email').value;
		let hack = template.find('#hack').value;

		let hackerProfile = {
			name:name,
			pseudo:pseudo,
			email:email,
			hack:hack
		}

		Hackers.insert(hackerProfile);

	}

});

