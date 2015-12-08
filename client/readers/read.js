Template.read.helpers({
	oddsAre: function(){
		let extraCount = 6;
		let dareId = Iron.Location.get().path;
		dareId = dareId.substring(extraCount, dareId.length);
		return ReactiveMethod.call("getClickedDare", dareId).challenge;
	}
});

Template.read.events({
	"click #submit-max": function(event,template){
		event.preventDefault();
		Meteor.call('maxDare',Session.get('dareId'),template.find('#num').value);
		Router.go('/');
	},
	"click #submit-home":function(){
		event.preventDefault();
		Router.go('/');
	}
});

Template.readWaiting.helpers({
	friends: function(){
		let extraCount = 13;
		let dareId = Iron.Location.get().path;
		dareId = dareId.substring(extraCount, dareId.length);
		Session.set('dareWaiting',dareId);
		let friends = ReactiveMethod.call("getUsersSent", dareId);
    	return friends;
    },
    dare: function(){
    	return ReactiveMethod.call("getDareWaiting", Session.get("dareWaiting"));
    }
});

Template.readWaiting.events({
	"click #submit-home": function(event, template){
		event.preventDefault();
		Router.go('/');
	}
});