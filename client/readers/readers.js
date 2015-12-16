Template.read.helpers({
	oddsAre: function(){
		let extraCount = 6;
		let dareId = Iron.Location.get().path;
		dareId = dareId.substring(extraCount, dareId.length);
		Session.set('toMaxDareId',dareId);
		let fullDareWaiting = ReactiveMethod.call("getDareWaiting", dareId);
		Session.set('fullDareWaiting',fullDareWaiting);
		return fullDareWaiting.challenge;
	},
	isMax: function(){
		let maxNum = ReactiveMethod.call('getMax', Session.get('toMaxDareId'));
		Session.set('maxNum', maxNum);
		if (maxNum <= 1){
			return false;
		}
		else{
			return true;
		}
	},
	findMax: function(){
		return Session.get('maxNum');
	},
	from: function(){
		let dare = Session.get("fullDareWaiting");
		if (dare.creator == Meteor.userId()){
			return ReactiveMethod.call('getUser',dare.sendTo).username;
		}
		else{
			return dare.userName;
		}
	}
});

Template.read.events({
	"click #submit-max": function(event,template){
		event.preventDefault();
		Meteor.call('maxDare',Session.get('toMaxDareId'),template.find('#num').value);
		document.location.reload(true);
	},
	"click #submit-odds": function(event, template){
		event.preventDefault();
		Meteor.call('addOdds',Session.get('toMaxDareId'),Meteor.userId(),template.find('#num').value);
		Router.go('/');
	},
	"click #submit-home":function(){
		event.preventDefault();
		Router.go('/');
	}
});

Template.readWaiting.helpers({
	dare: function(){
    	let extraCount = 13;
		let dareId = Iron.Location.get().path;
		dareId = dareId.substring(extraCount, dareId.length);
		Session.set('dareIdWaiting',dareId);
    	let fullDare =  ReactiveMethod.call("getDareWaiting", dareId);
    	Session.set("fullDarePending",fullDare);
    	return fullDare.challenge;
    },
	friends: function(){
		let friends = ReactiveMethod.call("getUsersSent", Session.get('dareIdWaiting'));
    	return friends;
    },
    isMax: function(){
		let maxNum = ReactiveMethod.call('getMax', Session.get('dareIdWaiting'));
		Session.set('maxNumWaiting', maxNum);
		if (maxNum <= 1){
			return false;
		}
		else{
			return true;
		}
	},
    owner: function(){
    	if (Session.get("fullDarePending").userName == Meteor.user().username){
    		return 'you';
    	}
    	return Session.get("fullDarePending").userName;
    },
    sentTo: function(){
    	return ReactiveMethod.call("getUser",Session.get("fullDarePending").sendTo).username;
    },
    findMax: function(){
    	return Session.get('maxNumWaiting');
    }
});

Template.readWaiting.events({
	"click #submit-home": function(event, template){
		event.preventDefault();
		Router.go('/');
	}
});