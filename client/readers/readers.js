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
    waiting: function(){
		if(Meteor.user().username == Session.get("fullDarePending").userName){
			return ReactiveMethod.call("getUser",Session.get("fullDarePending").sendTo).username;
		}
		else{
			return Session.get("fullDarePending").userName;
		}
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

Template.readDone.helpers({
	oddsAre: function(){
		let extraCount = 10;
		let dareId = Iron.Location.get().path;
		dareId = dareId.substring(extraCount, dareId.length);
		Session.set('finaleId',dareId);
		let fullDareFinale = ReactiveMethod.call("getDareWaiting", dareId);
		Session.set('fullDareFinale',fullDareFinale);
		Meteor.call("setNew", dareId);
		return fullDareFinale.challenge;
	},
	ready:function(){
		return Session.get('ready');
	},
	from:function(){
		return ReactiveMethod.call('getUser',Session.get('fullDareFinale').creator).username;
	},
	to:function(){
		return ReactiveMethod.call('getUser',Session.get('fullDareFinale').sendTo).username;
	},
	findMax: function(){
		return Session.get('fullDareFinale').max;
	},
	creatorNum: function(){
		return Session.get('fullDareFinale').creatorOdds;
	},
	receiverNum: function(){
		return Session.get('fullDareFinale').receiverOdds;
	},
	isEqual: function(){
		let cNum = Session.get('fullDareFinale').creatorOdds;
		let rNum = Session.get('fullDareFinale').receiverOdds;
		if (rNum == cNum){
			return true;
		}
		else{
			return false;
		}
	}
});

Template.readDone.events({
	"click #submit-back":function(event){
		event.preventDefault();
		Router.go('/doneDares');
	}
});

Template.readDone.rendered = function(){
	Session.set('ready',false);
	let counter = 4;
	let interval = setInterval(function() {
		if (counter > 1){
			$("#countdown").show();
			counter--;
	    	$("#countdown").html(counter);
			$("#countdown").fadeOut(1000);	    	
	    }
    	else{
        	clearInterval(interval);
        	Session.set("ready",true);
   		}
	}, 1250);
};