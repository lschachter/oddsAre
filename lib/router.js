Router.configure({ layoutTemplate: 'layout'});

Router.route('/', {name: 'daresReceived'});

Router.route('/doneDares',{name:'doneDares'});

Router.route('/writeDare', {name: 'makeNewDare'});

Router.route('/findFriends', {name: 'findFriends'});

Router.route('/read', {name: 'read'});

Router.route('/readWaiting', {name:'readWaiting'});

Router.route('/readDone',{name:'readDone'});

Router.route('/instructions',{name:'instructions'});