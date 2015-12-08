Template.makeNewDare.helpers({
	dares: function(){
		if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
       		return Dares.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
     	} 
      	else {
        // Otherwise, return all of the tasks
        	return Dares.find({}, {sort: {createdAt: -1}});
      	}
    }
    /*hideCompleted: function () {
      return Session.get("hideCompleted");
	}*/
});

Template.makeNewDare.events({
    "click #submit-dare": function (event,template) {
      // Prevent default browser form submit
      event.preventDefault();
      // Get value from form element
      let dare = "Odds are "+ template.find('#newDare').value;
      // Insert a task into the collection
      Meteor.call("addDare", dare);
      Router.go('/findFriends');
    },
    "click #submit-home": function(event,template){
      event.preventDefault();
      Router.go('/');
    }
	
});

/*Template.friend.events({
	"click .toggle-checked":function(event){
		//Session.set(this._id, event.target.checked);
		console.log("hi");
		console.log(event.target.value);
	}
});*/

Template.dare.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Dares.update(this._id, {

        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Dares.remove(this._id);
    }
});

