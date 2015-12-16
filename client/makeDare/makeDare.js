//Methods Used:
Template.makeNewDare.events({
    "click #submit-dare": function (event,template) {
      event.preventDefault();
      let dare = "Odds are "+ template.find('#newDare').value;
      Session.set("challenge", dare);
      Router.go('/findFriends');
    },
    "click #submit-home": function(event,template){
      event.preventDefault();
      Router.go('/');
    }
	
});


