const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
	it('should generate correct message object', ()=>{
		const from = 'Andrew';
		const text = 'Hi there!';
		const res = generateMessage(from, text);

		expect(typeof res.createdAt).toBe('number');
		expect(res).toMatchObject({from, text});
	});
});

describe('generateLocationMessage', ()=>{
	it('should generate correct location object', ()=>{
		const from = 'Admin';
		const latitude = 12.232;
		const longitude = 12.3434;
		const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

		const res = generateLocationMessage(from, latitude, longitude);
		expect(typeof res.createdAt).toBe('number');
		expect(res).toMatchObject({from});
		expect(res.url).toBe(url);
	});
});