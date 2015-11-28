Template.pickNum.events({
	"submit #submit-num": function(event, template){
		let num = template.find('#num').value;

		Meteor.call("compareNums",num);

	}
});