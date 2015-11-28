Template.sendDare.events({
	"click .toggle-private": function(){
      Meteor.call("setPrivate", this._id, ! this.private);
    },
	"submit #submit-dare": function(event, template){
		let dare = template.find('#dare').value;

		Meteor.call("addDare",dare);

	}
});

Template.sendDare.helpers({
    isOwner: function(){
      return this.owner === Meteor.userId();
    }
});