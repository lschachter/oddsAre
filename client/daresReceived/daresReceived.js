Template.daresReceived.helpers({
	yourDares: function(){
		return ReactiveMethod.call('getDaresReceived');
	},
	pendingDares: function(){
		return ReactiveMethod.call('getDaresSent');
	}
});

Template.daresReceived.events({
	"click #submit-new": function(event){
		event.preventDefault();
		Router.go('/writeDare');
	},
	"click #giveMax": function(event, template){
		event.preventDefault();
		Router.go('read',{_id: 1},{query: this._id});
	},
	"click #waiting": function(event,template){
		event.preventDefault();
		Router.go('readWaiting',{_id: 2},{query: this._id});
	}

});

