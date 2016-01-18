Template.doneDares.helpers({
	doneDares: function(){
		return ReactiveMethod.call("getDaresDone");
	},
	findDone:function(){
		if (this.userName == Meteor.user().username){
			return this.isNewC;
		}
		else{
			return this.isNewR;
		}
	},
	from: function(){
		if (this.creator == Meteor.userId()){
			return ReactiveMethod.call('getUser',this.sendTo).username;
		}
		else{
			return this.userName;
		}
	},
});

Template.doneDares.events({
	"click #submit-new": function(event){
		event.preventDefault();
		Router.go('/writeDare');
	},
	"click #submit-home":function(){
		event.preventDefault();
		Router.go('/');
	},
	"click #done":function(event){
		event.preventDefault();
		Router.go('readDone',{_id: 3},{query: this._id});
	}
});
