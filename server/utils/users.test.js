const expect = require('expect');
const {Users} = require('./users');

describe('Users',()=>{
	let users;

	beforeEach(()=>{
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node Course'
		},{
			id: '2',
			name: 'Jennai',
			room: 'React Course'
		}, {
			id: '3',
			name: 'Walhberg',
			room: 'Node Course'
		}];

	});

	it('should add new user', ()=>{
		let users = new Users();
		let user = {
			id: '1234',
			name: 'Josh',
			room: 'NodeJS'
		};
		users.addUser(user.id, user.name, user.room);
	
		expect(users.users).toEqual([user]);
	});

	it('should return names for node course', ()=>{

		let userList = users.getUserList('Node Course');

		expect(userList).toEqual(['Mike','Walhberg']);
	});

	it('should return names for react course', ()=>{

		let userList = users.getUserList('React Course');

		expect(userList).toEqual(['Jennai']);
	});

	it('should remove a user', ()=>{
		let userId = '1';
		let user = users.removeUser(userId);
		expect(user.id).toEqual(userId);
		expect(users.users).toEqual([{
			id: '2',
			name: 'Jennai',
			room: 'React Course'
		}, {
			id: '3',
			name: 'Walhberg',
			room: 'Node Course'
		}]);

	});

	it('should not remove a user', ()=>{
		let user = users.removeUser('5');

		expect(users.users.length).toEqual(3);
		expect(user).toEqual(undefined);

	});

	it('should find user', ()=>{
		let userId = '3';
		let user = users.getUser(userId);

		expect(user.id).toEqual(userId);

	});

	it('should not find user', ()=>{
		let user = users.getUser('6');

		expect(user).toEqual(undefined);

	});


});