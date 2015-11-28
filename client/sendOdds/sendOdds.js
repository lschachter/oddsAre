Template.sendOdds.events({
	"submit #submit-odds": function(event, template){
		let odds = template.find('#odds').value;

		Meteor.call("sendOdds",odds);

	}
});