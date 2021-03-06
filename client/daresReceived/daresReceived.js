Template.daresReceived.helpers({
	yourDares: function(){
		return ReactiveMethod.call('getDaresReceived');
	},
	pendingDares: function(){
		return ReactiveMethod.call('getPendingDares');
	},
	from: function(){
		if (this.creator == Meteor.userId()){
			return ReactiveMethod.call('getUser',this.sendTo).username;
		}
		else{
			return this.userName;
		}
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
	},
	"click #submit-done":function(event){
		event.preventDefault();
		Router.go('/doneDares');
	},
	"click #submit-instructions":function(event){
		event.preventDefault();
		Router.go('/instructions');
	}
});

