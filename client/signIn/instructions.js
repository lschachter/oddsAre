Template.instructions.events({
	"click #submit-home":function(event){
		event.preventDefault();
		Router.go('/');
	}
});