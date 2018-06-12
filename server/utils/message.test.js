const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage', ()=>{
	it('should generate correct message object', ()=>{
		const from = 'Andrew';
		const text = 'Hi there!';
		const res = generateMessage(from, text);

		expect(typeof res.createdAt).toBe('number');
		expect(res).toMatchObject({from, text});
	});
});